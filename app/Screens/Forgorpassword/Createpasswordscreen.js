import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import React, { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
  View,
  Text,ImageBackground,
  Image,
} from 'react-native';
import SvgBack from '../../icons/SvgBack';
import Toast from 'react-native-toast-message';
import Button from '../../uikit/Button/Button';
import { ERROR, PRIMARY } from '../uikit/UikitUtils/colors';
import SvgEyeOutline from '../../icons/SvgEyleOutLine';
import SvgEye from '../../icons/SvgEye';
import InputText from '../../uikit/InputText/InputText';
import SvgLock from '../../icons/SvgLock';
import SvgPassword from '../../icons/SvgPassword';
import Loader from '../../uikit/Loader/Loader';
import * as Yup from 'yup';
import { useForgotpasswordMutation } from '../../uikit/UikitUtils/Apiconfig';

const { width, height } = Dimensions.get('window');

const Createpasswordscreen = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePassword1, setHidePassword1] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setemail] = useState('')
  const [otp, setotp] = useState('')
  const [forgotPassword] = useForgotpasswordMutation(); // ✅ Correct way to use the hook


useEffect(() => {
    if (route.params?.otp) { // Ensures it runs only if mail is passed
        setotp(route.params.otp);
    }
    if (route.params?.email) { // Ensures it runs only if mail is passed
      setemail(route.params.email);
  }
  }, [route.params?.otp,route.params.email]); 



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
    

  const forgotschema = Yup.object().shape({
    newPassword: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one digit'
      )
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const formik = useFormik({
    initialValues: { newPassword: '', confirmPassword: '' },
    validationSchema: forgotschema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const payload = {
          mobileOrEmail:email,
          otp: otp,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
          OtpType: 'FP',
        };

        
        const response = await forgotPassword(payload);


        setIsLoading(false);

        if (response.error) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Invalid OTP',
            position: 'top',
          });
        } else {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Password Changed Successful',
            position: 'top',
          });

          setTimeout(() => {
            navigation.navigate('Login');
          }, 2000);
        }
      } catch (error) {
        console.error('Error:', error);
        setIsLoading(false);
        formik.resetForm();
      }
    },
  });

  return (
    <ImageBackground 
    //behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
    source={require('../../assets/frame.jpeg')}
    style={styles.container}>
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} position="top" />
      {isLoading && <Loader />}

      <TouchableOpacity style={styles.backButton} >
        <SvgBack height={20} width={20} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <Image source={require('../../assets/changepassword.png')} style={styles.image} resizeMode="contain" />

        <View style={styles.overAll}>
  
          <View style={styles.marginTop16}>
                    <Text style={styles.label}>New Password</Text>
            
            <InputText
              maxLength={12}
              actionLeftStyle={{ left: -4 }}
              placeholder="New Password *"
              value={formik.values.newPassword}
              name={'newPassword'}
              onChange={formik.handleChange('newPassword')}
              secureTextEntry={hidePassword}
              actionRight={() => (
                <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                  {hidePassword ? <SvgEyeOutline /> : <SvgEye />}
                </TouchableOpacity>
              )}
              touched={formik.touched}
              errors={formik.errors}
              error={formik.errors.newPassword && formik.touched.newPassword}
              
            />
          </View>

          <View style={styles.marginTop16}>
          <Text style={styles.label}>Confirm Password</Text>

            <InputText
              maxLength={20}
              actionLeftStyle={{ left: -4 }}
              placeholder="Confirm Password *"
              value={formik.values.confirmPassword}
              touched={formik.touched}
              errors={formik.errors}
              name={'confirmPassword'}
              error={formik.errors.confirmPassword && formik.touched.confirmPassword}
              onChange={formik.handleChange('confirmPassword')}
              secureTextEntry={hidePassword1}
              actionRight={() => (
                <TouchableOpacity onPress={() => setHidePassword1(!hidePassword1)}>
                  {hidePassword1 ? <SvgEyeOutline /> : <SvgEye />}
                </TouchableOpacity>
              )}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button onClick={() => { Keyboard.dismiss(); formik.handleSubmit(); }} style={styles.btnStyle}>
              Submit
            </Button>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Createpasswordscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  backButton: {
    position: 'absolute',
    top: height * 0.03,
    left: width * 0.02,
    zIndex: 10,
    padding: 10,
  },
  image: {
    width: width * 0.5,
    height: height * 0.2,
    alignSelf: 'center',
  }, label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: height * 0.03,
  },
  overAll: {
    width: '100%',
    padding: width * 0.04,
    alignItems: 'center',
  },
  marginTop16: {
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: height * 0.01,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginBottom: height * 0.03,
  },
  buttonContainer: {
    width: '100%',
    top: 14,
    alignItems: 'center',
  },
  toastContainer: {
    backgroundColor: '#F5F6F8',
    padding: 10,
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
    marginTop: 50,
  },
  successText: { color: 'green', fontWeight: 'bold', fontSize: 16 },
  errorText: { color: 'red', fontWeight: 'bold', fontSize: 16 },
  toastMessage: { color: 'black', fontWeight: 'bold', fontSize: 16 },
});
