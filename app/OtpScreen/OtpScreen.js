import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, KeyboardAvoidingView } from "react-native";
import SvgBack from '../icons/SvgBack';
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
import { OtpInput } from "react-native-otp-entry";
const OTPVerificationScreen = () => {
const navigation = useNavigation()
  const [timer, setTimer] = useState(30);
  const [otp, setOtp] = useState("");
  return (
    <KeyboardAvoidingView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                   <SvgBack height={20} width={20} />
                 </TouchableOpacity>

      {/* Icon */}
      <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
        


          <Image
          source={require('../assets/optverfi.png')}
         
          />
                  {/* <Image source={require('../assets/image1.png')} style={styles.image} /> */}
          
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>Enter Verification Code</Text>
      <Text style={styles.subtitle}>We've sent a verification code to</Text>
      <Text style={styles.phoneNumber}>+91-***** 43210</Text>



      <OtpInput
        numberOfDigits={6}
        focusColor="black"
        onTextChange={(text) => setOtp(text)}
        onFilled={(text) => console.log("OTP Entered:", text)}
        theme={{
          pinCodeTextStyle: styles.otpText,
          pinCodeContainerStyle: styles.otpContainer,
          focusedPinCodeContainerStyle: styles.otpFocused,
        }}
      />
      {/* OTP Input */}
      {/* <OTPInputView
        style={styles.otpContainer}
        pinCount={6}
        autoFocusOnLoad
        codeInputFieldStyle={styles.otpBox}
      /> */}
       {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <OTPInputView
        style={{ width: '80%', height: 200 }}
        pinCount={6}
        autoFocusOnLoad
        codeInputFieldStyle={{
          width: 40,
          height: 45,
          borderWidth: 1,
          borderColor: '#000',
          color: '#000',
          fontSize: 20,
        }}
        onCodeFilled={(code) => console.log(`Code is ${code}`)}
      />
    </View> */}


      {/* Resend Timer */}
      <Text style={styles.resendText}>
        Resend code in <Text style={styles.timerText}>00 : {timer}</Text>
      </Text>

      {/* Resend Option */}
      <TouchableOpacity>
        <Text style={styles.resendCodeText}>Resend code ?</Text>
      </TouchableOpacity>

      {/* Change Number */}
      <TouchableOpacity onPress={()=>navigation.navigate('CityToCityScreen')}>
        <Text style={styles.changeNumberText}>Change Number</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.07,
  },
  backButton: {
    position: "absolute",
    top: height * 0.03,
    left: width * 0.05,
  },
  backText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  iconContainer: {
    alignItems: "center",
    marginVertical: height * 0.05,
  },
  iconCircle: {
    width: width * 0.25,
    height: width * 0.25,
    backgroundColor: "#F9F1C6",
    borderRadius: width * 0.125,
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontSize: 30,
    color: "#E6B800",
  },
  title: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
  subtitle: {
    fontSize: width * 0.035,
    textAlign: "center",
    color: "#888",
    marginTop: 5,
  },
  phoneNumber: {
    fontSize: width * 0.04,
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 5,
  },

  otpBox: {
    width: width * 0.12,
    height: width * 0.12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    fontSize: 20,
    textAlign: "center",
  },
  resendText: {
    textAlign: "center",
    color: "#888",
    fontSize: width * 0.035,
    marginTop: height * 0.02,
  },
  timerText: {
    color: "red",
    fontWeight: "bold",
  },
  resendCodeText: {
    textAlign: "center",
    fontSize: width * 0.035,
    marginTop: height * 0.02,
    color: "#888",
  },
  changeNumberText: {
    textAlign: "center",
    fontSize: width * 0.04,
    color: "green",
    fontWeight: "bold",
    marginTop: height * 0.02,
  },
  otpContainer: {
    width: width * 0.11,
    height: width * 0.11,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    textAlign: "center",
  },
  otpFocused: {
    borderColor: "black",
  },
  otpText: {
    fontSize: 20,
    textAlign: "center",
    color:'black'
  },
});

export default OTPVerificationScreen;
