import { View, Text, FlatList, Animated, Pressable, Image } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../../constants/images'

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

export default function InstitutionListScreen({ navigation }) {
  return (
    <SafeAreaView className='flex-1'>
      <Header />
      <FlatList
        data={DATA}
        ListHeaderComponent={() => (
          <View className='flex-row justify-between'>
            <Text className='text-2xl font-bold px-5 mt-6'>Daftar Lembaga</Text>
            <Pressable
              onPress={() => {
                navigation.navigate('AddInstitution')
              }}
              className='text-2xl font-bold px-5 mt-6'
            >
              <Image className='w-8 h-8 self-center' source={images.addIcon} />
            </Pressable>
          </View>
        )}
        progressViewOffset={50}
        refreshing={false}
        onRefresh={() => {}}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className='bg-gray-100 m-4 rounded-lg p-4 '>
            <Pressable
              className='px-3 py-5'
              android_ripple={{ borderless: true }}
              onPress={() => {}}
            >
              <View className='flex-row justify-between'>
                <Text className='text-base self-center'>{item.title}</Text>
                <View className='flex-row self-center'>
                  <Image className='w-8 h-8 mx-1' source={images.editIcon} />
                  <Image className='w-8 h-8 mx-1' source={images.trashIcon} />
                </View>
              </View>
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  )
}
