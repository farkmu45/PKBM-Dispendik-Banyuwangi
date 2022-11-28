import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as SecureStore from 'expo-secure-store'
import * as SplashScreen from 'expo-splash-screen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {
  AddActivity,
  ForgotPassword,
  Home,
  Login,
  Main,
  RegisterUser,
  UserSelection,
} from './constants/screens'
import AddActivityScreen from './screens/activities/AddActivityScreen'
import ForgotPasswordScreen from './screens/auth/ForgotPasswordScreen'
import LoginScreen from './screens/auth/LoginScreen'
import RegisterUserScreen from './screens/auth/RegisterUserScreen'
import UserSelectionScreen from './screens/auth/UserSelectionScreen'
import MainScreen from './screens/MainScreen'

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
  useFonts,
} from '@expo-google-fonts/inter'
import { useCallback, useEffect, useState } from 'react'
import { RoleContext } from './contexts'
import api from './network/api'

const Stack = createNativeStackNavigator()
const queryClient = new QueryClient()

DefaultTheme.colors.background = 'white'

export default function App() {
  const [role, setRole] = useState(1)
  const [signedIn, setSignedIn] = useState(false)

  useEffect(() => {
    const bootstrapAsync = async () => {
      const token = await SecureStore.getItemAsync('token')
      if (token) {
        setSignedIn(true)
        api.setHeader(`Authorization: Bearer ${token}`)

        const role = await SecureStore.getItemAsync('role')
        setRole(role)
      }
    }
    bootstrapAsync()
  }, [])

  let [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_800ExtraBold,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_500Medium,
    Inter_400Regular,
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <QueryClientProvider client={queryClient}>
        <RoleContext.Provider value={{ isAdmin: role == 2 ? true : false }}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                animation: 'fade_from_bottom',
              }}
            >
              {signedIn ? (
                <>
                  <Stack.Screen name={Main} component={MainScreen} />
                  <Stack.Screen
                    name={AddActivity}
                    component={AddActivityScreen}
                  />
                </>
              ) : (
                <>
                  <Stack.Screen
                    name={UserSelection}
                    component={UserSelectionScreen}
                  />
                  <Stack.Screen name={Login} component={LoginScreen} />
                  <Stack.Screen
                    name={RegisterUser}
                    component={RegisterUserScreen}
                  />

                  <Stack.Screen
                    name={ForgotPassword}
                    component={ForgotPasswordScreen}
                  />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </RoleContext.Provider>
      </QueryClientProvider>
    </SafeAreaProvider>
  )
}
