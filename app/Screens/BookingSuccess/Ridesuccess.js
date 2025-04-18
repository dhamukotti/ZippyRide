import React from "react";
import { View, Text,ImageBackground, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import QRCode from "react-native-qrcode-svg";
import SvgBack from '../../icons/SvgBack';
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
const isSmallScreen = width < 380;
const Ridesuccess = ({route}) => {
      const navigation = useNavigation()
      console.log(route.params.value,'value')
  return (
    <View style={styles.container}>
      {/* Header */}
          <TouchableOpacity  style={styles.backButton} onPress={() => navigation.goBack()}>
              <SvgBack height={20} width={20} />
              <Text style={styles.header}>Details</Text>
              
            </TouchableOpacity>

      {/* Ride Info */}
                  <View style={styles.cardContainer}>
         <View style={styles.from}>
           <Image source={require('../../assets/live.png')} style={styles.imageStyle} />
           <Text style={styles.textStyle}>
             Chennai
           </Text>
         </View>
   
         <Image source={require('../../assets/Line1.png')} style={styles.imageStyle1} />
   
         <View style={styles.to}>
           <Image source={require('../../assets/locationicon.png')} style={styles.imageStyle} />
           <Text style={styles.textStyle}>
            Ayyangarkulam
           </Text>
         </View>
       </View>

      <View >
     



      {/* Button */}
      <TouchableOpacity onPress={()=> navigation.navigate('Payment')} style={styles.button}>
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
      paddingTop: height * 0.08,
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
    from: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    header:{
      color:'black',
      fontSize:17,
      marginLeft:width*0.02,
      fontWeight:'bold'
    },
    to: {
      flexDirection: 'row',
      alignItems: 'center',
      top:5
    },
    backButton: {
      position: 'absolute',
      top: height * 0.03,
      left: width * 0.02,
      flexDirection:'row',
      zIndex: 10,
      padding: 10,
    },
    textStyle: {
      color: 'black',
      fontWeight: 'bold',
      flexShrink: 1,
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
      backgroundColor: "gray",
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
  