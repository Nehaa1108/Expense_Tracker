import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text, ActivityIndicator } from "react-native-paper";
import colors from "../utils/colors";
import { addStudent } from "../services/studentService";

export default function AddStudentScreen({ navigation }) {
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [className, setClassName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Validation
    if (!name || !rollNumber || !className) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: name.trim(),
        roll_number: rollNumber.trim(),
        class_name: className.trim(),
      };

      await addStudent(payload);

      Alert.alert("Success", "Student added successfully");

      // Clear form
      setName("");
      setRollNumber("");
      setClassName("");

      navigation.goBack();

    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Add Student</Text>

        <TextInput
          label="Student Name"
          mode="outlined"
          value={name}
          onChangeText={setName}
          style={styles.input}
          textColor={colors.black}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
        />

        <TextInput
          label="Roll Number"
          mode="outlined"
          value={rollNumber}
          onChangeText={setRollNumber}
          keyboardType="numeric"
          style={styles.input}
          textColor={colors.black}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
        />

        <TextInput
          label="Class Name"
          mode="outlined"
          value={className}
          onChangeText={setClassName}
          style={styles.input}
          textColor={colors.black}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
        />

        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.button}
          >
            Save Student
          </Button>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    justifyContent: "center",
  },
  card: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 14,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.primary,
    textAlign: "center",
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    paddingVertical: 5,
  },
});