import { useNavigation } from '@react-navigation/native'
import { useInfiniteQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import React from 'react'
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  Text,
  View,
  Image,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header'
import colors from '../../constants/colors'
import api from '../../network/api'

export default function ActivityNowScreen() {
  const fetchActivities = async ({ pageParam = 0 }) => {
    let result = await api.get(
      `/activities?page=${pageParam}&created_at=${format(
        Date.now(),
        'yyyy-MM-dd'
      )}`
    )
    return result.data
  }

  const {
    isLoading,
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['activityNow'],
    queryFn: fetchActivities,
    getNextPageParam: (lastPage) => {
      if (lastPage.links.next != null) {
        return lastPage.meta.current_page + 1
      }
      return undefined
    },
  })

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  if (isLoading)
    return (
      <SafeAreaView className='flex-1'>
        <Header />
        <View className='flex-1 justify-center'>
          <ActivityIndicator size={50} color={colors.primary[700]} />
        </View>
      </SafeAreaView>
    )

  return (
    <SafeAreaView className='flex-1'>
      {error ? (
        Alert.alert(
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
      ) : (
        <>
          <Header />
          <FlatList
            data={data.pages.map((page) => page.data).flat()}
            contentContainerStyle={{ paddingBottom: 90 }}
            ListHeaderComponent={() => (
              <View className='px-4 mt-6 mb-7'>
                <Text className='text-3xl font-Bold'>Kegiatan Terbaru</Text>
              </View>
            )}
            progressViewOffset={50}
            refreshing={isLoading}
            ListEmptyComponent={
              <View className='flex-1 items-center'>
                <Image
                  resizeMode='contain'
                  className='w-[300] h-[300] mt-5'
                  source={require('../../assets/nodata.png')}
                />

                <Text className='text-xl text-gray-400 font-Medium'>
                  Tidak ada data
                </Text>
              </View>
            }
            onRefresh={refetch}
            onEndReached={loadMore}
            keyExtractor={(item, index) => index}
            ListFooterComponent={
              isFetchingNextPage ? (
                <ActivityIndicator
                  className='mt-5'
                  size='large'
                  color={colors.primary[500]}
                />
              ) : null
            }
            renderItem={({ item }) => <Item activity={item} />}
          />
        </>
      )}
    </SafeAreaView>
  )
}

function Item({ activity, deleteFunc }) {
  const navigation = useNavigation()
  return (
    <View className='border-primary-200 border-2 mx-4 my-3 rounded-lg'>
      <Pressable
        className='px-4 py-5'
        android_ripple={{ borderless: true }}
        onPress={() => {}}
      >
        <View className='flex-row items-center justify-between'>
          <View className='shrink mr-3'>
            <Text className='text-base text-primary-600 font-SemiBold'>
              {activity.name}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  )
}
