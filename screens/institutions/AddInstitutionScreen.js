import React from 'react'
import { Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../components/Button'
import Header from '../../components/Header'
import Input from '../../components/Input'

export default function AddInstitutionScreen() {
  return (
    <SafeAreaView>
      <Header showBackButton={true} />
      <View className='m-4 items-end'>
        <View className='rounded p-5 bg-primary-100 w-full'>
          <Input label='Nama Lembaga' />
        </View>
        <Button className='mt-6'>Simpan</Button>
      </View>
    </SafeAreaView>
  )
}
