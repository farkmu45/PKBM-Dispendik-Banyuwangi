import { MaterialIcons } from '@expo/vector-icons'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import React, { useState } from 'react'
import { FlatList, Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header'
import colors from '../../constants/colors'
import { ActivityDetail } from '../../constants/screens'

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '1',
    title: 'Third Item',
  },
  {
    id: '2',
    title: 'Third Item',
  },
  {
    id: '3',
    title: 'Third Item',
  },
  {
    id: '4',
    title: 'Third Item',
  },
  {
    id: '5',
    title: 'Third Item',
  },
]

export default function ActivityListScreen({ navigation }) {
  const [date, setDate] = useState(new Date())

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

  return (
    <SafeAreaView className='flex-1'>
      <Header />

      <FlatList
        data={DATA}
        ListHeaderComponent={() => (
          <View className='px-5 mt-6 mb-2'>
            <Text className='text-3xl font-bold'>Agenda Kegiatan</Text>

            <View
              onTouchStart={showDatePicker}
              className='border-[1px] border-gray-400 mt-6 px-3 py-2 rounded-full'
            >
              <Text className='text-base'>{date.toLocaleString('ko-KR')}</Text>
            </View>
          </View>
        )}
        progressViewOffset={50}
        refreshing={false}
        onRefresh={() => {}}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className='bg-primary-100 m-4 rounded-lg'>
            <Pressable
              className='px-4 py-5'
              android_ripple={{ borderless: true }}
              onPress={() => {
                navigation.navigate(ActivityDetail)
              }}
            >
              <View className='justify-between flex-row'>
                <Text className='text-lg text-primary-600 font-semibold'>
                  Lembaga
                </Text>

                <MaterialIcons
                  name='keyboard-arrow-right'
                  size={24}
                  color={colors.primary[600]}
                />
              </View>
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  )
}
