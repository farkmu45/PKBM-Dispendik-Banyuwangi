import { MaterialIcons } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  Text,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FAB from '../../components/FAB'
import Header from '../../components/Header'
import colors from '../../constants/colors'
import { AddInstitution } from '../../constants/screens'
import { AuthContext } from '../../contexts'
import api from '../../network/api'

export default function InstitutionListScreen({ navigation }) {
  const { auth } = useContext(AuthContext)

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['institutionData'],
    queryFn: async () => {
      const result = await api.get('/institutions')
      return result
    },
  })

  if (isLoading) {
    return (
      <SafeAreaView className='flex-1'>
        <Header />
        <View className='flex-1 justify-center'>
          <ActivityIndicator size={50} color={colors.primary[700]} />
        </View>
      </SafeAreaView>
    )
  }

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
              <View className='flex-row items-center justify-between px-4 mb-2 mt-6'>
                <Text className='text-3xl font-Bold'>Daftar Lembaga</Text>
              </View>
            )}
            progressViewOffset={50}
            refreshing={isLoading}
            onRefresh={() => refetch()}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Item item={item} auth={auth} />}
          />
          <FAB
            iconName='add'
            onPress={() => navigation.navigate(AddInstitution)}
          />
        </>
      )}
    </SafeAreaView>
  )
}

function Item({ item }, auth) {
  return (
    <View className='mx-4 my-3 rounded-lg'>
      <Pressable
        className='px-3 py-5 bg-primary-100'
        android_ripple={{ borderless: true }}
        onPress={() => {}}
      >
        <View className='flex-row justify-between'>
          <View className='flex-shrink justify-center items-start'>
            <Text className='text-base font-Medium w-full'>{item.name}</Text>
          </View>
          <View className='flex-row self-center gap-x-2 ml-2'>
            {auth.isAdmin ? (
              <>
                <View className='bg-yellow-600 rounded-lg'>
                  <Pressable
                    className='p-2'
                    android_ripple={{ borderless: true }}
                    onPress={() => {
                      navigation.navigate(AddInstitution)
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
                    <MaterialIcons
                      name='delete-outline'
                      size={20}
                      color='white'
                    />
                  </Pressable>
                </View>
              </>
            ) : null}
          </View>
        </View>
      </Pressable>
    </View>
  )
}
