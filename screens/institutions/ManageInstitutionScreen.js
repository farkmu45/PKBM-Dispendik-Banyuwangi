import { useMutation } from '@tanstack/react-query'
import { Formik } from 'formik'
import React from 'react'
import { ToastAndroid, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Yup from 'yup'
import Button from '../../components/Button'
import ErrorModal from '../../components/ErrorModal'
import Header from '../../components/Header'
import Input from '../../components/Input'
import LoadingModal from '../../components/LoadingModal'
import { Institution, Main } from '../../constants/screens'
import api from '../../network/api'

export default function ManageInstitutionScreen({ route, navigation }) {
  const { institution } = route.params

  const mutation = useMutation({
    mutationFn: async (params) => {
      let result
      if (institution) {
        result = await api.put(`/institutions/${institution.id}`, params)
      } else {
        result = await api.post('/institutions', params)
      }
      return result
    },
    onSuccess: (result) => {
      if (result.ok) {
        ToastAndroid.show(
          'Data institusi berhasil disimpan',
          ToastAndroid.SHORT
        )

        navigation.replace(Main, { screen: Institution })
      } else return ErrorModal()
    },

    onError: () => ErrorModal(),
  })

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Wajib diisi'),
  })

  return (
    <SafeAreaView>
      {mutation.isLoading ? <LoadingModal /> : null}
      <Header showBackButton={true} />

      <Formik
        initialValues={{
          name: institution.name ? institution.name : '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => mutation.mutate(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View className='m-4 items-end'>
            <View className='rounded p-5 bg-primary-100 w-full'>
              <Input
                onChangeText={handleChange('name')}
                error={touched.name && errors.name ? errors.name : null}
                onBlur={handleBlur('name')}
                value={values.name}
                label='Nama Lembaga'
              />
            </View>
            <Button onPress={handleSubmit} className='mt-6'>
              Simpan
            </Button>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  )
}
