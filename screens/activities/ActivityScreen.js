import { createNativeStackNavigator } from '@react-navigation/native-stack'
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
    </Stack.Navigator>
  )
}
