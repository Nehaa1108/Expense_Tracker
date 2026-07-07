import { FlatList, StyleSheet, Text, View } from "react-native";
import dummyData from "../api/dummyData.json";

const { transactions } = dummyData;

const AllExpenses = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
          
            <Text style={styles.title}>
              {item.title}
            </Text>

            <Text style={styles.amount}>
              ₹{item.amount.toLocaleString()}
            </Text>

            <View style={styles.row}>
              <Text style={styles.label}>
                {item.category}
              </Text>

              <Text style={styles.date}>
                {item.date}
              </Text>
            </View>


            <Text
              style={[
                styles.type,
                item.type === "income"
                  ? styles.income
                  : styles.expense,
              ]}
            >
              {item.type.toUpperCase()}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default AllExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    padding: 12,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 8,
    marginBottom: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,

    elevation: 4,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },

  amount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2563EB",
    marginVertical: 8,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },

  label: {
    fontSize: 14,
    color: "#666",
  },

  date: {
    fontSize: 14,
    color: "#666",
  },

  type: {
    alignSelf: "flex-start",
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 20,
    fontSize: 13,
    fontWeight: "700",
    overflow: "hidden",
  },

  income: {
    backgroundColor: "#DCFCE7",
    color: "#15803D",
  },

  expense: {
    backgroundColor: "#FEE2E2",
    color: "#DC2626",
  },
});