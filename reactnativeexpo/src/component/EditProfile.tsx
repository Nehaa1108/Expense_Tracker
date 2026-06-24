import { useState } from "react"
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const EditProfile = () =>
{

    const [isUpdate,setIsUpdate] = useState(false)

    const [formData,setFormData] = useState({
        username:'',
        email:'',
    })

    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
       <View 
      //  style={styles.container}
       >
         
  <View>
   
    <Text 
    // style={styles.heading}
    >Edit Profile</Text>
  </View>

  <View style={styles.formContainer}>
    <TextInput
      style={styles.input}
      placeholder="Username"
      placeholderTextColor="grey"
      value={formData.username}
      onChangeText={(item) =>
        setFormData({
          ...formData,
          username: item,
        })
      }
    />

    <TextInput
      style={styles.input}
      placeholder="Email"
      placeholderTextColor="grey"
      value={formData.email}
      onChangeText={(item) =>
        setFormData({
          ...formData,
          email: item,
        })
      }
    />

  
  </View>

  <TouchableOpacity style={styles.button}>
    <Text style={styles.buttonText}>
      {isUpdate ? "Update" : "Add"}
    </Text>
  </TouchableOpacity>
 
</View>
 </TouchableWithoutFeedback>

    )
}

export default EditProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },

  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 25,
    color: "#222",
  },

  formContainer: {
    gap: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
    fontSize: 16,
    backgroundColor: "#fff",
  },

  button: {
    marginTop: 25,
    backgroundColor: "#2563EB",
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});