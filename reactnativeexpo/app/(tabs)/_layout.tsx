import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
    tabBarActiveTintColor: "#f72323",
    tabBarInactiveTintColor: "gray",
      }}
    >

       <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home-outline" : "home-sharp"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused? "person" : "person-circle-sharp"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="setting"
        options={{
          title: "Setting",
          tabBarIcon: ({ color, size , focused}) => (
            <Ionicons
             name={focused ? "settings" : "settings-sharp"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}