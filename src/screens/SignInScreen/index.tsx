import React from 'react'
import SignInScreen from './SignInScreen'
import { ScrollView, View } from 'react-native'
import { StackNavigationProps } from '@/src/shared'

const Index = ({ navigation }: StackNavigationProps) => {
  return (
    <ScrollView className='bg-white'>
      <SignInScreen navigation={navigation} route={{ key: 'signIn', name: 'SignInScreen' }} />
    </ScrollView>
  )
}

export default Index