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
  KeyboardAvoidingView,ImageBackground,
  Platform

} from 'react-native';
import Button from '../uikit/Button/Button';

import SvgEyeOutline from '../icons/SvgEyleOutLine';
import InputText from '../uikit/InputText/InputText';
import { useNavigation } from '@react-navigation/native';
import Svgmobile from '../icons/Svgmobile';
import SvgPassword from '../icons/SvgPassword';
import SvgBack from '../icons/SvgBack';
import SvgEye from '../icons/SvgEye';
import SvgEyeOff from '../icons/SvgEyeoff';

const { width, height } = Dimensions.get('window');

const SignInScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const gotoforgotpassword =()=>{
    console.log('calle')
    navigation.navigate('Frogotpaswordmobile')
  }
  return (
    <ImageBackground 
    //  behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
      source={require('../assets/frame.jpeg')}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.navigate('Common')} style={styles.backButton}>
          <SvgBack height={20} width={20} />
        </TouchableOpacity>

        {/* Image */}
        <Image source={require('../assets/phonelogin.png')} style={styles.image} />

        <View style={styles.inputContainer}>
          {/* Email Input */}
          <Text style={styles.label}> Mobile number</Text>
          <View style={styles.inputWrapper}>
            {/* <Svgmobile height={20} width={20} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Enter Your Phone Number"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            /> */}
              <InputText
                        name="Mobile number"
                      
                        maxLength={50}
                        keyboardType='text'
                        placeholder="Mobile Number"
                      />
          </View>

          {/* Password Input */}
          <Text style={styles.label}> Password</Text>
          <View style={styles.inputWrapper}>
            {/* <SvgPassword height={20} width={20} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Enter Your Password"
              placeholderTextColor="#888"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
            /> */}
             <InputText
                        maxLength={12}
                        placeholder="Enter password"
                        name="password"
                       
                        secureTextEntry={hidePassword}
                        actionRight={() => (
                          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                            {hidePassword ? <SvgEyeOutline /> : <SvgEye />}
                          </TouchableOpacity>
                        )}
                      />
        
          </View>

          {/* Forgot Password */}
          <TouchableOpacity onPress={gotoforgotpassword} style={styles.forgotPassword}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Sign-In Button */}
          {/* <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.signInText}>Login </Text>
          </TouchableOpacity> */}
              <Button   style={styles.button}>
                      Sign in
                    </Button>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
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
    width: width * 0.9,
    height: height * 0.25,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
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
    borderRadius: 8,
    paddingHorizontal: 14,
    height: 55,
    marginBottom: 15,
    borderColor: '#F2F2F4',
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
  button: {
    backgroundColor: '#E5D463',
    borderRadius: 10,
    paddingVertical: 2,
    width: '80%',
  },
 
});

export default SignInScreen;
