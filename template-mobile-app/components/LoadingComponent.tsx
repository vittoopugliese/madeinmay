import Colors from "@/constants/Colors";
import {StyleSheet, View, ActivityIndicator} from "react-native";
import { PdsText } from "./PdsText";

type LoadingComponent = {
  style?:any;
  text?: string;
  color?:string;
  size?:string;
}

export const LoadingComponent = ({style, size = "large", text, color = Colors.white}:LoadingComponent) => {
  return (
    <View style={[styles.loadingContainer, style]}>
      <ActivityIndicator color={color} style={styles.spinner}
      size={size as number | "large" | "small"} />
      {text && <PdsText fontSize={16} bold style={styles.text}>{text}</PdsText>}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: Colors.white,
    marginTop: 12,
  },
  spinner: {
    transform: [{scale: 1.4}],
  }
});
