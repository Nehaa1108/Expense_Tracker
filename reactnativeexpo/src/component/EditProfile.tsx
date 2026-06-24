import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";

const EditProfile = () => {

  const user =useSelector(
    (state:any)=> state.auth.user
  )

  const email = useSelector(
    (state:any)=> state.auth.registeredUser
  )
  const [isUpdate, setIsUpdate] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const handleSignout=()=>
  {
    
  }


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        // style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.heading}>Edit Profile</Text>

          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder={user?.username}
              placeholderTextColor="grey"
              value={formData.username}
              onChangeText={(item) =>
                setFormData({
                  ...formData,
                  username: item,
                })
              }
              readOnly
            />

            <TextInput
              style={styles.input}
              placeholder={email?.email}
              placeholderTextColor="grey"
              value={formData.email}
              onChangeText={(item) =>
                setFormData({
                  ...formData,
                  email: item,
                })
              }
              readOnly
            />
          </View>

          <TouchableOpacity style={styles.button}
          onPress={handleSignout}>
            <Text style={styles.buttonText}>
              {isUpdate ? "Update" : "Add"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
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