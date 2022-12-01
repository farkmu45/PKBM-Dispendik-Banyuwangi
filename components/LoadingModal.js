import React from 'react'
import { ActivityIndicator, Modal, Text, View } from 'react-native'
import colors from '../constants/colors'

export default function LoadingModal({ text = 'Harap Tunggu' }) {
  return (
    <Modal transparent={true} animationType='fade' statusBarTranslucent={true}>
      <View className='flex-1 bg-black/30 justify-center z-30 px-10'>
        <View className='flex-row items-center p-5 bg-white rounded-md'>
          <ActivityIndicator size='large'  color={colors.primary[500]} />
          <Text className='font-Regular text-base ml-3'>{text}</Text>
        </View>
      </View>
    </Modal>
  )
}
