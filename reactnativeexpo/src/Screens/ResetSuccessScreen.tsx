import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
const ResetSuccessScreen = () => {
    const router=useRouter()
    return (
        <View style={styles.container}>
            <View style={styles.successContainer}>
            <Text style={styles.successIcon}>✓</Text>
            <Text style={styles.successTitle}>Password Reset Successful! 🎉</Text>
            </View>
           <View style={styles.descriptionContainer}>
  <Text style={styles.description}>
    Your password has been updated. You can now log in with your new password.
  </Text>
</View>
           <TouchableOpacity
  style={styles.primaryButton}
  onPress={() => router.push('/')}
>
  <Text style={styles.primaryButtonText}>
    Back to Login
  </Text>
</TouchableOpacity>
           <View style={styles.supportContainer}>

  <Text style={styles.supportText}>
    If you didn't request this, please
  </Text>

  <Text style={styles.supportLink}>
    contact support
  </Text>

  <Text style={styles.supportText}>
    immediately.
  </Text>

</View>
        </View>
    )
}

export default ResetSuccessScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',

    paddingHorizontal: 24,

    justifyContent: 'center',
    alignItems: 'center',
  },

  successContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },

  successIcon: {
    fontSize: 80,
    color: '#16A34A',
    marginBottom: 16,
  },

  successTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
  },

  descriptionContainer: {
    marginBottom: 40,
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#64748B',
    textAlign: 'center',
  },

  primaryButton: {
    width: '100%',
    height: 56,

    backgroundColor: '#2563EB',

    borderRadius: 16,

    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 32,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  supportContainer: {
    alignItems: 'center',
  },

  supportText: {
    color: '#64748B',
    fontSize: 14,
  },

  supportLink: {
    color: '#2563EB',
    fontWeight: '700',
    fontSize: 14,
    marginVertical: 2,
  },

});

// TODO: Replace ✓ with a success animation (Lottie)

// TODO: Auto redirect to Login after 5 seconds

// TODO: Add green success circle background

// TODO: Add confetti animation

// TODO: Add "Continue to Login" icon

// TODO: Add support email link

// TODO: Add vibration/haptic feedback

// TODO: Show success card with shadow