import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Alert, ToastAndroid, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../components/Button'
import Header from '../../components/Header'
import Input from '../../components/Input'
import LoadingModal from '../../components/LoadingModal'
import { Institution, Main } from '../../constants/screens'
import api from '../../network/api'

export default function AddInstitutionScreen({ navigation }) {
  const [name, setName] = useState('')

  const mutation = useMutation({
    mutationFn: async (params) => {
      const result = await api.post('/institutions', params)
      return result
    },
    onSuccess: async (result) => {
      if (result.ok) {
        ToastAndroid.show(
          'Data institusi berhasil ditambahkan',
          ToastAndroid.SHORT
        )

        navigation.replace(Main, { screen: Institution })
      } else {
        Alert.alert(
          'Kesalahan',
          'Terjadi kesalahan saat menambahkan data, silahkan ulangi kembali',
          [{ text: 'OK' }]
        )
      }
    },
  })

  return (
    <SafeAreaView>
      {mutation.error
        ? Alert.alert(
            'Kesalahan',
            'Terjadi kesalahan saat menambahkan data, silahkan ulangi kembali',
            [{ text: 'OK' }]
          )
        : null}
      {mutation.isLoading ? <LoadingModal /> : null}
      <Header showBackButton={true} />
      <View className='m-4 items-end'>
        <View className='rounded p-5 bg-primary-100 w-full'>
          <Input value={name} onChangeText={setName} label='Nama Lembaga' />
        </View>
        <Button onPress={() => mutation.mutate({ name })} className='mt-6'>
          Simpan
        </Button>
      </View>
    </SafeAreaView>
  )
}
