import React, { useState,useRef } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, Image, ScrollView, 
  KeyboardAvoidingView, Platform, Dimensions, TouchableWithoutFeedback, Keyboard 
} from 'react-native';
import InputText from '../uikit/InputText/InputText';

import Toast from 'react-native-toast-message';
import { Dropdown } from 'react-native-element-dropdown';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SvgBack from '../icons/SvgBack';
import { useUserSignupMutation } from '../uikit/UikitUtils/Apiconfig';
import SvgEye from '../icons/SvgEye';
import SvgEyeOff from '../icons/SvgEyeoff';
import {CountryPicker} from 'react-native-country-codes-picker';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PhoneInputText from '../uikit/PhoneInputText/PhoneInputText';
import SvgPhone from '../icons/SvgPhone';
import {ERROR, PRIMARY, WHITE} from '../uikit/UikitUtils/colors';
const { width, height } = Dimensions.get('window');
import Loader from '../uikit/Loader/Loader';
import RegisterSuccessModal from './registersuccess';

const SignUpScreen = () => {
  const phoneInput = useRef(null);
  const [isSuccess, setSuccess] = useState(false);

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
        const response = await signupMutation(payload);
setloading(false)
    setSuccess(true)

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
            <Text style={styles.title}>Signup</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.profilePhotoContainer}>
            <Image source={require('../assets/camera12.png')} style={styles.profilePhoto} />
          </TouchableOpacity>
          <Text style={styles.subText}>Add Profile Photo</Text>

          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Name"
            value={formik.values.userName}
            onChangeText={formik.handleChange('userName')}
            onBlur={formik.handleBlur('userName')}
          />
          {formik.touched.userName && formik.errors.userName && (
            <Text style={styles.errorText}>{formik.errors.userName}</Text>
          )}

          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="abc@gmail.com"
            keyboardType="email-address"
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
          />
          {formik.touched.email && formik.errors.email && (
            <Text style={styles.errorText}>{formik.errors.email}</Text>
          )}

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Create password"
            secureTextEntry={!isPasswordVisible}
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
          />
          {formik.touched.password && formik.errors.password && (
            <Text style={styles.errorText}>{formik.errors.password}</Text>
          )}

          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            secureTextEntry={!isPasswordVisible}
            value={formik.values.confirmPassword}
            onChangeText={formik.handleChange('confirmPassword')}
            onBlur={formik.handleBlur('confirmPassword')}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <Text style={styles.errorText}>{formik.errors.confirmPassword}</Text>
          )}

          <Text style={styles.label}>Mobile Number</Text>
          {/* <TouchableOpacity onPress={() => setShow(true)} style={styles.rowContainer}>
            <Dropdown
              style={styles.dropdown1}
              data={phone}
              labelField="label"
              valueField="value"
              placeholder=""
              value={formik.values.country}
              onChange={(item) => formik.setFieldValue('country', item.value)}
            />
            <TextInput
              style={styles.inputInline}
              placeholder="Enter mobile number"
              keyboardType="phone-pad"
              value={formik.values.mobileno}
              onChangeText={formik.handleChange('mobileno')}
              onBlur={formik.handleBlur('mobileno')}
            />
          </TouchableOpacity>
          {formik.touched.mobileno && formik.errors.mobileno && (
            <Text style={styles.errorText}>{formik.errors.mobileno}</Text>
          )} */}

<View style={styles.marginTop16}>
                <PhoneInputText
                  ref={phoneInput}
                  placeholder="Mobile Number "
                  // actionLeft={() => (
                  //   <SvgPhone
                  //     fill={
                  //       formik.errors.mobileno &&
                  //       formik.touched.mobileno
                  //         ? ERROR
                  //         : PRIMARY
                  //     }
                  //   />
                  // )}
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
       

          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input1}
            placeholder="Enter your address"
            multiline={true}
            
            value={formik.values.address}
            onChangeText={formik.handleChange('address')}
            onBlur={formik.handleBlur('address')}
          />
          {formik.touched.address && formik.errors.address && (
            <Text style={styles.errorText}>{formik.errors.address}</Text>
          )}

          <Text style={styles.label}>Country</Text>
          <Dropdown
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
          )}

          <Text style={styles.termsText}>By signing up, you agree to our <Text style={styles.link}>terms of service</Text> and <Text style={styles.link}>privacy policy</Text></Text>
          
          <TouchableOpacity style={styles.button} onPress={formik.handleSubmit}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.footerText}>Already have an account? <Text style={styles.link}>log in</Text></Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  contentContainer: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginLeft: 10 },
  backButton: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
  profilePhotoContainer: { alignSelf: 'center', marginVertical: 10 },
  profilePhoto: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#ddd' },
  subText: { textAlign: 'center', color: '#888', marginBottom: 10 },
  label: { marginTop: 5, marginBottom: 5 },
  input1: { backgroundColor: '#f0f0f0', height:50, padding: 12, borderRadius: 8, marginTop: 5 },
  input: { backgroundColor: '#f0f0f0', padding: 12, borderRadius: 8, marginTop: 5 },
  dropdown: { backgroundColor: '#f0f0f0', borderRadius: 8, padding: 12, marginTop: 5 },
  dropdown1: { backgroundColor: '#f0f0f0', width:50, height:50, borderRadius: 8, padding: 12, marginTop: 5 },
  termsText: { textAlign: 'center', marginVertical: 10, color: '#555' },
  link: { color: '#DFD46A', fontWeight: 'bold' },
  button: { backgroundColor: '#DFD46A', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 15 },
  buttonText: { fontWeight: 'bold', color: '#000' },
  footerText: { textAlign: 'center', marginTop: 15, color: '#000' },
  rowContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  inputInline: { flex: 2, backgroundColor: '#f0f0f0', padding: 12, borderRadius: 8 },
  errorText: { color: 'red', fontSize: 12, textAlign: 'left', marginTop: 2, left: 10 },
});

export default SignUpScreen;