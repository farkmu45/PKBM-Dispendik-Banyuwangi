import * as NavigationBar from 'expo-navigation-bar'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../components/Button'
import Input from '../../components/Input'
import colors from '../../constants/colors'
import { ForgotPassword, Main, RegisterUser } from '../../constants/screens'

export default function LoginScreen({ route, navigation }) {
  const { isAdmin } = route.params
  NavigationBar.setBackgroundColorAsync(colors.primary[100])
  return (
    <SafeAreaView className='bg-primary-100 flex-1'>
      <StatusBar backgroundColor='transparent' style='dark' />
      <ScrollView>
        <View className='px-5 items-center py-10'>
          <Image
            className='h-40'
            resizeMode='contain'
            source={require('../../assets/images/logo.png')}
          />
          <Text className='text-2xl mt-10 font-Medium'>Masuk dengan akun</Text>
          <View className='rounded-md p-5 bg-white w-full mt-6'>
            <Input placeholder='E-mail atau username' />
            <Input placeholder='Kata sandi' className='mt-2' />

            <TouchableOpacity
              className='self-end mt-6'
              onPress={() => navigation.navigate(ForgotPassword)}
            >
              <Text className='text-sm font-Medium text-primary-600'>
                Lupa Sandi?
              </Text>
            </TouchableOpacity>
          </View>
          <Button
            className='self-stretch mt-5'
            onPress={() => navigation.replace(Main)}
          >
            Masuk
          </Button>

          {!isAdmin ? (
            <Button
              outline={true}
              className='self-stretch mt-3'
              onPress={() => navigation.navigate(RegisterUser)}
            >
              Daftar
            </Button>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
