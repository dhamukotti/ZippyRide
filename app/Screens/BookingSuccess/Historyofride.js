import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Dimensions, 
  ScrollView, 
  Image,
  Platform,
  StatusBar,ImageBackground,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import ExactRideCard from './RIdeCard';
const { width, height } = Dimensions.get('window');
import { Rating } from 'react-native-ratings';

// SVG for back icon
const backIconSvg = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 18L9 12L15 6" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const locationIcon = `
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 2C6.686 2 4 4.686 4 8C4 12 10 18 10 18C10 18 16 12 16 8C16 4.686 13.314 2 10 2ZM10 11C8.895 11 8 10.105 8 9C8 7.895 8.895 7 10 7C11.105 7 12 7.895 12 9C12 10.105 11.105 11 10 11Z" fill="#4CAF50"/>
</svg>
`;

const clockIcon = `
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C15.514 20 20 15.514 20 10C20 4.486 15.514 0 10 0ZM10 18C5.589 18 2 14.411 2 10C2 5.589 5.589 18 10 18C14.411 18 18 14.411 18 10C18 5.589 14.411 2 10 2Z" fill="#666666"/>
  <path d="M10 5C9.448 5 9 5.448 9 6V10C9 10.265 9.105 10.52 9.293 10.707L12.293 13.707C12.683 14.098 13.317 14.098 13.707 13.707C14.098 13.317 14.098 12.683 13.707 12.293L11 9.586V6C11 5.448 10.552 5 10 5Z" fill="#666666"/>
