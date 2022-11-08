import { View, Text, Image, SafeAreaView, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'

export default function Header({ showBackButton }) {
  const navigation = useNavigation()

  return (
    <>
      <StatusBar backgroundColor='white' style='dark' />
      <View className='flex-row justify-between items-center bg-white px-3 py-3'>
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
              className='w-9 h-9'
            />
            <Image
              source={require('../assets/images/logo.png')}
              className='w-9 h-9'
            />
          </View>
        )}

        <View className='flex-row'>
          <View className='rounded-full'>
            <Pressable className='p-1' android_ripple={{ borderless: true }}>
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
