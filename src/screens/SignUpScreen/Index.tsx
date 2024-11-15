import React from 'react'
import SignUpScreen from './SignUpScreen'
import { ScrollView } from 'react-native'
import { StackNavigationProps } from '@/src/shared'

const Index = ({ navigation }: StackNavigationProps) => {
  return (
    <ScrollView className='relative'>
      <SignUpScreen navigation={navigation} route={{ key: 'signup', name: 'SignUpScreen' }} />
    </ScrollView>
  )
}

export default Index