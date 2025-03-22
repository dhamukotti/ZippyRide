import React, { useState, useRef } from 'react';
import {
  View,  TouchableOpacity, StyleSheet, Switch, KeyboardAvoidingView, 
  Platform, TouchableWithoutFeedback, Keyboard, Dimensions, ScrollView
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import Svglocation from '../icons/SvgLocation';
import 'react-native-get-random-values'
import LinearGradient from 'react-native-linear-gradient';
import {BLACK, BORDER_COLOR, PRIMARY} from '../uikit/UikitUtils/colors';
import {inputTextStyles} from '../uikit/InputText/InputTextStyles';
import {routesPath} from '../routes/routesPath';
import Flex from '../uikit/Flex/Flex';
import Text from '../uikit/Text/Text';
import SvgGps from '../icons/SvgGps';
import 'react-native-get-random-values'
// Get screen dimensions
const { width, height } = Dimensions.get('window');
const wp = percentage => (width * percentage) / 100;
const hp = percentage => (height * percentage) / 100;

const GOOGLE_MAPS_APIKEY = 'AIzaSyDyIPNKYpe9zG_JlEEhl070cC28N0q4qbc'; // Replace with your API key

const RideBookingScreen = () => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [isRequestAmount, setIsRequestAmount] = useState(false);
  const [isLadyDriverOnly, setIsLadyDriverOnly] = useState(false);
  const mapRef = useRef(null);

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* Map Section */}
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: 13.0827,
              longitude: 80.2707,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}>
            {origin && <Marker coordinate={origin} title="Pickup Location" />}
            {destination && <Marker coordinate={destination} title="Drop Location" />}
            {origin && destination && (
              <MapViewDirections
                origin={origin}
                destination={destination}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={4}
                strokeColor="blue"
                onReady={result => {
                  mapRef.current.fitToCoordinates(result.coordinates, {
                    edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                  });
                }}
              />
            )}
          </MapView>

          {/* Ride ETA Section (Moved below the map) */}
          <View style={styles.rideInfoContainer}>
            <Text style={styles.rideInfoText}>Pickup within 10 minutes?</Text>
          </View>

          {/* Location Input Fields */}
          <View style={styles.inputWrapper}>
            <GooglePlacesAutocomplete
              placeholder="Current Location"
              onPress={(data, details = null) => {
                setOrigin({
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                });
              }}
              query={{ key: GOOGLE_MAPS_APIKEY, language: 'en' }}
              fetchDetails={true}
              styles={styles.input}
            />
          </View>

          <View style={styles.inputWrapper}>
            <GooglePlacesAutocomplete
              placeholder="Where?"
              onPress={(data, details = null) => {
                setDestination({
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                });
              }}
              query={{ key: GOOGLE_MAPS_APIKEY, language: 'en' }}
              fetchDetails={true}
              styles={styles.input}
            />
          </View>

          {/* Toggle Options */}
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleText}>Add request amount</Text>
            <Switch value={isRequestAmount} onValueChange={setIsRequestAmount} />
          </View>

          <View style={styles.toggleContainer}>
            <Text style={styles.toggleText}>Lady drivers only</Text>
            <Switch value={isLadyDriverOnly} onValueChange={setIsLadyDriverOnly} />
          </View>

          {/* Continue Button */}
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

// **📌 Updated Styles**
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  map: { flex: 1 },
  rideInfoContainer: {
    backgroundColor: '#FFD700',
    borderRadius: 10,
    padding: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp(5),
    marginVertical: hp(2),
  },
  rideInfoText: { fontSize: wp(4.5), fontWeight: 'bold' },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: hp(2),
    marginHorizontal: wp(5),
    marginTop: hp(2),
    borderRadius: 10,
  },
  input: {
    container: { flex: 1 },
    textInput: { backgroundColor: '#FFF', flex: 1, paddingHorizontal: wp(2) },
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(5),
    marginTop: hp(2),
    alignItems: 'center',
  },
  toggleText: { fontSize: wp(4), fontWeight: 'bold' },
  continueButton: {
    backgroundColor: '#FFD700',
    padding: hp(2),
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: wp(5),
    marginVertical: hp(3),
  },
  continueButtonText: { fontWeight: 'bold', fontSize: wp(4.5) },
});

export default RideBookingScreen;
