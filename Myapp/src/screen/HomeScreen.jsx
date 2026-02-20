import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Attendance</Text>

      <Button
        title="Add Attendance"
        onPress={() => navigation.navigate('Form')}
      />

      <Button
  title="View Students"
  onPress={() => navigation.navigate('StudentList')}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
});