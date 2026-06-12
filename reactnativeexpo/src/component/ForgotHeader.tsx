import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
const ForgotHeader=()=>
{
    const router=useRouter()
    const navigation=useNavigation()
    return(
     <View style={styles.container}>
  <Text
    style={styles.backText}
    onPress={() => navigation.goBack()}
  >
    ← Back to Login
  </Text>

  <View style={styles.contentContainer}>
    <Text style={styles.icon}>🗝️</Text>

    <Text style={styles.title}>
      Forgot your password?
    </Text>

    <Text style={styles.description}>
      No worries, Enter your registered email and we'll send you a
      6-digit OTP to reset it.
    </Text>
  </View>
</View>
    )
}

export default ForgotHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 24,
    paddingTop: 0,
  },

  backText: {
    fontSize: 15,
    color: '#2563EB',
    fontWeight: '600',
    marginBottom: 20,
  },

  contentContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',

    // Shadow
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
    fontSize: 64,
    marginBottom: 10,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 6,
  },

  description: {
    fontSize: 15,
    lineHeight: 24,
    color: '#64748B',
    textAlign: 'center',
  },
});

// TODO: Replace emoji with an Expo Vector Icon
// Example: MaterialCommunityIcons lock-reset

// TODO: Add Fade-In animation using react-native-reanimated

// TODO: Add SafeAreaView wrapper

// TODO: Add a subtle gradient background using expo-linear-gradient