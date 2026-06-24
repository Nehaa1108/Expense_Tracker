import { useState } from "react"
import { Alert, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import LoginHeader from "../component/LoginHeader"
 import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../auth/authSlice";
import { reload } from "expo-router/build/global-state/routing";
      const Login = ()=>
{

      const dispatch = useDispatch()
      const router = useRouter();

      const registeredUser = useSelector(
        (state:any) => state.auth.registeredUser
        );

      const [formData,setFormData] = useState({
        username:'',
        password:'',
        email:''
      })

    

    const handleSubmit=()=>
    {
        try{
            if(!formData.username || !formData.password)
            {
                Alert.alert("Fill all required fields")
                return;
            }
            dispatch(
              login({
                username:formData.username,
                 email: registeredUser?.email,
              })
            )
            console.log("dispatch",formData.username)

            setFormData({
              username:'',
              password:'',
              email:''
            })
            // router.push('/home')
            router.replace('/(tabs)/home')
           
        }
        catch(err)
        {
            Alert.alert("Something went wrong")
            console.log("Err",err)
        }
    }

   
    return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
            <LoginHeader/>
            <KeyboardAvoidingView 
            behavior={Platform.OS==="ios"? "padding" :"height"}>
            <View style={styles.formContainer}>
               <Text style={styles.label}>
  Username
</Text>
                <TextInput
                  style={styles.input}
                placeholder="Enter Username"
                placeholderTextColor={"grey"}
                value={formData.username}
                onChangeText={(val)=>setFormData({
                    ...formData,
                    username:val
                })}
                />
                <Text style={styles.label}>Email</Text>
                 <TextInput
                 style={styles.input}
                placeholder="Enter Email"
                placeholderTextColor={"grey"}
                value={formData.email}
                onChangeText={(val)=>
                setFormData({
                    ...formData,
                    email:val
                })
                }
                />

                 <Text style={styles.label}>Password</Text>
                 <TextInput
                 style={styles.input}
                placeholder="Enter Password"
                placeholderTextColor={"grey"}
                value={formData.password}
                onChangeText={(val)=>
                setFormData({
                    ...formData,
                    password:val
                })
                }
                />

            </View>
            <View>
                <TouchableOpacity
  style={styles.primaryButton}
  onPress={handleSubmit}
>
  <Text style={styles.primaryButtonText}>
    Sign In
  </Text>
</TouchableOpacity>
            </View>
      
<TouchableOpacity
  style={styles.forgotContainer}
  onPress={() => router.push("/forgot")}
>
  <Text style={styles.forgotText}>
    Forgot Password?
  </Text>
</TouchableOpacity>
           <View style={styles.dividerContainer}>
  <View style={styles.line} />

  <Text style={styles.orText}>
    OR
  </Text>

  <View style={styles.line} />
</View>
           <View style={styles.registerContainer}>

  <Text style={styles.registerText}>
    Don't have an account?
  </Text>

  <TouchableOpacity
    onPress={() => router.push("/register")}
  >
    <Text style={styles.registerLink}>
      Register
    </Text>
  </TouchableOpacity>

</View>
</KeyboardAvoidingView>
        </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default Login

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

    marginTop: 28,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  forgotContainer: {
    marginTop: 20,
    alignItems: 'center',
  },

  forgotText: {
    color: '#2563EB',
    fontSize: 15,
    fontWeight: '600',
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 28,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#CBD5E1',
  },

  orText: {
    marginHorizontal: 12,
    color: '#64748B',
    fontSize: 14,
  },

  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  registerText: {
    color: '#64748B',
    fontSize: 15,
  },

  registerLink: {
    color: '#2563EB',
    fontWeight: '700',
    marginLeft: 6,
    fontSize: 15,
  },

});

// TODO: Add eye icon for password visibility

// TODO: Add keyboardAvoidingView

// TODO: Add ActivityIndicator on login

// TODO: Disable button while loading

// TODO: Add Google Login button

// TODO: Add Remember Me checkbox

// TODO: Add app logo above LoginHeader

// TODO: Add secureTextEntry to password field