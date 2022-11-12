import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  ActivityDetail,
  ActivityList,
  AddActivityScreen,
} from '../../constants/screens'
import ActivityListScreen from './ActivityListScreen'
import ActivityDetailScreen from './ActivityDetailScreen'
import AddActivity from './AddActivity'

const Stack = createNativeStackNavigator()

export default function ActivityScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={ActivityList}
        screenOptions={{ animation: 'none' }}
        component={ActivityListScreen}
      />
      <Stack.Screen name={ActivityDetail} component={ActivityDetailScreen} />
      <Stack.Screen name={AddActivityScreen} component={AddActivity} />
    </Stack.Navigator>
  )
}
