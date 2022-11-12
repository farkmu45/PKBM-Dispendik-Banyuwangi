import * as NavigationBar from 'expo-navigation-bar'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../components/Button'
import colors from '../../constants/colors'
import { ForgotPassword, Main } from '../../constants/screens'

export default function LoginScreen({ navigation }) {
  NavigationBar.setBackgroundColorAsync(colors.primary[100])
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.primary[100]} />
      <ScrollView className='h-full bg-primary-100'>
        <View className='px-5 items-center py-10'>
          <Image source={require('../../assets/images/logo.png')} />
          <Text className='text-2xl mt-5'>Masuk dengan akun</Text>
          <View className='rounded-md p-5 bg-white w-full mt-6'>
            <TextInput
              placeholder='E-mail atau username'
              className='border-b-2 border-gray-400 text-base'
            />
            <TextInput
              placeholder='Kata sandi'
              className='border-b-2 border-gray-400 mt-6 text-base'
            />

            <TouchableOpacity
              className='self-end mt-10'
              onPress={() => navigation.navigate(ForgotPassword)}
            >
              <Text className='text-base text-primary-600'>Lupa Sandi?</Text>
            </TouchableOpacity>
          </View>
          <Button
            className='self-stretch mt-5'
            onPress={() => navigation.replace(Main)}
          >
            Masuk
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
