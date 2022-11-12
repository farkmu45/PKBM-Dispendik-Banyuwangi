import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  ActivityDetail,
  ActivityList,
  AddActivityScreen,
} from '../../constants/screens'
import ActivityListScreen from './ActivityListScreen'
import ActivityDetailScreen from './ActivityDetailScreen'
import AddActivity from './AddActivity'
import React from 'react'
import { ActivityDetail, ActivityList } from '../../constants/screens'
import ActivityDetailScreen from './ActivityDetailScreen'
import ActivityListScreen from './ActivityListScreen'

const Stack = createNativeStackNavigator()

export default function ActivityScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
      <Stack.Screen name={ActivityList} component={ActivityListScreen} />
      <Stack.Screen name={ActivityDetail} component={ActivityDetailScreen} />
      <Stack.Screen name={AddActivityScreen} component={AddActivity} />
    </Stack.Navigator>
  )
}
