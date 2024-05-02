import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { StackNavigationProps } from '@/src/shared';
const BaseNavigator = ({ navigation, isLogin=false}: any, ) => {
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
      onPress={()=> navigation.navigate('SignInScreen')}
        style={{backgroundColor: isLogin ? '#064D7D' : 'white'}}className='border border-[#064D7D] rounded-tr-[30px] h-12 w-[50%] flex items-center justify-center'>
        <Text  style={{color: isLogin ? 'white' : '#064D7D'}} className="text-[15px]">Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
      onPress={()=> navigation.navigate('SignUpScreen')}
        style={{backgroundColor: isLogin ? 'white' : '#064D7D'}} className='border border-[#064D7D] rounded-tl-[30px] h-12 w-[50%] flex items-center justify-center'  >
        <Text style={{color: isLogin ? '#064D7D' : 'white'}} className="text-[15px]">Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width:'100%',
    backgroundColor:'white'
  },
  buttonText: {
    fontSize: 18,
  },
});

export default BaseNavigator;