</svg>
`;

const RideHistoryScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('All Rides');
  
  // Current ride data
  const currentRide = {
    driver: 'Bruno',
    distance: '9.4 Kms',
    destination: 'Alandur',
    eta: 'ETA 12 minutes',
    price: '340.00',
    vehicleType: 'EV'
  };

  // Previous rides data
  const previousRides = [
    { id: '1', driver: 'Ashik', time: 'Today 07.45 PM', fromLocation: 'Pallavaram', toLocation: 'Guindy', price: '260.00', vehicleType: 'HATCHBACK' },
    { id: '2', driver: 'Matkii', time: 'Today 02.25 PM', fromLocation: 'Villivakkam', toLocation: 'Parris Corner', price: '260.00', vehicleType: 'HATCHBACK' },
    { id: '3', driver: 'Bala', time: 'Yesterday 06.00 PM', fromLocation: 'Porur', toLocation: 'Ramapuram', price: '260.00', vehicleType: 'HATCHBACK' },
    { id: '4', driver: 'Selva', time: 'Yesterday 11.30 AM', fromLocation: 'Urupakkam', toLocation: 'Potheri', price: '260.00', vehicleType: 'HATCHBACK' },
    { id: '5', driver: 'Askar', time: 'Yesterday 09.10 AM', fromLocation: 'Saidapet', toLocation: 'Periyamet', price: '260.00', vehicleType: 'HATCHBACK' },
    { id: '6', driver: 'Ravi', time: 'Yesterday 08.45 PM', fromLocation: 'T Nagar', toLocation: 'Mylapore', price: '280.00', vehicleType: 'SEDAN' },
    { id: '7', driver: 'Manoj', time: 'Yesterday 04.30 PM', fromLocation: 'Tambaram', toLocation: 'Velachery', price: '300.00', vehicleType: 'SUV' },
    { id: '8', driver: 'Kumar', time: 'Yesterday 10.20 AM', fromLocation: 'Medavakkam', toLocation: 'Perungudi', price: '250.00', vehicleType: 'HATCHBACK' },
    { id: '9', driver: 'Suresh', time: 'Yesterday 12.00 PM', fromLocation: 'Adyar', toLocation: 'Thiruvanmiyur', price: '270.00', vehicleType: 'SEDAN' },
    { id: '10', driver: 'Vimal', time: 'Yesterday 03.15 PM', fromLocation: 'Nungambakkam', toLocation: 'Egmore', price: '260.00', vehicleType: 'HATCHBACK' },
    { id: '11', driver: 'Ramesh', time: '2 Days Ago 09.00 PM', fromLocation: 'Kodambakkam', toLocation: 'Teynampet', price: '280.00', vehicleType: 'SEDAN' },
    { id: '12', driver: 'Sathish', time: '2 Days Ago 06.45 PM', fromLocation: 'Perambur', toLocation: 'Parrys', price: '260.00', vehicleType: 'HATCHBACK' },
    { id: '13', driver: 'Hari', time: '2 Days Ago 02.10 PM', fromLocation: 'Guindy', toLocation: 'Thoraipakkam', price: '290.00', vehicleType: 'SUV' },
    { id: '14', driver: 'Vinod', time: '2 Days Ago 07.55 AM', fromLocation: 'Royapettah', toLocation: 'Marina', price: '230.00', vehicleType: 'HATCHBACK' },
    { id: '15', driver: 'Arun', time: '3 Days Ago 11.00 PM', fromLocation: 'Mambalam', toLocation: 'Saidapet', price: '260.00', vehicleType: 'HATCHBACK' },
    { id: '16', driver: 'Dinesh', time: '3 Days Ago 09.20 AM', fromLocation: 'Washermanpet', toLocation: 'Broadway', price: '250.00', vehicleType: 'SEDAN' },
    { id: '17', driver: 'Muthu', time: '3 Days Ago 04.40 PM', fromLocation: 'Purasaiwalkam', toLocation: 'Kilpauk', price: '270.00', vehicleType: 'SUV' },
    { id: '18', driver: 'Saravanan', time: '3 Days Ago 08.15 AM', fromLocation: 'Chetpet', toLocation: 'Egmore', price: '240.00', vehicleType: 'HATCHBACK' },
    { id: '19', driver: 'Prakash', time: '4 Days Ago 10.50 AM', fromLocation: 'Velachery', toLocation: 'Taramani', price: '280.00', vehicleType: 'SEDAN' },
    { id: '20', driver: 'Gopi', time: '4 Days Ago 03.30 PM', fromLocation: 'Ambattur', toLocation: 'Avadi', price: '290.00', vehicleType: 'SUV' },
    { id: '21', driver: 'Balaji', time: '5 Days Ago 07.25 PM', fromLocation: 'Chromepet', toLocation: 'Pallikaranai', price: '260.00', vehicleType: 'HATCHBACK' },
    { id: '22', driver: 'Ajay', time: '5 Days Ago 06.10 AM', fromLocation: 'Anna Nagar', toLocation: 'Shenoy Nagar', price: '250.00', vehicleType: 'SEDAN' },
    { id: '23', driver: 'Siva', time: '6 Days Ago 12.40 PM', fromLocation: 'Vadapalani', toLocation: 'Arumbakkam', price: '270.00', vehicleType: 'SUV' },
    { id: '24', driver: 'Karthik', time: '6 Days Ago 05.20 PM', fromLocation: 'Nandanam', toLocation: 'Alwarpet', price: '260.00', vehicleType: 'HATCHBACK' },
    { id: '25', driver: 'Deepak', time: '6 Days Ago 09.50 AM', fromLocation: 'Mount Road', toLocation: 'Nandanam', price: '280.00', vehicleType: 'SEDAN' },
    { id: '26', driver: 'Vijay', time: '7 Days Ago 02.30 PM', fromLocation: 'Teynampet', toLocation: 'Royapettah', price: '260.00', vehicleType: 'HATCHBACK' },
    { id: '27', driver: 'Lokesh', time: '7 Days Ago 07.10 PM', fromLocation: 'Marina Beach', toLocation: 'Triplicane', price: '240.00', vehicleType: 'HATCHBACK' },
    { id: '28', driver: 'Sundar', time: '8 Days Ago 11.45 AM', fromLocation: 'Egmore', toLocation: 'Choolai', price: '270.00', vehicleType: 'SEDAN' },
    { id: '29', driver: 'Mohan', time: '8 Days Ago 04.50 PM', fromLocation: 'Parrys', toLocation: 'Broadway', price: '250.00', vehicleType: 'SUV' },
    { id: '30', driver: 'Vasanth', time: '9 Days Ago 08.05 PM', fromLocation: 'Aminjikarai', toLocation: 'Nungambakkam', price: '260.00', vehicleType: 'HATCHBACK' },
  ];
  

  const handleRating = value => {
  
    console.log('Selected Rating:', value);
  };
  // Filter rides based on active tab
  const filteredRides = () => {
    switch(activeTab) {
      case 'This Week':
        return previousRides.filter(ride => ride.time.includes('Today') || ride.time.includes('Yesterday'));
      case 'Today':
        return previousRides.filter(ride => ride.time.includes('Today'));
      default:
        return previousRides;
    }
  };

  // Tabs data
  const tabs = ['All Rides', 'Most Frequent', 'This Week', 'This Month'];

  return (
    <View style={styles.safeArea}>
      {/* <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      > */}
        {/* Current Ride Section */}
        <View style={styles.currentRideContainer}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <SvgXml xml={backIconSvg} width={width * 0.06} height={width * 0.06} />
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>History of Rides</Text>
          </View>
          
          <View style={styles.currentRideCard}>
            <View style={styles.rideHeader}>
              <Text style={styles.rideLiveText}>Ride Live</Text>
                        <Text style={styles.fare}>₹ 260.00</Text>
              
            </View>
            
             <View style={styles.textContainer}>
                    <View style={styles.nameRow}>
                    <Image source={require("../../assets/Uservi.png")} style={styles.userIcon} />
                    <View style={styles.nameColumn}>
      <View style={styles.nameVerificationRow}>
        <Text style={styles.riderName}>Ashik
        <Image 
          source={require("../../assets/Vector.png")} 
          style={styles.verificationIcon} 
        />
        </Text>
        <Text style={styles.riderDistance}>9.4 Kms</Text>

      </View>
      </View>
                     

                    </View>
                 <View style={styles.fareContainer}>
                            <Image source={require("../../assets/H.png")} style={styles.carIcon} />
                            <Text style={styles.carType}>HATCHBACK</Text>
                          </View>
                  </View>
                  {/* <View style={styles.card}>

      <View style={styles.row}>
        <Image source={require('../assets/human.jpg')} style={{height:22,width:22}} />
        <Text style={styles.locationText}>Alendar</Text>
      </View>
      <View >
        <Image source={require('../assets/barprogres.png')} />
      </View>
     
      <View style={[styles.row, { marginTop: 12 }]}>
      <SvgXml xml={locationIcon} width={20} height={20} />
      <Text style={styles.etaText}> 
        <Image source={require('../assets/timer.png')} style={{height:20,width:20}} />
        ETA 12 minutes</Text>
      </View>
    </View> */}
    <View style={styles.card}>
      {/* Top Row - Location */}
      <View style={styles.locationRow}>
       
        <Text style={styles.locationText}>Alendar</Text>
      </View>

      <View style={styles.progressContainer}>
      <Image 
          source={require('../../assets/human.jpg')} 
          style={styles.humanIcon} 
        />
        <Image 
          source={require('../../assets/barprogres.png')} 
          style={styles.progressBar} 
          resizeMode="contain"
        />
                <SvgXml xml={locationIcon} width={20} height={20} />

      </View>

      {/* Bottom Row - ETA */}
      <View style={styles.etaRow}>
        <Image 
          source={require('../../assets/timer.png')} 
          style={styles.timerIcon} 
        />
        <Text style={styles.etaText}>ETA 12 minutes</Text>
      </View>
    </View>
                     </View>

   

        </View>
{/* <ExactRideCard /> */}
        {/* Divider */}
        <View style={styles.divider} />

        {/* Previous Rides Section */}
        <View style={styles.previousRidesContainer}>
          <Text style={styles.sectionTitle}>Previous Rides</Text>
          
          {/* Tabs */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsScrollContainer}
          >
            {tabs.map((tab) => (
              <TouchableOpacity 
                key={tab} 
                style={[
                  styles.tab,
                  activeTab === tab && styles.activeTab
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText
                ]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          {/* Rides List */}
          <FlatList
            data={filteredRides()}
            keyExtractor={(item) => item.id}
            scrollEnabled={true}
            renderItem={({ item }) => (
                <ScrollView 
                style={{ flex: 1 }} nestedScrollEnabled={true}>

              {/* <View style={styles.rideItem}>
                <View style={styles.rideItemLeft}>
                <Image
      source={require('../assets/usericon.png')}
      style={{
        height: 30,
        width: 30,
       
      }}
    />
<View style={{ flexDirection: 'row', alignItems: 'center' }}>
 
  <Text style={[styles.rideDriver, { marginLeft: 8 }]}>
    {item.driver}{' '}
   
  </Text>
  <Image
    source={require('../assets/Vector.png')}
    style={{
      height: 20,
      width: 20,
      resizeMode: 'contain',
    }}
  />
 
</View>
<View style={{alignSelf:'flex-start'}}>
    <Rating
                type="star"
                ratingCount={5}
                imageSize={20}
                showRating={false}
                fractions={1}
                onFinishRating={handleRating}
              />
              </View>
<Text style={styles.rideTime}>{item.time}</Text>

                  <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
  <View style={{  alignItems: 'center' }}>
    <Image
      source={require('../assets/human.jpg')}
      style={{
        height: 20,
        width: 20,
        resizeMode: 'contain',
      }}
    />
  </View>
  <Text style={{ color: 'black', marginLeft: 8, flexShrink: 1 }}>
    {item.fromLocation}
  </Text>
</View>

<View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
  <View style={{ width: 25, alignItems: 'center', marginTop: height * 0.01 }}>
    <Image
      source={require('../assets/locationicon.png')}
      style={{
        height: 20,
        width: 20,
        resizeMode: 'contain',
      }}
    />
  </View>
  <Text
    style={{
      color: 'black',
      marginLeft: 8,
      marginTop: height * 0.01,
      flexShrink: 1,
    }}>
    {item.fromLocation}
  </Text>
</View>



                </View>
                <View style={styles.rideItemRight}>
                  <Text style={styles.ridePrice}>₹{item.price}</Text>
                  <Image source={require('../assets/hatchback.png')} style={{width:60,height:50}} />
                </View>
              </View> */}
              <View style={styles.rideItem}>
  <View style={styles.rideItemLeft}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {/* User icon and driver name */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={require('../../assets/usericon.png')}
          style={{
            height: 30,
            width: 30,
          }}
        />
        <View style={{ flexDirection: 'row', alignSelf: 'center', marginLeft: 8 }}>
          <Text style={styles.rideDriver}>
            {item.driver}{' '}
          </Text>
          <Image
            source={require('../../assets/Vector.png')}
            style={{
              height: 20,
              width: 20,
              resizeMode: 'contain',
            }}
          />
        </View>
      </View>
      
      {/* Time - aligned to the right */}
      <Text style={styles.rideTime }>{item.time}</Text>
    </View>

    {/* Rating */}
    <View style={{ alignSelf: 'flex-start', marginTop: 5 }}>
      <Rating
        type="star"
        ratingCount={5}
        imageSize={20}
        showRating={false}
        fractions={1}
        onFinishRating={handleRating}
      />
    </View>

    {/* Locations */}
    <View style={{ marginTop:-width*0.05,marginLeft:width*0.05 }}>
      <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
        <Image
          source={require('../../assets/human.jpg')}
          style={{
            height: 20,
            width: 20,
            resizeMode: 'contain',
          }}
        />
        <Text style={{ color: 'black', marginLeft: 8 }}>
          {item.fromLocation}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 15 }}>
        <Image
          source={require('../../assets/locationicon.png')}
          style={{
            height: 20,
            width: 20,
            resizeMode: 'contain',
          }}
        />
        <Text style={{ color: 'black', marginLeft: 8 }}>
          {item.toLocation}
        </Text>
      </View>
    </View>
  </View>
  
  {/* Price and car icon - aligned to the right */}
  <View style={styles.rideItemRight}>
    <Text style={styles.ridePrice}>₹{item.price}</Text>
    <Image 
      source={require('../../assets/hatchback.png')} 
      style={{ width: 60, height: 50 }} 
    />
  </View>
</View>
              </ScrollView>
            )}
            ListEmptyComponent={
              <View style={styles.emptyList}>
                <Text style={styles.emptyText}>No rides found</Text>
              </View>
            }
          />
        </View>
    
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#fff',
  },
  riderName: {
    fontSize: width * 0.04,
    fontWeight: "bold",
    color: "#000",
  },

  riderDistance: {
    fontSize: 11,
    color: "#5A5A5A",
    marginTop: height * 0.002,
    marginLeft: width*0.01
  },
  carType: {
    fontSize: width * 0.035,
    color: "#000",
    marginTop: height * 0.005,
  },
  fareContainer: {
    alignItems: "center",
    marginLeft: width*0.06
   
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  currentRideContainer: {
    padding: width * 0.04,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  backButton: {
    marginRight: width * 0.03,
  },
  arrivalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
  },
  textContainer: {
    marginLeft: width * 0.00,
    flexDirection: "row",
    justifyContent:'space-between'
  },
  card: {

   
    width: '100%',
 
  },
  locationRow: {
    flexDirection: 'row',
    justifyContent: 'center', // This centers horizontally
    alignItems: 'center',
    marginBottom: 12, // Space between location and progress bar
  },
  humanIcon: {
    width: 22,
    height: 22,
    marginRight: width*0.03,
  },
  locationText: {
    fontSize: 16,
    textAlign:'center',
    alignItems:'center',
    alignSelf:'center',
    fontWeight: '600',
    color: '#000000',
  },
  progressContainer: {
    marginBottom: 12,
    display:'flex',
    flexDirection:'row',
     // Space between progress bar and ETA
  },
  progressBar: {
    width: '85%',
   
    
    display:'flex',
    flexDirection:'row',
    marginTop:height*0.01
   
  },
  etaRow: {
    flexDirection: 'row',
    justifyContent: 'center', // This centers horizontally
    alignItems: 'center',
  },
  timerIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  etaText: {
    fontSize: 14,
    color: '#666666',
  },
  currentRideCard: {
    backgroundColor: '#F2EFC8',
    borderRadius: 10,
    padding: width * 0.04,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  carIcon: {
    width: width * 0.09,
    height: height * 0.04,
    marginTop: height * 0.005,
  },
  rideHeader: {
    marginBottom: height * 0.015,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  rideLiveText: {
    backgroundColor: "#EDE7AE",
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.002,
    borderRadius: 9,
    width: width*0.2,
    color: "black",
    fontSize: 14,
  },
  rideDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.015,
  },
  driverName: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: '#000',
  },
  fare: {
    fontSize:16,
    fontWeight: "bold",
    color: "#000",
  },
  distance: {
    fontSize: width * 0.035,
    color: '#666',
  },
  destinationContainer: {
    marginBottom: height * 0.015,
  },
  destination: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: height * 0.005,
  },  rideItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    // Add shadow or other styles as needed
  },

  eta: {
    fontSize: width * 0.035,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#000',
  },
  vehicleTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.005,
  },

  vehicleType: {
    fontSize: width * 0.035,
    color: '#666',
  },
  divider: {
    height: height * 0.01,
    backgroundColor: '#f0f0f0',
  },
  previousRidesContainer: {
    padding: width * 0.04,
  },
  tabsScrollContainer: {
    paddingHorizontal: width * 0.01,
  },
  tab: {
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.01,
    marginRight: width * 0.03,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#DFD46A',
  },
  tabText: {
    fontSize: width * 0.035,
    color: '#666',
  },
  activeTabText: {
    color: '#DFD46A',
    fontWeight: 'bold',
  },
  rideItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: height * 0.015,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  rideItemLeft: {
    flex: 1,
    paddingRight: width * 0.02,
  },
  rideItemRight: {
    alignItems: 'flex-end',
  },
  rideDriver: {
    fontSize: width * 0.038,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: height * 0.005,
  },
  rideTime: {
    fontSize: width * 0.033,
    color: 'black',
    fontWeight:'bold',
    textAlign:'center',
    marginLeft:width*0.05,
    
    marginBottom: height * 0.005,
  },
  // rideLocation: {
  //   fontSize: width * 0.033,
  //   textAlign:'center',
  //   color: '#666',
  // },
  ridePrice: {
    fontSize: width * 0.038,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: height * 0.005,
  },
  rideVehicleType: {
    fontSize: width * 0.03,
    color: '#666',
    backgroundColor: '#e0e0e0',
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.003,
    borderRadius: 10,
  },
  emptyList: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: height * 0.05,
  },
  emptyText: {
    fontSize: width * 0.04,
    color: '#666',
  },
});

export default RideHistoryScreen;