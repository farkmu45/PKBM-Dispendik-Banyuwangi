import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Image, ScrollView, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../components/Button'
import colors from '../../constants/colors'
import * as NavigationBar from 'expo-navigation-bar'

export default function ForgotPasswordScreen() {
  NavigationBar.setBackgroundColorAsync(colors.primary[100])
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.primary[100]} />
      <ScrollView className='h-full bg-primary-100'>
        <View className='px-5 items-center py-10'>
          <Image source={require('../../assets/images/logo.png')} />
          <Text className='text-2xl mt-5'>Reset Password</Text>
          <View className='rounded-md p-5 bg-white w-full mt-6'>
            <Text className='text-lg text-black mb-5'>
              Masukkan email yang terdaftar untuk mendapatkan sandi baru.
            </Text>
            <TextInput
              placeholder='E-mail'
              className='border-b-2 border-gray-400 text-base'
            />
          </View>
          <Button className='self-stretch mt-5'>Kirim</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
