import { Alert, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import RegisterHeader from "../component/RegisterHeader"
import { useRouter } from "expo-router"
import { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"

const RegisterScreen=()=>
{

   
    const [formData,setFormData]=useState({
        fullname:'',
        email:'',
        password:'',
        confirmPassword:''
    })

    const handleSubmit=()=>
    {
     try{
        if(!formData.fullname || !formData.email || !formData.password ||!formData.confirmPassword)
        {
            Alert.alert("Fill all required fields")
            return;
        }

        router.push('/')
     }
     catch(err){
        Alert.alert("Something went wrong")
        console.log("err",err)
     }
    }

    const router=useRouter()
    return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
            <RegisterHeader/>
            <KeyboardAvoidingView behavior={Platform.OS==="ios"?"padding":"height"}>
            <View style={styles.formContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        placeholderTextColor={'grey'}
        value={formData.fullname}
        onChangeText={(val)=>setFormData({...formData, fullname: val})}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor={"grey"}
        value={formData.email}
        onChangeText={(val)=>setFormData({...formData, email: val})}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor={"grey"}
        value={formData.password}
        onChangeText={(val)=>setFormData({
            ...formData, password: val
        })}
        />
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
        style={styles.input}
        placeholder="Enter your confirm password"
        placeholderTextColor={"grey"}
        value={formData.confirmPassword}
        onChangeText={(val)=>setFormData({
            ...formData,
            confirmPassword:val
        })}
        />
    </View>
  <TouchableOpacity
  style={styles.primaryButton}
  onPress={handleSubmit}
>
  <Text style={styles.primaryButtonText}>
    Create Account
  </Text>
</TouchableOpacity>
   <View style={styles.footerContainer}>

  <Text style={styles.footerText}>
    Already have an account?
  </Text>

  <TouchableOpacity onPress={() => router.push('/')}>
    <Text style={styles.footerLink}>
      Sign In
    </Text>
  </TouchableOpacity>

</View>
</KeyboardAvoidingView>
        </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}
export default RegisterScreen

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 24,
  },

  formContainer: {
    marginTop: 30,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
    marginTop: 16,
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

  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 28,
  },

  footerText: {
    color: '#64748B',
    fontSize: 15,
  },

  footerLink: {
    color: '#2563EB',
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 6,
  },

});

// TODO: Add secureTextEntry for password fields

// TODO: Add eye icon to show/hide password

// TODO: Add password strength indicator

// TODO: Add confirm password validation

// TODO: Add email validation

// TODO: Add loading spinner on submit

// TODO: Disable button while creating account

// TODO: Add Terms & Conditions checkbox

// TODO: Add small logo above RegisterHeader

// TODO: Add success animation after registration