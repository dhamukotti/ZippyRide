import { StyleSheet,Pressable, ScrollView
  ,TextInput, Image,Text,Dimensions,Platform,
   View ,KeyboardAvoidingView, Keyboard,
   TouchableOpacity} from 'react-native'
import React,{useState,useRef,useEffect} from 'react'
import SvgBack from '../../icons/SvgBack'
import { useNavigation, } from '@react-navigation/native'
const { width, height } = Dimensions.get("window");
import Loader from '../../uikit/Loader/Loader';
import PushNotification from 'react-native-push-notification';

import SvgGps from '../../icons/SvgGps';
import { Dropdown } from 'react-native-element-dropdown';
import { useTripbookMutation } from '../../uikit/UikitUtils/Apiconfig';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputText from '../../uikit/InputText/InputText';
import { BLACK, BORDER_COLOR, PRIMARY } from '../../uikit/UikitUtils/colors';
import { inputTextStyles } from '../uikit/InputText/InputTextStyles';
import Flex from '../../uikit/Flex/Flex';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import 'react-native-get-random-values';
import Button from '../../uikit/Button/Button';
import { getItem } from '../../uikit/UikitUtils/mmkvStorage';


const BOX_WIDTH = width * 0.9;
const BOX_HEIGHT = height * 0.3;
const MARGIN_TOP = height * 0.03;
const INPUT_WIDTH = width * 0.81;
const INPUT_HEIGHT = height * 0.05
const GOOGLE_MAPS_APIKEY = 'AIzaSyDyIPNKYpe9zG_JlEEhl070cC28N0q4qbc'; // Replace with your API key

const Citytocity = ({route}) => {
  const navigation =useNavigation()
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [isOriginExpanded, setIsOriginExpanded] = useState(false);
  const [isDestinationExpanded, setIsDestinationExpanded] = useState(false);
  const mapRef = useRef(null);
    const [tripbooking, { isLoading: isSignupLoading }] = useTripbookMutation();
  const [loading, setloading] = useState(false)
  
  const [isEnabled, setIsEnabled] = useState(false);
  const scrollViewRef = useRef(null);
  const [carType, setCarType] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);
