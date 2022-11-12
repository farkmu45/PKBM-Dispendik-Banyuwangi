import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { FlatList, Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header'
import { AddInstitution } from '../../constants/screens'

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
          <View className='flex-row items-center justify-between px-4 mb-2 mt-6'>
            <Text className='text-3xl font-bold'>Daftar Lembaga</Text>
            <View className='rounded-full overflow-hidden'>
              <Pressable
                className='p-1'
                android_ripple={{ borderless: false }}
                onPress={() => {
                  navigation.navigate(AddInstitution)
                }}
              >
                <MaterialIcons name='add' size={25} color='black' />
              </Pressable>
            </View>
          </View>
        )}
        progressViewOffset={50}
        refreshing={false}
        onRefresh={() => {}}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Item item={item} />}
      />
    </SafeAreaView>
  )
}

function Item({ item }) {
  return (
    <View className='bg-slate-100 mx-4 my-3 rounded-lg'>
      <Pressable
        className='px-3 py-5'
        android_ripple={{ borderless: true }}
        onPress={() => {}}
      >
        <View className='flex-row justify-between'>
          <Text className='text-base font-medium self-center'>
            {item.title}
          </Text>
          <View className='flex-row self-center gap-2'>
            <View className='bg-yellow-600 rounded-lg'>
              <Pressable
                className='p-2'
                android_ripple={{ borderless: true }}
                onPress={() => {
                  // navigation.navigate(AddInstitution)
                }}
              >
                <MaterialIcons name='edit' size={20} color='white' />
              </Pressable>
            </View>

            <View className='rounded-lg bg-red-600'>
              <Pressable
                className='p-2'
                android_ripple={{ borderless: true }}
                onPress={() => {
                  // navigation.navigate(AddInstitution)
                }}
              >
                <MaterialIcons name='delete-outline' size={20} color='white' />
              </Pressable>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  )
}
