import Toast from "react-native-toast-message";

export const successMessage = (message) => {
  Toast.show({
    type: "success",
    text1: "Success",
    text2: message,
    position: "top",
    visibilityTime: 3000,
  });
};

export const errorMessage = (message) => {
  Toast.show({
    type: "error",
    text1: "Error",
    text2: message,
    position: "top",
    visibilityTime: 3000,
  });
};

export const infoMessage = (message) => {
  Toast.show({
    type: "info",
    text1: "Info",
    text2: message,
    position: "top",
    visibilityTime: 5000,
  });
};

export const warnMessage = (message) => {
  Toast.show({
    type: "info",
    text1: "Warning",
    text2: message,
    position: "top",
    visibilityTime: 5000,
  });
};