import Colors from "@/constants/Colors";
import { StyleSheet, TouchableOpacity } from "react-native";
import { LoadingComponent } from "./LoadingComponent";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { PdsText } from "./PdsText";

type GenericButton = {
  text: string;
  style?: object;
  onPress: () => void;
  loading?: boolean;
  icon?: {position: "left" | "right", name: string};
  disabled?: boolean;
  textSize?: number;
  secondary?: boolean;
  tertiary?: boolean;
};

export const PdsButton = ({text, style = {}, onPress, loading, icon, disabled, textSize, secondary, tertiary}: GenericButton) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}
      style={{...styles.pdsButton,
        backgroundColor: (secondary || tertiary) ? Colors.pdsGrey2 : Colors.pdsRedLight,
        flexDirection: icon?.position == "right" ? "row" : "row-reverse",
        borderWidth: tertiary ? 2 : 0, borderColor: tertiary ? Colors.pdsRedLight : "transparent", borderStyle: tertiary ? "dashed" : "solid",
        borderRadius: tertiary ? 6 : 4, opacity: disabled ? 0.254 : 1, ...style
      }}>

      { !loading
        ? <PdsText bold fontSize={18} style={{fontSize: textSize ?? 18}}>{text}</PdsText>
        : <LoadingComponent size="small" />
      }
      { ((icon && icon.name) && !loading) && 
        ( icon.name === "plug"
            ? <FontAwesome5 name="plug" size={20} color={Colors.white} />
            : <Ionicons name={icon.name as any} size={20} color={Colors.white} 
                style={{top: icon.name == "close" ? 2 : 0}} />
        )
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pdsButton: {
    gap: 6,
    height: 46,
    width: "100%",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  }
});