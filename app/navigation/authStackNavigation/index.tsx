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
import BottomTabs from '../bottomTabNavigation/index';

// Screens
// import Landingpage from './app/Screens/landingScreen';
import LoginScreen from '../../Screens/Login';
import Register from '../../Screens/Register';
import Common from '../../Screens/Commonpage';
import Phonelogin from '../../Screens/Phonelogin';
import OTPVerificationScreen from '../../Screens/OtpScreen/OtpScreen';
import OfflineScreen from '../../Screens/Offinescreen/Offlinescreen';
import LocationComponent from '../../Screens/Location';
import Forgotpassword from '../../Screens/Forgorpassword/Forgotpassword';
import ForgotPasswordVerifyScreen from '../../Screens/Forgorpassword/Forgotpasswordverifyscreen';
import VersionCheck from '../../Screens/VersionChecker/index';
import CreatePasswordScreen from '../../Screens/Forgorpassword/Createpasswordscreen';
import IncorrectCodeScreen from '../..//Screens/Forgorpassword/Verificationfailedotp';
import VerificationSuccessScreen from '../../Screens/Forgorpassword/Verificationsuccessotp';
import Frogotpaswordmobile from '../../Screens/Forgorpassword/Forgotpasswordmobile';
import Forgotverifymobile from '../../Screens/Forgorpassword/Forgotverifyscreenmobile';
import Createpasswordmobile from '../../Screens/Forgorpassword/Createpassworemobileno';

enableScreens();
const Stack = createNativeStackNavigator();

export default function App() {
  const netInfo = useNetInfo();
 
 
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
   
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