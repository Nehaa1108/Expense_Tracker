import React from "react";
import { StyleSheet, View, Text } from "react-native";
import dummyData from "../../api/dummyData.json";

const MainCard = () => {
  const currentMonth = new Date().toLocaleString("default", {
    month: "long",
  });

  const { budget, transactions } = dummyData;

 const totalIncome = React.useMemo(() => {
  return transactions
    .filter(item => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);
}, [transactions]);

const totalExpense = React.useMemo(() => {
  return transactions
    .filter(item => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);
}, [transactions]);

  const totalBalance = React.useMemo(() => {
    return budget.remaining;
  }, [budget.remaining]);
  

  return (
    <View style={styles.container}>
      <View style={styles.card}>
       
        <Text style={styles.title}>Total Balance</Text>

        <Text style={styles.balance}>
          ₹{totalBalance.toLocaleString()}
        </Text>

        <View style={styles.row}>
          <Text style={styles.text}>
            Income: ₹{totalIncome.toLocaleString()}
          </Text>

          <Text style={styles.text}>
            Expense: ₹{totalExpense.toLocaleString()}
          </Text>

          <Text style={styles.text}>
            {currentMonth}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MainCard;

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 0.5,
  },

  month: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
  },

  balance: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#000",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  text: {
    fontSize: 14,
    color: "#444",
  },
});