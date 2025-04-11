import React,{useEffect,useState} from "react";
import { View, Text, Image,ImageBackground, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SvgBack from "../../icons/SvgBack";
const { width, height } = Dimensions.get("window");

const VerificationSuccessScreen = ({route}) => {
  const navigation = useNavigation();
      const [email, setemail] = useState('')
      const [otp, setotp] = useState('')
  useEffect(() => {
      if (route.params?.otp) { // Ensures it runs only if mail is passed
          setotp(route.params.otp);
      }
      if (route.params?.email) { // Ensures it runs only if mail is passed
        setemail(route.params.email);
    }
    }, [route.params?.otp,route.params.email]); 
  
  const gotoupdatepassword =() =>{
    navigation.navigate("CreatePasswordScreen",{otp:otp,email:email});

  }
  return (
    // <View style={styles.container}>
             <ImageBackground 
                    source={require('../../assets/frame.jpeg')}
                     style={styles.container} >
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        {/* <Text style={styles.backArrow}>←</Text> */}
        <SvgBack height={20} width={20}/>
      </TouchableOpacity>

      {/* Success Icon */}
      <View style={styles.iconContainer}>
        <Image source={require("../../assets/success.png")} style={styles.successIcon} />
      </View>

      {/* Success Message */}
      <Text style={styles.successText}>Verification Successful</Text>
      <Text style={styles.subText}>
        Now you can update your password to travel with us further
      </Text>

      {/* Update Password Button */}
      <TouchableOpacity onPress={gotoupdatepassword} style={styles.updateButton}>
        <Text style={styles.updateText}>Update new Password</Text>
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
    backgroundColor: "rgba(144, 238, 144, 0.3)", // Light green background
    borderRadius: 100,
    width: width * 0.3, // 30% of screen width
    height: width * 0.3, // Keep it circular
    alignItems: "center",
    justifyContent: "center",
    marginBottom: height * 0.03, // 3% of screen height
  },
  successIcon: {
    width: width * 0.15, // 15% of screen width
    height: width * 0.15, // Keep aspect ratio
    tintColor: "#32CD32", // Green checkmark
  },
  successText: {
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
  updateButton: {
    backgroundColor: "#E7D66F",
    width: width * 0.8, // 80% of screen width
    paddingVertical: height * 0.02, // 2% of screen height
    borderRadius: width * 0.02, // 2% of screen width
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.05, // 5% of screen height
  },
  updateText: {
    fontSize: width * 0.045, // 4.5% of screen width
    fontWeight: "bold",
    color: "#000",
  },
};

export default VerificationSuccessScreen;
