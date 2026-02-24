import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import colors from './src/utils/colors';

import HomeScreen from './src/screen/HomeScreen';
import FormScreen from './src/screen/FormScreen';
import AddStudentScreen from './src/screen/AddStudentScreen';
import AttendenceScreen from './src/screen/AttendenceScreen';
import StudentListScreen from './src/screen/StudentList';
import LoginScreen from './src/screen/LoginScreen';
const Stack = createNativeStackNavigator();

const theme = {
  colors: {
    primary: colors.primary,
    background: colors.background,
    text: colors.text,
  },
};

 function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: colors.primary },
            headerTintColor: colors.white,
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Form" component={FormScreen} />
          <Stack.Screen name="AddStudent" component={AddStudentScreen} />
          <Stack.Screen name="Attendence" component={AttendenceScreen} />
          <Stack.Screen name="StudentList" component={StudentListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App