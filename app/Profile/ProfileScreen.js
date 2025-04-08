import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Dimensions } from 'react-native';
import SvgRightArrow from '../icons/SvgRightArrow';
import { Rating } from 'react-native-ratings';
import SvgBack from '../icons/SvgBack';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const wp = percentage => (width * percentage) / 100;
const hp = percentage => (height * percentage) / 100;

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(2.5);

  const handleRating = value => {
    setRating(value);
    console.log('Selected Rating:', value);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <SvgBack height={19} width={19} />
          <Text style={styles.backText}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Scroll Content */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: hp(5) }}
        showsVerticalScrollIndicator={false}
      >
        {/* <Text style={styles.header}>Profile</Text> */}

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.row}>
            <View style={styles.avatar}>
              <Image source={require('../assets/Group.png')} />
            </View>

            <View style={styles.userInfo}>
              <Text style={styles.name}>Selva Kumar</Text>
              <Text style={styles.phone}>9876543210</Text>
            </View>

            <View style={styles.rightIcons}>
              <Image source={require('../assets/codicon_verified.png')} />
              <Text style={styles.verifiedText}>Verified</Text>
              <SvgRightArrow fill="black" height={13} width={13} />
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.ratingRow}>
            <Rating
              type="star"
              ratingCount={5}
              imageSize={20}
              showRating={false}
              fractions={1}
              onFinishRating={handleRating}
            />
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
        </View>

        {/* Menu Items */}
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuRow}
          onPress={() => navigation.navigate(item.screen)}

          >
            <View style={styles.menuItem}>
              {/* <Icon name={item.icon} size={wp(6)} color="#D8C038" /> */}
              <Image  source={item.icon} />
              <Text style={styles.menuText}>{item.label}</Text>
            </View>
            <SvgRightArrow fill="black" height={13} width={13} />
            {/* <Icon name="keyboard-arrow-right" size={wp(6)} color="#999" /> */}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const menuItems = [
  { label: 'Request History', icon: require('../assets/solar_history-line-duotone.png'),screen:'Historyofride' },
  { label: 'City', icon: require('../assets/ph_city-light.png'),screen:'CityToCityScreen' },
  { label: 'Safety', icon: require('../assets/mingcute_safety-certificate-line.png'),screen:'Historyofride'},
  { label: 'Settings',icon: require('../assets/iconamoon_settings-light.png'),screen:'Historyofride' },
  { label: 'Help', icon: require('../assets/material-symbols_help-clinic-outline-rounded.png'),screen:'Historyofride'},
  { label: 'Support', icon: require('../assets/ix_support.png'),screen:'Historyofride' },
  { label: 'Terms and Condition', icon: require('../assets/iconoir_privacy-policy.png'),screen:'Mapviwscrron' },
  { label: 'Book Your Trip', icon: require('../assets/fontisto_car.png'),screen:'Places'},
  { label: 'Logout', icon: require('../assets/hugeicons_logout-04.png'),screen:'Login' },
];

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: 'black',
    fontSize: wp(4),
    fontWeight: '500',
    marginLeft: wp(2.5),
  },
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
  },
  header: {
    fontSize: wp(4.3),
    fontWeight: 'bold',
    marginBottom: hp(2),
    color: 'black',
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: wp(2),
    padding: wp(4),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: hp(3),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#F1EED4',
    width: wp(13),
    height: wp(13),
    borderRadius: wp(6.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
    marginLeft: wp(4),
  },
  name: {
    fontSize: wp(4.2),
    fontWeight: '600',
    color: 'black',
  },
  phone: {
    color: '#888',
    fontSize: wp(3.5),
    marginTop: hp(0.5),
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },
  verifiedText: {
    fontSize: wp(3.2),
    color: 'black',
  },
  divider: {
    height: 1.5,
    backgroundColor: '#eee',
    marginVertical: hp(1.5),
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1),
  },
  ratingText: {
    marginLeft: wp(2),
    fontSize: wp(4),
    color: '#333',
    fontWeight: '500',
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: wp(4),
    color: 'black',
    fontWeight: '400',
    marginLeft: wp(3),
  },
});

export default ProfileScreen;
