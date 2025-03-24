import React, { useState,useRef } from 'react';
import { 
  View, Text, TextInput,useColorScheme, TouchableOpacity, Image, ScrollView, 
  KeyboardAvoidingView, Platform, Dimensions, TouchableWithoutFeedback, Keyboard 
} from 'react-native';
import InputText from '../uikit/InputText/InputText';

import Toast from 'react-native-toast-message';
import { Dropdown } from 'react-native-element-dropdown';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SvgBack from '../icons/SvgBack';
import { useUserSignupMutation } from '../uikit/UikitUtils/Apiconfig';

import {CountryPicker} from 'react-native-country-codes-picker';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PhoneInputText from '../uikit/PhoneInputText/PhoneInputText';
import SvgPhone from '../icons/SvgPhone';
import {ERROR, PRIMARY, WHITE} from '../uikit/UikitUtils/colors';
const { width, height } = Dimensions.get('window');
import Loader from '../uikit/Loader/Loader';
import RegisterSuccessModal from './registersuccess';
import SvgEyeOutline from '../icons/SvgEyleOutLine';
import SvgEye from '../icons/SvgEye';
const SignUpScreen = () => {
  const phoneInput = useRef(null);
  const [isSuccess, setSuccess] = useState(false);
  const colorScheme = useColorScheme(); // Detect theme mode

  const [show, setShow] = useState(false);
  const navigation = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [signupMutation, { isLoading: isSignupLoading }] = useUserSignupMutation();
  const [countryName, setCountryName] = useState('IN');
  const [whatsAppcountryName, setWhatsAppCountryName] = useState('IN');
  const [countryCode, setCountryCode] = useState('+91');
  const [whatsAppcountryCode, setWhatsAppCountryCode] = useState('+91');
  const countries = [
    { label: 'United States', value: 'US' },
    { label: 'India', value: 'IN' },
    { label: 'Canada', value: 'CA' },
  ];
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePassword1, setHidePassword1] = useState(true);
  const phone = [
    { label: '+91', value: 'IN' },
    { label: '+9', value: 'IN' },
    { label: '+8', value: 'CA' },
  ];
const [loading, setloading] = useState(false)
  const SignUpSchema = Yup.object().shape({
    userName: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one digit'
      )
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    mobileno: Yup.string().required('Mobile Number is required'),
    address: Yup.string().required('Address is required'),
    country: Yup.string().required('Country is required'),
  });

  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      mobileno: '',
      address: '',
      country: '',
    },
    validationSchema: SignUpSchema,
    onSubmit: async (values) => {
      setloading(true)
      try {
        const payload = {
          userName: values.userName,
          email: values.email,
          mobileno: values.mobileno,
          address: values.address,
          password: values.password,
          locationID: 0,
          countryID: 0,
        };
        console.log(payload,'payload')
        const response = await signupMutation(payload);
setloading(false)
    setSuccess(true)
    console.log(response,'response')
        if (response.error) {
        

          console.error('Signup Error:', response.error);
        }
      } catch (error) {
        console.error('Signup failed:', error);
      }
    },
  });

  const handleClose = () => {
    navigation.navigate('Login');
    setSuccess(false);
    formik.resetForm();
  };
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
   {loading &&  <Loader /> }
   <RegisterSuccessModal open={isSuccess} close={handleClose} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <SvgBack height={20} width={20} />
            <Text style={[styles.title,{ color: colorScheme === 'dark' ? 'black' : 'black' }]}>Signup</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.profilePhotoContainer}>
            <Image source={require('../assets/camera12.png')} style={styles.profilePhoto} />
          </TouchableOpacity>
          <Text style={styles.subText}>Add Profile Photo</Text>

          <Text style={[styles.label,{ color: colorScheme === 'dark' ? 'black' : 'black' }]}>Name</Text>
        
<InputText
                    name={'userName'}
                    touched={formik.touched}
                    errors={formik.errors}
                    error={formik.errors.userName && formik.touched.userName}
                    maxLength={20}
                    placeholder="Name *"
                    value={formik.values.userName}
                    onChange={formik.handleChange('userName')}
                  />

         

          <Text style={[styles.label,{ color: colorScheme === 'dark' ? 'black' : 'black' }]}>Email Address</Text>
        
 <InputText
                  keyboardType={'email-address'}
                  name={'email'}
                  touched={formik.touched}
                  errors={formik.errors}
                  error={formik.errors.email && formik.touched.email}
                  maxLength={50}
                  actionLeftStyle={{left: -4}}
               
                  placeholder="Email Address *"
                  value={formik.values.email}
                  onChange={formik.handleChange('email')}
                />


          <Text style={[styles.label,{ color: colorScheme === 'dark' ? 'black' : 'black' }]}>Password</Text>
        

