import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Pressable,
  FlatList,
  Image,
  ScrollView,
  Keyboard
} from 'react-native';
import { Switch } from 'react-native-switch';
import {PERMISSIONS, request} from 'react-native-permissions';
import SvgBack from '../icons/SvgBack';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import React, { useState, useRef, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { API_KEY } from '../uikit/UikitUtils/constants';
import Button from '../uikit/Button/Button';
import SvgRightArrow from '../icons/SvgRightArrow';
import SvgGps from '../icons/SvgGps';
import axios from 'axios';
import { BLACK, BORDER_COLOR, PRIMARY } from '../uikit/UikitUtils/colors';
import { inputTextStyles } from '../uikit/InputText/InputTextStyles';
import Flex from '../uikit/Flex/Flex';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto'; // Important!
import Loader from '../uikit/Loader/Loader';

import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

const signalRUrl = 'https://uat.zippyrideuserapi.projectpulse360.com/riderhub';




const { width, height } = Dimensions.get('window');
const userIcon = require('../assets/human.jpg');
const carIcon = require('../assets/car-white.png'); 
const vechil = require('../assets/vechial.png'); 

const BOX_WIDTH = width * 0.9;
const BOX_HEIGHT = height * 0.4;
const MARGIN_TOP = height * 0.03;
const INPUT_WIDTH = width * 0.91;
const INPUT_HEIGHT = height * 0.05;
const GOOGLE_MAPS_APIKEY = 'AIzaSyDyIPNKYpe9zG_JlEEhl070cC28N0q4qbc';
const INPUT_WIDTH1 =width * 0.91;
const Index = () => {
  const navigation = useNavigation();
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [isOriginExpanded, setIsOriginExpanded] = useState(false);
  const [isDestinationExpanded, setIsDestinationExpanded] = useState(false);
  const mapRef = useRef(null);
  const [isAmountEnabled, setIsAmountEnabled] = useState(false);
  const [isLadyDriverEnabled, setIsLadyDriverEnabled] = useState(false);
  const [selectedCar, setSelectedCar] = useState('');
  const scrollViewRef = useRef(null);
  const [riders, setRiders] = useState([]);

  const carOptions = [
    { id: "1", type: "EV", image: require("../assets/ev.png") },
    { id: "2", type: "SUV", image: require("../assets/suv.png") },
    { id: "3", type: "HATCHBACK", image: require("../assets/hatchback.png") },
    { id: "4", type: "SEDAN", image: require("../assets/sedan.png") },
  ];

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

  const [userLocation, setUserLocation] = useState({ lat: 12.787926, lng: 79.662123 });
  const [showFemaleOnly, setShowFemaleOnly] = useState(false);
  const [rangeFilter, setRangeFilter] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const signalRUrl = 'https://uat.zippyrideuserapi.projectpulse360.com/riderhub';
  const socketUrl = 'wss://www.uat.zippyrideuserapi.projectpulse360.com/riderhub'; 
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(signalRUrl)
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    const startConnection = async () => {
      setIsLoading(true)
      try {
        await connection.start();
        console.log('✅ SignalR Connected');

        // Server calling this? You need this listener
        connection.on('locationupdated', (data) => {
          console.log('📍 Location updated by server:', data);
          setRiders(data)
    
        });

        connection.on('ReceiveNearestRiders', (riders) => {
          console.log('📥 Nearest riders:', riders);
        });

        // Sample method if 'GetNearestRiders' isn't defined:
        await connection.invoke('UpdateLocation', 12.787926, 79.662123 , false, 10);

      } catch (err) {
        console.error('❌ SignalR Connection Error:', err);
      }
      setIsLoading(false)
    };

    startConnection();

    return () => {
      connection.stop();
    };
  }, []);

  // Handle keyboard appearance to scroll to inputs
  useEffect(() => {
    // getriders()
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        // Scroll to the focused input
        if (isOriginExpanded || isDestinationExpanded) {
          scrollViewRef.current?.scrollTo({
            y: e.endCoordinates.height,
            animated: true
          });
        }
      }
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, [isOriginExpanded, isDestinationExpanded]);
  const currentLocation = {
    latitude: 12.787926,
    longitude:79.662123
  };

  const getriders = async () =>{
    const value = await axios.get(`https://uat.zippyrideuserapi.projectpulse360.com/api/riders/nearby?latitude=${12.787926}&longitude=${79.662123}&radius=${10}`)
    .then((res)=>{
     //   setRiders(res.data)
     
    })
}


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
        {isLoading && <Loader />}
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <SvgBack height={20} width={20} />
        </TouchableOpacity>

        <MapView
          ref={mapRef}
          style={styles.mapBox}
          initialRegion={{
            latitude: 12.787926,
            longitude:  79.662123,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
         
    {/* <Marker title="Current Location">
      <View style={styles.blueDotWrapper}>
        <View style={styles.blueDot} />
      </View>
    </Marker>
   */}
   {currentLocation && (
  <Marker coordinate={currentLocation} title="Current Location">
    <View style={styles.blueDotWrapper}>
      <View style={styles.blueDot} />
    </View>
  </Marker>
)}
    {riders.map((rider) => (
  <Marker
    key={rider.riderId}
    coordinate={{ latitude: rider.latitude, longitude: rider.longitude }}
  >
    {/* <View
      style={[
        styles.marker,
        { backgroundColor: rider.isFemale ? 'pink' : 'green' }
      ]}
    /> */}
                  <Image source={vechil} style={{ width: 30, height: 30 }} />

  </Marker>
))}
         {origin && (
            <Marker coordinate={origin} title="Pickup Location">
              <Image source={userIcon} style={{ width: 40, height: 40 }} />
            </Marker>
          )} 
          
          {destination && (
            <Marker coordinate={destination} title="Drop Location">
              <Image source={carIcon} style={{ width: 50, height: 50 }} />
            </Marker>
          )}
          
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

        <View style={{height: height * 0.10}}>
          <FlatList
            data={carOptions}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.carOption,
                  selectedCar === item.id && styles.selectedCar,
                ]}
                onPress={() => {
                  setSelectedCar(item.id);
                  console.log(item.id);
                }}
              >
                <Image source={item.image} style={styles.carImage} />
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.carSelection}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Current Location Input */}
             <View style={styles.inputWrapper(isOriginExpanded)}>
          <Image source={require('../assets/live.png')} style={styles.imageStyle} />
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
              placeholderTextColor: 'black',
            }}
            query={{ key: GOOGLE_MAPS_APIKEY, language: 'en' }}
            fetchDetails={true}
            renderRow={(data) => <Text style={{ color: 'black' }}>{data.description}</Text>}
            renderRightButton={() => (
              <Pressable>
                <Flex center middle overrideStyle={styles.svgGps}>
                  <SvgGps fill={PRIMARY} />
                </Flex>
              </Pressable>
            )}
          />
        </View>
        
        
           
        <View style={styles.lineContainer}>
  <Image source={require('../assets/Line1.png')} style={styles.imageStyle1} />
