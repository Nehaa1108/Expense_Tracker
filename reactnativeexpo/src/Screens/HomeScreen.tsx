import { StyleSheet, Text, View } from "react-native";
import HomeHeader from "../component/HomeHeader";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen=()=>
{
    return(
      <SafeAreaView style={styles.container}>
  <HomeHeader />
</SafeAreaView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

});

// TODO: Current Balance Card

// TODO: Total Income Card

// TODO: Total Expense Card

// TODO: Monthly Savings Card

// TODO: Recent Transactions List

// TODO: Spending Analytics Chart

// TODO: Quick Add Expense Button

// TODO: Budget Progress Bar