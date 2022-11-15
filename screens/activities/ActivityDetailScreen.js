import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

export default function ActivityDetailScreen() {
  const tabBarHeight = useBottomTabBarHeight()
  return (
    <SafeAreaView className='flex-1'>
      <Header showBackButton={true} />

      <ScrollView contentContainerStyle={{ paddingBottom: tabBarHeight }}>
        <View className='px-4'>
          <Text className='text-base font-SemiBold'>Nama Lembaga :</Text>
          <Text className='text-base'>Lembaga 1</Text>
          <Text className='text-base font-SemiBold mt-3'>Gambar :</Text>
          <Image
            source={require('../../assets/icon.png')}
            className='w-full h-72 mt-1'
          />
          <Text className='text-base font-semibold mt-3'>Tanggal :</Text>
          <Text className='text-base'>Nama Kegiatan</Text>
          <Text className='text-base font-semibold mt-3'>Nama Kegiatan :</Text>
          <Text className='text-base'>Nama Kegiatan</Text>
          <Text className='text-base font-semibold mt-3'>Keterangan :</Text>
          <Text className='text-base'>Rapat Dinas</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