</View>
          <View style={styles.inputWrapper(isDestinationExpanded)}>
          <Image source={require('../assets/locationicon.png')} style={styles.imageStyle} />
        
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
                    placeholderTextColor:'black'
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
          <Text style={[styles.label, isAmountEnabled && styles.labelActive]}>
            Add request amount
          </Text>
          <Switch
            value={isAmountEnabled}
            onValueChange={(val) => setIsAmountEnabled(val)}
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
            renderInsideCircle={() => null}
            switchLeftPx={3} 
            switchRightPx={3} 
            switchWidthMultiplier={2}
          />
        </View>
        
        <View style={styles.switchContainer}>
          <Text style={[styles.label, isLadyDriverEnabled && styles.labelActive]}>
            Lady drivers Only
          </Text>
          <Switch
            value={isLadyDriverEnabled}
            onValueChange={(val) => setIsLadyDriverEnabled(val)}
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
            renderInsideCircle={() => null}
            switchLeftPx={3} 
            switchRightPx={3} 
            switchWidthMultiplier={2}
          />
        </View>

        <Button onClick={() => navigation.navigate("OTPVerificationScreen")} width={120}>
          Continue
        </Button>
        
        {/* Add some padding at the bottom for better scrolling */}
        <View style={{ height: 50 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 20,
  },
  lineContainer: {
    alignSelf: 'flex-start',
    marginLeft: width * 0.07,
    marginBottom: 0,
  },
  imageStyle1: {
    height: height * 0.00, // 2% of screen height
    resizeMode: 'contain', // or whatever width works for your design
  },
  marker: {
    width: 20,
    height: 20,
    borderRadius: 10, // Half of width/height for a perfect circle
    borderWidth: 2,
    borderColor: '#fff',
  },
  imageStyle: {

    width: 24, // Adjust size as needed
    height: 24,
    marginRight: 10, // Adds spacing between image and input field
    resizeMode: 'contain',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E8D66A',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    top: 10,
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
    // width: INPUT_WIDTH,
    // marginTop: 30,
    // height: isExpanded ? 180 : 40,
    flexDirection: 'row', // Ensures items are placed in a row
    alignItems: 'center', // Aligns items vertically
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 0,

    paddingVertical: isExpanded ? 10 : 5,
    //width: '100%',
    //elevation: 3,
      width: INPUT_WIDTH,
      marginTop: 30,
  
      height: isExpanded ? 180 : 40,
  }),
  blueDotWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  
  blueDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4285F4', // Google Maps blue
    borderWidth: 3,
    borderColor: '#ffffff',
    shadowColor: '#4285F4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 5, // for Android
  },
  imageStyle1:{
    marginRight: -301,
    height:30 // Adds spacing between image and input field
  
  },
  inputStyles: {
    width: width * 0.81,
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
    width: width * 0.85,
    paddingVertical: 10,
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  labelActive: {
    color: '#000',
  },
  text: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  carSelection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  carOption: {
    width: 80, 
    height: 70, 
    alignItems: "center",
    backgroundColor: "white",
    padding: width * 0.02,
    borderRadius: 10,
  },
  selectedCar: {
    backgroundColor: "#E8D66A",
  },
  carImage: {
    width: width * 0.18,
    height: width * 0.1,
    resizeMode: "contain",
  },
  backButton: {
    position: 'absolute',
    top: height * 0.05,
    left: width * 0.05,
    zIndex: 10,
    padding: 10,
  },
});