import React from 'react'
import { Text, TextInput, View } from 'react-native'
import colors from '../constants/colors'

export default function Input({ style, label, placeholder, ...props }) {
  return (
    <View style={style}>
      {(placeholder && label) || label ? (
        <Text className='text-base text-gray-400'>{label}</Text>
      ) : null}

      <TextInput
        {...props}
        placeholder={placeholder}
        cursorColor={colors.primary[700]}
        className={`border-b-2 text-base ${
          placeholder ? 'py-2' : 'pb-1'
        } border-gray-400 focus:border-primary-700`}
      />
    </View>
  )
}
