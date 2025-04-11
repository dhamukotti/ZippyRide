import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const { height, width } = Dimensions.get('window');

const MapView = () => {
  const GOOGLE_MAPS_APIKEY = 'AIzaSyDyIPNKYpe9zG_JlEEhl070cC28N0q4qbc';
  const inputHeight = 50;
  const listMaxHeight = height * 0.4;

  const [selectedLabel, setSelectedLabel] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.wrapper}>
        {/* Google Places Input */}
        <GooglePlacesAutocomplete
          placeholder="Current Location"
          fetchDetails={true}
          onPress={(data, details = null) => {
            if (details?.geometry?.location) {
              const { lat, lng } = details.geometry.location;

              const shortLabel =
                data.description.length > 10
                  ? data.description.substring(0, 10) + '...'
                  : data.description;

              setSelectedLabel(shortLabel);

              console.log('Latitude:', lat);
              console.log('Longitude:', lng);
              console.log('Short Location Label:', shortLabel);
            }
          }}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'en',
          }}
          enablePoweredByContainer={false}
          styles={{
            container: {
              width: '100%',
              position: 'absolute',
              bottom: 0,
              zIndex: 10,
            },
            textInput: {
              height: inputHeight,
              backgroundColor: '#f2f2f2',
              paddingHorizontal: 10,
              borderRadius: 8,
              color: 'black',
              fontSize: 16,
            },
            listView: {
              position: 'absolute',
              bottom: inputHeight + 12,
              backgroundColor: 'white',
              maxHeight: listMaxHeight,
              width: width - 32,
              marginHorizontal: 16,
              borderRadius: 8,
              zIndex: 20,
              elevation: 5,
            },
            row: {
              padding: 12,
              borderBottomWidth: 1,
              borderBottomColor: '#eee',
            },
          }}
          renderRow={(data) => (
            <Text style={styles.suggestionText}>{data.description}</Text>
          )}
          textInputProps={{
            placeholderTextColor: 'black',
          }}
        />

        {/* Show Truncated Selected Label */}
        {selectedLabel !== '' && (
          <Text style={styles.selectedText}>Selected: {selectedLabel}</Text>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default MapView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  suggestionText: {
    fontSize: 15,
    color: 'black',
  },
  selectedText: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
  },
});
