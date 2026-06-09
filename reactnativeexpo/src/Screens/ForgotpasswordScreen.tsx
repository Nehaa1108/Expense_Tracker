import { Alert, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import ForgotHeader from "../component/ForgotHeader"
import { useState } from "react"
import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"

const Forgotpassword=()=>
{
    const [email,setEmail] = useState('')

    const router=useRouter()

    const handleSubmit=()=>
    {
        try{
            if(!email)
            {
                Alert.alert("Enter your register email")
                return;
            }
            router.push("/")
        }
        catch(err)
        {
            Alert.alert("Something went wrong")
            console.log('err',err)
        }
    }

    return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
  <ForgotHeader />
<KeyboardAvoidingView 
 behavior={Platform.OS==='ios'? "padding": "height"}>
  <View style={styles.formContainer}>
    <Text style={styles.label}>
      Registered Email
    </Text>

    <TextInput
      style={styles.input}
      placeholder="Enter your email"
      placeholderTextColor={'#94A3B8'}
      value={'email'}
      onChangeText={(val) => setEmail(val)}
    />
  </View>

  <View style={styles.buttonContainer}>

    <TouchableOpacity style={styles.primaryButton}
    onPress={()=>router.push('/otp')}>
      <Text style={styles.primaryButtonText}>
        Send OTP
      </Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.secondaryButton}>
      <Text style={styles.secondaryButtonText}>
        Cancel
      </Text>
    </TouchableOpacity>

  </View>
  </KeyboardAvoidingView>
</SafeAreaView>
</TouchableWithoutFeedback>
    )
}

export default Forgotpassword


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 24,
  },

  formContainer: {
    marginTop: 2,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 10,
  },

  input: {
    height: 56,
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
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  buttonContainer: {
    marginTop: 32,
    gap: 12,
  },

  primaryButton: {
    height: 56,
    backgroundColor: '#2563EB',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  secondaryButton: {
    height: 56,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  secondaryButtonText: {
    color: '#475569',
    fontSize: 16,
    fontWeight: '600',
  },
});

// TODO: Add keyboardAvoidingView

// TODO: Add email icon inside TextInput

// TODO: Disable Send OTP button while API is loading

// TODO: Add ActivityIndicator inside button

// TODO: Add email validation regex

// TODO: Add success animation after OTP sent

// TODO: Add expo-linear-gradient on primary button