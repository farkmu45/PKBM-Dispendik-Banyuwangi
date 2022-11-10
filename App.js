import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {
  AddInstitutionScreen,
  ForgotPassword,
  LandingAdminPage,
  Login,
  Main,
} from './constants/screens'
import ForgotPasswordScreen from './screens/auth/ForgotPasswordScreen'
import LandingAdmin from './screens/auth/LandingAdmin'
import LoginScreen from './screens/auth/LoginScreen'
import AddInstitution from './screens/institutions/AddInstitution'
import MainScreen from './screens/MainScreen'
const Stack = createNativeStackNavigator()

DefaultTheme.colors.background = 'white'

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='LandingPageAdmin'
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name={Main} component={MainScreen} />
          <Stack.Screen name={Login} component={LoginScreen} />
          <Stack.Screen name={LandingAdminPage} component={LandingAdmin} />
          <Stack.Screen
            name={AddInstitution}
            component={AddInstitutionScreen}
          />
          <Stack.Screen
            name={ForgotPassword}
            component={ForgotPasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
