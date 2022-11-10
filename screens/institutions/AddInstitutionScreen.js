import React from 'react'
import {
  Text, TextInput, View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ButtonComponent from '../../components/ButtonComponent'
import Header from '../../components/Header'


export default function AddInstitutionScreen({ navigation }) {
  return (
    <SafeAreaView className='flex-1'>
      <Header />
      <View className='m-5'>
        <View className='rounded p-5 bg-blue-300 w-full mt-6'>
          <Text className=''>Nama Lembaga</Text>
          <TextInput className='border-b-2 border-gray-400 text-base' />
        </View>
      </View>
      <ButtonComponent title={'Simpan'} />
    </SafeAreaView>
  )
}