const [userid, setuserid] = useState('')
const [errors, setErrors] = useState({});
  const carTypeList = [
    { label: 'EV', value: 1,id:1 },
    { label: 'SUV', value: 2,id:2 },
    { label: 'Hatchback', value: 3,id:3 },
    { label: 'Sedan', value:4,id:4 },
  ];

  useEffect(() => {
   // console.log(route.params?.ridervalue,route.params?.currentLocation,'cyrr',route.params?.tolocation,'ridervalue')
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




 const useridvalue =getItem('userdata')
//console.log(useridvalue,'useridvalue')


const validate = () => {
  const newErrors = {};

  if (!origin

  ) {
    newErrors.origin = 'Pickup location is required';
  }

  if (!destination || destination === 0) {
    newErrors.destination = 'Please select a valid pickup location';
  }



 

  return newErrors;
};

const handleSubmit = async () => {
  setloading(true)
  // const validationErrors = validate();
  // setErrors(validationErrors); // Update the errors in the state

  // // If there are validation errors, don't proceed
  // if (Object.keys(validationErrors).length > 0) {
  //   return;
  // }

  const payload = {
    userId: useridvalue,
    pickupLocation: route.params?.currentLocation.description,
    pickupLatitude: route.params?.currentLocation.latitude,
    pickupLongitude: route.params?.currentLocation.longitude,
    dropLocation: route.params?.tolocation.description,
    dropLatitude:route.params?.tolocation.latitude,
    dropLongitude: route.params?.tolocation.longitude,
    vehId: 1,
    payBy: "Cash",
    riderId: route.params?.ridervalue
  };

  try {
    const response = await tripbooking(payload);
    console.log(response, 'response');
    setloading(false)
    if (response.error) {
      console.error('Trip Booking Error:', response.error);
    } else {
      // success logic here
      PushNotification.localNotification({
        channelId: "com.zippyride", // must match your created channel
        title: "Trip Booked!",
        message: "Your ride has been successfully booked.",
        playSound: true,
        soundName: "default",
      });
    }
  } catch (error) {
    console.error('Trip Booking Failed:', error);
  }
};


  return (
    <KeyboardAvoidingView
         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         style={styles.container}
       >
     
          
      {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <SvgBack height={20} width={20} />
                <Text style={styles.backText}>Book Your Trip</Text>
            </TouchableOpacity> */}
   {loading &&  <Loader /> }
<View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <SvgBack height={20} width={20} />
        <Text style={styles.backText}>Book Your Trip</Text>
      </TouchableOpacity>
    </View>



            <ScrollView
showsVerticalScrollIndicator={false}

                     contentContainerStyle={styles.scrollContainer}
                     keyboardShouldPersistTaps="handled"
                   >
                    <View style={styles.cardContainer}>
      <View style={styles.from}>
        <Image source={require('../../assets/live.png')} style={styles.imageStyle} />
        <Text style={styles.textStyle}>
          {route?.params?.currentLocation?.description}
        </Text>
      </View>

      <Image source={require('../../assets/Line1.png')} style={styles.imageStyle1} />

      <View style={styles.to}>
        <Image source={require('../../assets/locationicon.png')} style={styles.imageStyle} />
        <Text style={styles.textStyle}>
          {route?.params?.tolocation?.description}
        </Text>
      </View>
    </View>
            {/* <View style={styles.from}>
                <Image source={require('../../assets/live.png')} style={styles.imageStyle} />
              <Text style={{color:'black',fontWeight:'bold'}}>{route.params?.currentLocation.description}</Text>
             
              
                </View>

                <Image source={require('../../assets/Line1.png')} style={styles.imageStyle1} />


<View style={styles.to}>
  <Image source={require('../../assets/locationicon.png')} style={styles.imageStyle} />
  <Text style={{color:'black',fontWeight:'bold'}}>{route.params?.tolocation.description}</Text>

        
      </View>

       */}
   <View style={styles.inputContainer}>
    
          {/* <Text style={styles.label}> When</Text>

          <View style={styles.When}>

            <InputText
                        name="Now"
                      
                        placeholder="Now"
                      />
          </View> */}
          <View>
          <Text style={{top:height*0.02,color:'black',fontSize:14}}> Vehicle</Text>

         <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={carTypeList}
                // search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select item"
                searchPlaceholder="Search..."
              value={carType}
              onChange={(item) => {
             //   console.log(item.value)
                setCarType( item.value)}}
              renderItem={item => (
                <View style={styles.item}>
                  <Text style={styles.itemText}>{item.label}</Text>
                </View>
                 )}
              />
          </View>

          <Text style={styles.Passengerslabel}> No of Passengers</Text>

             <View style={styles.inputWrapperINPUT}>

                       <InputText
                                  name="Now"
                                types='number'
                                  placeholder="5"
                                />
                     
                    </View>
        
  <Text style={styles.requestamout}>Amount Request</Text>
          <View style={styles.amountrequest}>
           
           
           <InputText
                        name="Now"
                      
                        placeholder="500"
                      />
          </View>


        </View>
      
        <Text style={styles.commetlable}>Comments
        </Text>
     <View style={styles.commandinput}>
              <InputText
                              overrideStyle={{textAlignVertical: 'top'}}
                              height={130}
                              numberOfLines={20}
                              multiline
                              maxLength={3000}
                              actionLeftStyle={{left: -4, top: 0}}
                             
                            
                              placeholder="Comments *"
                              name={'address'}
                            
                            />
            
           </View>
             <View style={styles.buttonContainer}>
                           <TouchableOpacity 
                              onPress={handleSubmit}
                           style={styles.continueButton}>
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
    backgroundColor: "white",
    paddingHorizontal: width * 0.05,
  },
  
  cardContainer: {
    width: width * 0.9,
    padding: 15,
    borderRadius: 19,
    backgroundColor: 'whitesmoke',
    elevation: 4, // For Android
    shadowColor: '#000', // For iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignSelf: 'center',
    marginTop: 20,
  },
headerContainer: {
  paddingHorizontal: width * 0.01,
  paddingTop: Platform.OS === 'ios' ? height * 0.07 : height * 0.05,
  backgroundColor: 'white',
  zIndex: 1,
},
backButton: {
  flexDirection: 'row',
  alignItems: 'center',
},

backText: {
  marginLeft: 10,
  fontSize: 18,
  fontWeight: 'bold',
  color: 'black',
},

scrollContainer: {
  paddingHorizontal: width * 0.05,
  paddingBottom: height * 0.15,
  backgroundColor: 'white',
},
from: {
  flexDirection: 'row',
  alignItems: 'center',
},
to: {
  flexDirection: 'row',
  alignItems: 'center',
  top:5
},
imageStyle: {
  width: 24,
  height: 24,
  marginRight: 10,
  resizeMode: 'contain',
},
imageStyle1: {
  width: 2,
  height: 35,
  
marginLeft:width*0.021

},
textStyle: {
  color: 'black',
  fontWeight: 'bold',
  flexShrink: 1,
},
  inputStyles: {
    width: '100%',
    height: height * 0.055,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    backgroundColor: 'white',
    borderRadius: 4,
    color: BLACK,
    paddingHorizontal: 16,
    fontSize: width * 0.035,
  },
  inputContainer: {
    width: '100%',
    marginTop: height * 0.03,
  },
  label: {
    fontSize: width * 0.035,
    color: '#333',
    fontWeight: '500',
    marginBottom: height * 0.01,
  },
  When: {
    marginTop: height * 0.01,
  },
  dropdown: {
    marginTop: height * 0.025,
    height: height * 0.06,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: width * 0.035,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: width * 0.035,
    color: 'black',
  },
  iconStyle: {
    width: width * 0.05,
    height: width * 0.05,
  },
  inputSearchStyle: {
    fontSize: width * 0.035,
    color: 'black',
  },
  item: {
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.03,
  },
  itemText: {
    fontSize: width * 0.035,
    color: 'black',
  },
  Passengerslabel: {
    fontSize: width * 0.035,
    color: '#333',
    fontWeight: '500',
    marginTop: height * 0.03,
    marginBottom: height * 0.005,
  },
  inputWrapperINPUT: {
    marginTop: height * 0.01,
  },
  requestamout: {
    fontSize: width * 0.035,
    color: '#333',
    fontWeight: '500',
    marginTop: height * 0.03,
    marginBottom: height * 0.005,
  },
  amountrequest: {
    marginTop: height * 0.01,
  },
  commetlable: {
    fontSize: width * 0.035,
    color: '#333',
    fontWeight: '500',
    marginTop: height * 0.035,
    marginBottom: height * 0.01,
  },
  commandinput: {
    marginBottom: height * 0.01,
  },
  svgGps: {
    position: 'absolute',
    right: width * 0.03,
    top: height * 0.005,
    height: height * 0.05,
    width: height * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.01,
    marginBottom: height * 0.05,
  },
  continueButton: {
    backgroundColor: '#E6D75A',
    paddingVertical: height * 0.012,
    borderRadius: 10,
    width: width * 0.3,
    alignItems: 'center',
  },
  continueText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#C32E2E',
    paddingVertical: height * 0.012,
    borderRadius: 10,
    width: width * 0.3,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: '#C32E2E',
  },
});
