import React from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../utils/colors";

export default function HomeScreen({ navigation }) {

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.replace("Login");
  };

  const menuItems = [
    {
      title: "Add Student",
      icon: "account-plus",
      screen: "AddStudent",
    },
    {
      title: "Student List",
      icon: "account-group",
      screen: "StudentList",
    },
    {
      title: "Mark Attendance",
      icon: "clipboard-check",
      screen: "Attendence",
    },
    {
      title: "Reports",
      icon: "chart-bar",
      screen: "Form",
    },
  ];

  return (
    <View style={styles.container}>
      
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Dashboard</Text>

        <TouchableOpacity onPress={handleLogout}>
          <Icon name="logout" size={26} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Grid Section */}
      <View style={styles.grid}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Icon name={item.icon} size={40} color={colors.primary} />
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.primary,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "47%",
    backgroundColor: colors.white,
    paddingVertical: 25,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 18,
    elevation: 4,
  },
  cardText: {
    marginTop: 12,
    fontWeight: "600",
    fontSize: 14,
    color: colors.black,
    textAlign: "center",
  },
});