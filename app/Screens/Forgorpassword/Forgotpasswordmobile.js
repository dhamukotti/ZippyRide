import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Image,ImageBackground
} from 'react-native';
import SvgMail from '../../icons/SvgMail';
import Button from '../../uikit/Button/Button';
import InputText from '../../uikit/InputText/InputText';
import Loader from '../../uikit/Loader/Loader';
import { useForgotPasswordOTPMutation } from '../../uikit/UikitUtils/Apiconfig';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import SvgBack from '../../icons/SvgBack';

const { width, height } = Dimensions.get('window');

const Forgotpassword = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [ForgotMutation] = useForgotPasswordOTPMutation();

  const forgotschema = Yup.object().shape({
    Email: Yup.string().email('Invalid email format').required('Please Enter your Email'),
   confirmEmail: Yup.string()
        .oneOf([Yup.ref('Email'), null], 'confirm Email must match')
        .required('Confirm Email is required'),
  });

  const formik = useFormik({
    initialValues: { Email: '' },
    validationSchema: forgotschema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const payload = { Email: values.Email, OtpType: 'FP' };
        const response = await ForgotMutation(payload);
        setIsLoading(false);
        if (response.error) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Invalid Otp',
            position: 'top',
            
          });
        } else {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: `${values.Email} OTP Sent Successfully`,
            position: 'top',
          });
          setTimeout(() => {
            navigation.navigate('ForgotPasswordVerifyScreen',{mail:values.Email});
          }, 2000);
        }
      } catch (error) {
        console.error('Error:', error);
        setIsLoading(false);
        formik.resetForm()
      }
    },
  });

  const showToast = () =>{
    Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Otp Sent Successfully',
        position: 'top',
      });
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
    const redirect = () =>{
        navigation.navigate('Forgotverifymobile')
    }
    
  return (
    <ImageBackground
     // behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      source={require('../../assets/frame.jpeg')}
     style={styles.container}
    >
      <Toast   config={toastConfig} ref={(ref) => Toast.setRef(ref)} position="top" />
      {isLoading &&  <Loader /> }
      <TouchableOpacity  style={styles.backButton} onPress={() => navigation.goBack()}>
        <SvgBack height={20} width={20} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <Image
          source={require('../../assets/mobileph.png')}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.overAll}>
        <View style={{ marginBottom: 15 }}>
        <Text style={styles.label}>Enter Mobile</Text>
           <InputText
                     name="Email"
                     touched={formik.touched}
                     errors={formik.errors}
                     error={formik.errors.Email && formik.touched.Email}
                     maxLength={50}
                     placeholder="Enter your Mobile Number"
                     value={formik.values.Email}
                     actionLeft={
                      <SvgMail height={20} width={20} />
                     }
                     onChange={formik.handleChange('Email')}
                   />
                    </View>

<View style={{ marginBottom: 15 }}>
<Text style={styles.label}>Confirm Mobile</Text>

                   <InputText
                     name="confirmEmail"
                     touched={formik.touched}
                     errors={formik.errors}
                     error={formik.errors.confirmEmail && formik.touched.confirmEmail}
                     maxLength={50}
                     placeholder="Enter your Mobile Number"
                     value={formik.values.confirmEmail}
                     onChange={formik.handleChange('confirmEmail')}
                   />
                     </View>
          <View style={styles.buttonContainer}>
            <Button 
            //   disabled={
            //     !formik.values.Email || // Check if Email field is empty
            //     !formik.values.confirmEmail || // Check if Confirm Email field is empty
            //     formik.values.Email !== formik.values.confirmEmail // Check if both fields match
            //   }
            onClick={() =>
                 { Keyboard.dismiss(); 
          //  formik.handleSubmit();
            redirect()
        }}
             style={styles.btnStyle}>
              Submit
            </Button>
          </View>
        </View>
        
      </ScrollView>
    </ImageBackground>
  );
};

export default Forgotpassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: height * 0.12,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  backButton: {
    position: 'absolute',
    top: height * 0.03,
    left: width * 0.02,
    zIndex: 10,
    padding: 10,
  },
  image: {
    width: width * 0.4,
    height: height * 0.2,
    alignSelf: 'center',
  },
  overAll: {
    width: '100%',
    padding: width * 0.05,
    alignItems: 'center',
    justifyContent:'space-between'
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
  inputField: {
    marginBottom: height * 0.05, // Added spacing between input and button
  },
  buttonContainer: {
    width: '100%',
    top:14,
    alignItems: 'center',
  },
  btnStyle: {
    width: '60%',
    alignSelf: 'center',
  },
});
