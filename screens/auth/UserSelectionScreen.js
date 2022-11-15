import * as NavigationBar from 'expo-navigation-bar'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../components/Button'
import colors from '../../constants/colors'
import { Login } from '../../constants/screens'

export default UserSelectionScreen = ({ navigation }) => {
  NavigationBar.setBackgroundColorAsync(colors.primary[100])

  return (
    <SafeAreaView className='flex-1 bg-primary-100'>
      <StatusBar backgroundColor='transparent' style='dark' />
      <ScrollView>
        <View className='items-center py-10 px-4'>
          <Image source={require('../../assets/images/logo.png')} />
          <Text className='mt-5 text-2xl font-Regular'>Masuk sebagai</Text>
          <Button
            className='self-stretch mt-6'
            onPress={() =>
              navigation.navigate(Login, {
                isAdmin: true,
              })
            }
          >
            Admin
          </Button>
          <Button
            className='self-stretch mt-2'
            onPress={() =>
              navigation.navigate(Login, {
                isAdmin: false,
              })
            }
          >
            Pengguna
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
