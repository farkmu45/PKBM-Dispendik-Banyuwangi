import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { useMutation, useQuery } from '@tanstack/react-query'
import { format, parse } from 'date-fns'
import { Formik } from 'formik'
import React from 'react'
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    Text,
    ToastAndroid,
    View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Yup from 'yup'
import Button from '../../components/Button'
import ErrorModal from '../../components/ErrorModal'
import Header from '../../components/Header'
import Input from '../../components/Input'
import LoadingModal from '../../components/LoadingModal'
import colors from '../../constants/colors'
import api from '../../network/api'

export default function AdminAccountScreen() {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['profileAdmin'],
    queryFn: () => api.get('/profile'),
  })

  const mutation = useMutation({
    mutationFn: (params) => api.put('/profile', params),
    onSuccess: (result) => {
      if (result.ok) {
        ToastAndroid.show('Data profil berhasil diubah', ToastAndroid.SHORT)
      } else
        return ErrorModal(
          'Terjadi kesalahan saat mengubah data profil, silahkan ulangi kembali'
        )
    },

    onError: () =>
      ErrorModal(
        'Terjadi kesalahan saat mengubah data profil, silahkan ulangi kembali'
      ),
  })

  const showDatePicker = (defaultVal, setFieldValue) => {
    DateTimePickerAndroid.open({
      maximumDate: new Date(),
      value: defaultVal,
      onChange: (event, selectedDate) =>
        setFieldValue('date_of_birth', selectedDate),
      mode: 'date',
    })
  }

  const onSubmit = (values) => {
    const date = format(values.date_of_birth, 'yyyy-MM-dd')
    mutation.mutate({ ...values, date_of_birth: date })
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Wajib diisi'),
    email: Yup.string().email('Email tidak valid').required('Wajib diisi'),
    date_of_birth: Yup.date().required('Wajib diisi'),
    phone_number: Yup.string().required('Wajib diisi'),
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
      <Header />
      {mutation.isLoading ? <LoadingModal /> : null}
      {error ||  !data.ok ? (
        Alert.alert('Kesalahan', 'Terjadi kesalahan, silahkan ulangi kembali', [
          {
            text: 'Ya',
            onPress: () => {
              refetch()
            },
            style: 'default',
          },
        ])
      ) : (
        <Formik
          initialValues={{
            name: data.data.data.name,
            email: data.data.data.email,
            date_of_birth: parse(
              data.data.data.date_of_birth,
              'yyyy-MM-dd',
              new Date()
            ),
            phone_number: data.data.data.phone_number,
            institution_id: data.data.data.institution_id,
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <ScrollView>
              <View className='px-4 mb-2 mt-6'>
                <Text className='text-3xl font-Bold'>Profil</Text>
                <View className='p-4 mt-5 bg-primary-100 rounded-md'>
                  <Input
                    label='Nama'
                    onChangeText={handleChange('name')}
                    error={touched.name && errors.name ? errors.name : null}
                    onBlur={handleBlur('name')}
                    value={values.name}
                  />
                  <Input
                    className='mt-3'
                    label='Tanggal lahir'
                    caretHidden={true}
                    onTouchEnd={() =>
                      showDatePicker(values.date_of_birth, setFieldValue)
                    }
                    error={
                      touched.date_of_birth && errors.date_of_birth
                        ? errors.date_of_birth
                        : null
                    }
                    onBlur={handleBlur('date_of_birth')}
                    value={format(values.date_of_birth, 'dd/MM/yyyy')}
                  />
                  <Input
                    className='mt-3'
                    label='Email'
                    onChangeText={handleChange('email')}
                    error={touched.email && errors.email ? errors.email : null}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                  <Input
                    className='mt-3'
                    label='No. Telepon'
                    onChangeText={handleChange('phone_number')}
                    error={
                      touched.phone_number && errors.phone_number
                        ? errors.phone_number
                        : null
                    }
                    onBlur={handleBlur('phone_number')}
                    value={values.phone_number}
                  />

                  <Button className='mt-5' onPress={handleSubmit}>
                    Simpan
                  </Button>
                </View>
              </View>
            </ScrollView>
          )}
        </Formik>
      )}
    </SafeAreaView>
  )
}
