import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './screens/auth/LoginScreen'
import ForgotPasswordScreen from './screens/auth/ForgotPasswordScreen'
import MainScreen from './screens/MainScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {
  ForgotPassword,
  Login,
  Main,
  LandingAdminPage,
  AddInstitutionScreen,
  RegisterScreenUser,
  AddActivityScreen,
} from './constants/screens'
import LandingAdmin from './screens/auth/LandingAdmin'
import AddInstitution from './screens/institutions/AddInstitution'
import RegisterUser from './screens/auth/RegisterUser'
import AddActivity from './screens/activities/AddActivity'
const Stack = createNativeStackNavigator()

DefaultTheme.colors.background = 'white'

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='AddActivityScreen'
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name={Main} component={MainScreen} />
          <Stack.Screen name={Login} component={LoginScreen} />
          <Stack.Screen name={LandingAdminPage} component={LandingAdmin} />
          <Stack.Screen name={RegisterScreenUser} component={RegisterUser} />
          <Stack.Screen name={AddActivityScreen} component={AddActivity} />
          <Stack.Screen
            name={AddInstitutionScreen}
            component={AddInstitution}
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
