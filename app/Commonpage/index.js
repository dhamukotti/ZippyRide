import React,{useEffect} from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
const WelcomeScreen = () => {
    const navigation = useNavigation()


useEffect(() => {
  requestLocationPermission()
}, [])




    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'This app needs access to your location.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Location permission granted');
            getCurrentLocation();
          } else {
            console.log('Location permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      } else if (Platform.OS === 'ios') {
        const permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
        const result = await check(permission);
        if (result === RESULTS.GRANTED) {
          console.log('Location permission granted');
          getCurrentLocation();
        } else if (result === RESULTS.DENIED) {
          const requestResult = await request(permission);
          if (requestResult === RESULTS.GRANTED) {
            console.log('Location permission granted');
            getCurrentLocation();
          } else {
            console.log('Location permission denied');
          }
        } else {
          console.log('Location permission denied');
        }
      }
      if (Platform.OS === 'android') {
        try {
          const cameraPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'This app needs access to your camera.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
    
          const storagePermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission',
              message: 'This app needs access to your storage to save files.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
    
          if (
            cameraPermission === PermissionsAndroid.RESULTS.GRANTED &&
            storagePermission === PermissionsAndroid.RESULTS.GRANTED
          ) {
            console.log('Camera and Storage permissions granted');
          } else {
            console.log('Camera or Storage permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      } else if (Platform.OS === 'ios') {
        const cameraStatus = await request(PERMISSIONS.IOS.CAMERA);
        const photoLibraryStatus = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    
        if (cameraStatus === RESULTS.GRANTED && photoLibraryStatus === RESULTS.GRANTED) {
          console.log('Camera and Photo Library permissions granted');
        } else {
          console.log('Camera or Photo Library permission denied');
        }
      }
    };
  

  
    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
        },
        (error) => {
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };
  
  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>ZR</Text>
        </View>
        <Text style={styles.title}>Zippy Ride</Text>
        <Text style={styles.subtitle}>Your Ride, Your Way</Text>
      </View>

      {/* Buttons */}
      <TouchableOpacity
      onPress={()=>navigation.navigate("Login")}
       style={styles.signInButton}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
      onPress={()=>navigation.navigate("Register")}
      
       style={styles.signUpButton}>
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Login via phone */}
      <View style={styles.spacer} />
      <Text style={styles.orText}>— Or —</Text>
      <TouchableOpacity   style={{cursor:"pointer"}}  onPress={()=>navigation.navigate("Phonelogin")}>
      <Text style={{ fontFamily: 'Times New Roman', fontSize: 18, fontWeight: '600',color :'#5B7FAD'}}>
      Login via Phone Number
    </Text>
          </TouchableOpacity>

      {/* Skip */}
      <View style={styles.spacer} />
      <TouchableOpacity>
        <Text style={styles.skipText}>SKIP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.05,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: height * 0.05,
  },
  logo: {
    width: width * 0.2,
    height: width * 0.2,
    backgroundColor: 'black',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoText: {
    color: '#DFD46A', // Logo text color
    fontSize: width * 0.08,
    fontWeight: 'bold',
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: width * 0.035,
    color: '#555',
  },
  signInButton: {
    width: '100%',
    backgroundColor: '#DFD46A', // Button color
    paddingVertical: height * 0.02,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  signInText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: 'black',
  },
  signUpButton: {
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    paddingVertical: height * 0.02,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: height * 0.04, // Increased gap below Sign Up button
  },
  signUpText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: 'black',
  },
  spacer: {
    height: height * 0.03, // Increased spacing between elements
  },
  orText: {
    fontSize: width * 0.04,
    color: '#555',
    marginBottom: height * 0.015,
  },
  phoneLoginText: {
    fontSize: width * 0.04,
    color: 'blue',
    cursor:'pointer',
    textDecorationLine: 'underline',
    marginBottom: height * 0.04, // Increased gap below "Login via Phone Number"
  },
  skipText: {
    fontSize: width * 0.04,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
