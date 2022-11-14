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

const Stack = createNativeStackNavigator()

DefaultTheme.colors.background = 'white'

export default function App() {
  return (
    <SafeAreaProvider>
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
