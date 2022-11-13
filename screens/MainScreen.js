import { MaterialIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as NavigationBar from 'expo-navigation-bar'
import React from 'react'
import HomeScreen from './HomeScreen'

import colors from '../constants/colors'
import {
  Account,
  Activity,
  Home,
  Institution,
  NotificationList
} from '../constants/screens'
import AccountScreen from './account/AccountScreen'
import ActivityScreen from './activities/ActivityScreen'
import InstitutionScreen from './institutions/InstitutionScreen'
import NotificationListScreen from './notifications/NotificationListScreen'

const Tab = createBottomTabNavigator()

const MainScreen = () => {
  NavigationBar.setBackgroundColorAsync(colors.primary[700])

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.primary[700],
          height: 60,
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: colors.primary[900],
      }}
    >
      <Tab.Screen
        name={Home}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name='home' size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={Institution}
        component={InstitutionScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name='list' size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={NotificationList}
        component={NotificationListScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name='notifications' size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={Activity}
        component={ActivityScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name='insert-drive-file' size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={Account}
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name='person' size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default MainScreen
