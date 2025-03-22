import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,Keyboard
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SvgEmail from '../icons/SvgEmail';
import SvgPassword from '../icons/SvgPassword';
import SvgBack from '../icons/SvgBack';
import SvgEye from '../icons/SvgEye';
import SvgEyeOff from '../icons/SvgEyeoff';
import { useFormik } from 'formik';
import SvgUser from '../icons/SvgUser';
import * as Yup from 'yup';
import Flex from '../uikit/Flex/Flex';
import SvgEyeOutline from '../icons/SvgEyleOutLine';
import InputText from '../uikit/InputText/InputText';
const { width, height } = Dimensions.get('window');

import {ERROR, PRIMARY, WHITE} from '../uikit/UikitUtils/colors';
import Button from '../uikit/Button/Button';
import { useUserLoginMutation } from '../uikit/UikitUtils/Apiconfig';
const SignInScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoader, setLoader] = useState(true);
  const [loginMutation, { isLoading: isSignupLoading }] = useUserLoginMutation();
const [loading, setloading] = useState(false)

   const SignUpSchema = Yup.object().shape({
    MobileOrEmail: Yup.string().required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        
        .required('Password is required'),
    
    });
  const formik = useFormik({
    initialValues: {
      MobileOrEmail: '',
      password: '',
      
    },
    validationSchema: SignUpSchema,
    onSubmit: async (values) => {
      // setloading(true)
      try {
        const payload = {
          MobileOrEmail: values.MobileOrEmail,
        
          password: values.password,
         
        };
        console.log(payload,'payload')
        const response = await loginMutation(payload);
setloading(false)
    // setSuccess(true)
    console.log(response,'response')
        if (response.error) {
        

          console.error('Signup Error:', response.error);
        }
      } catch (error) {
        console.error('Signup failed:', error);
      }
    },
  });
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
         {loading &&  <Loader /> }
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.navigate('Common')} style={styles.backButton}>
          <SvgBack height={20} width={20} />
        </TouchableOpacity>

        {/* Image */}
        <Image source={require('../assets/image1.png')} style={styles.image} />

        <Flex flex={1} between>
          <Flex overrideStyle={[styles.inputContainer]}>
            <Text size={20} bold overrideStyle={styles.loginText}>
              Login Here
            </Text>

          
          <InputText
                              name={'MobileOrEmail'}
                              touched={formik.touched}
                              errors={formik.errors}
                              error={formik.errors.MobileOrEmail && formik.touched.MobileOrEmail}
                              maxLength={20}
                              placeholder="Name *"
                              value={formik.values.MobileOrEmail}
                              onChange={formik.handleChange('MobileOrEmail')}
                            />
            <View style={{marginVertical: 20, marginBottom: 20}}>
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
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(routesPath.FORGOT_PASSWORD_SCREEN)
                }
                style={styles.forgotStyle}>
                <Text bold color="theme">
                  Forgot password ?
                </Text>
              </TouchableOpacity>
            </View>
            <Button
              onClick={() => {
                Keyboard.dismiss();
                formik.handleSubmit();
              }}>
              LOGIN
            </Button>
          
          </Flex>
        </Flex>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
   alignContent:'center',
   justifyContent:'center'
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.05,
  },
  backButton: {
    position: 'absolute',
    top: height * 0.05,
    left: width * 0.05,
    zIndex: 10,
    padding: 10,
  },
  image: {
    width: width * 0.7,
    height: height * 0.25,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  
  label: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 55,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    padding: 5,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '500',
  },
  signInButton: {
    backgroundColor: '#E6D25A',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  signInText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default SignInScreen;
