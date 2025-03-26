import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import React, {useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../uikit/Button/Button';
import Flex from '../uikit/Flex/Flex';
import Text from '../uikit/Text/Text';
import {THIS_FIELD_REQUIRED} from '../uikit/UikitUtils/constants';
import {isEmpty} from '../uikit/UikitUtils/validators';
import {ERROR, PRIMARY} from '../uikit/UikitUtils/colors';
import SvgEyeOutline from '../icons/SvgEyleOutLine';
import SvgEye from '../icons/SvgEye';
import InputText from '../uikit/InputText/InputText';
import SvgLock from '../icons/SvgLock';
import SvgPassword from '../icons/SvgPassword';
import Loader from '../uikit/Loader/Loader';
import * as Yup from 'yup';

import { useForgotpasswordMutation } from '../uikit/UikitUtils/Apiconfig';
const styles = StyleSheet.create({
  overAll: {
    padding: 24,
  },
  title: {
    marginTop: 50,
  },
  desStyle: {
    marginBottom: 30,
  },
  btnStyle: {
    marginTop: 50,
    marginBottom: 30,
  },
  marginTop16: {
    marginTop: 20,
  },
});

const CreatePasswordScreen = ({ route }) => {
  const navigation = useNavigation();
  const [isLoader, setLoader] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePassword1, setHidePassword1] = useState(true);
  const [otp, setotp] = useState('')
  const [email, setemail] = useState('')
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
    if (route.params?.otp) { // Ensures it runs only if mail is passed
      console.log(route.params?.otp,'otp')
      setotp(route.params?.otp)
      console.log(route.params?.email)
    }
    if (route.params?.email) { // Ensures it runs only if mail is passed
      console.log(route.params?.otp,'otp')
      setemail(route.params?.email)
      console.log(route.params?.email)
    }
    console.log(route.params?.otp,'otp')
    console.log(route.params?.email)
  }, [route.params?.mail]); 


  const handleValidate = values => {
    const errors = {};

   
   
 
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
    initialValues: { newPassword: '',confirmPassword:'' },
    validationSchema: forgotschema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const payload = {mobileOrEmail:email, newPassword: values.newPassword, confirmPassword: values.confirmPassword,OtpType: 'FP' };
        console.log(payload,'payload')
        const response = await useForgotpasswordMutation(payload);
        console.log(response,'ress')
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
          //  navigation.navigate('ForgotPasswordVerifyScreen',{mail:values.Email});
          }, 2000);
        }
      } catch (error) {
        console.error('Error:', error);
        setIsLoading(false);
        formik.resetForm()
      }
    },
  });
 
  return (
    <>
      {isLoader && <Loader />}
      <ScrollView>
        <Flex overrideStyle={styles.overAll}>
          <Text bold size={24} color="black" overrideStyle={styles.title}>
            Create Password
          </Text>
          <Text color="gray" overrideStyle={styles.desStyle}>
            Enter your new password and don’t forget again because it takes time
            return it
          </Text>
          <View style={styles.marginTop16}>
            <InputText
              maxLength={12}
              actionLeftStyle={{left: -4}}
              actionLeft={() => (
                <SvgLock
                  fill={
                    formik.errors.password && formik.touched.password
                      ? ERROR
                      : PRIMARY
                  }
                />
              )}
              placeholder="Password *"
              value={formik.values.newPassword}
              onChange={formik.handleChange('newPassword')}
              name={'newPassword'}
              touched={formik.touched}
              errors={formik.errors}
              error={formik.errors.newPassword && formik.touched.newPassword}
              secureTextEntry={hidePassword}
              actionRight={() => (
                <TouchableOpacity
                  onPress={() => setHidePassword(!hidePassword)}>
                  {hidePassword ? <SvgEyeOutline /> : <SvgEye />}
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={styles.marginTop16}>
            <InputText
              maxLength={20}
              actionLeftStyle={{left: -4}}
              actionLeft={() => (
                <SvgPassword
                  fill={
                    formik.errors.confirmPassword &&
                    formik.touched.confirmPassword
                      ? ERROR
                      : PRIMARY
                  }
                />
              )}
              placeholder="Confirm password *"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange('confirmPassword')}
              name={'confirmPassword'}
              touched={formik.touched}
              errors={formik.errors}
              error={
                formik.errors.confirmPassword && formik.touched.confirmPassword
              }
              secureTextEntry={hidePassword1}
              actionRight={() => (
                <TouchableOpacity
                  onPress={() => setHidePassword1(!hidePassword1)}>
                  {hidePassword1 ? <SvgEyeOutline /> : <SvgEye />}
                </TouchableOpacity>
              )}
            />
          </View>
          <Button onClick={()=>{
            formik.handleSubmit()}} overrideStyle={styles.btnStyle}>
            Save
          </Button>
        </Flex>
      </ScrollView>
    </>
  );
};

export default CreatePasswordScreen;
