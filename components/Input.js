import React from 'react'
import { Text, TextInput, View } from 'react-native'
import colors from '../constants/colors'

export default function Input({ style, label, ...props }) {
  return (
    <View style={style}>
      <Text className='text-base text-gray-500'>{label}</Text>
      <TextInput
        {...props}
        cursorColor={colors.primary[700]}
        className='border-b-2 text-base pb-1 border-gray-500  focus:border-primary-700'
      />
    </View>
  )
}
