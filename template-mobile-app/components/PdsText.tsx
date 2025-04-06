import Colors from "@/constants/Colors";
import {Text, StyleSheet} from "react-native";

type GenericText = {
  children: any;
  style?: object;
  bold?: boolean;
  gray?: boolean;
  italic?: boolean;
  fontSize?: number;
  onPress?: () => void;
  numberOfLines?: number;
  ellipsizeMode?: "head" | "middle" | "tail" | "clip";
};

export const PdsText = ({ children, style = {}, bold = false, fontSize = 15, gray = false, onPress, numberOfLines, italic, ellipsizeMode}: GenericText) => {
  return (
    <Text onPress={onPress} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode} style={[
        styles.text,
        {fontSize: fontSize},
        bold && styles.boldText,
        gray && styles.grayText,
        italic && styles.italicText,
        style,
      ]}>{children}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Colors.white,
    textAlign: "left",
    width: "auto",
  },
  boldText: {
    fontWeight: "bold",
  },
  grayText: {
    color: Colors.gray,
  },
  italicText: {
    fontStyle: "italic",
  },
});
