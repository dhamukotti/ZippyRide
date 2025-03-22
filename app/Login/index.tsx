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
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SvgEmail from '../icons/SvgEmail';
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

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.navigate('Common')} style={styles.backButton}>
          <SvgBack height={20} width={20} />
        </TouchableOpacity>

        {/* Image */}
        <Image source={require('../assets/image1.png')} style={styles.image} />

        <View style={styles.inputContainer}>
          {/* Email Input */}
          <Text style={styles.label}> Email</Text>
          <View style={styles.inputWrapper}>
            <SvgEmail height={20} width={20} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Enter Your Email"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password Input */}
          <Text style={styles.label}> Password</Text>
          <View style={styles.inputWrapper}>
            <SvgPassword height={20} width={20} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Enter Your Password"
              placeholderTextColor="#888"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIcon}>
              {isPasswordVisible ? <SvgEye height={20} width={20} /> : <SvgEyeOff height={20} width={20} />}
            </TouchableOpacity>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Sign-In Button */}
          <TouchableOpacity onPress={()=>navigation.navigate('Places')} style={styles.signInButton}>
            <Text style={styles.signInText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
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
