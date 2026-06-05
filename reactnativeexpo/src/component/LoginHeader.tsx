import { View,Text, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

const LoginHeader=()=>
{
    return(
        <View style={styles.container}>

  <View style={styles.titleContainer}>
    <Text style={styles.welcomeText}>
      Welcome back,
    </Text>

    <Text style={styles.nameText}>
      Spender 🖐
    </Text>
  </View>

  <View>
    <Text style={styles.tagline}>
      Track every rupee. Save every day.
    </Text>
  </View>

</View>
    )
}

export default LoginHeader

const styles = StyleSheet.create({

  container: {
    paddingHorizontal: 24,
    paddingTop: 3,
    paddingBottom: 10,

    backgroundColor: '#F8FAFC',
  },

  titleContainer: {
    marginBottom: 12,
  },

  welcomeText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#64748B',
  },

  nameText: {
    marginTop: 4,

    fontSize: 34,
    fontWeight: '700',

    color: '#0F172A',
    letterSpacing: 0.5,
  },

  tagline: {
    fontSize: 16,
    lineHeight: 24,

    color: '#475569',

    maxWidth: '85%',
  },

});

// TODO: Replace "Spender" with user's actual name

// TODO: Add app logo above the header

// TODO: Add a small finance illustration

// TODO: Dynamic greeting
// Good Morning
// Good Afternoon
// Good Evening

// TODO: Animate the waving hand

// TODO: Add brand color highlight
// Example:
// Spender in blue color