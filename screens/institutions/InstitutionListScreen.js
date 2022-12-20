import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Pressable,
  Text,
  ToastAndroid,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FAB from '../../components/FAB'
import Header from '../../components/Header'
import LoadingModal from '../../components/LoadingModal'
import colors from '../../constants/colors'
import { ManageInstitution } from '../../constants/screens'
import { AuthContext } from '../../contexts'
import api from '../../network/api'

export default function InstitutionListScreen({ navigation }) {
  const { auth } = useContext(AuthContext)

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['institutionData'],
    queryFn: () => api.get('/institutions'),
  })

  const mutation = useMutation({
    mutationFn: (params) => api.delete(`/institutions/${params.id}`),
    onSuccess: (result) => {
      if (result.ok) {
        ToastAndroid.show('Data institusi berhasil dihapus', ToastAndroid.SHORT)
        refetch()
      } else ErrorModal('Terjadi kesalahan saat menghapus institusi')
    },

    onError: () => ErrorModal('Terjadi kesalahan saat menghapus institusi'),
  })

  const deleteItem = (id) =>
    Alert.alert(
      'Peringatan',
      'Apakah anda yakin ingin menghapus institusi ini?',
      [
        {
          text: 'Ya',
          onPress: () => mutation.mutate({ id }),
          style: 'default',
        },
        {
          text: 'Tidak',
          style: 'cancel',
        },
      ]
    )

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
      {mutation.isLoading && <LoadingModal />}

      {error || !data.ok ? (
        Alert.alert(
          'Kesalahan',
          'Terjadi kesalahan saat, silahkan ulangi kembali',
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
            renderItem={({ item }) => (
              <Item
                item={item}
                isAdmin={auth.isAdmin}
                deleteFunc={() => deleteItem(item.id)}
              />
            )}
          />

          {auth.isAdmin ? (
            <FAB
              iconName='add'
              onPress={() => navigation.navigate(ManageInstitution)}
            />
          ) : null}
        </>
      )}
    </SafeAreaView>
  )
}

function Item({ item, isAdmin, deleteFunc }) {
  const navigation = useNavigation()
  return (
    <View className='mx-4 my-3 rounded-lg px-3 py-5 bg-primary-100'>
      <View className='flex-row justify-between'>
        <View className='flex-shrink justify-center items-start'>
          <Text className='text-base font-Medium w-full'>{item.name}</Text>
        </View>
        <View className='flex-row self-center gap-x-2 ml-2'>
          {isAdmin ? (
            <>
              <View className='bg-yellow-600 rounded-lg'>
                <Pressable
                  className='p-2'
                  android_ripple={{ borderless: true }}
                  onPress={() => {
                    navigation.navigate(ManageInstitution, {
                      institution: item,
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
          ) : null}
        </View>
      </View>
    </View>
  )
}
