import React from "react";
import { View, Text,ImageBackground, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import QRCode from "react-native-qrcode-svg";
import SvgBack from '../icons/SvgBack';
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
const isSmallScreen = width < 380;
const Ridesuccess = () => {
      const navigation = useNavigation()
      
  return (
    <View style={styles.container}>
      {/* Header */}
          <TouchableOpacity  style={styles.backButton} onPress={() => navigation.goBack()}>
              <SvgBack height={20} width={20} />
              <Text style={styles.header}>Details</Text>
              
            </TouchableOpacity>

      {/* Ride Info */}
      <View style={styles.rideInfoContainer}>
        <View style={styles.rideDetails}>
          <Text style={styles.rideLive}>13 Apr 2025</Text>
          <View style={styles.iconContainer}>
      </View>

      {/* Name & Verification */}
      <View style={styles.textContainer}>
        <View style={styles.nameRow}>
        <Image source={require("../assets/Uservi.png")} style={styles.userIcon} />

          <Text style={styles.riderName}>Ashik</Text>
          <Image source={require("../assets/Vector.png")} style={styles.verificationIcon} />
        </View>
        <Text style={styles.riderDistance}>9.4 Kms</Text>
      </View>
        </View>

       
        <View style={styles.arrivalContainer}>
  <ImageBackground 
    source={require("../assets/success.png")} 
    style={styles.arrivalBackground} 
    resizeMode="contain"
  >
    <Text style={styles.arrivalText}>Ride Completed</Text>
  </ImageBackground>
</View>

        <View style={styles.fareContainer}>
          <Text style={styles.fare}>₹ 260.00</Text>
          <Image source={require("../assets/H.png")} style={styles.carIcon} />
          <Text style={styles.carType}>HATCHBACK</Text>
        </View>
      </View>

      {/* QR Code */}
      <View >
      <View style={styles.card}>
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>When</Text>
          <Text style={styles.value}>13 Mar 2025 · 05:23 PM</Text>

          <Text style={styles.label}>From</Text>
          <Text style={styles.value}>Pallavaram</Text>

          <Text style={styles.label}>To</Text>
          <Text style={styles.value}>Guindy</Text>

          <Text style={styles.label}>Distance</Text>
          <Text style={styles.value}>9.4 Kms</Text>

          <Text style={styles.label}>Duration</Text>
          <Text style={styles.value}>34 minutes</Text>

          <Text style={styles.label}>Status</Text>
          <Text style={styles.value}>Completed</Text>

          <Text style={styles.label}>Rider Name</Text>
          <Text style={styles.value}>Ashik</Text>

          <Text style={styles.label}>Ride ID</Text>
          <Text style={styles.value}>ZR45792095798873958</Text>

          <Text style={styles.label}>Rated</Text>
          <Text style={styles.value}>Yes</Text>

          <Text style={styles.label}>Ratings</Text>
          <Text style={styles.value}>4/5</Text>
        </View>

        <View style={styles.paymentContainer}>
          <Text style={styles.paymentText}>Fare: <Text style={styles.value}>260.00</Text></Text>
          <Text style={styles.paymentText}>Tip for Rider: <Text style={styles.value}>0.00</Text></Text>
          <Text style={styles.paymentText}>Total Fare: <Text style={styles.value}>260.00</Text></Text>
          <Text style={styles.paymentText}>Payment Status: <Text style={styles.value}>Completed</Text></Text>
          <Text style={styles.paymentText}>Payment Mode: <Text style={styles.value}>UPI Payment</Text></Text>
          <Text style={styles.paymentText}>Transaction ID: <Text style={styles.value}>DB9579887395845792</Text></Text>
          <Text style={styles.paymentText}>Invoice on Mail: <Text style={styles.value}>Yes</Text></Text>
        </View>
      </View>



      {/* Button */}
      <TouchableOpacity onPress={()=> navigation.navigate('PaymentScreen')} style={styles.button}>
        <Text style={styles.buttonText}>Authentication Done</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default Ridesuccess

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      alignItems: "center",
      paddingTop: height * 0.05,
    },
    backButton: {
      position: 'absolute',
      top: height * 0.03,
      left: width * 0.02,
      flexDirection:'row',
      zIndex: 10,
      padding: 10,
    },
    header: {
      fontSize: 18,
      fontWeight: "bold",
      color:'black',
      alignSelf: "flex-start",
      marginLeft: width * 0.02,
      marginTop:height*0.00
    },
    iconContainer: {
      backgroundColor: "#F4E77E",
      borderRadius: width * 0.1,
      padding: width * 0.02,
    
    },
    userIcon: {
      width: width * 0.07,
      height: width * 0.08,
      marginLeft: width*0.00,
      alignSelf:'flex-start'
    },
    textContainer: {
      marginLeft: width * 0.02,
      flexDirection: "column",
    },
    nameRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    riderName: {
      fontSize: width * 0.04,
      fontWeight: "bold",
      color: "#000",
    },
    verificationIcon: {
      width: width * 0.04,
      height: width * 0.04,
      marginLeft: width * 0.01,
    },
    riderDistance: {
      fontSize: 15,
      color: "#5A5A5A",
      marginTop: height * 0.002,
      marginLeft: width*0.05
    },
    rideInfoContainer: {
      width: width * 0.9,
      backgroundColor: "#F4E77E",
      borderRadius: 10,
      padding: width * 0.03,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: height * 0.07,
    },
    rideDetails: {
      flex: 1,
      fontSize:12,
      width:20
    },
    rideLive: {
      backgroundColor: "#B3A300",
      paddingHorizontal: width * 0.02,
      paddingVertical: height * 0.002,
      borderRadius: 9,
      width: width*0.29,
      color: "#fff",
      fontSize: 14,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
  
      marginTop: height * 0.006,
    },
    icon: {
      width: width * 0.05,
      height: width * 0.05,
      display:'flex',
      flexDirection:'row',
      marginRight: width * 0.02,
    },
   
    arrivalContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    arrivalBackground: {
      width: width * 0.3,  // Adjust width based on your design
      height: width * 0.2, // Adjust height accordingly
      justifyContent: "center",
      alignItems: "center",
    },
    arrivalText: {
      fontSize: 12,
      color: "#000",
      fontWeight: "bold",
      textAlign: "center",
    },
    fareContainer: {
      alignItems: "center",
      marginTop:height*0.04
    },
    fare: {
      fontSize: width * 0.045,
      fontWeight: "bold",
      color: "#000",
    },
    carIcon: {
      width: width * 0.08,
      height: height * 0.03,
      marginTop: height * 0.005,
    },
    carType: {
      fontSize: width * 0.035,
      color: "#000",
      marginTop: height * 0.005,
    },
    qrDescription: {
      fontSize: width * 0.035,
      color: "#A0A0A0",
      textAlign: "center",
      marginTop: height * 0.03,
      width: width * 0.8,
    },
    button: {
      width: width * 0.8,
      backgroundColor: "#F4E77E",
      paddingVertical: height * 0.02,
      borderRadius: 8,
      marginTop: height * 0.05,
      alignItems: "center",
    },
    buttonText: {
      fontSize: width * 0.045,
      fontWeight: "bold",
      color: "#000",
    },
    card: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        width: width * 0.9,
        elevation: 3,
      },
      detailsContainer: {
        marginBottom: 10,
      },
      label: {
        fontSize: isSmallScreen ? 12 : 14,
        color: "gray",
      },
      value: {
        fontSize: isSmallScreen ? 14 : 16,
        fontWeight: "bold",
        marginBottom: 10,
      },
      paymentContainer: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
      },
      paymentText: {
        fontSize: isSmallScreen ? 14 : 16,
        fontWeight: "bold",
        marginBottom: 5,
      },
    
  });
  