import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import ResetHeader from "../component/ResetHeader";
import { useState } from "react";
import { router, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const ResetScreen = () => {
  const [password, setPassword] = useState('');
  const [confirmpw,setConfirmpw]=useState('')

  const router= useRouter()
  
  const checks = {
    length: password.length >= 8 && confirmpw.length>=8,
    uppercase: /[A-Z]/.test(password) && /[A-Z]/.test(confirmpw),
    number: /[0-9]/.test(password) && /[0-9]/.test(confirmpw),
    special: /[!@#\$]/.test(password) && /[!@#\$]/.test(confirmpw),
  };

  return (
    <SafeAreaView style={styles.container}>
      <ResetHeader validations={checks} />
      
      <View  style={styles.formContainer}>
        <Text style={styles.label}>New Password</Text>
        <TextInput
        style={styles.input}
          placeholder="new password"
          placeholderTextColor={'grey'}
          value={password}
          onChangeText={(val) => setPassword(val)}
          secureTextEntry={true}
         
        />
         <Text style={styles.label}>Confirm New Password</Text>
        <TextInput
        style={styles.input}
          placeholder="confirm new password"
          placeholderTextColor={'grey'}
          value={confirmpw}
          onChangeText={(val) => setConfirmpw(val)}
          secureTextEntry={true}
        
        />
      </View>
      <TouchableOpacity
  style={styles.primaryButton}
  onPress={() => router.push('/resetsuccess')}
>
  <Text style={styles.primaryButtonText}>
    Reset Password
  </Text>
</TouchableOpacity>
    </SafeAreaView>
  );
};

export default ResetScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 24,
    paddingTop: 10,
  },

  formContainer: {
    marginTop: 10,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',

    marginBottom: 8,
    marginTop: 18,
  },

  input: {
    height: 50,

    backgroundColor: '#FFFFFF',

    borderWidth: 1,
    borderColor: '#E2E8F0',

    borderRadius: 16,

    paddingHorizontal: 16,

    fontSize: 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 8,

    elevation: 2,
  },

  primaryButton: {
    height: 56,

    backgroundColor: '#2563EB',

    borderRadius: 16,

    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 32,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

});