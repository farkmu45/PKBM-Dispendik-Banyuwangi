import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  Pressable,
} from 'react-native'
import React from 'react'
import images from '../../constants/images'
import Button from '../../components/ButtonComponent'

export default function ForgotPasswordScreen() {
  return (
    <ScrollView className='h-full bg-blue-100'>
      <View className='px-5 items-center py-10'>
        <Image source={images.logoSecond} />
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
      </View>
      <Button title='Kirim' />
    </ScrollView>
  )
}
