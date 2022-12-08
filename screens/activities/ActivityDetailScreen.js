import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header'
import colors from '../../constants/colors'
import api from '../../network/api'

export default function ActivityDetailScreen({ route }) {
  const tabBarHeight = useBottomTabBarHeight()
  const { activityId } = route.params

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['activityDetail', activityId],
    queryFn: async () => {
      const result = await api.get(`/activities/${activityId}`)
      return result
    },
  })

  if (isLoading)
    return (
      <SafeAreaView className='flex-1'>
        <Header showBackButton={true} />
        <View className='flex-1 justify-center'>
          <ActivityIndicator size={50} color={colors.primary[700]} />
        </View>
      </SafeAreaView>
    )

  if (error || !data.ok)
    return Alert.alert(
      'Kesalahan',
      'Terjadi kesalahan saat mengambil data, silahkan ulangi kembali',
      [
        {
          text: 'Ya',
          onPress: refetch,
          style: 'default',
        },
      ]
    )

  return (
    <SafeAreaView className='flex-1'>
      <Header showBackButton={true} />
      <ScrollView contentContainerStyle={{ paddingBottom: tabBarHeight }}>
        <View className='px-4'>
          <Text className='text-base font-SemiBold'>Nama Lembaga :</Text>
          <Text className='text-base'>{data.data.data.institution}</Text>
          <Text className='text-base font-SemiBold mt-3'>Gambar :</Text>
          <Image
            source={{ uri: data.data.data.picture }}
            className='w-full h-72 mt-1'
          />
          <Text className='text-base font-semibold mt-3'>Tanggal :</Text>
          <Text className='text-base'>{data.data.data.date}</Text>
          <Text className='text-base font-semibold mt-3'>Nama Kegiatan :</Text>
          <Text className='text-base'>{data.data.data.name}</Text>
          <Text className='text-base font-semibold mt-3'>Keterangan :</Text>
          <Text className='text-base'>{data.data.data.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
