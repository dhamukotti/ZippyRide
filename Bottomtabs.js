// Bottomtabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import SvgHome from './app/icons/SvgHome';
import SvgUser from './app/icons/SvgUser';
import SvgGps from './app/icons/SvgGps';

// Import your screen components
import Landingpage from './app/Screens/landingScreen';
import Places from './app/Screens/Places';
import Mapviwscrron from './app/Screens/Places/Mapview';
import CityToCityScreen from './app/Screens/Citytocity/Citytocity';
import Historyofride from './app/Screens/BookingSuccess/Historyofride';
import ProfileScreen from './app/Screens/Profile/ProfileScreen';
import Paymentrequest from './app/Screens/Paymentrequest/Paymentrequest';
import RiderVerificationScreen from './app/Screens/BookingSuccess/RiderVerificationScreen';
import PaymentScreen from './app/Screens/BookingSuccess/PaymentScreen';
import Ridesuccess from './app/Screens/BookingSuccess/Ridesuccess';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Landingpage" component={Landingpage} />
      <Stack.Screen name="Places" component={Places} />
      <Stack.Screen name="MapView" component={Mapviwscrron} />
      <Stack.Screen name="CityToCity" component={CityToCityScreen} />
    </Stack.Navigator>
  );
}

function RidesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RideHistory" component={Historyofride} />
      <Stack.Screen name="RiderVerification" component={RiderVerificationScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="RideSuccess" component={Ridesuccess} />
    </Stack.Navigator>
  );
}

function PaymentsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PaymentRequests" component={Paymentrequest} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return <SvgHome fill={focused ? '#F84A01' : '#F6A000'} height={25} width={25} />;
          } else if (route.name === 'Rides') {
            return <SvgGps fill={focused ? '#F84A01' : '#F6A000'} height={25} width={25} />;
          } else if (route.name === 'Payments') {
            return <SvgHome fill={focused ? '#F84A01' : '#F6A000'} height={30} width={25} />;
          } else if (route.name === 'Profile') {
            return <SvgUser fill={focused ? '#F84A01' : '#F6A000'} height={25} width={25} />;
          }
        },
        tabBarActiveTintColor: '#F84A01',
        tabBarInactiveTintColor: '#F6A000',
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStack} 
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'Landingpage';
          return {
            tabBarStyle: {
              display: routeName === 'Landingpage' ? 'none' : 'flex',
              paddingBottom: 5,
              height: 60,
            },
          };
        }}
      />
      {/* <Tab.Screen 
        name="Rides" 
        component={RidesStack} 
        options={{ title: 'Rides' }} 
      /> */}
     
      <Tab.Screen 
        name="Profile" 
        component={ProfileStack} 
        options={{ title: 'Profile' }} 
      />
    </Tab.Navigator>
  );
}