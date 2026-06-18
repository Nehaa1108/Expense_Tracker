import React from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";

const MainCard = () => {
  const currentMonth = new Date().toLocaleString("default", {
    month: "long",
  });


  return (
    <View style={styles.container}>
   
          <View style={styles.card}>
            <Text style={styles.month}>{currentMonth}</Text>

            <Text style={styles.title}>Total Balance</Text>

            <Text style={styles.balance}>
              ₹{4000}
            </Text>
             <View style={styles.row}>
            <Text style={styles.text}>
              Income: ₹{2000}
            </Text>

            <Text style={styles.text}>
              Expense: {2000}
            </Text>

            <Text style={styles.text}>
              This Month: {currentMonth}
            </Text>
            </View>
          </View>
      
    </View>
  );
};

export default MainCard;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },


  month: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },

  

  text: {
    fontSize: 14,
    marginTop: 4,
  },

  
  card: {
    width: 360,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    borderWidth: 0.5,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
  },

  balance: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
