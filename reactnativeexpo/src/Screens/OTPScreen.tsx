import { View, Text, TouchableOpacity, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Alert} from "react-native"
import { useNavigation } from "@react-navigation/native"
import OTPHeader from "../component/OTPHeader"
import { useState, useEffect } from "react"
import { router, useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
  import { useDispatch, useSelector } from "react-redux";
  import { otp } from "../auth/authSlice"
const OTPScreen=()=>
{
const dispatch = useDispatch();

    const [otp,setOTP] = useState('')
const [timer, setTimer] = useState(60);
const [canResend, setCanResend] = useState(false);
    const router= useRouter()

    useEffect(() => {
  if (timer === 0) {
    setCanResend(true);
    return;
  }

  const interval = setInterval(() => {
    setTimer(prev => prev - 1);
  }, 1000);

  return () => clearInterval(interval);
}, [timer]);

const handleResendOTP = () => {
  setTimer(60);
  setCanResend(false);

  console.log("New OTP sent");
};


const handleVerifyOTP = () => {
  if (!otp) {
    Alert.alert("Please enter OTP");
    return;
  }

  if (otp.length !== 6) {
    Alert.alert("OTP must be 6 digits");
    return;
  }

  // otp imported from authSlice is a string action type, dispatch an action object
  dispatch({ type: otp });

  setOTP("");

  router.push("/reset");
};
    return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          
           <KeyboardAvoidingView
           behavior={Platform.OS==="ios"? "padding" :"height"}>
            <ScrollView 
            contentContainerStyle={{flexGrow:1}}
            keyboardShouldPersistTaps={'handled'}
            >
               <OTPHeader/>
           <View style={styles.formContainer}>
            
           
            <Text  style={styles.label}>Enter OTP</Text>
            <TextInput
            style={styles.input}
            placeholder="Enter your OTP"
            placeholderTextColor={"grey"}
            value={otp}
            onChangeText={(val)=>setOTP(val)}
            keyboardType="numeric"
            maxLength={6}
            />
           
            <Text style={styles.timerText}>
  OTP expires in 00:{timer.toString().padStart(2, '0')}
</Text>
           </View>
           <TouchableOpacity style={styles.primaryButton}
           onPress={handleVerifyOTP}>
            <Text style={styles.primaryButtonText}>Verify OTP</Text>
           </TouchableOpacity>
           <View style={styles.resendContainer}>
            <Text style={styles.resendLabel}>Didn't receive it?</Text>
            
            <TouchableOpacity
  disabled={!canResend}
  onPress={handleResendOTP}
>
  <Text
    style={[
      styles.resendLink,
      {
        opacity: canResend ? 1 : 0.5,
      },
    ]}
  >
    Resend OTP
  </Text>
</TouchableOpacity>
           </View>
           </ScrollView>
           </KeyboardAvoidingView>
        </SafeAreaView>
        </TouchableWithoutFeedback>
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
    marginTop:20,
  },

  optcontainer:{
    backgroundColor:'#fff',
    borderRadius:20,
    borderWidth:0.1,
    marginBottom:12
  },

  otpmail:{
    paddingTop:10,
    paddingBottom:12,
    marginLeft:15
  },
  mailtext:{
    color:'grey'
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
    letterSpacing: 0,

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