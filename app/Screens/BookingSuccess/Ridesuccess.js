import React,{useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  PixelRatio,ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SvgBack from '../../icons/SvgBack';
import SvgSuccess from '../../icons/SvgSccess';
import { Image } from 'react-native';

// Responsive helpers using Dimensions only
const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const RideDetailsScreen = ({route}) => {
  console.log(route.params.value.data.amount,'v')
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <SvgBack height={20} width={20} />
        <Text style={styles.headerTitle}>Details</Text>
      </View>

      {/* Ride Summary */}
      <View style={styles.rideSummaryCard}>
        <View style={styles.dateAndFare}>
          <Text style={styles.dateText}>{route.params.value.data.createDate}</Text>
          <Text style={styles.amountText}>₹ {route.params.value.data.amount}</Text>
        </View>

        <View style={styles.arrivalContainer}>
  <ImageBackground 
    source={require("../../assets/success.png")} 
    style={styles.arrivalBackground} 
    resizeMode="contain"
  >
    <Text style={styles.arrivalText}>Trip Booked</Text>
    
  </ImageBackground>
  
</View>
        <View style={styles.rideStatusRow}>
          <SvgSuccess height={10} width={10} />
          <Text style={styles.rideCompleted}>{route.params.value.data.tripStatus}</Text>
          <Image size={moderateScale(20)} source={require('../../assets/H.png')}  style={{ marginLeft: 'auto' }} />

          {/* <Icon name="car-sport" size={moderateScale(20)} color="#000" style={{ marginLeft: 'auto' }} />
          <Text style={styles.carType}>HATCHBACK</Text> */}
        </View>

        <View style={styles.riderInfoRow}>
          <Icon name="person-circle-outline" size={moderateScale(20)} color="#000" />
          <Text style={styles.riderName}>Ashik</Text>
          <Text style={styles.distance}>9.4 Kms</Text>
        </View>
      </View>

      {/* Summary */}
      <Text style={styles.sectionTitle}>Summary</Text>
      <View style={styles.summaryCard}>
<View style={styles.rowBetween}>
<Text style={styles.label}>Trip No:</Text>
<Text style={styles.value}>{route.params.value.data.tripNo}</Text>
        </View>
        <View style={styles.rowBetween}>
    <Text style={styles.label}>From:</Text>
    <Text style={styles.value}>{route.params.value.data.pickupLocation}</Text>
  </View>
  <View style={styles.rowBetween}>
    <Text style={styles.label}>To:</Text>
    <Text style={styles.value}>{route.params.value.data.dropLocation}</Text>
  </View>
  <View style={styles.rowBetween}>
    <Text style={styles.label}>Distance:</Text>
    <Text style={styles.value}>9.4 Kms</Text>
  </View>
  <View style={styles.rowBetween}>
    <Text style={styles.label}>Duration:</Text>
    <Text style={styles.value}>34 minutes</Text>
  </View>
  <View style={styles.rowBetween}>
    <Text style={styles.label}>Status:</Text>
    <Text style={styles.value}>Completed</Text>
  </View>
  <View style={styles.rowBetween}>
    <Text style={styles.label}>Rider name:</Text>
    <Text style={styles.value}>Ashik</Text>
  </View>
  <View style={styles.rowBetween}>
    <Text style={styles.label}>Ride ID:</Text>
    <Text style={styles.value}>ZR45792095798873958</Text>
  </View>
  <View style={styles.rowBetween}>
    <Text style={styles.label}>Rated:</Text>
    <Text style={styles.value}>Yes</Text>
  </View>
  <View style={styles.rowBetween}>
    <Text style={styles.label}>Ratings:</Text>
    <Text style={styles.value}>4/5</Text>
  </View>
      </View>

      {/* Payment Details */}
      {/* <Text style={styles.sectionTitle}>Payment Details</Text>
      <View style={styles.paymentCard}>
        <Text style={styles.paymentRow}><Text style={styles.label}>Fare:</Text> 260.00</Text>
        <Text style={styles.paymentRow}><Text style={styles.label}>Tip for Rider:</Text> 0.00</Text>
        <Text style={styles.paymentRow}><Text style={styles.label}>Total Fare:</Text> 260.00</Text>
        <Text style={styles.paymentRow}><Text style={styles.label}>Payment Status:</Text> Completed</Text>
        <Text style={styles.paymentRow}><Text style={styles.label}>Payment Mode:</Text> UPI Payment</Text>
        <Text style={styles.paymentRow}><Text style={styles.label}>Transaction ID:</Text> DB9579887395845792</Text>
        <Text style={styles.paymentRow}><Text style={styles.label}>Invoice at Mail:</Text> Yes</Text>
      </View> */}

      {/* Repeat Button */}
      <TouchableOpacity style={styles.repeatButton}>
        <Text style={styles.repeatText}>Repeat this Ride</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(16),
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize:20,
    fontWeight:'bold',
    color:'black',
    marginBottom: verticalScale(16),
  },
  headerTitle: {
    fontSize: moderateScale(20),
    fontWeight:'bold',
    color:'black',
    marginLeft: scale(10),
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.008,
  },
  value: {
    fontSize:12,
    color: 'black',
  },
  arrivalText: {
    fontSize: 15,
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
  },
  rideSummaryCard: {
    backgroundColor: '#fdf6cc',
    padding: scale(16),
    borderRadius: scale(10),
    marginBottom: verticalScale(16),
    height:verticalScale(140)
  },
  arrivalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dateAndFare: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(10),
  },
  dateText: {
    fontWeight: 'bold',
    fontSize: moderateScale(16),
  },
  amountText: {
    fontWeight: 'bold',
    fontSize: moderateScale(18),
  },
  arrivalBackground: {
    width: width * 0.3,  // Adjust width based on your design
    height: width * 0.2, // Adjust height accordingly
    justifyContent: "center",
    alignItems: "center",
  },
  rideStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  rideCompleted: {
    fontWeight: 'bold',
    marginLeft: scale(8),
    fontSize: moderateScale(14),
    color: 'green',
  },
  carType: {
    marginLeft: scale(8),
    fontSize: moderateScale(13),
  },
  riderInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(1),
  },
  riderName: {
    marginLeft: scale(8),
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
  distance: {
    marginLeft: 'auto',
    fontSize: moderateScale(14),
    color: '#555',
  },
  sectionTitle: {
    fontSize: moderateScale(17)
    ,
    color:'black',
    fontWeight: 'bold',
    marginBottom: verticalScale(10),
  },
  summaryCard: {
    backgroundColor: '#f1f1f1',
    padding: scale(14),
    borderRadius: scale(20),
    marginBottom: verticalScale(16),
  },
  row: {
    fontSize: moderateScale(13),
    marginBottom: verticalScale(6),
  },
  label: {
    fontWeight: 'bold',
  
    color: 'black',
  },
  paymentCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    padding: scale(14),
    borderRadius: scale(10),
    marginBottom: verticalScale(24),
  },
  paymentRow: {
    fontSize: moderateScale(13),
    marginBottom: verticalScale(6),
  },
  repeatButton: {
    backgroundColor: '#f3d84a',
    paddingVertical: verticalScale(14),
    borderRadius: scale(10),
    alignItems: 'center',
    marginBottom: verticalScale(30),
  },
  repeatText: {
    fontSize: moderateScale(15),
    fontWeight: 'bold',
  },
});

export default RideDetailsScreen;
