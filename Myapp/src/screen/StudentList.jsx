import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

 function StudentListScreen() {

  // Temporary dummy data (we'll make it dynamic later)
  const students = [
    { id: '1', name: 'Rahul' },
    { id: '2', name: 'Anjali' },
    { id: '3', name: 'Amit' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student List</Text>

      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

export default StudentListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  card: {
    padding: 15,
    backgroundColor: '#f2f2f2',
    marginBottom: 10,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
  },
});