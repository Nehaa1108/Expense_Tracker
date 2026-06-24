import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../src/store/store";
export default function RootLayout() {
  return (
  <Provider store={store}>
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Login" }}
      />
      
      <Stack.Screen
        name="forgot"
        options={{ title: "Forgot Password" }}
      />
      <Stack.Screen
      name="register"
      options={{title:"Register"}}
      />
      {/* <Stack.Screen
      name="home"
      options={{title:"Home"}}
      /> */}
      <Stack.Screen
      name="reset"
      options={{title:"Reset Password"}}
      />
      <Stack.Screen
      name="resetsuccess"
      options={{title:"Reset Success"}}
      />
        <Stack.Screen
    name="(tabs)"
    options={{ headerShown: false }}
  />
    </Stack>
</Provider>
  );
}