import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

const Socket = () => {
    const connection = new HubConnectionBuilder()
  .withUrl('https://your-server-url/yourHub')
  .configureLogging(LogLevel.Information)
  .withAutomaticReconnect()
  .build();
  useEffect(() => {
    const startConnection = async () => {
      try {
        await connection.start();
        console.log('SignalR Connected.');
  
        // Send initial location or "nearest" request
        const userLocation = {
          latitude: 12.9716,
          longitude: 77.5946,
          radius: 5, // in kilometers
          gender: 'any',
        };
  
        connection.invoke('GetNearestRiders', userLocation);
  
        // Listen for response
        connection.on('ReceiveNearestRiders', (riders) => {
          console.log('Nearest riders:', riders);
          // Update state to show on map/UI
        });
  
      } catch (err) {
        console.error('SignalR Connection Error:', err);
      }
    };
  
    startConnection();
  
    return () => {
      connection.stop();
    };
  }, []);
  
  return (
    <View>
      <Text>Socket</Text>
    </View>
  )
}

export default Socket

const styles = StyleSheet.create({})