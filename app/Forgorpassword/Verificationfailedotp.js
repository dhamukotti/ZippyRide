import React,{useState,useEffect} from "react";
import { View, Text, Image,ImageBackground, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SvgBack from "../icons/SvgBack";
const { width, height } = Dimensions.get("window");
import { useForgotPasswordOTPMutation } from '../uikit/UikitUtils/Apiconfig';
import Toast from 'react-native-toast-message';
import Loader from '../uikit/Loader/Loader';

const IncorrectCodeScreen = ({route}) => {
  const navigation = useNavigation();
    const [email, setemail] = useState('')
    const [otp, setotp] = useState('')
      const [ForgotMutation] = useForgotPasswordOTPMutation();
      const [isLoading, setIsLoading] = useState(false);
    
useEffect(() => {
    if (route.params?.otp) { // Ensures it runs only if mail is passed
        setotp(route.params.otp);
    }
    if (route.params?.email) { // Ensures it runs only if mail is passed
      setemail(route.params.email);
  }
}, [route.params?.otp,route.params.email]); 

const handleForgotPassword = async () => {
   
  
    setIsLoading(true);
    try {
      const payload = { Email: email, OtpType: 'FP' };
      const response = await ForgotMutation(payload);
      setIsLoading(false);
  
      if (response.error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Invalid OTP',
          position: 'top',
        });
      } else {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: `${email} OTP Sent Successfully`,
          position: 'top',
        });
        setTimeout(() => {
          navigation.navigate('ForgotPasswordVerifyScreen', { mail: email });
        }, 2000);
      }
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };
  

   const toastConfig = {
      success: ({ text1, text2 }) => (
        <View style={{backgroundColor:'#F5F6F8',padding:10,borderRadius:20,width:'80%', alignSelf: 'center', // Align to the right
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

  return (
    // <View style={styles.container}>
          <ImageBackground 
            source={require('../assets/frame.jpeg')}
             style={styles.container} >
      {/* Back Button */}

      <Toast   config={toastConfig} ref={(ref) => Toast.setRef(ref)} position="top" />
      {isLoading &&  <Loader /> }



      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <SvgBack height={20} width={20} />
      </TouchableOpacity>

      {/* Warning Icon */}
      <View style={styles.iconContainer}>
        <Image source={require("../assets/alet.png")} style={styles.warningIcon} />
      </View>

      {/* Error Message */}
      <Text style={styles.errorText}>Incorrect Code</Text>
      <Text style={styles.subText}>The Code you entered doesn’t match the one we sent</Text>

      {/* Resend Code Button */}
      <TouchableOpacity onPress={handleForgotPassword} style={styles.resendButton}>
        <Text style={styles.resendText}>Resend Code</Text>
      </TouchableOpacity>
      </ImageBackground>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: width * 0.05, // 5% of screen width
  },
  backButton: {
    position: "absolute",
    top: height * 0.09, // 5% from top
    left: width * 0.05, // 5% from left
  },
  backArrow: {
    fontSize: width * 0.06, // 6% of screen width
    color: "#000",
  },
  iconContainer: {
    backgroundColor: "rgba(255, 99, 99, 0.2)",
    borderRadius: 100,
    width: width * 0.3, // 30% of screen width
    height: width * 0.3, // Maintain circle shape
    alignItems: "center",
    justifyContent: "center",
    marginBottom: height * 0.03, // 3% of screen height
  },
  warningIcon: {
     width: width * 0.30, // 15% of screen width
     height: width * 0.30, // Maintain aspect ratio
    // tintColor: "#FF4D4D",\
  },
  errorText: {
    fontSize: width * 0.05, // 5% of screen width
    fontWeight: "bold",
    color: "#000",
  },
  subText: {
    fontSize: width * 0.04, // 4% of screen width
    color: "#999",
    textAlign: "center",
    marginHorizontal: width * 0.05, // 5% of screen width
    marginTop: height * 0.01, // 1% of screen height
  },
  resendButton: {
    backgroundColor: "#E7D66F",
    width: width * 0.8, // 80% of screen width
    paddingVertical: height * 0.02, // 2% of screen height
    borderRadius: width * 0.02, // 2% of screen width
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.05, // 5% of screen height
  },
  resendText: {
    fontSize: width * 0.045, // 4.5% of screen width
    fontWeight: "bold",
    color: "#000",
  },
};

export default IncorrectCodeScreen;
