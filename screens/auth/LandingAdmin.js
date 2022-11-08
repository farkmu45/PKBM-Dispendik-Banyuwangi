import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ButtonComponent from '../../components/ButtonComponent'

const LandingAdmin = ({ navigation }) => {
  return (
    <ScrollView className='h-full bg-blue-100'>
      <View className='px-5 items-center py-10'>
        <Image source={require('../../assets/images/logo.png')} />
        <Text className='text-2xl mt-5'>Masuk sebagai</Text>
      </View>
      <ButtonComponent
        title={'Admin'}
        isActive={false}
        onPress={() => navigation.navigate('Login')}
      />
      <ButtonComponent title={'Pengguna'} />
    </ScrollView>
  )
}

export default LandingAdmin

const styles = StyleSheet.create({})
