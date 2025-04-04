import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import SvgBack from "../icons/SvgBack";
const { width, height } = Dimensions.get("window");
import { useNavigation } from "@react-navigation/native";
const PaymentScreen = () => {
    const navigation = useNavigation()
  return (
    <View style={styles.container}>
      {/* Header */}
       <TouchableOpacity  style={styles.backButton} onPress={() => navigation.goBack()}>
                    <SvgBack height={20} width={20} />
                    <Text style={styles.header}>Booking Successful</Text>
                    
                  </TouchableOpacity>
                  <Text style={styles.subHeader}>Multiple Payment Options</Text>

      {/* Amount Box */}
      <View style={styles.amountContainer}>
        <Text style={styles.amountText}>Amount 260.00</Text>
      </View>

      {/* Payment Options */}
      <View style={styles.paymentOptions}>
        {paymentMethods.map((item, index) => (
          <TouchableOpacity key={index} style={styles.paymentOption}>
            <Image source={item.icon} style={styles.paymentIcon} />
            <Text style={styles.paymentText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* OR Divider */}
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>Or</Text>
        <View style={styles.line} />
      </View>

      {/* Pay at Drop Button */}
      <TouchableOpacity
      onPress={()=>navigation.navigate('Ridesuccess')}
       style={styles.payAtDropButton}>
        <Text style={styles.payAtDropText}>Pay at Drop</Text>
      </TouchableOpacity>
    </View>
  );
};

// Payment Methods Data
const paymentMethods = [
  { label: "Credit / Debit Cards", icon: require("../assets/creditcard.png") },
  { label: "UPI Platforms", icon: require("../assets/UPi.png") },
  { label: "Net Banking", icon: require("../assets/netbanking.png") },
  { label: "QR", icon: require("../assets/qrscanimage.jpg") },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: width * 0.05,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color:'black',
    alignSelf: "flex-start",
    marginLeft: width * 0.02,
    marginTop:height*0.00
  },
  subHeader: {
    fontSize: 15,
    color: "black",
    marginTop:height*0.09,

    marginBottom: height * 0.03,
  },
  backButton: {
    position: 'absolute',
    top: height * 0.03,
    left: width * 0.02,
    flexDirection:'row',
    zIndex: 10,
    padding: 10,
  },
  amountContainer: {
    backgroundColor: "#F4E77E",
    padding: width * 0.04,
    borderRadius: width * 0.02,
    alignItems: "center",
    marginBottom: height * 0.03,
  },
  amountText: {
    fontSize:15,
    fontWeight: "bold",
    color:'black'
  },
  paymentOptions: {
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: height * 0.015,
    borderBottomWidth: 1,
    color:'black',
    borderColor: "#ccc",
  },
  paymentIcon: {
    width: width * 0.06,
    height: width * 0.06,
    marginRight: width * 0.04,
    resizeMode: "contain",
  },
  paymentText: {
    fontSize: 14,
    fontWeight: "500",
    color:'black'
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop:height*0.10,
    marginVertical: height * 0.03,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  orText: {
    fontSize: width * 0.035,
    color: "#666",
    marginHorizontal: width * 0.02,
  },
  payAtDropButton: {
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: height * 0.015,
    borderRadius: width * 0.02,
    marginTop:height*0.08,
    alignItems: "center",
  },
  payAtDropText: {
    fontSize: 17,
    fontWeight: "bold",
    color:'black'
  },
});

export default PaymentScreen;
