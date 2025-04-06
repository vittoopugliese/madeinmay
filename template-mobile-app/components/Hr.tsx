import Colors from "@/constants/Colors";
import {View, StyleSheet} from "react-native";

export default function Hr({style}:any) {
  return <View style={[styles.separator, style]}></View>;
}

const styles = StyleSheet.create({
  separator: {
    width: "95%",
    height: 2,
    backgroundColor: Colors.pdsGrey2,
    alignSelf: "center",
  },
});
