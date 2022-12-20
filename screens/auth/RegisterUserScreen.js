import { MaterialIcons } from '@expo/vector-icons'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { useMutation, useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import * as NavigationBar from 'expo-navigation-bar'
import { StatusBar } from 'expo-status-bar'
import { Formik } from 'formik'
import React, { useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  ToastAndroid,
  View,
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Yup from 'yup'
import Button from '../../components/Button'
import ErrorModal from '../../components/ErrorModal'
import Input from '../../components/Input'
import LoadingModal from '../../components/LoadingModal'
import colors from '../../constants/colors'
import { Login } from '../../constants/screens'
import api from '../../network/api'

export default function RegisterUserScreen({ navigation }) {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState([])
  const [institution, setInstitution] = useState()
  const [date, setDate] = useState(new Date())

  // Institution fetch
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['institutionData'],
    queryFn: async () => {
      const result = await api.get('/institutions')
      return result
    },
    onSuccess: async (result) => {
      if (!error && result.ok) {
        const mapped = result.data.data.map((item) => ({
          label: item.name,
          value: item.id,
        }))

        setItems(mapped)
      } else {
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
      }
    },
  })

  const mutation = useMutation({
    mutationFn: (params) => api.post('/register', params),
    onSuccess: (result) => {
      if (result.ok) {
        ToastAndroid.show(
          'Berhasil mendaftar, silahkan login',
          ToastAndroid.SHORT
        )
        navigation.replace(Login, { isAdmin: false })
      } else ErrorModal('Terjadi kesalahan, silahkan ulangi kembali')
    },

    onError: () => ErrorModal('Terjadi kesalahan, silahkan ulangi kembali'),
  })

  const onSubmit = (values) => {
    const formatted = {
      ...values,
      date_of_birth: format(date, 'yyyy-MM-dd'),
      institution_id: institution,
    }
    mutation.mutate(formatted)
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

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Wajib diisi'),
    email: Yup.string().email('Email tidak valid').required('Wajib diisi'),
    password: Yup.string().required('Wajib diisi'),
    password_confirmation: Yup.string()
      .required('Wajib diisi')
      .oneOf([Yup.ref('password')], 'Password tidak sesuai'),
    phone_number: Yup.string().required('Wajib diisi'),
  })

  NavigationBar.setBackgroundColorAsync(colors.primary[100])

  if (isLoading)
    return (
      <SafeAreaView className='flex-1'>
        <View className='flex-1 justify-center'>
          <ActivityIndicator size={50} color={colors.primary[700]} />
        </View>
      </SafeAreaView>
    )

  return (
    <SafeAreaView className='flex-1 bg-primary-100'>
      <StatusBar backgroundColor='transparent' style='dark' />
      {mutation.isLoading ? <LoadingModal /> : null}
      {error || !data.ok ? (
        Alert.alert('Kesalahan', 'Terjadi kesalahan, silahkan ulangi kembali', [
          {
            text: 'Ya',
            onPress: refetch,
            style: 'default',
          },
        ])
      ) : (
        <>
          <ScrollView>
            <View className='rounded-full self-start m-3'>
              <Pressable
                className='p-1'
                onPress={() => navigation.goBack()}
                android_ripple={{ borderless: true }}
              >
                <MaterialIcons name='arrow-back' size={25} color='black' />
              </Pressable>
            </View>
            <View className='px-4 items-center'>
              <Image
                className='h-40'
                resizeMode='contain'
                source={require('../../assets/images/logo.png')}
              />

              <Formik
                initialValues={{
                  name: '',
                  email: '',
                  password: '',
                  password_confirmation: '',
                  phone_number: '',
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
                }) => (
                  <>
                    <View className='rounded-md px-4 flex-col gap-y-1 bg-white mt-6'>
                      {/* INPUT */}
                      <Input
                        placeholder='Nama'
                        onChangeText={handleChange('name')}
                        error={touched.name && errors.name ? errors.name : null}
                        onBlur={handleBlur('name')}
                        value={values.name}
                      />

                      <Input
                        caretHidden={true}
                        onTouchStart={showDatePicker}
                        placeholder={format(date, 'dd/MM/yyyy')}
                        value={format(date, 'dd/MM/yyyy')}
                      />

                      <Input
                        placeholder='Email'
                        autoCompleteType='email'
                        keyboardType='email-address'
                        error={
                          touched.email && errors.email ? errors.email : null
                        }
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                      />

                      <Input
                        placeholder='No Telepon'
                        keyboardType='phone-pad'
                        error={
                          touched.phone_number && errors.phone_number
                            ? errors.phone_number
                            : null
                        }
                        onChangeText={handleChange('phone_number')}
                        onBlur={handleBlur('phone_number')}
                        value={values.phone_number}
                      />

                      <Input
                        placeholder='Kata sandi'
                        secureTextEntry={true}
                        error={
                          touched.password && errors.password
                            ? errors.password
                            : null
                        }
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                      />

                      <Input
                        placeholder='Konfirmasi Kata sandi'
                        secureTextEntry={true}
                        error={
                          touched.password_confirmation &&
                          errors.password_confirmation
                            ? errors.password_confirmation
                            : null
                        }
                        onChangeText={handleChange('password_confirmation')}
                        onBlur={handleBlur('password_confirmation')}
                        value={values.password_confirmation}
                      />

                      <DropDownPicker
                        open={open}
                        value={institution}
                        items={items}
                        searchable={true}
                        listMode={'MODAL'}
                        setOpen={setOpen}
                        setValue={setInstitution}
                        placeholder='Lembaga'
                        setItems={setItems}
                        containerStyle={{
                          marginTop: 10,
                          marginBottom: 20,
                        }}
                        language='ID'
                        className='border-0 rounded-none border-b-2 p-0 border-gray-500'
                        textStyle={{
                          fontSize: 16,
                        }}
                      />
                    </View>
                    <Button
                      className='self-stretch mt-5 mb-5'
                      onPress={handleSubmit}
                    >
                      Daftar
                    </Button>
                  </>
                )}
              </Formik>
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  )
}
