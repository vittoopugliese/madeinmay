import { memo } from "react";
import {TextInput, StyleSheet, InputModeOptions, View} from "react-native";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { LoadingComponent } from "./LoadingComponent";

type GenericInput = {
  placeholder: string;
  value: string;
  onChangeText: (text: any) => void;
  secureTextEntry?: boolean;
  style?: object;
  inputMode?: InputModeOptions;
  multiline?: boolean;
  inputStyle?:any;
  disabled?: boolean;
  loading?: boolean;
  notRenderDeleteValueIcon?: boolean;
};

export const PdsInput = memo(({placeholder, value, onChangeText, secureTextEntry = false, style = {}, inputMode = "text", multiline = false, inputStyle, disabled, loading, notRenderDeleteValueIcon}: GenericInput) => {
  const handleCrossClick = () => {
    if(disabled) return;
    onChangeText("");
  }

  const isShowingCross = value && value.length > 0 && !notRenderDeleteValueIcon;

  return (
    <View style={[{justifyContent:"center"}, style, {opacity: disabled ? 0.5 : 1}]}>
      <TextInput placeholderTextColor={Colors.gray} style={[styles.textInput, inputStyle]} placeholder={placeholder}
        onChangeText={(text) => onChangeText(text)} multiline={multiline} value={value}
        secureTextEntry={secureTextEntry} inputMode={inputMode as InputModeOptions} editable={!disabled} />

      { isShowingCross && <Ionicons name="close" size={24} onPress={handleCrossClick} 
        color={Colors.gray} style={styles.cross} /> }

      { loading && <LoadingComponent size="small" style={[styles.loading, {right: isShowingCross ? 44 : 10}]} /> }
    </View>
  );
});

const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    height: 48,
    padding: 10,
    paddingRight: 40,
    borderRadius: 4,
    backgroundColor: Colors.pdsGrey2,
    color: Colors.white,
    alignItems: "center",
    fontSize: 15,
  },
  cross: {
    position: "absolute",
    right: 10,
    top: 12,
  },
  loading: {
    position: "absolute",
    top: 14,
    transform: [{ scale: 0.74 }],
  },
});
