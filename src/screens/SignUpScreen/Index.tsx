import React from 'react'
import SignUpScreen from './SignUpScreen'
import BaseNavigator from '@/src/navigations/BaseNavigator'
import { ScrollView } from 'react-native'
import { StackNavigationProps } from '@/src/shared'

const Index = ({ navigation }: StackNavigationProps) => {
  return (
    <ScrollView className='relative'>
      <SignUpScreen navigation={navigation} />
      <BaseNavigator navigation={navigation} className=""/>
    </ScrollView>
  )
}

export default Index