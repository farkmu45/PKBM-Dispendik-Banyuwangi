import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import * as SecureStore from 'expo-secure-store'
import { StatusBar } from 'expo-status-bar'
import React, { useContext } from 'react'
import { Alert, Image, Pressable, View } from 'react-native'
import { AuthContext } from '../contexts'
import api from '../network/api'
import UserSelectionScreen from '../screens/auth/UserSelectionScreen'
import LoadingModal from './LoadingModal'

export default function Header({ showBackButton, style }) {
  const navigation = useNavigation()
  const { setAuth } = useContext(AuthContext)

  const mutation = useMutation({
    mutationFn: () => {
      return api.post('/logout')
    },
    onSuccess: async (result) => {
      if (result.ok) {
        setAuth({ signedIn: false })
        await SecureStore.deleteItemAsync('token')
        delete api.headers['Authorization']
        navigation.replace(UserSelectionScreen)
      } else {
        return Alert.alert(
          'Kesalahan',
          'Terjadi kesalahan saat logout, silahkan ulang kembali',
          [{ text: 'OK' }]
        )
      }
    },
  })

  function logout() {
    Alert.alert('Peringatan', 'Apakah anda yakin ingin keluar dari aplikasi?', [
      {
        text: 'Ya',
        style: 'default',
        onPress: () => mutation.mutate(),
      },
      { text: 'Tidak', style: 'cancel' },
    ])
  }

  return (
    <>
      <StatusBar backgroundColor='transparent' style='dark' />
      {mutation.isLoading ? <LoadingModal /> : null}

      <View
        className='flex-row justify-between items-center bg-white px-3 py-3'
        style={style}
      >
        {showBackButton ? (
          <View className='rounded-full'>
            <Pressable
              className='p-1'
              onPress={() => navigation.goBack()}
              android_ripple={{ borderless: true }}
            >
              <MaterialIcons name='arrow-back' size={25} color='black' />
            </Pressable>
          </View>
        ) : (
          <View className='flex-row gap-2 pl-1'>
            <Image
              source={require('../assets/images/logo_2.png')}
              className='w-8 h-8'
            />
            <Image
              source={require('../assets/images/logo.png')}
              className='w-8 h-8'
            />
          </View>
        )}

        <View className='flex-row'>
          <View className='rounded-full'>
            <Pressable
              onPress={logout}
              className='p-1'
              android_ripple={{ borderless: true }}
            >
              <MaterialIcons
                name='power-settings-new'
                size={25}
                color='black'
              />
            </Pressable>
          </View>
        </View>
      </View>
    </>
  )
}
