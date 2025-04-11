import { StyleSheet,Pressable, ScrollView
  ,TextInput, Image,Text,Dimensions,Platform,
   View ,KeyboardAvoidingView, Keyboard,
   TouchableOpacity} from 'react-native'
import React,{useState,useRef,useEffect} from 'react'
import SvgBack from '../../icons/SvgBack'
import { useNavigation, } from '@react-navigation/native'
const { width, height } = Dimensions.get("window");
import SvgGps from '../../icons/SvgGps';

import InputText from '../../uikit/InputText/InputText';
import { BLACK, BORDER_COLOR, PRIMARY } from '../../uikit/UikitUtils/colors';
import { inputTextStyles } from '../uikit/InputText/InputTextStyles';
import Flex from '../../uikit/Flex/Flex';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import 'react-native-get-random-values';
import Button from '../../uikit/Button/Button';

const BOX_WIDTH = width * 0.9;
const BOX_HEIGHT = height * 0.3;
const MARGIN_TOP = height * 0.03;
const INPUT_WIDTH = width * 0.81;
const INPUT_HEIGHT = height * 0.05
const GOOGLE_MAPS_APIKEY = 'AIzaSyDyIPNKYpe9zG_JlEEhl070cC28N0q4qbc'; // Replace with your API key

const Citytocity = () => {
  const navigation =useNavigation()
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [isOriginExpanded, setIsOriginExpanded] = useState(false);
  const [isDestinationExpanded, setIsDestinationExpanded] = useState(false);
  const mapRef = useRef(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const scrollViewRef = useRef(null);

  useEffect(() => {
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

  return (
    <KeyboardAvoidingView
         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         style={styles.container}
       >
     
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <SvgBack height={20} width={20} />
                <Text style={styles.backText}>City to City</Text>
            </TouchableOpacity>
                <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
              >
            <View style={styles.inputWrapper(isOriginExpanded)}>
  <Image source={require('../../assets/live.png')} style={styles.imageStyle} />
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


       <View style={{marginLeft:9}}>
       <Image source={require('../../assets/Line1.png')} style={styles.imageStyle1} />

    </View>
  <View style={styles.inputWrapper(isDestinationExpanded)}>
  <Image source={require('../../assets/locationicon.png')} style={styles.imageStyle} />

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
     
      <View style={styles.inputContainer}>
          {/* Email Input */}
          <Text style={styles.label}> When</Text>
          <View style={styles.inputWrapperINPUT}>
           
            <InputText
                        name="Now"
                      
                        placeholder="Now"
                      />
          </View>

          {/* Password Input */}
          <Text style={styles.label}> No of Passengers</Text>
          <View style={styles.inputWrapperINPUT}>
          
             <InputText
                        name="Now"
                      types='number'
                        placeholder="5"
                      />
           
          </View>
    {/* Password Input */}
    <Text style={styles.label}>Amount Request</Text>
          <View style={styles.inputWrapperINPUT}>
           
           
           <InputText
                        name="Now"
                      
                        placeholder="500"
                      />
          </View>
          <Text style={styles.label}>Comments

          </Text>
          <View style={styles.inputWrapperINPUT}>
             <InputText
                             overrideStyle={{textAlignVertical: 'top'}}
                             height={130}
                             numberOfLines={30}
                             multiline
                             maxLength={4000}
                             actionLeftStyle={{left: -4, top: 0}}
                            
                           
                             placeholder="Comments *"
                             name={'address'}
                           
                           />
           
          </View>

        </View>
        <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={()=> navigation.navigate('RiderVerification')} style={styles.continueButton}>
                    <Text style={styles.continueText}>Continue</Text>
                </TouchableOpacity>
               
                <TouchableOpacity style={styles.cancelButton}>
                    <Text style={styles.cancelText}>Cancel Ride</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Citytocity

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingHorizontal: width * 0.05,
        paddingTop: height * 0.07,
      },
     
      imageStyle: {
        width: 24, // Adjust size as needed
        height: 24,
        marginRight: 10, // Adds spacing between image and input field
        resizeMode: 'contain',
      },
      imageStyle1:{
        marginRight: -301,
        height:30 // Adds spacing between image and input field
      
      },
      inputContainer: {
        width: '100%',
        top:20,
        backgroundColor:'#fafafa'
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
        color:'black'
    },
    inputWrapperINPUT: {
      top:10
    },
   
    inputWrapper: (isExpanded) => ({
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
    
        height: isExpanded ? 180 : 40, // Adjust height dynamically
      }),
       inputStyles: {
          width: INPUT_WIDTH,
          height: INPUT_HEIGHT,
          borderWidth: 1,
          borderColor: BORDER_COLOR,
          backgroundColor:'white',
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
        top: 5,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
      }, label: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
        marginBottom: 6,
        top:10
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: height * 0.07,
    },
    continueButton: {
        backgroundColor: '#E6D75A',
        padding: height * 0.01,
        height:45,
        borderRadius: 10,
        width: width * 0.3,
        alignItems: 'center',
    },
    continueText: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    cancelButton: {
        borderWidth: 1,
        borderColor: '#C32E2E',
        padding: height * 0.01,
        borderRadius: 10,
        height:45,
        width: width * 0.3,
        alignItems: 'center',
    },
    cancelText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#C32E2E',
    },

})