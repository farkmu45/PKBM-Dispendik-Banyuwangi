import { useMutation } from '@tanstack/react-query'
import * as NavigationBar from 'expo-navigation-bar'
import * as SecureStore from 'expo-secure-store'
import { StatusBar } from 'expo-status-bar'
import { Formik } from 'formik'
import React, { useContext } from 'react'
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Yup from 'yup'
import Button from '../../components/Button'
import ErrorModal from '../../components/ErrorModal'
import Input from '../../components/Input'
import LoadingModal from '../../components/LoadingModal'
import colors from '../../constants/colors'

import {
  ForgotPassword,
  Home,
  Main,
  RegisterUser,
} from '../../constants/screens'
import { AuthContext } from '../../contexts'
import api from '../../network/api'

import registerForPushNotificationsAsync from '../../registerPushNotificationAsync'

export default function LoginScreen({ route, navigation }) {
  const { isAdmin } = route.params
  const auth = useContext(AuthContext)

  const mutation = useMutation({
    mutationFn: (params) => api.post('/login', params),
    onSuccess: async (result) => {
      if (result.ok) {
        const tokenData = result.data.data.token
        const roleData = result.data.data.role_id
        api.setHeader('Authorization', `Bearer ${tokenData}`)
        const expoToken = await registerForPushNotificationsAsync()

        const subscribe = await api.post('/exponent/devices/subscribe', {
          expo_token: expoToken,
        })

        await SecureStore.setItemAsync('token', tokenData)
        await SecureStore.setItemAsync('role', roleData)
        await SecureStore.setItemAsync('expoToken', expoToken)

        auth.setAuth({ signedIn: true, isAdmin: roleData == 1 ? false : true })

        navigation.replace(Main, { screen: Home })
      } else
        return ErrorModal(
          'Terjadi kesalahan saat login, silahkan cek email dan password anda kembali'
        )
    },

    onError: () =>
      ErrorModal(
        'Terjadi kesalahan saat login, silahkan cek email dan password anda kembali'
      ),
  })

  const onSubmit = (values) => {
    mutation.mutate(values)
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email tidak valid').required('Wajib diisi'),
    password: Yup.string().required('Wajib diisi'),
  })

  NavigationBar.setBackgroundColorAsync(colors.primary[100])

  return (
    <SafeAreaView className='bg-primary-100 flex-1'>
      <StatusBar backgroundColor='transparent' style='dark' />
      <ScrollView>
        {mutation.isLoading ? <LoadingModal /> : null}

        <View className='px-5 items-center py-10'>
          <Image
            className='h-40'
            resizeMode='contain'
            source={require('../../assets/images/logo.png')}
          />
          <Text className='text-2xl mt-10 font-Medium'>Masuk dengan akun</Text>
          <Formik
            initialValues={{
              email: '',
              password: '',
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
                <View className='overflow-hidden rounded-md p-5 bg-white w-full mt-6'>
                  <Input
                    placeholder='E-mail'
                    autoCompleteType='email'
                    keyboardType='email-address'
                    onChangeText={handleChange('email')}
                    error={touched.email && errors.email ? errors.email : null}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                  <Input
                    className='mt-2'
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

                  <TouchableOpacity
                    className='self-end mt-6'
                    onPress={() => navigation.navigate(ForgotPassword)}
                  >
                    <Text className='text-sm font-Medium text-primary-600'>
                      Lupa Sandi?
                    </Text>
                  </TouchableOpacity>
                </View>
                <Button className='self-stretch mt-5' onPress={handleSubmit}>
                  Masuk
                </Button>
              </>
            )}
          </Formik>

          {!isAdmin ? (
            <Button
              outline={true}
              className='self-stretch mt-3'
              onPress={() => navigation.navigate(RegisterUser)}
            >
              Daftar
            </Button>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
