import { MaterialIcons } from '@expo/vector-icons'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import React, { useContext, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FAB from '../../components/FAB'
import Header from '../../components/Header'
import colors from '../../constants/colors'
import { ActivityDetail, AddActivity } from '../../constants/screens'
import { AuthContext } from '../../contexts'
import api from '../../network/api'

export default function ActivityListScreen({ navigation }) {
  const [date, setDate] = useState(new Date())
  const { auth } = useContext(AuthContext)

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['activityData'],
    queryFn: async () => {
      const result = await api.get('/activities')
      return result
    },
  })

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate
    setDate(currentDate)
  }

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: 'date',
    })
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
      {error || !data.ok ? (
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
            data={data.data.data}
            contentContainerStyle={{ paddingBottom: 90 }}
            ListHeaderComponent={() => (
              <View className='px-5 mt-6 mb-7'>
                <Text className='text-3xl font-Bold'>Agenda Kegiatan</Text>

                <View
                  onTouchStart={showDatePicker}
                  className='border-[1px] border-gray-400 mt-6 px-3 py-2 rounded-full'
                >
                  <Text className='text-base font-Regular'>
                    {format(date, 'dd/MM/yyyy')}
                  </Text>
                </View>
              </View>
            )}
            progressViewOffset={50}
            refreshing={isLoading}
            onRefresh={refetch}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className='bg-primary-100 mx-4 my-3 rounded-lg'>
                <Pressable
                  className='px-4 py-5'
                  android_ripple={{ borderless: true }}
                  onPress={() => {
                    navigation.navigate(ActivityDetail, {
                      activityId: item.id,
                    })
                  }}
                >
                  <View className='flex-row items-center'>
                    <View className='shrink mr-3'>
                      <Text className='text-base text-primary-600 font-SemiBold'>
                        {item.name}
                      </Text>
                    </View>

                    <View className='block ml-auto'>
                      <MaterialIcons
                        name='keyboard-arrow-right'
                        size={24}
                        color={colors.primary[600]}
                      />
                    </View>
                  </View>
                </Pressable>
              </View>
            )}
          />
          {!auth.isAdmin ? (
            <FAB
              iconName='add'
              onPress={() => navigation.navigate(AddActivity)}
            />
          ) : null}
        </>
      )}
    </SafeAreaView>
  )
}