<InputText
                  maxLength={12}
                  actionLeftStyle={{left: -4}}
                 
                  placeholder=" Confirm Password *"
                  value={formik.values.password}
                  onChange={formik.handleChange('password')}
                  name={'password'}
                  touched={formik.touched}
                  errors={formik.errors}
                  error={formik.errors.password && formik.touched.password}
                  secureTextEntry={hidePassword}
                  actionRight={() => (
                    <TouchableOpacity
                      onPress={() => setHidePassword(!hidePassword)}>
                      {hidePassword ? <SvgEyeOutline /> : <SvgEye />}
                    </TouchableOpacity>
                  )}
                />

          <Text style={[styles.label,{ color: colorScheme === 'dark' ? 'black' : 'black' }]}>Confirm Password</Text>
          

<InputText
                  maxLength={12}
                  actionLeftStyle={{left: -4}}
                 
                  placeholder="Password *"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange('confirmPassword')}
                  name={'confirmPassword'}
                  touched={formik.touched}
                  errors={formik.errors}
                  error={formik.errors.confirmPassword && formik.touched.confirmPassword}
                  secureTextEntry={hidePassword1}
                  actionRight={() => (
                    <TouchableOpacity
                      onPress={() => setHidePassword1(!hidePassword1)}>
                      {hidePassword1 ? <SvgEyeOutline /> : <SvgEye />}
                    </TouchableOpacity>
                  )}
                />


          <Text style={[styles.label,{ color: colorScheme === 'dark' ? 'black' : 'black' }]}>Mobile Number</Text>
         

<View style={[styles.marginTop16,{ color: colorScheme === 'dark' ? 'black' : 'black' }]}>
                <PhoneInputText
                  ref={phoneInput}
                  placeholder="Mobile Number"
                  name={'mobileno'}

                  error={
                    formik.errors.mobileno && formik.touched.mobileno
                  }
                  // defaultCode="AL"
                  onChangeCountry={val => {
                    setCountryCode('+' + val.callingCode[0]);
                    setCountryName(val.cca2 ?? 'IN');
                  }}
                  value={formik.values.mobileno}
                  onChange={text => {
                    // Remove non-numeric characters
                    const numericValue = text.replace(/[^0-9+]/g, '');
                    formik.handleChange('mobileno')(numericValue);
                  }}
                />
                          {formik.touched.mobileno && formik.errors.mobileno && (
            <Text style={styles.errorText}>{formik.errors.mobileno}</Text>
          )} 
              </View>
       

          <Text style={[styles.label,{ color: colorScheme === 'dark' ? 'black' : 'black' }]}>Address</Text>
         
<InputText
                    name={'address'}
                    touched={formik.touched}
                    errors={formik.errors}
                    error={formik.errors.address && formik.touched.address}
                    maxLength={20}
                    placeholder="Address *"
                    value={formik.values.address}
                    onChange={formik.handleChange('address')}
                  />
          <Text style={[styles.label,{ color: colorScheme === 'dark' ? 'black' : 'black' }]}>Country</Text>
          {/* <Dropdown
            style={styles.dropdown}
            data={countries}
            labelField="label"
            valueField="value"
            placeholder="Select your country"
            value={formik.values.country}
            onChange={(item) => formik.setFieldValue('country', item.value)}
          />
          {formik.touched.country && formik.errors.country && (
            <Text style={styles.errorText}>{formik.errors.country}</Text>
          )} */}
 <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={countries}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
      />



          <Text style={styles.termsText}>By signing up, you agree to our <Text style={styles.link}>terms of service</Text> and <Text style={styles.link}>privacy policy</Text></Text>
          
          <TouchableOpacity style={styles.button} onPress={formik.handleSubmit}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.footerText}>Already have an account? <Text style={styles.link}>log in</Text></Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fffff' },
  contentContainer: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginLeft: 10 },
  backButton: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
  profilePhotoContainer: { alignSelf: 'center', marginVertical: 10 },
  profilePhoto: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#ddd' },
  subText: { textAlign: 'center', color: '#888', marginBottom: 10 },
  label: { marginTop: 5, marginBottom: 5 },
  input1: { backgroundColor: '#f0f0f0', height:50, padding: 12, borderRadius: 8, marginTop: 5 },
  input: { backgroundColor: '#f0f0f0', padding: 12, borderRadius: 8, marginTop: 5 },
    termsText: { textAlign: 'center', marginVertical: 10, color: '#555' },
  link: { color: '#DFD46A', fontWeight: 'bold' },
  button: { backgroundColor: '#DFD46A', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 15 },
  buttonText: { fontWeight: 'bold', color: '#000' },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  footerText: { textAlign: 'center', marginTop: 15, color: '#000' },
  rowContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  inputInline: { flex: 2, backgroundColor: '#f0f0f0', padding: 12, borderRadius: 8 },
  errorText: { color: 'red', fontSize: 12, textAlign: 'left', marginTop: 2, left: 10 },
});

export default SignUpScreen;