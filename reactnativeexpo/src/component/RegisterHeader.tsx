import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

const RegisterHeader=()=>
{
   
    return(
<View
 style={styles.container}>

  <Text style={styles.title}>
    Create your account
  </Text>

  <Text style={styles.description}>
    Start tracking your expenses today.
  </Text>

</View>
    )
}

export default RegisterHeader

const styles = StyleSheet.create({

  container: {
    paddingHorizontal: 24,
    paddingTop: 4,
    paddingBottom: 10,

    backgroundColor: '#F8FAFC',
  },

  title: {
    fontSize: 34,
    fontWeight: '700',

    color: '#0F172A',

    marginBottom: 10,

    letterSpacing: 0.5,
  },

  description: {
    fontSize: 16,
    lineHeight: 24,

    color: '#64748B',

    maxWidth: '90%',
  },

});

// TODO: Add a wallet or finance illustration above title

// TODO: Add app logo above heading

// TODO: Add "Already have an account? Login"

// TODO: Add subtle fade-in animation

// TODO: Highlight keyword
// Example:
// "expenses" in brand color

// TODO: Add short benefits section
// ✓ Track spending
// ✓ Save money
// ✓ Monthly reports