import { MaterialIcons } from '@expo/vector-icons'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import React, { useState } from 'react'
import * as NavigationBar from 'expo-navigation-bar'
import { Image, Pressable, ScrollView, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { Main } from '../../constants/screens'
import colors from '../../constants/colors'
import { StatusBar } from 'expo-status-bar'

export default function RegisterUserScreen({ navigation }) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(null)
  const [items, setItems] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
  ])

  const [date, setDate] = useState(new Date())
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate
    setDate(currentDate)
  }

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      maximumDate: new Date(),
      value: date,
      onChange,
      mode: 'date',
    })
  }

  NavigationBar.setBackgroundColorAsync(colors.primary[100])

  return (
    <SafeAreaView className='bg-primary-100'>
      <StatusBar backgroundColor='transparent' style='dark' />
      <ScrollView>
        <View className='rounded-full self-start m-3'>
          <Pressable
            className='p-1'
            onPress={() => navigation.goBack()}
            android_ripple={{ borderless: true }}
          >
            <MaterialIcons name='arrow-back' size={25} color='black' />
          </Pressable>
        </View>
        <View className='px-4 items-center'>
          <Image source={require('../../assets/images/logo.png')} />
          <View className='rounded-md px-4 flex-col gap-y-1 bg-white mt-6'>
            <Input placeholder='Nama' />
            <Input
              caretHidden={true}
              onTouchStart={showDatePicker}
              placeholder={date.toLocaleDateString()}
              value={date.toLocaleDateString()}
            />
            <Input placeholder='Email' />
            <Input placeholder='Username' />
            <Input placeholder='Kata sandi' />
            <Input placeholder='Konfirmasi Kata sandi' />
            <Input placeholder='No Telepon' />
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              searchable={true}
              listMode={'MODAL'}
              setOpen={setOpen}
              setValue={setValue}
              placeholder='Lembaga'
              setItems={setItems}
              containerStyle={{
                marginTop: 10,
                marginBottom: 20,
              }}
              language='ID'
              className='border-0 rounded-none border-b-2 p-0 border-gray-500'
              textStyle={{
                fontSize: 16,
              }}
            />
          </View>
          <Button
            className='self-stretch mt-5'
            onPress={() => navigation.navigate(Main)}
          >
            Daftar
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
