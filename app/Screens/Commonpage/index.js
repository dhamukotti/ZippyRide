import React,{useEffect} from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
// import { promptForEnableLocationIfNeeded } from 'react-native-android-location-enabler';
import {promptForEnableLocationIfNeeded} from 'react-native-android-location-enabler';
import SvgPhone from '../../icons/SvgPhone';
const WelcomeScreen = () => {
    const navigation = useNavigation()


useEffect(() => {
  requestLocationPermission()
}, [])
const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
console.log(typeof(isLoggedIn),'isLoggedIn')
 
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
        handleEnabledPressed();
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
      handleEnabledPressed()
    } else if (result === RESULTS.DENIED) {
      const requestResult = await request(permission);
      if (requestResult === RESULTS.GRANTED) {
        console.log('Location permission granted');
        handleEnabledPressed()
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

  requestAndroidNotificationPermission()


};
async function handleEnabledPressed() {
  if (Platform.OS === 'android') {
    try {
      const enableResult = await promptForEnableLocationIfNeeded();
      console.log('enableResult', enableResult);
      // The user has accepted to enable the location services
      // data can be :
      //  - "already-enabled" if the location services has been already enabled
      //  - "enabled" if user has clicked on OK button in the popup
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        // The user has not accepted to enable the location services or something went wrong during the process
        // "err" : { "code" : "ERR00|ERR01|ERR02|ERR03", "message" : "message"}
        // codes :
        //  - ERR00 : The user has clicked on Cancel button in the popup
        //  - ERR01 : If the Settings change are unavailable
        //  - ERR02 : If the popup has failed to open
        //  - ERR03 : Internal error
      }
    }
  }
}

const requestAndroidNotificationPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true; // permission is automatically granted on lower versions
};


    // const requestLocationPermission = async () => {
    //   if (Platform.OS === 'android') {
    //     try {
    //       const granted = await PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //         {
    //           title: 'Location Permission',
    //           message: 'This app needs access to your location.',
    //           buttonNeutral: 'Ask Me Later',
    //           buttonNegative: 'Cancel',
    //           buttonPositive: 'OK',
    //         }
    //       );
    //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //         console.log('Location permission granted');
    //         getCurrentLocation();
    //       } else {
    //         console.log('Location permission denied');
    //       }
    //     } catch (err) {
    //       console.warn(err);
    //     }
    //   } else if (Platform.OS === 'ios') {
    //     const permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
    //     const result = await check(permission);
    //     if (result === RESULTS.GRANTED) {
    //       console.log('Location permission granted');
    //       getCurrentLocation();
    //     } else if (result === RESULTS.DENIED) {
    //       const requestResult = await request(permission);
    //       if (requestResult === RESULTS.GRANTED) {
    //         console.log('Location permission granted');
    //         getCurrentLocation();
    //       } else {
    //         console.log('Location permission denied');
    //       }
    //     } else {
    //       console.log('Location permission denied');
    //     }
    //   }
    //   if (Platform.OS === 'android') {
    //     try {
    //       const cameraPermission = await PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.CAMERA,
    //         {
    //           title: 'Camera Permission',
    //           message: 'This app needs access to your camera.',
    //           buttonNeutral: 'Ask Me Later',
    //           buttonNegative: 'Cancel',
    //           buttonPositive: 'OK',
    //         }
    //       );
    
    //       const storagePermission = await PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    //         {
    //           title: 'Storage Permission',
    //           message: 'This app needs access to your storage to save files.',
    //           buttonNeutral: 'Ask Me Later',
    //           buttonNegative: 'Cancel',
    //           buttonPositive: 'OK',
    //         }
    //       );
    
    //       if (
    //         cameraPermission === PermissionsAndroid.RESULTS.GRANTED &&
    //         storagePermission === PermissionsAndroid.RESULTS.GRANTED
    //       ) {
    //         console.log('Camera and Storage permissions granted');
    //       } else {
    //         console.log('Camera or Storage permission denied');
    //       }
    //     } catch (err) {
    //       console.warn(err);
    //     }
    //   } else if (Platform.OS === 'ios') {
    //     const cameraStatus = await request(PERMISSIONS.IOS.CAMERA);
    //     const photoLibraryStatus = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    
    //     if (cameraStatus === RESULTS.GRANTED && photoLibraryStatus === RESULTS.GRANTED) {
    //       console.log('Camera and Photo Library permissions granted');
    //     } else {
    //       console.log('Camera or Photo Library permission denied');
    //     }
    //   }
    // };
  

  
    // const getCurrentLocation = () => {
    //   Geolocation.getCurrentPosition(
    //     (position) => {
    //       console.log(position);
    //     },
    //     (error) => {
    //       console.log(error.code, error.message);
    //     },
    //     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    //   );
    // };
  

    const getCurrentLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        console.warn('Location permission denied');
        return;
      }
    
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('Latitude:', latitude, 'Longitude:', longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        }
      );
    };
    
  return (
    <ImageBackground 
    source={require('../../assets/frame.jpeg')}
    
    style={styles.container}>
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
      {/* <TouchableOpacity   style={{cursor:"pointer"}}  onPress={getCurrentLocation}>
      <Text style={{ fontFamily: 'Times New Roman', fontSize: 18, fontWeight: '600',color :'#5B7FAD'}}>
      Login via Phone Number
    </Text>
          </TouchableOpacity> */}

<TouchableOpacity onPress={()=>navigation.navigate('Phonelogin')} style={styles.button}>
  <View style={{marginRight:10}}>
  <SvgPhone height={25} width={25} fill="black"  />
  </View>
      <Text style={styles.text}>Login with Phone</Text>
    </TouchableOpacity>

      {/* Skip */}
      <View style={styles.spacer} />
      <TouchableOpacity>
        <Text style={styles.skipText}>SKIP</Text>
      </TouchableOpacity>
    </ImageBackground>
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
  },button: {
    width: width * 0.60,
    height: width * 0.13 ,
    borderRadius:  12,
    borderWidth: 1.5,
    borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize:  18,
    fontWeight: '500',
    color: 'black',
  },
  signInButton: {
    width: '80%',
    backgroundColor: '#DFD46A', // Button color
    paddingVertical: height * 0.015,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: height * 0.021,
  },
  signInText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: 'black',
  },
  signUpButton: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
  
    
    

    paddingVertical: height * 0.015,
    borderRadius: 10,
    alignItems: 'center',
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
