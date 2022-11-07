import { View, Text, FlatList, Animated, Pressable } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import { SafeAreaView } from 'react-native-safe-area-context'

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

export default function InstitutionListScreen() {

  return (
    <SafeAreaView>
      <Header />
      <FlatList
        data={DATA}
        ListHeaderComponent={() => (
          <Text className='text-2xl font-bold px-5 mt-6'>Daftar Lembaga</Text>
        )}
        progressViewOffset={50}
        refreshing={false}
        onRefresh={() => {}}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className='bg-white m-4 rounded-lg'>
            <Pressable
              className='px-3 py-5'
              android_ripple={{ borderless: true }}
              onPress={() => {}}
            >
              <Text>{item.title}</Text>
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  )
}
