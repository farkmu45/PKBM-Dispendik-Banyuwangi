import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
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
import * as SplashScreen from 'expo-splash-screen'

import {
  useFonts,
  Inter_900Black,
  Inter_800ExtraBold,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_500Medium,
  Inter_400Regular,
} from '@expo-google-fonts/inter'
import { useCallback } from 'react'

const Stack = createNativeStackNavigator()

DefaultTheme.colors.background = 'white'

export default function App() {
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
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={UserSelection}
          screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}
        >
          <Stack.Screen name={Main} component={MainScreen} />
          <Stack.Screen name={Login} component={LoginScreen} />
          <Stack.Screen name={UserSelection} component={UserSelectionScreen} />
          <Stack.Screen name={RegisterUser} component={RegisterUserScreen} />
          <Stack.Screen name={AddActivity} component={AddActivityScreen} />
          <Stack.Screen
            name={ForgotPassword}
            component={ForgotPasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
