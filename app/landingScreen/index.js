import React,{useEffect} from 'react';
import { Image, View, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window'); // Get device width & height
import { getItem } from '../uikit/UikitUtils/mmkvStorage';
const LunchImage = () => {
  const navigation = useNavigation()
  useEffect(() => {
    const userData = getItem('isLoggedIn'); // Synchronous call
    console.log(userData, 'userdata'); // This should log immediately
  }, []);
setTimeout(() => {

   navigation.navigate('Common')
}, 2000);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/land.png')} style={styles.image} />
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
