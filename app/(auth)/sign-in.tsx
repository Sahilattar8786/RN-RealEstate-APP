import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
export default function SignIn() {
  return (
    <ScrollView
      className='bg-white'
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps='handled'
    >
      <View className="flex-1 justify-center px-6 py-12">
        <Image 
         source={require('../../assets/images/kribb.png')} 
         className='w-32 h-16 mb-8'
         resizeMode='contain'
         />
         <Text className="text-3xl font-bold text-grey-800 mb-2">Create Account</Text>
         <Text className="text-grey-500 mb-8">Find Your Dream Home Today</Text>
      </View>
    </ScrollView>
  )
}