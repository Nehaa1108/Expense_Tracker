import { Stack } from "expo-router";
import {Provider} from "react-redux"
import {store} from "../src/app/Store"
import Toast from "react-native-toast-message";

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
      <Stack.Screen
      name="home"
      options={{title:"Home"}}
      />
      <Stack.Screen
      name="reset"
      options={{title:"Reset Password"}}
      />
      <Stack.Screen
      name="resetsuccess"
      options={{title:"Reset Success"}}
      />
    </Stack>
    <Toast/>
    </Provider>
  );
}