import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Pressable,
  FlatList,Image
} from 'react-native';
import { Switch } from 'react-native-switch';
import {PERMISSIONS, request} from 'react-native-permissions';
import SvgBack from '../icons/SvgBack';
import { useNavigation } from '@react-navigation/native';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import React, { useState, useRef,useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { API_KEY } from '../uikit/UikitUtils/constants';
import Button from '../uikit/Button/Button';
import SvgRightArrow from '../icons/SvgRightArrow';
import SvgGps from '../icons/SvgGps';

import { BLACK, BORDER_COLOR, PRIMARY } from '../uikit/UikitUtils/colors';
import { inputTextStyles } from '../uikit/InputText/InputTextStyles';
import Flex from '../uikit/Flex/Flex';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import 'react-native-get-random-values';

const { width, height } = Dimensions.get('window');

const BOX_WIDTH = width * 0.9;
const BOX_HEIGHT = height * 0.3;
const MARGIN_TOP = height * 0.03;
const INPUT_WIDTH = width * 0.9;
const INPUT_HEIGHT = height * 0.05;
const GOOGLE_MAPS_APIKEY = 'AIzaSyDyIPNKYpe9zG_JlEEhl070cC28N0q4qbc'; // Replace with your API key

const Index = () => {
  const navigation =useNavigation()
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [isOriginExpanded, setIsOriginExpanded] = useState(false);
  const [isDestinationExpanded, setIsDestinationExpanded] = useState(false);
  const mapRef = useRef(null);
  const [isEnabled, setIsEnabled] = useState(false);

  const carCategories = [
    { id: "1", name: "EV", image: require("../assets/ev.png") },
    { id: "2", name: "SUV", image: require("../assets/suv.png") },
    { id: "3", name: "HATCHBACK", image: require("../assets/hatchback.png") },
    { id: "4", name: "SEDAN", image: require("../assets/sedan.png") },
  ];
  const itemWidth = width / 4.5;


  async function handleLocationPermission() {
    var res = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (res === 'granted') {
      navigation.push(routesPath.MAP_VIEW_SCREEN);
    } else if (res === 'blocked') {
      Alert.alert(
        'Permission',
        'Device location permission blocked. Enable the location permission manually',
        [
          {
            text: 'Cancel',
            onPress: () => {},
          },
          {
            text: 'Enable',
            onPress: () => {
              Linking.openSettings();
            },
          },
        ],
      );
    }
  }

  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <SvgBack height={20} width={20} />
              </TouchableOpacity>
      <MapView
        ref={mapRef}
        style={styles.mapBox}
        initialRegion={{
          latitude: 13.0827,
          longitude: 80.2707,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {origin && <Marker coordinate={origin} title="Pickup Location" />}
        {destination && <Marker coordinate={destination} title="Drop Location" />}
        {origin && destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={1.4}
            strokeColor="black"
            onReady={(result) => {
              mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
              });
            }}
          />
        )}
      </MapView>

      <TouchableOpacity style={styles.touch} activeOpacity={0.8}>
        <LinearGradient
          colors={['#F6EFA6', '#B8A224']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button}
        >
          <Text style={styles.text}>Pickup within 10 minutes?</Text>
          <SvgRightArrow width={12} height={12} fill="black" />
        </LinearGradient>
      </TouchableOpacity>

      {/* Current Location Input */}
      <View style={styles.inputWrapper(isOriginExpanded)}>
        <GooglePlacesAutocomplete
          placeholder="Current Location"
          onPress={(data, details = null) => {
            setOrigin({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            });
            setIsOriginExpanded(false); // Collapse when selection is made
          }}
          textInputProps={{
            onFocus: () => setIsOriginExpanded(true), // Expand when focused
            onBlur: () => setIsOriginExpanded(false), // Collapse when unfocused
            autoFocus: false,
            style: styles.inputStyles,
            placeholderTextColor: 'black', // <-- Set placeholder color

          }}
          query={{ key: GOOGLE_MAPS_APIKEY, language: 'en' }}
          fetchDetails={true}
          renderRow={(data) => <Text style={{color:'black'}}>{data.description}</Text>}
          renderRightButton={() => (
            <Pressable>
              <Flex center middle overrideStyle={styles.svgGps}>
                <SvgGps fill={PRIMARY} />
              </Flex>
            </Pressable>
          )}
        />
      </View>

      {/* Destination Input */}
      <View style={styles.inputWrapper(isDestinationExpanded)}>
        <GooglePlacesAutocomplete
          placeholder="Where?"
          onPress={(data, details = null) => {
            setDestination({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            });
            setIsDestinationExpanded(false); // Collapse when selection is made
          }}
          textInputProps={{
            onFocus: () => setIsDestinationExpanded(true), // Expand when focused
            onBlur: () => setIsDestinationExpanded(false), // Collapse when unfocused
            autoFocus: false,
            style: styles.inputStyles,
            placeholderTextColor: 'black', // <-- Set placeholder color

          }}
          query={{ key: GOOGLE_MAPS_APIKEY, language: 'en' }}
          fetchDetails={true}
          renderRow={(data) => <Text style={{color:'black'}}>{data.description}</Text>}
          renderRightButton={() => (
            <Pressable>
              <Flex center middle overrideStyle={styles.svgGps}>
                <SvgGps fill={PRIMARY} />
              </Flex>
            </Pressable>
          )}
        />
        
      </View>
  
      <View style={styles.switchContainer}>
  <Text style={[styles.label, isEnabled && styles.labelActive]}>
    Add request amount
  </Text>
  <Switch
    value={isEnabled}
    onValueChange={(val) => setIsEnabled(val)}
    disabled={false}
    activeText={''}
    inActiveText={''}
    circleSize={20}
    barHeight={25}
    circleBorderWidth={0}
    backgroundActive={'#4cd137'}
    backgroundInactive={'#dcdde1'}
    circleActiveColor={'#fff'}
    circleInActiveColor={'#fff'}
    changeValueImmediately={true}
    innerCircleStyle={{ alignItems: 'center', justifyContent: 'center' }}
    renderInsideCircle={() => null} // Custom inside content
    switchLeftPx={3} 
    switchRightPx={3} 
    switchWidthMultiplier={2}
  />
</View>
  
<View style={styles.switchContainer}>
  <Text style={[styles.label, isEnabled && styles.labelActive]}>
    Lady drivers Only
  </Text>
  <Switch
    value={isEnabled}
    onValueChange={(val) => setIsEnabled(val)}
    disabled={false}
    activeText={''}
    inActiveText={''}
    circleSize={20}
    barHeight={25}
    circleBorderWidth={0}
    backgroundActive={'#4cd137'}
    backgroundInactive={'#dcdde1'}
    circleActiveColor={'#fff'}
    circleInActiveColor={'#fff'}
    changeValueImmediately={true}
    innerCircleStyle={{ alignItems: 'center', justifyContent: 'center' }}
    renderInsideCircle={() => null} // Custom inside content
    switchLeftPx={3} 
    switchRightPx={3} 
    switchWidthMultiplier={2}
  />
</View>
{/* <TouchableOpacity style={styles.continuebutton} onPress={()=>navigation.navigate("OTPVerificationScreen")} activeOpacity={0.8}>
      <Text style={styles.text}>Continue</Text>
    </TouchableOpacity> */}

  <Button onClick={()=>navigation.navigate("OTPVerificationScreen")} width={120} >
              Continue
            </Button>
    </KeyboardAvoidingView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFF',
  },
  button: {
    backgroundColor: '#E8D66A',
    borderRadius: 10,
    paddingVertical: 12,
    top:10,
    color:'#E8D66A',
    width: '100%',
  },
  mapBox: {
    width: BOX_WIDTH,
    height: BOX_HEIGHT,
    marginTop: MARGIN_TOP,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#333',
  },
  inputWrapper: (isExpanded) => ({
    width: INPUT_WIDTH,
    marginTop: 30,
    height: isExpanded ? 180 : 40, // Adjust height dynamically
  }),
  inputStyles: {
    width: INPUT_WIDTH,
    height: INPUT_HEIGHT,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 4,
    color: 'black',
    paddingHorizontal: 16,
    fontSize: 14,
  },
  svgGps: {
    position: 'absolute',
    right: 10,
    top: 5,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touch: {
    alignSelf: 'center',
    width: INPUT_WIDTH,
    marginVertical: 10,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.85, // Responsive width
    paddingVertical: 10,
    marginTop: 20, // Adjusted margin
  },
  label: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  labelActive: {
    color: '#000',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  continuebutton: {
    width: width * 0.9,  // 90% of screen width
    height: width * 0.12, // Proportional height
    backgroundColor: '#E8D66A', // Exact yellow shade
    borderRadius: width * 0.1, // Rounded corners
    justifyContent: 'center',
    alignItems: 'center',
    top:40
  },
  text: {
    color: '#000', // Black text
    fontSize: width * 0.04, // Responsive font size
    fontWeight: 'bold',
  },





  flatlistcontainer: {
    justifyContent: "center",
    alignItems: "center",
   
  },
  item: {
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    margin: 5,
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  flattext: {
    marginTop: 5,
    fontSize: 10,
    fontWeight: "bold",
  },
  backButton: {
    position: 'absolute',
    top: height * 0.05,
    left: width * 0.05,
    zIndex: 10,
    padding: 10,
  },
});
