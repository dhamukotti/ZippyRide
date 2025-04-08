// useSignalRAndWebSocket.js
import { useEffect, useRef, useState } from 'react';
import * as signalR from '@microsoft/signalr';

export const useSignalRAndWebSocket = () => {
  const [isSignalRConnected, setSignalRConnected] = useState(false);
  const [isWSConnected, setWSConnected] = useState(false);

  const signalRConnection = useRef(null);
  const wsConnection = useRef(null);

  const SIGNALR_URL = 'https://www.uat.zippyrideuserapi.projectpulse360.com/riderhub';
  const WEBSOCKET_URL = 'wss://www.uat.zippyrideuserapi.projectpulse360.com/riderhub';

  // SignalR Setup
  useEffect(() => {
    const startSignalR = async () => {
      try {
        const connection = new signalR.HubConnectionBuilder()
          .withUrl(SIGNALR_URL, {
            transport: signalR.HttpTransportType.WebSockets,
          })
          .withAutomaticReconnect()
          .configureLogging(signalR.LogLevel.Information)
          .build();

        connection.onclose(() => {
          console.warn('❌ SignalR Disconnected');
          setSignalRConnected(false);
        });

        connection.onreconnected(() => {
          console.log('✅ SignalR Reconnected');
          setSignalRConnected(true);
        });

        await connection.start();
        console.log('✅ SignalR Connected');
        signalRConnection.current = connection;
        setSignalRConnected(true);
      } catch (error) {
        console.error('❌ SignalR Error:', error);
      }
    };

    startSignalR();

    return () => {
      if (signalRConnection.current) {
        signalRConnection.current.stop();
      }
    };
  }, []);

  // WebSocket Setup
  useEffect(() => {
    const socket = new WebSocket(WEBSOCKET_URL);

    socket.onopen = () => {
      console.log('✅ WebSocket connected');
      setWSConnected(true);
    };

    socket.onmessage = (event) => {
      console.log('📩 WS Message:', event.data);
    };

    socket.onerror = (error) => {
      console.error('❌ WebSocket Error:', error.message);
    };

    socket.onclose = () => {
      console.warn('🔌 WebSocket disconnected');
      setWSConnected(false);
    };

    wsConnection.current = socket;

    return () => {
      if (wsConnection.current) {
        wsConnection.current.close();
      }
    };
  }, []);

  // Send location to SignalR and WebSocket
  const updateLocation = async (latitude, longitude, isFemale, rangeFilter) => {
    const payload = { latitude, longitude, isFemale, rangeFilter };

    try {
      if (
        signalRConnection.current &&
        signalRConnection.current.state === signalR.HubConnectionState.Connected
      ) {
        await signalRConnection.current.invoke(
          'UpdateLocation',
          latitude,
          longitude,
          isFemale,
          rangeFilter
        );
        console.log('📡 SignalR location sent:', payload);
      } else {
        console.warn('⚠️ SignalR not connected');
      }
    } catch (err) {
      console.error('❌ Error sending to SignalR:', err);
    }

    if (wsConnection.current && isWSConnected) {
      wsConnection.current.send(JSON.stringify({ method: 'UpdateLocation', ...payload }));
      console.log('📡 WebSocket location sent:', payload);
    } else {
      console.warn('⚠️ WebSocket not connected');
    }
  };

  return {
    isSignalRConnected,
    isWSConnected,
    updateLocation,
  };
};
