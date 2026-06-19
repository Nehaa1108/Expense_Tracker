import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import EditProfile from "../component/EditProfile";

const ProfileScreen = () => {
  const user = useSelector(
    (state: any) => state.auth.user
  );

  
  const registeredUser = useSelector(
  (state: any) => state.auth.registeredUser
);

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.username?.charAt(0)?.toUpperCase()}
          </Text>
        </View>

        <Text style={styles.userName}>
          {user?.username}
        </Text>

        <Text style={styles.email}>
          {registeredUser?.email}
        </Text>
        <Text>{user?.email}</Text>
      </View>

      <View style={styles.accountContainer}>
        <Text style={styles.accountTitle}>
          ACCOUNT
        </Text>
      </View>

      <EditProfile />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 20,
  },

  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    paddingVertical: 25,
    marginBottom: 25,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  avatarText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },

  userName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
  },

  email: {
    marginTop: 5,
    fontSize: 15,
    color: "#666",
  },

  accountContainer: {
    marginBottom: 15,
  },

  accountTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
});