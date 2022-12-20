import { MaterialIcons } from '@expo/vector-icons'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { useMutation, useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import * as ImagePicker from 'expo-image-picker'
import { Formik } from 'formik'
import React from 'react'
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
import * as Yup from 'yup'
import Button from '../../components/Button'
import ErrorModal from '../../components/ErrorModal'
import Header from '../../components/Header'
import Input from '../../components/Input'
import LoadingModal from '../../components/LoadingModal'
import themeColors from '../../constants/colors'
import { Activity, Main } from '../../constants/screens'
import api from '../../network/api'

export default function EditActivityScreen({ route, navigation }) {
  const { activityId } = route.params

  const { isLoading, error, data } = useQuery({
    queryKey: ['profile'],
    queryFn: () => api.get('/profile'),
  })

  const {
    isLoading: aLoading,
    error: aError,
    data: aData,
  } = useQuery({
    cacheTime: 0,
    queryKey: ['activityDetail', activityId],
    queryFn: () => api.get(`/activities/${activityId}`),
  })

  const mutation = useMutation({
    mutationFn: (params) =>
      api.post(`/activities/${activityId}?_method=PUT`, params, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    onSuccess: (result) => {
      if (result.ok) {
        navigation.replace(Main, { screen: Activity })
        ToastAndroid.show('Data aktivitas berhasil diubah', ToastAndroid.SHORT)
      } else return ErrorModal('Terjadi kesalahan saat mengubah data')
    },
    onError: () => ErrorModal('Terjadi kesalahan saat mengubah data'),
  })

  const onSubmit = (values) => {
    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('description', values.description)
    formData.append('date', format(values.date, 'yyyy-MM-dd'))

    if (values.isImageChanged) {
      formData.append('picture', {
        name: 'test',
        uri: values.image,
        type: 'image/jpg',
      })
    }

    mutation.mutate(formData)
  }

  const showDatePicker = (defaultVal, setFieldValue) => {
    DateTimePickerAndroid.open({
      maximumDate: new Date(),
      value: defaultVal,
      onChange: (event, selectedDate) => setFieldValue('date', selectedDate),
      mode: 'date',
    })
  }

  const pickImage = async (setFieldValue) => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
      })
      if (!result.canceled) {
        setFieldValue('image', result.assets[0].uri)
        setFieldValue('isImageChanged', true)
      }
    } catch (error) {
      Alert.alert(
        'Kesalahan',
        'Terjadi kesalahan saat memilih gambar, silahkan coba kembali'
      )
    }
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Wajib diisi'),
    description: Yup.string().required('Wajib diisi'),
    date: Yup.date().required('Wajib diisi'),
    image: Yup.string().required('Wajib diisi'),
  })

  if (isLoading || aLoading)
    return (
      <SafeAreaView className='flex-1'>
        <Header />
        <View className='flex-1 justify-center'>
          <ActivityIndicator size={50} color={themeColors.primary[700]} />
        </View>
      </SafeAreaView>
    )

  if (error || !data.ok || aError || !aData.ok)
    return Alert.alert(
      'Kesalahan',
      'Terjadi kesalahan, silahkan ulangi kembali',
      [
        {
          text: 'Ya',
          onPress: () => navigation.goBack(),
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

          <Formik
            initialValues={{
              name: aData.data.data.name,
              description: aData.data.data.description,
              date: new Date(aData.data.data.date),
              image: aData.data.data.picture,
              isImageChanged: false,
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <View className='gap-y-3 mt-4'>
                <View>
                  <Text className='text-sm mb-2 font-Regular text-gray-400'>
                    Gambar Kegiatan
                  </Text>
                  {values.image ? (
                    <>
                      <Image source={{ uri: values.image }} className='h-64' />
                      <Button
                        outline={true}
                        className='self-end mt-3'
                        onPress={() => pickImage(setFieldValue)}
                      >
                        Ubah
                      </Button>
                    </>
                  ) : (
                    <View
                      onTouchEnd={() => pickImage(setFieldValue)}
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

                  {touched.image && errors.image ? (
                    <Text className='font-Regular text-red-600 text-sm mt-1'>
                      {errors.image}
                    </Text>
                  ) : null}
                </View>
                <Input
                  label='Tanggal'
                  caretHidden={true}
                  onTouchEnd={() => showDatePicker(values.date, setFieldValue)}
                  error={touched.date && errors.date ? errors.date : null}
                  onBlur={handleBlur('date')}
                  value={format(values.date, 'dd/MM/yyyy')}
                />
                <Input
                  label='Nama Kegiatan'
                  onChangeText={handleChange('name')}
                  error={touched.name && errors.name ? errors.name : null}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
                <Input
                  onChangeText={handleChange('description')}
                  error={
                    touched.description && errors.description
                      ? errors.description
                      : null
                  }
                  onBlur={handleBlur('description')}
                  value={values.description}
                  className='mb-5'
                  label='Keterangan'
                  textAlignVertical='top'
                  multiline={true}
                  numberOfLines={6}
                />
                <Button onPress={handleSubmit}>Simpan</Button>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
