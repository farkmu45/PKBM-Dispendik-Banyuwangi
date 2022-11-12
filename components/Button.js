import React from 'react'
import { Pressable, Text, View } from 'react-native'

export default function Button({ outline = false, children, style, onPress }) {
  return (
    <View
      style={style}
      className={
        outline
          ? 'bg-transparent rounded-full border-2 border-primary-600'
          : 'bg-primary-600 rounded-full'
      }
    >
      <Pressable
        className='px-4 py-3'
        android_ripple={{ borderless: true }}
        onPress={onPress}
      >
        <Text className='text-base font-medium text-white text-center'>
          {children}
        </Text>
      </Pressable>
    </View>
  )
}
