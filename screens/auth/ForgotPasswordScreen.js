import { useMutation } from '@tanstack/react-query'
import * as NavigationBar from 'expo-navigation-bar'
import { StatusBar } from 'expo-status-bar'
import { Formik } from 'formik'
import React from 'react'
import {
  Alert,
  Image,
  ScrollView,
  Text,
  ToastAndroid,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Yup from 'yup'
import Button from '../../components/Button'
import ErrorModal from '../../components/ErrorModal'
import Input from '../../components/Input'
import LoadingModal from '../../components/LoadingModal'
import colors from '../../constants/colors'
import { Login } from '../../constants/screens'
import api from '../../network/api'

export default function ForgotPasswordScreen({ navigation }) {
  NavigationBar.setBackgroundColorAsync(colors.primary[100])

  const mutation = useMutation({
    mutationFn: (params) => api.post('/forgot-password', params),
    onSuccess: (result) => {
      if (result.ok) {
        navigation.replace(Login, { isAdmin: false })
        ToastAndroid.show(
          'Link reset password berhasil dikirimkan ke email anda',
          ToastAndroid.SHORT
        )
      } else return ErrorModal('Terjadi kesalahan, silahkan cek email kembali')
    },
    onError: () => ErrorModal('Terjadi kesalahan, silahkan cek email kembali'),
  })

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email tidak valid').required('Wajib diisi'),
  })

  const onSubmit = (values) => {
    mutation.mutate(values)
  }

  return (
    <SafeAreaView className='bg-primary-100 flex-1'>
      <StatusBar backgroundColor='transparent' style='dark' />
      {mutation.isLoading ? <LoadingModal /> : null}
      <ScrollView>
        <View className='px-5 items-center py-10'>
          <Image
            className='h-40'
            resizeMode='contain'
            source={require('../../assets/images/logo.png')}
          />
          <Text className='text-2xl mt-10 font-Medium'>Reset Password</Text>

          <Formik
            initialValues={{
              email: '',
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
                <View className='rounded-md p-5 bg-white w-full mt-6'>
                  <Text className='text-base text-black mb-5 font-Regular'>
                    Masukkan email yang terdaftar untuk mendapatkan sandi baru.
                  </Text>
                  <Input
                    placeholder='E-mail'
                    autoCompleteType='email'
                    keyboardType='email-address'
                    onChangeText={handleChange('email')}
                    error={touched.email && errors.email ? errors.email : null}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                </View>
                <Button className='self-stretch mt-5' onPress={handleSubmit}>
                  Kirim
                </Button>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
