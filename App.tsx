// App.js
import React, { useEffect } from 'react';
import { View,PermissionsAndroid, StyleSheet,Alert,Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNetInfo } from '@react-native-community/netinfo';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { store } from './app/Reudx/slices/store';
import BottomTabs from './Bottomtabs';
import SignalRComponent from './app/Screens/Places/Mapview'

// Screens
// import Landingpage from './app/Screens/landingScreen';
import LoginScreen from './app/Screens/Login';
import Register from './app/Screens/Register';
import Common from './app/Screens/Commonpage';
import Phonelogin from './app/Screens/Phonelogin';
import OTPVerificationScreen from './app/Screens/OtpScreen/OtpScreen';
import OfflineScreen from './app/Screens/Offinescreen/Offlinescreen';
import LocationComponent from './app//Screens/Location';
import Forgotpassword from './app//Screens/Forgorpassword/Forgotpassword';
import ForgotPasswordVerifyScreen from './app/Screens/Forgorpassword/Forgotpasswordverifyscreen';
import VersionCheck from './app/Screens/VersionChecker/index';
import CreatePasswordScreen from './app/Screens/Forgorpassword/Createpasswordscreen';
import IncorrectCodeScreen from './app/Screens/Forgorpassword/Verificationfailedotp';
import VerificationSuccessScreen from './app/Screens/Forgorpassword/Verificationsuccessotp';
import Frogotpaswordmobile from './app/Screens/Forgorpassword/Forgotpasswordmobile';
import Forgotverifymobile from './app/Screens/Forgorpassword/Forgotverifyscreenmobile';
import Createpasswordmobile from './app/Screens/Forgorpassword/Createpassworemobileno';
import messaging from '@react-native-firebase/messaging';
import { MainStackNavigation } from './app/navigation/mainStackNavigation';
enableScreens();

import Ridesuccess from './app/Screens/BookingSuccess/Ridesuccess';

const Stack = createNativeStackNavigator();
import './app/Pushnotification/PushNotification';

export default function App() {
  const netInfo = useNetInfo();
 
 
  useEffect(() => {
    SplashScreen.hide();
    requestAndroidNotificationPermission();
   // getFcmToken()

  }, []);


  const requestAndroidNotificationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      console.log('Notification Permission:', granted);
    }
  };
  const getFcmToken = async () => {
    try {
      const token = await messaging().getToken();
      if (token) {
        console.log('✅ FCM Token:', token);
        Alert.alert('Your FCM Token', token);
      } else {
        console.log('❌ No token received');
      }
    } catch (error) {
      console.log('❌ Error while fetching FCM token:', error);
    }
  };
  

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        {netInfo.isConnected || netInfo.isConnected === null ? (
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Main"
              screenOptions={{
                headerShown: false,
                animation: 'fade',
              }}
            >
              {/* Authentication Screens */}
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="Phonelogin" component={Phonelogin} />
              <Stack.Screen name="OTPVerificationScreen" component={OTPVerificationScreen} />
              
              {/* Forgot Password Flow */}
              <Stack.Screen name="Forgotpassword" component={Forgotpassword} />
              <Stack.Screen name="ForgotPasswordVerifyScreen" component={ForgotPasswordVerifyScreen} />
              <Stack.Screen name="CreatePasswordScreen" component={CreatePasswordScreen} />
              <Stack.Screen name="IncorrectCodeScreen" component={IncorrectCodeScreen} />
              <Stack.Screen name="VerificationSuccessScreen" component={VerificationSuccessScreen} />
              <Stack.Screen name="Frogotpaswordmobile" component={Frogotpaswordmobile} />
              <Stack.Screen name="Forgotverifymobile" component={Forgotverifymobile} />
              <Stack.Screen name="Createpasswordmobile" component={Createpasswordmobile} />
              <Stack.Screen name="Ridesuccess" component={Ridesuccess} />

              {/* Main App with Bottom Tabs */}
              {/* <Stack.Screen name="Main" component={BottomTabs} /> */}
              <Stack.Screen 
                name="Main" 
                component={BottomTabs}
                options={{
                  // Prevent going back to auth screens
                  gestureEnabled: false,
                }}
              />
                            <Stack.Screen name="SignalRComponent" component={SignalRComponent} />

              
              {/* Common Screens */}
              <Stack.Screen name="Common" component={Common} />
              <Stack.Screen name="LocationComponent" component={LocationComponent} />
              <Stack.Screen name="VersionCheck" component={VersionCheck} />
            </Stack.Navigator>
          </NavigationContainer>
        ) : (
          <OfflineScreen />
        )}
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});