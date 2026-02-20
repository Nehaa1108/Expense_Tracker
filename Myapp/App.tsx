import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screen/HomeScreen';
import FormScreen from './src/screen/FormScreen';
import AddStudentScreen from './src/screen/AddStudentScreen';
import AttendenceScreen from './src/screen/AttendenceScreen';
import StudentListScreen from './src/screen/StudentList';


const Stack = createNativeStackNavigator();
  
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
        />
        <Stack.Screen 
          name="Form" 
          component={FormScreen} 
        />
         <Stack.Screen 
          name="AddStudent"
          component={AddStudentScreen}
        />
         <Stack.Screen 
          name="Attendence"
          component={AttendenceScreen}
        />
           <Stack.Screen 
          name="StudentList"
          component={StudentListScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
