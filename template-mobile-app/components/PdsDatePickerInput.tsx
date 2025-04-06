import { useState } from "react";
import { TextInput, StyleSheet, View, TouchableOpacity, Pressable } from "react-native";
import Colors from "@/constants/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import useAlertNotification from "@/hooks/useAlertNotification";
import usePlatformHook from "@/hooks/usePlatformHook";
import { toIsosString } from "@/utils/sharedFunctions";
import { AppConstants } from "@/constants/Constants";

type GenericInput = {
  placeholder: string;
  value: string;
  onChangeDate: (text: string) => void;
  style?: object;
  min?: Date;
  max?: Date;
  disabled?: boolean;
  dontShowCrossIcon?: boolean;
};

export const PdsDatePickerInput = ({ placeholder, value, style = {}, onChangeDate, min, max, disabled, dontShowCrossIcon }: GenericInput) => {
  const [date, setDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const { showAlert } = useAlertNotification();
  const { isWeb, isIOS } = usePlatformHook();

  const onChange = (event: any, selectedDate: Date | undefined) => {
    const shouldClose = event.type === AppConstants.TYPE_DISMISSED || event.type === AppConstants.TYPE_SET;
    
    if (shouldClose && !isIOS) setShowPicker(false);

    if (event.type === AppConstants.TYPE_DISMISSED) return;

    if (event.type === AppConstants.TYPE_SET && selectedDate) {
      const currentDate = selectedDate;
      currentDate.setHours(0, 0, 0, 0);
      setDate(currentDate);
      onChangeDate(toIsosString(currentDate));
    }
  };

  // const renderWebDatePicker = () => {
  //   if (!isWeb) return null;
  //   return <input type="date" value={value} onChange={(e) => onChangeDate(e.target.value)} 
  //           style={{ fontFamily: "Arial", padding: 4, paddingRight: 0, borderRadius: 6,
  //             backgroundColor: Colors.pdsGrey2, color: Colors.white, height: 40
  //           }} />
  // };

  const handleShowPicker = () => {
    if (disabled) return;
    
    // if (isWeb) {
    //   showAlert({
    //     title: "Datepicker isn't available...",
    //     message: "The datepicker is not available on the web version of the app.",
    //   });
    //   return;
    // };

    if(value) {
      const date = new Date(value);
      date.setDate(date.getDate() + 1);
      setDate(date);
    }
    
    setShowPicker(true);
  };

  const handleDeleteValue = () => {
    if (disabled) return;
    onChangeDate("");
  };

  return (
    <View style={{opacity: disabled ? 0.5 : 1}}>
      {(showPicker || isIOS) && (
        <DateTimePicker disabled={disabled} value={date} mode="date" 
          minimumDate={min} maximumDate={max} display="default" onChange={onChange}
          style={{alignItems: "center", alignSelf: "center", marginVertical: isIOS ? 4 : 0, left: isIOS ? -90 : 0}} 
        />
      )}

      {!isIOS && (
        <Pressable onPress={handleShowPicker} style={{alignItems: "center"}} disabled={disabled}>
          <TextInput placeholder={placeholder} value={value} editable={false} numberOfLines={1}
            placeholderTextColor={Colors.gray} style={[styles.textInput, style]} 
          />

          <TouchableOpacity onPress={handleDeleteValue} 
            style={{position: "absolute", right: 44, top: isWeb ? 10 : 14}}>
            { (value && !dontShowCrossIcon )&& <Ionicons name="close" size={20} color={Colors.gray} /> }
          </TouchableOpacity>

          <TouchableOpacity onPress={handleShowPicker} 
            style={{position: "absolute", right: 14, top: isWeb ? 10 : 14}}>
            <Ionicons name="calendar" size={20} color={Colors.white} />
          </TouchableOpacity>
        </Pressable>
      )}

      {/* {renderWebDatePicker()} */}
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    padding: 10,
    borderRadius: 4,
    backgroundColor: Colors.pdsGrey2,
    color: Colors.white,
    height: 48,
  },
});