import {Alert, AlertButton} from "react-native";
import usePlatformHook from "./usePlatformHook";

type SimpleAlert = {
  title: string;
  message: string;
  buttons?: AlertButton[];
}

type TwoButtonAlert = {
  title: string;
  message: string;
  onAccept: () => void;
  onCancel?: () => void;
  acceptText?: string;
  cancelText?: string;
}

const useAlertNotification = () => {
  const { isWeb } = usePlatformHook();

  const showAlert = ({title, message, buttons}: SimpleAlert) => {
    if (isWeb) {
      const result = window.confirm(`${title}\n${message}`);

      if (result && buttons) {
        buttons[0].onPress?.();
      } else if (!result && buttons) {
        buttons[1].onPress?.();
      }
    } else {
      Alert.alert(title, message, buttons);
    }
  };

  const showTwoButtonAlert = ({title, message, onAccept, onCancel, acceptText, cancelText}:TwoButtonAlert) => {
    showAlert({title, message, buttons: [
        {text: acceptText ?? "OK", onPress: onAccept},
        {text: cancelText ?? "Cancel", onPress: onCancel, style: "cancel"},
      ],
    });
  };

  const showBottomAlert = () => {
    Alert.alert("", "Are you sure you want to remove this pass?", [
      {
        text: "Remove",
        style: "destructive",
        onPress: () => console.log("Removed pass"),
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  return { showAlert, showTwoButtonAlert, showBottomAlert };
};

export default useAlertNotification;