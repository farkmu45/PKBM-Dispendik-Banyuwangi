import React from 'react'
import { Pressable, Text, View } from 'react-native'

export default function Button({
  outline = false,
  children,
  style,
  onPress,
  ...props
}) {
  return (
    <View
      style={style}
      className={
        outline
          ? 'bg-transparent rounded-full border-2 border-primary-700 box-border'
          : 'bg-primary-700 rounded-full box-border'
      }
    >
      <Pressable
        {...props}
        className='px-4 py-2'
        android_ripple={{ borderless: true }}
        onPress={onPress}
      >
        <Text
          className={`text-base font-Medium text-center ${
            outline ? 'text-primary-700' : 'text-white'
          }`}
        >
          {children}
        </Text>
      </Pressable>
    </View>
  )
}
