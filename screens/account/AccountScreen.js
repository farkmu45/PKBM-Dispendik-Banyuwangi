import { View, Text, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header'
import colors from '../../constants/colors'

export default function AccountScreen() {
  return (
    <SafeAreaView className='flex-1'>
      <Header />
      <ScrollView>
        <Text className='ml-4 text-2xl'>Informasi Akun</Text>
        <View className='m-4 p-4 bg-primary-100 rounded-md'>
          <Input label='Nama' />
          <Input label='Tanggal Lahir' className='mt-5' />
          <Input label='Email' className='mt-5' />
          <Input label='No. Telepon' className='mt-5' />
          <Input label='Lembaga' className='mt-5' />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

function Input({ label, style, ...props }) {
  return (
    <View style={style}>
      <Text className='text-base text-gray-400'>{label}</Text>
      <TextInput
        {...props}
        cursorColor={colors.primary[700]}
        className='border-b-2 text-base pb-1 border-gray-400  focus:border-primary-700'
      />
    </View>
  )
}
