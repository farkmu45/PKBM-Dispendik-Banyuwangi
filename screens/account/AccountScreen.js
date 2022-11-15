import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header'
import Input from '../../components/Input'

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
