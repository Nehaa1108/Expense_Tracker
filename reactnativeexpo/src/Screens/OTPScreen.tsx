import { View, Text, TouchableOpacity, TextInput, StyleSheet} from "react-native"
import { useNavigation } from "@react-navigation/native"
import OTPHeader from "../component/OTPHeader"
import { useState } from "react"
import { router, useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
const OTPScreen=()=>
{
    const [otp,setOTP] = useState('')
    const router= useRouter()
    return(
        <SafeAreaView style={styles.container}>
           <OTPHeader/>
           <View style={styles.formContainer}>
            <Text  style={styles.label}>Enter OTP</Text>
            <TextInput
            style={styles.input}
            placeholder="Enter your OTP"
            placeholderTextColor={"grey"}
            value="otp"
            onChangeText={(val)=>setOTP(val)}
            />
            <Text style={styles.timerText}>OTP expires in 00:59</Text>
           </View>
           <TouchableOpacity style={styles.primaryButton}
           onPress={()=>router.push('/reset')}>
            <Text style={styles.primaryButtonText}>Verify OTP</Text>
           </TouchableOpacity>
           <View style={styles.resendContainer}>
            <Text style={styles.resendLabel}>Didn't receive it?</Text>
            <Text style={styles.resendLink}>Resend OTP</Text>
           </View>
        </SafeAreaView>
    )
}

export default OTPScreen

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 23,
  },

  formContainer: {
    marginTop: 0,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 4,
  },

  input: {
    height: 56,

    backgroundColor: '#FFFFFF',

    borderWidth: 1,
    borderColor: '#E2E8F0',

    borderRadius: 16,

    paddingHorizontal: 16,

    fontSize: 18,
    letterSpacing: 4,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,

    elevation: 2,
  },

  timerText: {
    marginTop: 12,

    textAlign: 'center',

    color: '#64748B',
    fontSize: 14,
  },

  primaryButton: {
    height: 56,

    backgroundColor: '#2563EB',

    borderRadius: 16,

    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 28,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 24,
  },

  resendLabel: {
    color: '#64748B',
    fontSize: 15,
  },

  resendLink: {
    color: '#2563EB',
    fontWeight: '700',
    marginLeft: 6,
    fontSize: 15,
  },

});

// TODO: Use 6 separate OTP boxes instead of one TextInput

// TODO: Auto-focus OTP input

// TODO: Auto-submit when 6 digits entered

// TODO: Add countdown timer logic

// TODO: Disable Resend OTP until timer reaches 0

// TODO: Add success animation after verification

// TODO: Add keyboardType="numeric"

// TODO: Add maxLength={6}

// TODO: Show masked email
// Example: OTP sent to n***a@gmail.com