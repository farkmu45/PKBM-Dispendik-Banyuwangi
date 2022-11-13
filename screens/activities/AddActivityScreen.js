import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
} from 'react-native'
import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import Button from '../../components/Button'


export default function AddActivityScreen({ navigation }) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(null)
  const [items, setItems] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
  ])
  //date
  const [date, setDate] = useState(new Date(1598051730000))
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate
    setShow(false)
    setDate(currentDate)
  }

  const showMode = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow(false)
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode)
  }

  const showDatePicker = () => {
    showMode('date')
  }

  const showTimepicker = () => {
    showMode('time')
  }
  return (
    <ScrollView className='h-full bg-blue-100'>
      <View className='px-5 items-center py-10'>
        <Image source={require('../../assets/images/logo.png')} />
        <View className='rounded-md p-5 bg-white w-full mt-6'>
          <TouchableOpacity>
            <TextInput
              placeholder='File'
              className='border-b-2 my-3 border-gray-400 text-base'
            />
            <Button title='Choose a file' />
          </TouchableOpacity>
          <View className='flex-row border-b-2 my-3 border-gray-400'>
            <Text className=' text-base my-4'>
              selected: {date.toLocaleString()}
            </Text>
            {show && (
              <DateTimePicker
                testID='dateTimePicker'
                value={date}
                mode={mode}
                is24Hour={true}
                display='default'
                onChange={onChange}
                style={{
                  width: '100%',
                }}
              />
            )}
            <TouchableOpacity
              onPress={showDatePicker}
              className='absolute right-0 self-center'
            >
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder='Nama Kegiatan'
            className='border-b-2 my-3 border-gray-400 mt-6 text-base'
          />
          <TextInput
            placeholder='Keterangan'
            multiline={true}
            numberOfLines={6}
            className='border-2 p-3 my-3 border-gray-400 mt-6 text-base'
          />
        </View>
      </View>
      <Button
        title={'Kirim'}
        onPress={() => navigation.navigate('Main')}
      />
    </ScrollView>
  )
}
