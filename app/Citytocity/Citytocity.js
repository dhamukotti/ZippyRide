import { StyleSheet,Pressable,TextInput, Text,Dimensions, View ,KeyboardAvoidingView, TouchableOpacity} from 'react-native'
import React,{useState,useRef} from 'react'
import SvgBack from '../icons/SvgBack'
import { useNavigation, } from '@react-navigation/native'
const { width, height } = Dimensions.get("window");
import SvgGps from '../icons/SvgGps';


import { BLACK, BORDER_COLOR, PRIMARY } from '../uikit/UikitUtils/colors';
import { inputTextStyles } from '../uikit/InputText/InputTextStyles';
import Flex from '../uikit/Flex/Flex';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import 'react-native-get-random-values';

const BOX_WIDTH = width * 0.9;
const BOX_HEIGHT = height * 0.3;
const MARGIN_TOP = height * 0.03;
const INPUT_WIDTH = width * 0.9;
const INPUT_HEIGHT = height * 0.06
const GOOGLE_MAPS_APIKEY = 'AIzaSyDyIPNKYpe9zG_JlEEhl070cC28N0q4qbc'; // Replace with your API key

const Citytocity = () => {
  const navigation =useNavigation()
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [isOriginExpanded, setIsOriginExpanded] = useState(false);
  const [isDestinationExpanded, setIsDestinationExpanded] = useState(false);
  const mapRef = useRef(null);
  const [isEnabled, setIsEnabled] = useState(false);


  return (
    <KeyboardAvoidingView
    style={styles.container}
    >
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <SvgBack height={20} width={20} />
                <Text style={styles.backText}>City to City</Text>
            </TouchableOpacity>

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
            autoFocus: true,
            style: styles.inputStyles,
          }}
          query={{ key: GOOGLE_MAPS_APIKEY, language: 'en' }}
          fetchDetails={true}
          renderRow={(data) => <Text>{data.description}</Text>}
          renderRightButton={() => (
            <Pressable>
              <Flex center middle overrideStyle={styles.svgGps}>
                <SvgGps fill={PRIMARY} />
              </Flex>
            </Pressable>
          )}
        />
      </View>
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
            autoFocus: true,
            style: styles.inputStyles,
          }}
          query={{ key: GOOGLE_MAPS_APIKEY, language: 'en' }}
          fetchDetails={true}
          renderRow={(data) => <Text>{data.description}</Text>}
          renderRightButton={() => (
            <Pressable>
              <Flex center middle overrideStyle={styles.svgGps}>
                <SvgGps fill={PRIMARY} />
              </Flex>
            </Pressable>
          )}
        />
        
      </View>
      <View style={styles.inputContainer}>
          {/* Email Input */}
          <Text style={styles.label}> When</Text>
          <View style={styles.inputWrapperINPUT}>
            <TextInput
              style={styles.input}
              placeholder="Now"
              placeholderTextColor="#888"
            
            />
          </View>

          {/* Password Input */}
          <Text style={styles.label}> No of Passengers</Text>
          <View style={styles.inputWrapperINPUT}>
            <TextInput
              style={styles.input}
              placeholder="5"
              placeholderTextColor="#888"
             
            />
           
          </View>
    {/* Password Input */}
    <Text style={styles.label}>Amount Request</Text>
          <View style={styles.inputWrapperINPUT}>
            <TextInput
              style={styles.input}
              placeholder="Rs 500"
              placeholderTextColor="#888"
             
            />
           
          </View>
          <Text style={styles.label}>Comments

          </Text>
          <View style={styles.inputWrapperINPUT}>
            <TextInput
              style={styles.input}
              placeholder="Enter Comments"
              placeholderTextColor="#888"
             
            />
           
          </View>

        </View>
        <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.continueButton}>
                    <Text style={styles.continueText}>Continue</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton}>
                    <Text style={styles.cancelText}>Cancel Ride</Text>
                </TouchableOpacity>
            </View>
    </KeyboardAvoidingView>
  )
}

export default Citytocity

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F8F8F8",
        paddingHorizontal: width * 0.05,
        paddingTop: height * 0.07,
      },
      inputContainer: {
        width: '100%',
        top:30,
        backgroundColor:'#F8F8F8'
      },
      backButton: {
        flexDirection: 'row',
        position:'absolute',
        alignItems: 'center',
        top: height * 0.03,
        left: width * 0.03,
    },
    backText: {
        marginLeft: 10,
        fontSize: width * 0.05,
        fontWeight: 'bold',
    },
    inputWrapperINPUT: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 55,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#E0E0E0',
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
          backgroundColor:'#E8E8E8',
          borderRadius: 4,
          color: BLACK,
          paddingHorizontal: 16,
          fontSize: 14,
        },
        input: {
            flex: 1,
            fontSize: 16,
            color: '#F8F8F8',
          },
      svgGps: {
        position: 'absolute',
        right: 10,
        top: 10,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
      }, label: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
        marginBottom: 6,
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: height * 0.07,
    },
    continueButton: {
        backgroundColor: '#E6D75A',
        padding: height * 0.01,
        height:50,
        borderRadius: 10,
        width: width * 0.4,
        alignItems: 'center',
    },
    continueText: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
    },
    cancelButton: {
        borderWidth: 1,
        borderColor: '#C32E2E',
        padding: height * 0.01,
        borderRadius: 10,
        height:50,
        width: width * 0.4,
        alignItems: 'center',
    },
    cancelText: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        color: '#C32E2E',
    },

})