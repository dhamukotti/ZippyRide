import { StyleSheet,TouchableOpacity, Text,ImageBackground,Dimensions, View, ScrollView } from 'react-native'
import React from 'react'
import InputText from '../../uikit/InputText/InputText';
const { width, height } = Dimensions.get('window');
import SvgBack from '../../icons/SvgBack';

const Paymentrequest = () => {
  return (
  <View 
     //behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
     //source={require('../assets/frame.jpeg')}
     style={styles.container}>
              <TouchableOpacity style={styles.backButton} >
                <SvgBack height={20} width={20} />
              </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Add request Amount</Text>
   <View style={styles.overAll}>
   <InputText
                     name="Email"
                     maxLength={50}
                     placeholder="Enter your Email"
                     types='Number'
                   />
                   
                   </View>
        </ScrollView>
    </View>
  )
}

export default Paymentrequest

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
      }, overAll: {
        width: '100%',
        padding: width * 0.05,
        alignItems: 'center',
        justifyContent:'space-between'
      },
      title:{
        textAlign:'center',
        alignSelf:'center',
        fontSize:20,color:'black'
      },
      scrollContainer: {
        flexGrow: 1,
        paddingVertical: height * 0.12
        ,
        justifyContent: 'center',
        alignItems: 'center',
      },
      backButton: {
        position: 'absolute',
        top: height * 0.03,
        left: width * 0.02,
        zIndex: 10,
        padding: 10,
      },
})