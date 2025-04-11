import React, { useState, useEffect } from 'react';
import { View, Text, Button, PermissionsAndroid, Alert, Linking, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const LocationComponent = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    }

    // Check if location services are enabled on initial load
    checkLocationServices();
  }, []);

  // Function to request location permission on Android
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "We need access to your location to provide relevant content.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // Function to check if location services are enabled
  const checkLocationServices = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('Location is enabled and retrieved successfully');
      },
      (error) => {
        if (error.code === 2) {
          // If location services are disabled, show the prompt
          showEnableLocationPopup();
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  };

  // Show an alert prompting the user to enable location services
  const showEnableLocationPopup = () => {
    Alert.alert(
      'Location Services Disabled',
      'Please enable location services to use this feature.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel pressed'),
          style: 'cancel',
        },
        {
          text: 'Open Settings',
          onPress: () => {
            if (Platform.OS === 'ios') {
              // For iOS: Open app settings
              Linking.openURL('app-settings:');
            } else {
              // For Android: Open location settings
              Linking.openURL('android.settings.LOCATION_SOURCE_SETTINGS');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  // Function to get the current location
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setLocation(position);
      },
      (error) => {
        console.error(error);
        alert("Error getting location: " + error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Get Location" onPress={getCurrentLocation} />
      {location && (
        <Text>
          Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}
        </Text>
      )}
    </View>
  );
};

export default LocationComponent;
