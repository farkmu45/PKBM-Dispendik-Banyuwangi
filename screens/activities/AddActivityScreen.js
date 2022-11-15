import { MaterialIcons } from '@expo/vector-icons'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import * as ImagePicker from 'expo-image-picker'
import React, { useState } from 'react'
import { Alert, Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from 'tailwindcss/colors'
import Button from '../../components/Button'
import Header from '../../components/Header'
import Input from '../../components/Input'

export default function AddActivityScreen({ navigation }) {
  const [image, setImage] = useState(null)
  const [date, setDate] = useState(new Date())
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
      console.log(result)
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

  return (
    <SafeAreaView className='flex-1'>
      <Header showBackButton={true} />
      <ScrollView>
        <View className='p-4'>
          <Text className='text-base font-medium'>Nama lembaga :</Text>
          <Text className='text-base'>Lembaga 1</Text>

          <View className='gap-y-3 mt-8'>
            <View>
              <Text className='text-base mb-2'>Gambar Kegiatan</Text>
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
                  onTouchStart={pickImage}
                  className='h-64 bg-gray-200 justify-center'
                >
                  <View className='items-center gap-y-1'>
                    <MaterialIcons
                      name='file-upload'
                      size={33}
                      color={colors.gray[500]}
                    />
                    <Text className='text-sm text-gray-500'>
                      Upload gambar kegiatan
                    </Text>
                  </View>
                </View>
              )}
            </View>
            <Input
              label='Tanggal'
              caretHidden={true}
              onTouchStart={showDatePicker}
              value={date.toLocaleDateString()}
            />
            <Input label='Nama Kegiatan' />
            <Input
              className='mb-5'
              label='Keterangan'
              multiline={true}
              numberOfLines={6}
            />
            <Button onPress={() => navigation.navigate('Main')}>Kirim</Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
