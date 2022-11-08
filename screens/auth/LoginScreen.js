import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Button,
  Pressable,
} from 'react-native'
import React from 'react'
import ButtonComponent from '../../components/ButtonComponent'

export default function LoginScreen({ navigation }) {
  return (
    <ScrollView className='h-full bg-blue-100'>
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
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text className='text-base text-blue-400'>Lupa Sandi?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ButtonComponent
        title={'Masuk'}
        onPress={() => navigation.navigate('Main')}
      />
    </ScrollView>
  )
}
