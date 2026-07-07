import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const AddExpense = () => {
  return (
    <TouchableOpacity style={styles.fab}>
      <Ionicons
        name="add"
        size={30}
        color="#fff"
      />
    </TouchableOpacity>
  );
};

export default AddExpense;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",

    bottom: 25,
    right: 20,

    width: 60,
    height: 60,
    borderRadius: 30,

    backgroundColor: "#2563EB",

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,

    elevation: 8,
  },
});