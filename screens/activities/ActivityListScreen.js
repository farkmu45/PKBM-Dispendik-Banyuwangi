import { MaterialIcons } from '@expo/vector-icons'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'
import { useNavigation } from '@react-navigation/native'
import { useInfiniteQuery, useMutation } from '@tanstack/react-query'
import { format } from 'date-fns'
import React, { useContext, useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Linking,
  Modal,
  Pressable,
  Text,
  ToastAndroid,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../components/Button'
import ErrorModal from '../../components/ErrorModal'
import FAB from '../../components/FAB'
import Header from '../../components/Header'
import LoadingModal from '../../components/LoadingModal'
import colors from '../../constants/colors'
import {
  ActivityDetail,
  AddActivity,
  EditActivity,
} from '../../constants/screens'
import { AuthContext } from '../../contexts'
import api from '../../network/api'

export default function ActivityListScreen({ navigation }) {
  const [date, setDate] = useState('')
  const [showModal, setShowModal] = useState(false)
  const { auth } = useContext(AuthContext)
  let mountedOn

  useEffect(() => {
    mountedOn = Date.now()
  })

  const fetchActivities = async ({ pageParam = 0 }) => {
    let result = await api.get(`/activities?page=${pageParam}`)

    if (date)
      result = await api.get(
        `/activities?page=${pageParam}&date=${format(date, 'yyyy-MM-dd')}`
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
    queryKey: ['activityData'],
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

  // Delete mutation
  const mutation = useMutation({
    mutationFn: (params) => api.delete(`/activities/${params.id}`),
    onSuccess: (result) => {
      if (result.ok) {
        ToastAndroid.show('Data kegiatan berhasil dihapus', ToastAndroid.SHORT)
        refetch()
      } else ErrorModal('Terjadi kesalahan saat menghapus data kegiatan')
    },

    onError: () => ErrorModal('Terjadi kesalahan saat menghapus data kegiatan'),
  })

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate
    setDate(currentDate)

    setTimeout(() => {
      refetch()
    }, 500)
  }

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: date ? date : new Date(),
      onChange,
      mode: 'date',
    })
  }

  const downloadDoc = (type) => {
    const token = api.headers['Authorization'].replace('Bearer ', '')
    let url = `${api.getBaseURL()}/recap?_token=${token}&type=${type}`

    try {
      Linking.openURL(url)
    } catch (error) {
      ToastAndroid.show(
        'Terjadi kesalahan saat mengunduh dokumen',
        ToastAndroid.SHORT
      )
    }
  }

  const deleteItem = (id) =>
    Alert.alert('Peringatan', 'Apakah anda yakin ingin menghapus data ini?', [
      {
        text: 'Ya',
        onPress: () => {
          mutation.mutate({ id })
        },
        style: 'default',
      },
      {
        text: 'Tidak',
        style: 'cancel',
      },
    ])

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
      {mutation.isLoading ? <LoadingModal /> : null}
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
                <Text className='text-3xl font-Bold'>Agenda Kegiatan</Text>

                <View
                  onTouchStart={showDatePicker}
                  className='border-[1px] border-gray-400 mt-3 px-3 py-2 rounded-full'
                >
                  <Text className='text-base font-Regular text-gray-500'>
                    {date
                      ? format(date, 'dd/MM/yyyy')
                      : 'Filter berdasarkan tanggal'}
                  </Text>
                </View>

                {!auth.isAdmin && (
                  <Modal
                    visible={showModal}
                    transparent={true}
                    animationType='fade'
                    statusBarTranslucent={true}
                  >
                    <Pressable
                      onPress={() => setShowModal(false)}
                      className='flex-1 bg-black/30 justify-center z-30 px-10'
                    >
                      <View className='bg-white rounded-md'>
                        <Pressable
                          className='p-5'
                          android_ripple={{ borderless: false }}
                          onPress={() => downloadDoc('weekly')}
                        >
                          <Text className='font-Regular text-base'>
                            Rekap Mingguan
                          </Text>
                        </Pressable>
                        <Pressable
                          className='p-5'
                          android_ripple={{ borderless: false }}
                          onPress={() => downloadDoc('monthly')}
                        >
                          <Text className='font-Regular text-base'>
                            Rekap Bulanan
                          </Text>
                        </Pressable>
                        <Pressable
                          className='p-5'
                          android_ripple={{ borderless: false }}
                          onPress={() => downloadDoc('yearly')}
                        >
                          <Text className='font-Regular text-base'>
                            Rekap Tahunan
                          </Text>
                        </Pressable>
                      </View>
                    </Pressable>
                  </Modal>
                )}

                <View className='flex-row mt-3 justify-end'>
                  {!auth.isAdmin && (
                    <View className='rounded-full mr-1'>
                      <Pressable
                        className='px-3 py-2 flex-row items-center'
                        android_ripple={{ borderless: true }}
                        onPress={() => setShowModal(true)}
                      >
                        <MaterialIcons
                          name='file-download'
                          size={25}
                          color='black'
                        />
                        <Text className='font-Regular text-base ml-2'>
                          Unduh Rekap
                        </Text>
                      </Pressable>
                    </View>
                  )}

                  <Button
                    className=''
                    outline={true}
                    onPress={() => {
                      setDate('')
                      setTimeout(() => {
                        refetch()
                      }, 500)
                    }}
                  >
                    Hapus filter
                  </Button>
                </View>
              </View>
            )}
            progressViewOffset={50}
            refreshing={isLoading}
            onRefresh={refetch}
            onEndReached={loadMore}
            keyExtractor={(item, index) => index}
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
            ListFooterComponent={
              isFetchingNextPage ? (
                <ActivityIndicator
                  className='mt-5'
                  size='large'
                  color={colors.primary[500]}
                />
              ) : null
            }
            renderItem={({ item }) => (
              <Item activity={item} deleteFunc={() => deleteItem(item.id)} />
            )}
          />
          {!auth.isAdmin ? (
            <>
              <FAB
                iconName='add'
                onPress={() => navigation.navigate(AddActivity)}
              />
            </>
          ) : null}
        </>
      )}
    </SafeAreaView>
  )
}

