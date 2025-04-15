import React, { useLayoutEffect, useState } from 'react';
import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType,
} from '@microsoft/signalr';
import { View,Text } from 'react-native';

const signalRUrl = 'https://uat.zippyrideuserapi.projectpulse360.com/riderhub';

const SignalRComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [riders, setRiders] = useState([]);
  const [connection, setConnection] = useState(null);

  useLayoutEffect(() => {
    const connectToHub = async () => {
      setIsLoading(true);

      const newConnection = new HubConnectionBuilder()
        .withUrl(signalRUrl, {
          transport: HttpTransportType.WebSockets,
          // skipNegotiation: true, // Use this ONLY if backend supports WebSockets directly
          // accessTokenFactory: () => 'your_token_here', // If using auth
        })
        .configureLogging(LogLevel.Debug)
        .withAutomaticReconnect()
        .build();

      setConnection(newConnection);

      let intervalId = null;

      try {
        await newConnection.start();
        console.log('✅ SignalR Connected');

        // Reconnect Events
        newConnection.onreconnecting((error) => {
          console.warn('⚠️ SignalR Reconnecting...', error);
        });

        newConnection.onreconnected((connectionId) => {
          console.log('🔄 SignalR Reconnected. Connection ID:', connectionId);
        });

        newConnection.onclose((error) => {
          console.error('❌ SignalR Connection Closed:', error);
        });

        // Handle events
        newConnection.on('locationupdated', (data) => {
          console.log('📍 Location updated by server:', data);
          setRiders(data);
        });

        newConnection.on('ReceiveNearestRiders', (data) => {
          console.log('📥 Nearest Riders:', data);
        });

        // Send location every 3 seconds
        const updateLocation = () => {
          newConnection
            .invoke('UpdateLocation', 12.787926, 79.662123, false, 10)
            .catch((err) => console.error('❌ Invoke Error:', err));
        };

        updateLocation(); // initial
        intervalId = setInterval(updateLocation, 3000);

      } catch (err) {
        console.error('❌ SignalR Connection Error:', err);
      }

      setIsLoading(false);

      // Cleanup
      return () => {
        if (intervalId) clearInterval(intervalId);
        newConnection.stop().then(() => console.log('🔌 Connection stopped'));
      };
    };

    const cleanup = connectToHub();

    return () => {
      cleanup && cleanup();
    };
  }, []);

  return (
    <View>
      <Text>🚗 SignalR Rider Tracking</Text>
      {isLoading ? <Text>Connecting...</Text> : <Text>Connected ✅</Text>}

      <Text>Riders:</Text>
      <View>
        {riders.map((rider, index) => (
          <Text key={index}>{JSON.stringify(rider)}</Text>
        ))}
      </View>
    </View>
  );
};

export default SignalRComponent;
