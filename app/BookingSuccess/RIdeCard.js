import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { SvgXml } from 'react-native-svg';

const { width } = Dimensions.get('window');

// SVG Icons
const liveIcon = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="8" cy="8" r="6" fill="#4CAF50"/>
</svg>
`;

const evIcon = `
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18 4H20V6H18V4ZM6 4H4V6H6V4ZM20 12H22V14H20V12ZM2 12H0V14H2V12ZM20 20H22V22H20V20ZM6 20H4V22H6V20ZM18 6V18H20V6H18ZM6 6V18H4V6H6ZM16 6H8V4H16V6ZM16 18V20H8V18H16ZM12 15H12V9H10V15H12ZM14 15H16V13H14V15ZM8 15H10V13H8V15Z" fill="#666666"/>
</svg>
`;

const locationIcon = `
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#666666"/>
</svg>
`;

const ExactRideCard = () => {
  return (
    <View style={styles.card}>
      {/* First Line: Ride Live with icon */}
      <View style={styles.rideLiveContainer}>
        <SvgXml xml={liveIcon} width={16} height={16} />
        <Text style={styles.rideLiveText}>Ride Live</Text>
      </View>
      
      {/* Second Line: Driver and distance */}
      <View style={styles.row}>
        <Text style={styles.driverName}>Bruno</Text>
        <Text style={styles.distance}>84 kms</Text>
      </View>
      
      {/* Third Line: Price and EV badge */}
      <View style={[styles.row, { marginBottom: 12 }]}>
        <Text style={styles.price}>E4 340.00</Text>
        <View style={styles.evBadge}>
          <SvgXml xml={evIcon} width={14} height={14} style={styles.evIcon} />
          <Text style={styles.evText}>EV</Text>
        </View>
      </View>
      
      {/* Fourth Line: Destination with icon */}
      <View style={styles.destinationContainer}>
        <SvgXml xml={locationIcon} width={14} height={14} />
        <Text style={styles.destination}>Alandur</Text>
      </View>
      
      {/* Fifth Line: ETA */}
      <Text style={styles.eta}>ETA 12 minutes</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F2EFC8',
    borderRadius: 8,
    padding: 16,
    width: width * 0.9,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rideLiveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rideLiveText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginLeft: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  distance: {
    fontSize: 14,
    color: '#666666',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  evBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  evIcon: {
    marginRight: 4,
  },
  evText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: 'bold',
  },
  destinationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  destination: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 8,
  },
  eta: {
    fontSize: 14,
    color: '#666666',
  },
});

export default ExactRideCard;