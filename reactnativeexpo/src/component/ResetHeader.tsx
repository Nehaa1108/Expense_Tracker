import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Define TypeScript structure for the validation prop
interface ResetHeaderProps {
  validations: {
    length: boolean;
    uppercase: boolean;
    number: boolean;
    special: boolean;
  };
}

const ResetHeader = ({ validations }: ResetHeaderProps) => {
  return (
   <View style={styles.container}>

  <TouchableOpacity style={styles.backButton}>
    <Text style={styles.backText}>
      ← Back
    </Text>
  </TouchableOpacity>

  <View style={styles.headerContainer}>

    <Text style={styles.icon}>
      🔒
    </Text>

    <Text style={styles.title}>
      Set New Password
    </Text>

    <Text style={styles.description}>
      Choose a strong password. It must be at least 8 characters long.
    </Text>

  </View>

  <View style={styles.requirementsCard}>

    <Text style={styles.requirementsTitle}>
      Strong Password Requirements
    </Text>

    <Text style={styles.requirementItem}>
      {validations.length ? "✓" : "○"} At least 8 characters
    </Text>

    <Text style={styles.requirementItem}>
      {validations.uppercase ? "✓" : "○"} One uppercase letter
    </Text>

    <Text style={styles.requirementItem}>
      {validations.number ? "✓" : "○"} One number
    </Text>

    <Text style={styles.requirementItem}>
      {validations.special ? "✓" : "○"} One special character (!@#$)
    </Text>

  </View>

</View>
  );
};

export default ResetHeader;

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 24,
    paddingTop: 0,
  },

  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 0,
  },

  backText: {
    color: '#2563EB',
    fontSize: 15,
    fontWeight: '600',
  },

  headerContainer: {
    marginBottom: 10,
  },

  icon: {
    fontSize: 52,
    marginBottom: 12,
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 10,
  },

  description: {
    fontSize: 15,
    lineHeight: 24,
    color: '#64748B',
  },

  requirementsCard: {
    backgroundColor: '#FFFFFF',

    borderRadius: 20,

    padding: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,

    elevation: 3,
  },

  requirementsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',

    marginBottom: 16,
  },

  requirementItem: {
    fontSize: 15,
    color: '#475569',
    marginBottom: 10,
  },

});

// TODO: Make completed requirements green

// TODO: Show progress bar
// Weak -> Medium -> Strong

// TODO: Add password strength indicator

// TODO: Add animated checkmarks

// TODO: Add lock icon from Expo Vector Icons

// TODO: Add secure password tips section

// TODO: Add fade-in animation for requirements