import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const AddStudentScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');

  const handleAddStudent = () => {
    const newStudent = {
      id: Date.now().toString(),
      name: name,
      rollNumber: rollNumber,
    };

    navigation.navigate('StudentList', { student: newStudent });

    setName('');
    setRollNumber('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Student Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Roll Number"
        value={rollNumber}
        onChangeText={setRollNumber}
        style={styles.input}
      />

      <Button title="Add Student" onPress={handleAddStudent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
});

export default AddStudentScreen;