import { useEffect, useRef, useState } from 'react';
import { getItem } from './mmkvStorage';

export const useWebSocket = (onMessage = (event: any) => {}) => {
  const [isWebSocketConnected, setWebSocketConnected] = useState(false);
  const ws = useRef(null);
  const reconnectIntervalRef = useRef(1000);

  const userData = getItem('userData');
  if (!userData) {
    console.error('User data is not available.');
    return null;
  }

  const userDetail = JSON.parse(userData);
  //const url = `wss://uat.bshareapi.projectpulse360.com/ws?token=${userDetail?.token}`;
 
    const url = `wss://live.bshareapi.dindigulthookusatti.com/ws?token=${userDetail?.token}`;

  const connectWebSocket = () => {
    try {
      // Create a WebSocket connection
      ws.current = new WebSocket(url);

      // WebSocket event listeners
      ws.current.onopen = () => {
        console.log("Connection established!");
        setWebSocketConnected(true);
        reconnectIntervalRef.current = 1000; // Reset reconnection interval
      };

      ws.current.onmessage = (event) => {
        try {
          // Check if the message is a simple string and contains "ping"
          if (typeof event.data === "string" && event.data.startsWith("ping")) {
            console.log("Received ping, ignoring:", event.data);
            return;
          }
      
          // Attempt to parse only if the data is valid JSON
          const message = JSON.parse(event.data);
          
          console.log("Received message:", message);
          onMessage(message);
        } catch (error) {
          console.error("Error parsing WebSocket message:", error, "Raw data:", event.data);
        }
      };

      // ws.current.onerror = (error) => {
      //   onError(error);
      // };

      // ws.current.onclose = (event) => {
      //   setWebSocketConnected(false);
      //   // Attempt to reconnect with exponential backoff
      //   setTimeout(() => {
      //     reconnectIntervalRef.current = Math.min(
      //       reconnectIntervalRef.current * 2,
      //       30000
      //     );
      //     connectWebSocket();
      //   }, reconnectIntervalRef.current);
      // };
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [url, isWebSocketConnected]);

  return { isWebSocketConnected, ws };
};
