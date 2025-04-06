import Colors from "@/constants/Colors";
import {Ionicons} from "@expo/vector-icons";
import {View} from "react-native";
import Toast, { BaseToast, ErrorToast, InfoToast } from "react-native-toast-message";

const baseToastStyle = {
  backgroundColor: Colors.pdsGrey2,
  height: 'auto',
  paddingVertical: 10,
};

const textStyle = {
  color: Colors.white,
  marginBottom: 2,
  fontSize: 14,
};

const subtextStyle = {
  color: Colors.gray,
  fontSize: 12,
  flexWrap: 'wrap', // Permite que el texto se ajuste
};

const successToastStyle = {
  ...baseToastStyle,
  borderLeftColor: Colors.statusGreen,
};

const errorToastStyle = {
  ...baseToastStyle,
  borderLeftColor: Colors.pdsRedDark,
};

const infoToastStyle = {
  ...baseToastStyle,
  borderLeftColor: Colors.statusOrange,
};

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={successToastStyle}
      text1Style={textStyle}
      text2Style={subtextStyle}
      text2NumberOfLines={0} // Muestra todas las líneas
      renderTrailingIcon={() => AlertIcon("checkmark-circle-outline")}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={errorToastStyle}
      text1Style={textStyle}
      text2Style={subtextStyle}
      text2NumberOfLines={0} // Muestra todas las líneas
      renderTrailingIcon={() => AlertIcon("alert-circle-outline")}
    />
  ),
  info: (props: any) => (
    <InfoToast
      {...props}
      style={infoToastStyle}
      text1Style={textStyle}
      text2Style={subtextStyle}
      text2NumberOfLines={0} // Muestra todas las líneas
      renderTrailingIcon={() => AlertIcon("information-circle-outline")}
    />
  ),
};

const AlertIcon = (icon: string) => (
  <View style={{alignItems: "center", justifyContent: "center", right: 14}}>
    <Ionicons name={icon as any} size={24} color={Colors.white} />
  </View>
);

export default function CustomToast() {
  return <Toast config={toastConfig} />
}