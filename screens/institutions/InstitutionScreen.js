import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { InstitutitionList, ManageInstitution } from '../../constants/screens'
import InstitutionListScreen from './InstitutionListScreen'
import ManageInstitutionScreen from './ManageInstitutionScreen'

const Stack = createNativeStackNavigator()

export default function InstitutionScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
      <Stack.Screen
        name={InstitutitionList}
        component={InstitutionListScreen}
      />
      <Stack.Screen
        name={ManageInstitution}
        initialParams={{ institution: '' }}
        component={ManageInstitutionScreen}
      />
    </Stack.Navigator>
  )
}
