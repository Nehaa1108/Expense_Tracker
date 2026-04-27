import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { getStudents } from '../service/StudentService';
import colors from '../utils/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
function StudentListScreen() {

  const [students, setStudents] = useState([]);


  const loadStudents = async () => {
    const data = await getStudents();
    setStudents(data);
  };
  useFocusEffect(
  useCallback(() => {
    loadStudents();
  }, [])
);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student List</Text>

      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          
          <View style={styles.card}>
            <Text style={styles.name}>Student Name: {item.name}</Text>
            <TouchableOpacity
 
  activeOpacity={0.8}
  style={{
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  }}
>
  <FontAwesome6
    name="pen-to-square"
    solid
    size={18}
    color="#374151"
  />
  <Text
    style={{
      marginLeft: 8,
      fontSize: 14,
      fontWeight: '500',
      color: '#374151',
    }}
  >
    Edit
  </Text>
</TouchableOpacity>
<TouchableOpacity

  activeOpacity={0.8}
  style={{
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  }}
>
  <FontAwesome6
    name="trash"
    solid
    size={18}
    // color="#DC2626"
  />
  <Text
    style={{
      marginLeft: 8,
      fontSize: 14,
      fontWeight: '500',
      color: '#DC2626',
    }}
  >
    Delete
  </Text>
</TouchableOpacity>
<FontAwesome6 name="user" size={24} color="black" />
           <Text style={styles.name}>Roll: {item.roll_number}</Text>
<Text style={styles.name}>Department: {item.department_name}</Text>
<Text style={styles.name}>Class: {item.class_name}</Text>


          </View>
          
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No students added yet
          </Text>
        }
      />
    </View>
  );
}

export default StudentListScreen;

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
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 8,
    borderColor: colors.primary,
  },
  name: {
    fontSize: 18,
  },
  custombutton:{
    flex:'row',
    alignItems:'flex-end',
    justifyContent:'flex-end'
  }
});