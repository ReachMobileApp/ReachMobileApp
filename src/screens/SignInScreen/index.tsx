import React from 'react'
import SignInScreen from './SignInScreen'
import BaseNavigator from '@/src/navigations/BaseNavigator'
import { ScrollView, View } from 'react-native'
import { StackNavigationProps } from '@/src/shared'

const Index = ({ navigation }: StackNavigationProps) => {
  return (
    <View className='relative h-full'>
      <SignInScreen navigation={navigation}  />
      <BaseNavigator isLogin navigation={navigation} className=""/>
    </View>
  )
}

export default Index