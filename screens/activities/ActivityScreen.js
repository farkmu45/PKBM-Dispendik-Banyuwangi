import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import {
  ActivityDetail,
  ActivityList,
  AddActivity,
  EditActivity
} from '../../constants/screens'
import ActivityDetailScreen from './ActivityDetailScreen'
import ActivityListScreen from './ActivityListScreen'
import AddActivityScreen from './AddActivityScreen'
import EditActivityScreen from './EditActivityScreen'

const Stack = createNativeStackNavigator()

export default function ActivityScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
      <Stack.Screen name={ActivityList} component={ActivityListScreen} />
      <Stack.Screen name={ActivityDetail} component={ActivityDetailScreen} />
      <Stack.Screen name={AddActivity} component={AddActivityScreen} />
      <Stack.Screen name={EditActivity} component={EditActivityScreen} />
    </Stack.Navigator>
  )
}
