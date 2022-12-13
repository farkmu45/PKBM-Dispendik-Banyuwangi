import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as SecureStore from 'expo-secure-store'
import * as SplashScreen from 'expo-splash-screen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {
  AddActivity,
  ForgotPassword,
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
import { AuthContext } from './contexts'
import api from './network/api'

const Stack = createNativeStackNavigator()
const queryClient = new QueryClient()

DefaultTheme.colors.background = 'white'

export default function App() {
  const [auth, setAuth] = useState({ isAdmin: false, signedIn: false })

  useEffect(() => {
    const bootstrapAsync = async () => {
      // await SecureStore.deleteItemAsync('token')
      const token = await SecureStore.getItemAsync('token')
      if (token) {
        api.setHeader('Authorization', `Bearer ${token}`)
        const role = await SecureStore.getItemAsync('role')
        console.log(role)
        if (role == 2) {
          setAuth({ signedIn: true, isAdmin: true })
        } else {
          setAuth({ signedIn: true, isAdmin: false })
        }
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
        <AuthContext.Provider value={{ auth, setAuth }}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                animation: 'fade_from_bottom',
              }}
            >
              {auth.signedIn ? (
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
        </AuthContext.Provider>
      </QueryClientProvider>
    </SafeAreaProvider>
  )
}
