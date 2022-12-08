import { MaterialIcons } from '@expo/vector-icons'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { useMutation, useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import * as ImagePicker from 'expo-image-picker'
import React, { useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  ToastAndroid,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from 'tailwindcss/colors'
import Button from '../../components/Button'
import Header from '../../components/Header'
import Input from '../../components/Input'
import LoadingModal from '../../components/LoadingModal'
import themeColors from '../../constants/colors'
import { Activity, Main } from '../../constants/screens'
import api from '../../network/api'

export default function AddActivityScreen({ navigation }) {
  const [image, setImage] = useState(null)
  const [date, setDate] = useState(new Date())
  const [name, setName] = useState()
  const [description, setDescription] = useState()

  const { isLoading, error, data } = useQuery({
    queryKey: ['insitutionFetch'],
    queryFn: async () => {
      const result = await api.get('/profile')
      return result
    },
  })

  const mutation = useMutation({
    mutationFn: async (params) => {
      const result = await api.post('/activities', params, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return result
    },
    onSuccess: async (result) => {
      if (result.ok) {
        ToastAndroid.show(
          'Data aktivitas berhasil ditambahkan',
          ToastAndroid.SHORT
        )

        navigation.replace(Main, { screen: Activity })
      } else {
        console.log(result.data)
        Alert.alert(
          'Kesalahan',
          'Terjadi kesalahan saat menambahkan data, silahkan ulangi kembali',
          [{ text: 'OK' }]
        )
      }
    },
  })

  const onSubmit = () => {
    const formData = new FormData()

    formData.append('name', name)
    formData.append('description', description)
    formData.append('date', format(date, 'yyyy-MM-dd'))
    formData.append('picture', {
      name: 'test',
      uri: image,
      type: 'image/jpg',
    })

    console.log(formData.getAll('picture'))

    mutation.mutate(formData)
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate
    setDate(currentDate)
  }

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      maximumDate: new Date(),
      value: date,
      onChange,
      mode: 'date',
    })
  }

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
      })
      if (!result.canceled) {
        setImage(result.uri)
      }
    } catch (error) {
      Alert.alert(
        'Kesalahan',
        'Terjadi kesalahan saat memilih gambar, silahkan coba kembali'
      )
    }
  }

  if (isLoading)
    return (
      <SafeAreaView className='flex-1'>
        <Header />
        <View className='flex-1 justify-center'>
          <ActivityIndicator size={50} color={themeColors.primary[700]} />
        </View>
      </SafeAreaView>
    )

  if (error || !data.ok || mutation.error)
    return Alert.alert(
      'Kesalahan',
      'Terjadi kesalahan, silahkan ulangi kembali',
      [
        {
          text: 'Ya',
          style: 'default',
        },
      ]
    )

  return (
    <SafeAreaView className='flex-1'>
      <Header showBackButton={true} />
      {mutation.isLoading ? <LoadingModal /> : null}
      <ScrollView>
        <View className='p-4'>
          <Text className='text-base font-SemiBold'>Nama lembaga :</Text>
          <Text className='text-base font-Regular'>
            {data.data.data.institution}
          </Text>

          <View className='gap-y-3 mt-8'>
            <View>
              <Text className='text-base mb-2 font-Regular'>
                Gambar Kegiatan
              </Text>
              {image ? (
                <>
                  <Image source={{ uri: image }} className='h-64' />
                  <Button
                    outline={true}
                    className='self-end mt-3'
                    onPress={pickImage}
                  >
                    Ubah
                  </Button>
                </>
              ) : (
                <View
                  onTouchEnd={pickImage}
                  className='h-64 bg-gray-200 justify-center'
                >
                  <View className='items-center gap-y-1'>
                    <MaterialIcons
                      name='file-upload'
                      size={33}
                      color={colors.gray[500]}
                    />
                    <Text className='text-sm font-Regular text-gray-500'>
                      Upload gambar kegiatan
                    </Text>
                  </View>
                </View>
              )}
            </View>
            <Input
              label='Tanggal'
              caretHidden={true}
              onTouchEnd={showDatePicker}
              value={format(date, 'dd/MM/yyyy')}
            />
            <Input label='Nama Kegiatan' onChangeText={setName} />
            <Input
              onChangeText={setDescription}
              className='mb-5'
              label='Keterangan'
              textAlignVertical='top'
              multiline={true}
              numberOfLines={6}
            />
            <Button onPress={onSubmit}>Kirim</Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
