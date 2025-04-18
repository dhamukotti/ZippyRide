// App.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Logger, {startNetworkLogging} from 'react-native-network-logger';
import {useNetInfo} from '@react-native-community/netinfo';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux'; // Import Provider from react-redux
import {store} from './app/Reudx/store';
// Enable screens for better performance
enableScreens();
import Landingpage from './app/landingScreen';
import LoginScreen from './app/Login';
import Register from './app/Register'
import Places from './app/Places'
import Common from './app/Commonpage'
import Phonelogin from './app/Phonelogin'
import OTPVerificationScreen from './app/OtpScreen/OtpScreen';
import CityToCityScreen from './app/Citytocity/Citytocity';
import OfflineScreen from './app/Offinescreen/Offlinescreen';
import LocationComponent from './app/Location';
// Create a stack navigator
const Stack = createNativeStackNavigator();

// Home Screen Component
function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <Button
        title="Go to Details"
       /// onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

// Details Screen Component
function DetailsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Details Screen</Text>
    </View>
  );
}

// Main App Component
export default function App() {
  const [showLogger, setShowLogger] = useState(false);

  useEffect(() => {
    startNetworkLogging();
    SplashScreen.hide();
  }, []);

  const handleToggleLogger = () => setShowLogger(!showLogger);
  const netInfo = useNetInfo();

  return netInfo.isConnected || netInfo.isConnected === null ? (
    <Provider store={store}>

  <SafeAreaProvider>
    
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Common'>
        <Stack.Screen name="Common"   options={{ headerShown: false }} component={Common} />
      <Stack.Screen name="Phonelogin"   options={{ headerShown: false }} component={Phonelogin} />
      <Stack.Screen name="LocationComponent"   options={{ headerShown: false }} component={LocationComponent} />

      
        <Stack.Screen name="Login"   options={{ headerShown: false }} component={LoginScreen} />
        <Stack.Screen name="Landing"  options={{ headerShown: false }} component={Landingpage} />
        <Stack.Screen name="OTPVerificationScreen"   options={{ headerShown: false }} component={OTPVerificationScreen} />
        <Stack.Screen name="CityToCityScreen"   options={{ headerShown: false }} component={CityToCityScreen} />

        
        
        <Stack.Screen name="Places"   options={{ headerShown: false }} component={Places} />
        <Stack.Screen name="Register"   options={{ headerShown: false }} component={Register} />

        </Stack.Navigator>
      
      </NavigationContainer>
     
    </SafeAreaProvider>
    </Provider>
 ):(
  <SafeAreaProvider>
    <OfflineScreen />
  </SafeAreaProvider>
);
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});
