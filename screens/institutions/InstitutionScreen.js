import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { AddInstitution, InstitutitionList } from '../../constants/screens'
import AddInstitutionScreen from './AddInstitutionScreen'
import InstitutionListScreen from './InstitutionListScreen'

const Stack = createNativeStackNavigator()

export default function InstitutionScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
      <Stack.Screen
        name={InstitutitionList}
        component={InstitutionListScreen}
      />
      <Stack.Screen name={AddInstitution} component={AddInstitutionScreen} />
    </Stack.Navigator>
  )
}
