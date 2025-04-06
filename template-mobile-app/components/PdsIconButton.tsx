import Colors from "@/constants/Colors";
import {StyleSheet, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import { LoadingComponent } from "./LoadingComponent";

type Icon = {
  style?: object;
  onPress: () => void;
  icon: string;
  size?: number;
  color?: string;
  secondary?: boolean;
  loading?: boolean;
  disabled?: boolean;
};
// ICONS HERE: https://icons.expo.fyi/Index
// Or CRTRL + CLICK on the Ionicons component to see the accepted strings...
export const PdsIconButton = ({style = {}, onPress, icon, size = 24, color = "white", secondary, loading, disabled}: Icon) => {
  const handleOnPress = () => {
    if(disabled) return;
    onPress();
  };

  return (
    <TouchableOpacity style={{...styles.pdsButton, ...style, ...{backgroundColor: secondary ? Colors.pdsGrey2 : Colors.pdsRedLight, opacity: disabled ? 0.5 : 1}}} onPress={handleOnPress}>
      {   !loading
          ? <Ionicons name={icon as any} size={size} color={color} />
          : <LoadingComponent size="small" style={{transform: [{ scale: 0.74 }]}} />
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pdsButton: {
    backgroundColor: Colors.pdsRedLight,
    width: 32,
    height: 32,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  }
});
