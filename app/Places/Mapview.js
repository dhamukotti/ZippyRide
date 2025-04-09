import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const websocketUrl = 'wss://www.uat.zippyrideuserapi.projectpulse360.com/riderhub';

export default function LiveLocationTracker() {
  const [riders, setRiders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(15); // Initial zoom

 


  useEffect(() => {
    let ws;
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 5;
    const reconnectDelay = 5000; // 5 seconds
  
    const connect = () => {
      setIsLoading(true);
      ws = new WebSocket(websocketUrl);
  
      ws.onopen = () => {
        console.log('✅ WebSocket Connected');
        reconnectAttempts = 0;
        setIsLoading(false);
        
        // Send initial message after connection
        const message = {
          type: 'UpdateLocation',
          lat: 12.787926,
          lng: 79.662123,
          isAvailable: false,
          radius: 10
        };
        ws.send(JSON.stringify(message));
      };
  
      ws.onmessage = (event) => {
        try {
          // Handle different data types
          let rawData = event.data;
          
          // If it's a Blob, convert to text
          if (rawData instanceof Blob) {
            const reader = new FileReader();
            reader.onload = () => handleMessage(reader.result);
            reader.readAsText(rawData);
            return;
          }
  
          handleMessage(rawData);
        } catch (err) {
          console.error('Message processing error:', err);
        }
      };
  
      const handleMessage = (rawData) => {
        if (!rawData || typeof rawData !== 'string') return;
  
        // Check for handshake error specifically
        if (rawData.includes('Handshake was canceled') || 
            (rawData.startsWith('{') && rawData.includes('"error":"Handshake was canceled"'))) {
          console.error('Handshake failed:', rawData);
          handleConnectionFailure();
          return;
        }
  
        try {
          const data = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
          
          // Handle case where error comes in data property
          if (data.data && typeof data.data === 'string') {
            try {
              const nestedData = JSON.parse(data.data);
              if (nestedData.error) {
                console.error('Nested error:', nestedData.error);
                return;
              }
            } catch (e) {
              // Not JSON, continue with normal processing
            }
          }
  
          // Process valid messages
          if (data.type) {
            switch(data.type) {
              case 'locationupdated':
                setRiders(data.payload || data);
                break;
              case 'ReceiveNearestRiders':
                console.log('Nearest riders:', data.riders || data.payload);
                break;
              default:
                console.log('Unknown message type:', data.type);
            }
          }
        } catch (err) {
          console.error('Failed to parse message:', rawData, err);
        }
      };
  
      ws.onerror = (error) => {
        console.error('❌ WebSocket Error:', error);
        handleConnectionFailure();
      };
  
      ws.onclose = (event) => {
        console.log('WebSocket closed:', event.code, event.reason);
        if (event.code !== 1000) { // Not normal closure
          handleConnectionFailure();
        }
      };
    };
  
    const handleConnectionFailure = () => {
      setIsLoading(false);
      if (reconnectAttempts < maxReconnectAttempts) {
        reconnectAttempts++;
        console.log(`Attempting to reconnect (${reconnectAttempts}/${maxReconnectAttempts})...`);
        setTimeout(connect, reconnectDelay);
      } else {
        console.error('Max reconnection attempts reached');
      }
    };
  
    // Initial connection
    connect();
  
    return () => {
      if (ws) {
        ws.close(1000, 'Component unmounted');
      }
    };
  }, []);
  // useEffect(() => {
  //   let socket;
  //   let invocationId = 0;

  //   const connectWebSocket = () => {
  //     socket = new WebSocket(websocketUrl);

  //     socket.onopen = () => {
  //       console.log('🌐 WebSocket connected');

  //       // Step 1: Send handshake for SignalR
  //       socket.send(
  //         JSON.stringify({
  //           protocol: 'json',
  //           version: 1,
  //         }) + '\u001e'
  //       );

  //       // Step 2: Send UpdateLocation (same as SignalR .invoke)
  //       setTimeout(() => {
  //         const message = {
  //           type: 1,
  //           target: 'UpdateLocation',
  //           arguments: [12.787926, 79.662123, false, 10],
  //           invocationId: (++invocationId).toString(),
  //         };
  //         socket.send(JSON.stringify(message) + '\u001e');
  //       }, 500);

  //       setIsLoading(false);
  //     };

  //     socket.onmessage = (event) => {
  //       const messages = event.data.split('\u001e').filter(Boolean);

  //       messages.forEach((msgStr) => {
  //         try {
  //           const msg = JSON.parse(msgStr);
  //           console.log('📩 Message:', msg);

  //           // Handle locationupdated message
  //           if (msg.type === 1 && msg.target === 'locationupdated') {
  //             const ridersArray = msg.arguments[0]; // ✅ Correct extraction
  //             setRiders(ridersArray);
  //             console.log('✅ Location updated by server:', ridersArray);
  //           }
  //         } catch (err) {
  //           console.error('❌ Message parse error:', err);
  //         }
  //       });
  //     };

  //     socket.onerror = (error) => {
  //       console.error('⚠️ WebSocket error:', error);
  //     };

  //     socket.onclose = () => {
  //       console.warn('🔌 WebSocket closed. Reconnecting in 3s...');
  //       setTimeout(connectWebSocket, 3000);
  //     };
  //   };

  //   connectWebSocket();

  //   return () => {
  //     if (socket) socket.close();
  //   };
  // }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📍 Rider Live Locations</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <ScrollView contentContainerStyle={styles.scroll}>
          {riders.length > 0 ? (
            riders.map((rider, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.label}>Rider ID: <Text style={styles.value}>{rider.riderId}</Text></Text>
                <Text style={styles.label}>Latitude: <Text style={styles.value}>{rider.latitude}</Text></Text>
                <Text style={styles.label}>Longitude: <Text style={styles.value}>{rider.longitude}</Text></Text>
                <Text style={styles.label}>Gender: <Text style={styles.value}>{rider.isFemale ? 'Female' : 'Male'}</Text></Text>
                <Text style={styles.label}>Last Updated: <Text style={styles.value}>{new Date(rider.lastUpdated).toLocaleString()}</Text></Text>
              </View>
            ))
          ) : (
            <Text style={styles.noData}>No rider data available</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 16,
    backgroundColor: '#f7f9fc',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  scroll: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
  value: {
    fontWeight: 'bold',
    color: '#111',
  },
  noData: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginTop: 40,
  },
});
