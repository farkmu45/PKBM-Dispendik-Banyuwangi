import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ButtonComponent = ({ title, isActive = true, onPress }) => {
  return (
    <View
      className={
        isActive
          ? 'bg-blue-500 rounded-full mx-4 mb-4'
          : 'bg-white rounded-full mx-4 mb-4'
      }
    >
      <Pressable
        className='p-4'
        android_ripple={{ borderless: true }}
        onPress={onPress}
      >
        <Text className='text-center'>{title}</Text>
      </Pressable>
    </View>
  )
}

export default ButtonComponent

const styles = StyleSheet.create({})
