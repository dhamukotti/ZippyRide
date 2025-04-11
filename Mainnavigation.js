// App.js
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNetInfo } from '@react-native-community/netinfo';
import SplashScreen from 'react-native-splash-screen';
import { Provider, useSelector } from 'react-redux';
 import BottomTabs from './Bottomtabs';

// Screens
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


enableScreens();
const Stack = createNativeStackNavigator();

export default function App() {
  const netInfo = useNetInfo();

  // Redux state to check if user is logged in
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        {isLoggedIn ? (
          // Show main app with bottom tabs if logged in
          <>
            <Stack.Screen 
              name="Main" 
              component={BottomTabs} 
              options={{ gestureEnabled: false }} 
            />
            <Stack.Screen name="Common" component={Common} />
            {/* <Stack.Screen name="LocationComponent" component={LocationComponent} /> */}
            {/* <Stack.Screen name="VersionCheck" component={VersionCheck} /> */}
          </>
        ) : (
          // Show authentication-related screens if not logged in
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Phonelogin" component={Phonelogin} />
            <Stack.Screen name="OTPVerificationScreen" component={OTPVerificationScreen} />
            <Stack.Screen name="Forgotpassword" component={Forgotpassword} />
            <Stack.Screen name="ForgotPasswordVerifyScreen" component={ForgotPasswordVerifyScreen} />
            <Stack.Screen name="CreatePasswordScreen" component={CreatePasswordScreen} />
            <Stack.Screen name="IncorrectCodeScreen" component={IncorrectCodeScreen} />
            <Stack.Screen name="VerificationSuccessScreen" component={VerificationSuccessScreen} />
            <Stack.Screen name="Frogotpaswordmobile" component={Frogotpaswordmobile} />
            <Stack.Screen name="Forgotverifymobile" component={Forgotverifymobile} />
            <Stack.Screen name="Createpasswordmobile" component={Createpasswordmobile} />
          </>
        )}
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
