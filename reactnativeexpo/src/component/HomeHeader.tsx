import { StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { greeting } from "../utils/greeting/Greeting";

const HomeHeader=()=>
{
    return(
           <View style={styles.container}>

  <View>
    <Text style={styles.greeting}>
      {greeting()}
    </Text>

    <Text style={styles.subTitle}>
      Welcome back
    </Text>
  </View>

  <Text style={styles.emoji}>
    🖐
  </Text>

</View>
    )
}

export default HomeHeader


const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingHorizontal: 24,
    paddingBottom: 15,

    backgroundColor: '#F8FAFC',
  },

  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
  },

  subTitle: {
    marginTop: 4,
    fontSize: 15,
    color: '#64748B',
  },

  emoji: {
    fontSize: 42,
  },

});


// TODO: Show user's name
// Example: Good Morning, Neha

// TODO: Display current date
// Monday, June 1

// TODO: Replace emoji with Expo Vector Icon

// TODO: Add profile avatar on right side

// TODO: Add notification bell icon

// TODO: Change greeting dynamically
// Good Morning
// Good Afternoon
// Good Evening