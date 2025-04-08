import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

const Socket = () => {
  const signalRUrl = 'https://uat.zippyrideuserapi.projectpulse360.com/riderhub';

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(signalRUrl)
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    const startConnection = async () => {
      try {
        await connection.start();
        console.log('✅ SignalR Connected');

        // Server calling this? You need this listener
        connection.on('locationupdated', (data) => {
          console.log('📍 Location updated by server:', data);
        });

        connection.on('ReceiveNearestRiders', (riders) => {
          console.log('📥 Nearest riders:', riders);
        });

        // Sample method if 'GetNearestRiders' isn't defined:
        await connection.invoke('UpdateLocation', 12.787926, 79.662123 , false, 10);

      } catch (err) {
        console.error('❌ SignalR Connection Error:', err);
      }
    };

    startConnection();

    return () => {
      connection.stop();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Socket</Text>
    </View>
  );
};

export default Socket;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
