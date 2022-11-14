import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { Pressable, View } from 'react-native'

export default function FAB({ style, onPress, iconName }) {
  return (
    <View
      className='absolute rounded-full right-4 bottom-6 bg-primary-700'
      style={{ elevation: 5, ...style }}
    >
      <Pressable
        className='p-3'
        android_ripple={{ borderless: true }}
        onPress={onPress}
      >
        <MaterialIcons name={iconName} size={33} color='white' />
      </Pressable>
    </View>
  )
}
