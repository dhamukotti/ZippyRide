// PushNotificationConfig.js
import {Platform,PermissionsAndroid} from 'react-native'
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

// 1. Create Default Notification Channel (for Android 8.0+)
PushNotification.createChannel(
  {
    channelId: 'com.zippyride', // Must match the value in AndroidManifest.xml
    channelName: 'Default Channel',
    channelDescription: 'General notifications',
    soundName: 'default',
    importance: 4, // max importance
    vibrate: true,
  },
  (created) => console.log(`createChannel returned '${created}'`)
);

// 2. Configure PushNotification
PushNotification.configure({
  // Called when the device token is generated (for FCM)
  onRegister: function (token) {
    console.log('Device Token:', token);
    // You can send this token to your backend server for sending push notifications.
  },

  // Called when a remote or local notification is opened or received
  onNotification: function (notification) {
    console.log('Notification received:', notification);
    
    // Required on iOS only (won't affect Android)
    notification.finish(PushNotification.FetchResult.NoData);
  },

  // FCM sender ID
  senderID: 'YOUR_FIREBASE_SENDER_ID', // 🔁 Replace with your actual Sender ID from Firebase

  // Automatically request permission to send notifications
  requestPermissions: true,
});

// 3. Request for FCM Permission and Get Token
async function requestFCMPermission() {
    try {
      // Handle Android 13+ notification permission
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        const { status } = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
        if (status !== 'granted') {
          console.log('Notification permission denied');
          return;
        }
      }
  
      // Request FCM permission
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
      if (enabled) {
        const fcmToken = await messaging().getToken();
        console.log('FCM Token:', fcmToken);
        // Send this token to your backend
      } else {
        console.log('FCM permission not granted');
      }
    } catch (error) {
      console.error('Permission request error:', error);
    }
  }
  
// Call the function to request permissions and get FCM token
requestFCMPermission();

// 4. Function to trigger a Local Notification
function showLocalNotification(title, message) {
  PushNotification.localNotification({
    channelId: 'com.zippyride',
    title: title,
    message: message,
    playSound: true,
    soundName: 'default',
    importance: 4,
    priority: 'high',
    // This is the name of the icon file (without extension)

  });
}

// Example: Show a local notification
showLocalNotification('Hello', 'This is a local notification!');
