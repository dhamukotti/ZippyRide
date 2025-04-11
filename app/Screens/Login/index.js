import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,ImageBackground,
  Platform,
  Keyboard
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {BLACK, ERROR, SUCCESS, WHITE} from '../uikit/UikitUtils/colors';
import Toast from 'react-native-toast-message';

import SvgBack from '../../icons/SvgBack';
import SvgEye from '../../icons/SvgEye';
import SvgEyeOutline from '../../icons/SvgEyleOutLine';

import InputText from '../../uikit/InputText/InputText';
import Button from '../../uikit/Button/Button';
import { useUserLoginMutation } from '../../uikit/UikitUtils/Apiconfig';
import {useDispatch} from 'react-redux';
import {login} from '../../Reudx/slices/authSlice';
const { width, height } = Dimensions.get('window');
import { useSelector } from 'react-redux';

import Loader from '../../uikit/Loader/Loader';
const SignInScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loginMutation] = useUserLoginMutation();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  console.log(isLoggedIn,'isLoggedIn')
  const SignUpSchema = Yup.object().shape({
    MobileOrEmail: Yup.string().required('Please Enter email address or mobile number '),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: { MobileOrEmail: '', password: '' },
    validationSchema: SignUpSchema,
    onSubmit: async (values) => {
      setLoading(true)
      try {
        const payload = { MobileOrEmail: values.MobileOrEmail, password: values.password };
        console.log('Payload:', payload);
        const response = await loginMutation(payload);
        
        setLoading(false);
     console.log(response)
     dispatch(login());
        if (response.error) {
          Toast.show({
            type: 'error', // Use the custom type
            text1: 'Error',
            text2: 'Invalid credentials',
            position: 'top', // Set position to top
            topOffset: 5, // Adjust distance from the top
          });
        }else {
      
          Showsuccess()
          setTimeout(() => {
            navigation.navigate('Places')

          }, 1000);
        }
        
      } catch (error) {
       
        console.error('Signup failed:', error);
      }
    },
  });

 const navigate=()=>{
  navigation.navigate('Places')
 }        

  const toastConfig = {
    success: ({ text1, text2 }) => (
      <View style={{backgroundColor:'#F5F6F8',padding:10,borderRadius:20,width:'80%', alignSelf: 'center', // Align to the right
        marginTop: 50, }}>
      <Text style={{ color: 'green',
    fontWeight: 'bold',
    fontSize: 16,}}>{text1}</Text>
        <Text style={{ color: 'black',
    fontWeight: 'bold',
    fontSize: 16,}}>{text2}</Text>
      </View>
    ),
    error: ({ text1, text2 }) => (
      <View style={{backgroundColor:'#F5F6F8',padding:10,borderRadius:10,width:'80%', alignSelf: 'center', // Align to the right
        marginTop: 50, }}>
        <Text style={{ color: 'red',
    fontWeight: 'bold',
    fontSize: 16,}}>{text1}</Text>
        <Text style={{ color: 'black',
    fontWeight: 'bold',
    fontSize: 16,}}>{text2}</Text>
      </View>
    ),
    customToast: ({ text1, text2 }) => (
      <View style={{backgroundColor:'#F5F6F8',padding:10,borderRadius:10,width:'80%', alignSelf: 'center', // Align to the right
        marginTop: 50, }}>
        <Text style={{ color: 'red',
    fontWeight: 'bold',
    fontSize: 16,}}>{text1}</Text>
        <Text style={{ color: 'black',
    fontWeight: 'bold',
    fontSize: 16,}}>{text2}</Text>
      </View>
    ),
  };
  


  const Showsuccess = () => {
    Toast.show({
      type: 'customToast', // Use the custom type
      text1: 'Success',
      text2: 'Login Succefully ✅ ',
      position: 'top', // Set position to top
      topOffset: 5, // Adjust distance from the top
    });
  };
  return (
    
    <ImageBackground 
    source={require('../../assets/frame.jpeg')}
 style={styles.container}>
   {loading &&  <Loader /> }
   <Toast
        config={toastConfig}
        ref={(ref) => Toast.setRef(ref)}
        position="top" // Set global position to top
      />
       
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <SvgBack height={19} width={19} />
          <Text style={{color:'black',fontSize:15,fontWeight:500,left:10}}>Sign In with Mail</Text>
        </TouchableOpacity>

        {/* Centered Content */}
        <View style={styles.content}>
          {/* Image */}
          <Image source={require('../../assets/image1.png')} style={styles.image} />

          {/* Email Input */}
          <Text style={styles.label}> Enter Email </Text>
          <InputText
            name="MobileOrEmail"
            touched={formik.touched}
            errors={formik.errors}
            error={formik.errors.MobileOrEmail && formik.touched.MobileOrEmail}
            maxLength={50}
            keyboardType='text'
            placeholder="abc@gmail.com"
            value={formik.values.MobileOrEmail}
            onChange={formik.handleChange('MobileOrEmail')}
          />

          {/* Password Input */}
          <Text style={styles.label}>Password</Text>
          <InputText
            maxLength={30}
            placeholder="Enter password"
            value={formik.values.password}
            onChange={formik.handleChange('password')}
            name="password"
            touched={formik.touched}
            errors={formik.errors}
            error={formik.errors.password && formik.touched.password}
            secureTextEntry={hidePassword}
            actionRight={() => (
              <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                {hidePassword ? <SvgEyeOutline /> : <SvgEye />}
              </TouchableOpacity>
            )}
          />

          {/* Forgot Password - Right Aligned */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Forgotpassword')}
            style={styles.forgotStyle}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <Button onClick={() => 
            {
              Keyboard.dismiss();
               formik.handleSubmit(); 
              // navigate()

            }} style={styles.button}>
            Sign in
          </Button>
        
          {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
  },
  backButton: {
    position: 'absolute',
    top: height * 0.05,
    left: width * 0.05,
    zIndex: 10,
    flexDirection: "row",
    padding: 10,
   
  },
  content: {
    width: width * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width * 0.7,
    height: height * 0.25,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: width * 0.038,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  forgotStyle: {
    alignSelf: 'flex-end',
    marginTop: 5,
    marginBottom: 20,
  },
  forgotText: {
    fontSize: 15,
    color: '#4A90E2',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#E5D463',
    borderRadius: 10,
    paddingVertical: 12,
    width: '100%',
  },
 
});

export default SignInScreen;
