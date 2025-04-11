import React,{useEffect} from 'react';
import { Image, View, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window'); // Get device width & height
import { getItem } from '../../uikit/UikitUtils/mmkvStorage';
import { useSelector } from 'react-redux';

const LunchImage = () => {
  const navigation = useNavigation()
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoggedIn == true) {
        navigation.navigate('Places');
      } else {
        navigation.navigate('Common'); // Capitalize screen name if needed
      }
      console.log(typeof isLoggedIn, 'isLoggedIn');
    }, 2000);

   return () => clearTimeout(timeout); // cleanup on unmount
  }, [isLoggedIn]);
// setTimeout(() => {
//   // const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
//   // if (isLoggedIn == true) {
//   //   navigation.navigate('Common')
//   // }else {
//   //   navigation.navigate('login')
//   // }
//   // console.log(typeof(isLoggedIn),'isLoggedIn')
//   navigation.navigate('Common')
// }, 2000);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/land.png')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: width,   // Full width of the screen
    height: height, // Full height of the screen
    resizeMode: 'cover', // Covers the entire screen
  },
});

export default LunchImage;