function Item({ activity, deleteFunc }) {
  const navigation = useNavigation()
  return (
    <View className='bg-primary-100 mx-4 my-3 rounded-lg'>
      <Pressable
        className='px-4 py-5'
        android_ripple={{ borderless: true }}
        onPress={() => {
          navigation.navigate(ActivityDetail, {
            activityId: activity.id,
          })
        }}
      >
        <View className='flex-row items-center justify-between'>
          <View className='shrink mr-3'>
            <Text className='text-base text-primary-600 font-SemiBold'>
              {activity.name}
            </Text>
          </View>

          <View className='block ml-auto flex-row items-center gap-x-2'>
            {activity.is_owner && (
              <>
                <View className='bg-yellow-600 rounded-lg mr-2'>
                  <Pressable
                    className='p-2'
                    android_ripple={{ borderless: true }}
                    onPress={() => {
                      navigation.navigate(EditActivity, {
                        activityId: activity.id,
                      })
                    }}
                  >
                    <MaterialIcons name='edit' size={20} color='white' />
                  </Pressable>
                </View>

                <View className='rounded-lg bg-red-600'>
                  <Pressable
                    className='p-2'
                    android_ripple={{ borderless: true }}
                    onPress={deleteFunc}
                  >
                    <MaterialIcons
                      name='delete-outline'
                      size={20}
                      color='white'
                    />
                  </Pressable>
                </View>
              </>
            )}

            <MaterialIcons
              name='keyboard-arrow-right'
              size={24}
              color={colors.primary[600]}
            />
          </View>
        </View>
      </Pressable>
    </View>
  )
}
