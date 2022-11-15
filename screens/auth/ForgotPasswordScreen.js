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
    <SafeAreaView className='bg-primary-100 flex-1'>
      <StatusBar backgroundColor='transparent' style='dark' />
      <ScrollView>
        <View className='px-5 items-center py-10'>
          <Image source={require('../../assets/images/logo.png')} />
          <Text className='text-2xl mt-5 font-SemiBold'>Reset Password</Text>
          <View className='rounded-md p-5 bg-white w-full mt-6'>
            <Text className='text-base text-black mb-5 font-Regular'>
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
