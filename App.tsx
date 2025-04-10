// App.js
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNetInfo } from '@react-native-community/netinfo';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { store } from './app/Reudx/store';
import BottomTabs from './Bottomtabs';

// Screens
import Landingpage from './app/landingScreen';
import LoginScreen from './app/Login';
import Register from './app/Register';
import Common from './app/Commonpage';
import Phonelogin from './app/Phonelogin';
import OTPVerificationScreen from './app/OtpScreen/OtpScreen';
import OfflineScreen from './app/Offinescreen/Offlinescreen';
import LocationComponent from './app/Location';
import Forgotpassword from './app/Forgorpassword/Forgotpassword';
import ForgotPasswordVerifyScreen from './app/Forgorpassword/Forgotpasswordverifyscreen';
import VersionCheck from './app/VersionChecker/index';
import CreatePasswordScreen from './app/Forgorpassword/Createpasswordscreen';
import IncorrectCodeScreen from './app/Forgorpassword/Verificationfailedotp';
import VerificationSuccessScreen from './app/Forgorpassword/Verificationsuccessotp';
import Frogotpaswordmobile from './app/Forgorpassword/Forgotpasswordmobile';
import Forgotverifymobile from './app/Forgorpassword/Forgotverifyscreenmobile';
import Createpasswordmobile from './app/Forgorpassword/Createpassworemobileno';
import { getItem } from './app/uikit/UikitUtils/mmkvStorage';
enableScreens();
const Stack = createNativeStackNavigator();

export default function App() {
  const netInfo = useNetInfo();
  useEffect(() => {
    const userData = getItem('isLoggedIn'); // Synchronous call
    console.log(userData, 'userdata'); // This should log immediately
  }, []);
 
  useEffect(() => {
    SplashScreen.hide();
  }, []);

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