import { StyleSheet, Text, TouchableOpacity,Keyboard,Alert,Pressable,Image, View,Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import Loader from '../uikit/Loader/Loader';
import { OtpInput } from 'react-native-otp-entry';
import SvgBack from '../icons/SvgBack';
import Button from '../uikit/Button/Button'
import { useVerifyotpMutation } from '../uikit/UikitUtils/Apiconfig';
import { useRoute } from "@react-navigation/native";
import { THIS_FIELD_REQUIRED } from '../uikit/UikitUtils/constants';
import { isEmpty } from '../uikit/UikitUtils/validators';
import { PRIMARY } from '../uikit/UikitUtils/colors';

const { width, height } = Dimensions.get('window');

import * as Yup from 'yup';
const Forgotpasswordverifyscreen = ({ route }) => {
const [emailvalue, setemailvalue] = useState("")
   
// setemailvalue(route.params.mail)

useEffect(() => {
    if (route.params?.mail) { // Ensures it runs only if mail is passed
        setemailvalue(route.params.mail);
    }
  }, [route.params?.mail]); 



const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [veriMutton] = useVerifyotpMutation();
  const handleResend = () => {
    navigation.navigate('CreatePasswordScreen');
};

const handleSubmit = async () => {
    if (!otp) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Email and OTP are required",
        position: "top",
      });
      return;
    }

    setIsLoading(true);
    try {
      const payload = { Email: emailvalue, OtpType: "FP", otp };
      console.log("Payload:", payload);

      const response = await veriMutton(payload); // Assuming veriMutton is an API function
      console.log("Response:", response);

      setIsLoading(false);
      if (response.data.message == "Invalid OTP") {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Invalid Otp",
          position: "top",
        });
      } else {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "OTP Verified Successfully",
          position: "top",
        });

        setTimeout(() => {
          navigation.navigate("CreatePasswordScreen",{otp:otp,email:emailvalue});
        }, 1000);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
      setOtp('')
    }
  };
  


  const toastConfig = {
    success: ({ text1, text2 }) => (
      <View style={{backgroundColor:'#fafafa',padding:10,borderRadius:20,width:'80%', alignSelf: 'center', // Align to the right
        marginTop: 50, }}>
      <Text style={{ color: 'green',
    fontWeight: 'bold',
    fontSize: 16,}}>{text1}</Text>
        <Text style={{ color: 'black',
    fontWeight: 'bold',
    fontSize: 16,}}>{text2}</Text>
      </View>
    ),
    error: ({ text1, text2 }) => (
      <View style={{backgroundColor:'#F5F6F8',padding:10,borderRadius:10,width:'80%', alignSelf: 'center', // Align to the right
        marginTop: 50, }}>
        <Text style={{ color: 'red',
    fontWeight: 'bold',
    fontSize: 16,}}>{text1}</Text>
        <Text style={{ color: 'black',
    fontWeight: 'bold',
    fontSize: 16,}}>{text2}</Text>
      </View>
    ),
    customToast: ({ text1, text2 }) => (
      <View style={{backgroundColor:'#F5F6F8',padding:10,borderRadius:10,width:'80%', alignSelf: 'center', // Align to the right
        marginTop: 50, }}>
        <Text style={{ color: 'red',
    fontWeight: 'bold',
    fontSize: 16,}}>{text1}</Text>
        <Text style={{ color: 'black',
    fontWeight: 'bold',
    fontSize: 16,}}>{text2}</Text>
      </View>
    ),
  };



  const validatepopup =()=>{
    Alert.alert(
      "Confirmation", 
      "Are you sure you want to close this Forgot Password process?", 
      [
        {
          text: "Cancel",
          onPress: () => console.log(""),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => navigation.replace("Login"),
        },
      ],
      { cancelable: false }
    );
  }
  return (
    <View style={styles.container}>
       {isLoading && <Loader />}
     
       <Pressable style={styles.backButton} onPress={() => validatepopup()}>
               <SvgBack height={24} width={24} />
             </Pressable>
     
   <View style={{flex:1,justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',}}>
   <Toast   config={toastConfig} ref={(ref) => Toast.setRef(ref)} position="top" />

   <Image
          source={require('../assets/Otp.jpg')}
          style={styles.otpImage}
          resizeMode="contain"
        />

<Text bold size={24} color="black" style={styles.title}>
          Reset Password
        </Text>
        <Text color="gray" style={styles.description}>
          Enter the OTP sent to your email to reset your password.
        </Text>

        <View style={styles.otpWrapper}>
          <OtpInput
            numberOfDigits={6}
            focusColor="black"
            onTextChange={(text) => setOtp(text)}
            onFilled={(text) => console.log('OTP Entered:', text)}
            theme={{
              pinCodeTextStyle: styles.otpText,
              pinCodeContainerStyle: styles.otpContainer,
              focusedPinCodeContainerStyle: styles.otpFocused,
            }}
          />
        </View>

        <View style={styles.resendContainer}>
          <Text>I didn’t receive a code?</Text>
          <Pressable onPress={handleResend}>
            <Text bold color="theme"> Resend</Text>
          </Pressable>
        </View>

        <Button
          disabled={otp.length !== 6}
         onClick={() => { Keyboard.dismiss(); 

handleSubmit()       


}}
          style={styles.verifyButton}
        >
          Verify
        </Button>
   </View>
    </View>
  )
}

export default Forgotpasswordverifyscreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingHorizontal: 20,
    // backgroundColor: 'white',
  },
  backButton: {
    position: 'absolute',
    top: height * 0.06,
    left: width * 0.05,
    zIndex: 10,
  },
  otpImage: {
    height: height * 0.25,
    width: width * 0.6,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  description: {
    color: 'gray',
    textAlign: 'center',
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  otpWrapper: {
    width: width * 0.8, // 80% of scree3en width
    height: height * 0.08, // Dynamic height
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  otpContainer: {
    width: '12%', // Full width within the wrapper
  height:50,
  
  },
  otpText: {
    fontSize: width * 0.05, // Scales based on screen size
    fontWeight: 'bold',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  verifyButton: {
    width: '80%',
    marginTop: 10,
  },
})