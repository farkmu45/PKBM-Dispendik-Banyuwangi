import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header'
import * as NavigationBar from 'expo-navigation-bar'
import { useIsFocused } from '@react-navigation/native'

export default function ActivityDetailScreen() {
  const isFocused = useIsFocused()
  isFocused ? NavigationBar.setBackgroundColorAsync('white') : null

  return (
    <SafeAreaView>
      <Header showBackButton={true} />
      <View className='px-4'>
        <Text className='text-base font-semibold'>Nama Lembaga :</Text>
        <Text className='text-base'>Lembaga 1</Text>
        <Text className='text-base font-semibold mt-3'>Gambar :</Text>
        <Image source={require('../../assets/icon.png')} className='w-full h-72 mt-1' />
        <Text className='text-base font-semibold mt-3'>Tanggal :</Text>
        <Text className='text-base'>Nama Kegiatan</Text>
        <Text className='text-base font-semibold mt-3'>Nama Kegiatan :</Text>
        <Text className='text-base'>Nama Kegiatan</Text>
        <Text className='text-base font-semibold mt-3'>Keterangan :</Text>
        <Text className='text-base'>Rapat Dinas</Text>
      </View>
    </SafeAreaView>
  )
}
