import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Image, Pressable, View } from 'react-native'
import { UserSelection } from '../constants/screens'

export default function Header({ showBackButton, style }) {
  const navigation = useNavigation()


  return (
    <>
      <StatusBar backgroundColor='transparent' style='dark' />
      <View
        className='flex-row justify-between items-center bg-white px-3 py-3'
        style={style}
      >
        {showBackButton ? (
          <View className='rounded-full'>
            <Pressable
              className='p-1'
              onPress={() => navigation.goBack()}
              android_ripple={{ borderless: true }}
            >
              <MaterialIcons name='arrow-back' size={25} color='black' />
            </Pressable>
          </View>
        ) : (
          <View className='flex-row gap-2 pl-1'>
            <Image
              source={require('../assets/images/logo_2.png')}
              className='w-8 h-8'
            />
            <Image
              source={require('../assets/images/logo.png')}
              className='w-8 h-8'
            />
          </View>
        )}

        <View className='flex-row'>
          <View className='rounded-full'>
            <Pressable
              onPress={() => navigation.replace(UserSelection)}
              className='p-1'
              android_ripple={{ borderless: true }}
            >
              <MaterialIcons
                name='power-settings-new'
                size={25}
                color='black'
              />
            </Pressable>
          </View>
        </View>
      </View>
    </>
  )
}
