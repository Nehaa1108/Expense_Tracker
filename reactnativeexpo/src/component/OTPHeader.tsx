import { View, Text, TouchableOpacity, StyleSheet} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
const OTPHeader=()=>
{
   const navigation=useNavigation()

    return(
        <View style={styles.container}>

  <TouchableOpacity
    style={styles.backButton}
    onPress={() => navigation.goBack()}
  >
    <Text style={styles.backText}>
      ← Back
    </Text>
  </TouchableOpacity>

  <View style={styles.contentContainer}>

    <Text style={styles.icon}>
      📩
    </Text>

    <Text style={styles.title}>
      Check your email
    </Text>

    <Text style={styles.description}>
      We sent a 6-digit OTP to your registered email address.
    </Text>

  </View>

</View>
    )
}

export default OTPHeader

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 24,
    paddingTop: 0,
  },

  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },

  backText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2563EB',
  },

  contentContainer: {
    backgroundColor: '#FFFFFF',

    padding: 20,
    borderRadius: 24,

    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,

    elevation: 5,
  },

  icon: {
    fontSize: 60,
    marginBottom: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',

    marginBottom: 8,
    textAlign: 'center',
  },

  description: {
    fontSize: 15,
    lineHeight: 24,

    color: '#64748B',
    textAlign: 'center',
  },

});

// TODO: Show masked email
// Example:
// OTP sent to n***a@gmail.com

// TODO: Replace emoji with MaterialCommunityIcons

// TODO: Add countdown timer
// 00:59

// TODO: Add Resend OTP button

// TODO: Add OTP verification illustration

// TODO: Add success animation after verification

// TODO: Add progress indicator
// Step 2 of 3