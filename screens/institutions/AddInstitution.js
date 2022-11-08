import {
  View,
  Text,
  FlatList,
  Animated,
  Pressable,
  Image,
  TextInput,
} from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../../constants/images'
import ButtonComponent from '../../components/ButtonComponent'
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

export default function AddInstitution({ navigation }) {
  return (
    <SafeAreaView className='flex-1'>
      <Header />
      <View className='m-5'>
        <View className='rounded p-5 bg-blue-300 w-full mt-6'>
          <Text className=''>Nama Lembaga</Text>
          <TextInput className='border-b-2 border-gray-400 text-base' />
        </View>
      </View>
      <ButtonComponent title={'Simpan'} />
    </SafeAreaView>
  )
}
