import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ActivityDetail, ActivityList } from '../../constants/screens'
import ActivityListScreen from './ActivityListScreen'
import ActivityDetailScreen from './ActivityDetailScreen'

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
    </Stack.Navigator>
  )
}
