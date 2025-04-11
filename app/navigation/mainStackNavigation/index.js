import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  AuthStackNavigation  from '../authStackNavigation/index';
import  BottomTabs  from '../bottomTabNavigation';
import { useSelector } from 'react-redux';



const Stack = createNativeStackNavigator();

export const MainStackNavigation = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
//console.log(isLoggedIn,'isLoggedIn')
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
         {!isLoggedIn ? ( 
          <Stack.Screen
            name="authStackNavigation"
            component={AuthStackNavigation}
          />
        ) : (  
          <>
             <Stack.Screen
              name="bottomNavigation"
              component={BottomTabs}
            /> 
            
           
            
          </>
         )} 
      </Stack.Navigator>
    </NavigationContainer>
  );
};
