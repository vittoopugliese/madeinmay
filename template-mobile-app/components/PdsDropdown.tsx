import {useEffect, useState} from "react";
import { View, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import Colors from "@/constants/Colors";
import { PdsText } from "./PdsText";
import { PdsButton } from "./PdsButton";
import useMediaWidth from "@/hooks/useMediaWidth";
import { Feather, Ionicons } from "@expo/vector-icons";
import PdsModal from "./PdsModal";

interface Dropdown {
  options: string[];
  onSelect: (option: string) => void;
  style?: object;
  placeholder?: string;
  defaultValue?: string | null;
  usingAsModal?: boolean;
  closeWithButton?: boolean;
  placeholderAsText?: boolean;
  showClearSelectionButton?: boolean;
  resetSelection?: boolean;
  disabled?: boolean;
  notRenderDeleteValueIcon?: boolean;
}

export default function PdsDropdown({options, onSelect, style, placeholder = "Select an option", defaultValue, usingAsModal = true, closeWithButton = false, placeholderAsText = false, showClearSelectionButton = true, resetSelection = false, disabled, notRenderDeleteValueIcon}:Dropdown){
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  const { isMobile } = useMediaWidth();
  
  useEffect(() => {
    if (defaultValue) setSelectedOption(defaultValue);
  }, [])

  useEffect(() => {
    if (resetSelection) setSelectedOption(null);
  }, [resetSelection]);

  const handleSelect = (event:any, option: string) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedOption(placeholderAsText ? placeholder : option);
    onSelect(option);
    setIsOpen(false);
  };

  const handleOnDropdown = () => {
    if(disabled) return;
    setIsOpen(!isOpen)
  }

  const handleClearSelection = () => {
    if(disabled) return;
    setSelectedOption(null);
    onSelect("");
  }

  return (
    <View style={[styles.container, {opacity: disabled ? 0.5 : 1}]}>
      <TouchableOpacity
        style={[styles.dropdownButton, style, {borderBottomEndRadius: !usingAsModal && isOpen ? 0 : 4, borderBottomStartRadius: !usingAsModal && isOpen ? 0 : 4}]}
        onPress={handleOnDropdown}>
            <PdsText gray>{selectedOption || placeholder}</PdsText>
            <View style={{flexDirection: "row", gap: 10}}>
              {(selectedOption && showClearSelectionButton && !notRenderDeleteValueIcon) && <Ionicons name="close" onPress={handleClearSelection} size={22} color={Colors.gray} style={{top:1}} />}
              <Feather name={!isOpen ? "chevron-down" : "chevron-up"} size={24} color={Colors.white} />
            </View>
      </TouchableOpacity>

      { (!usingAsModal && isOpen) && (
          <View style={styles.dropdownContainer}>
            <FlatList data={options} scrollEnabled={false} keyExtractor={(item) => item}
              ListEmptyComponent={<PdsText fontSize={14} gray>No options available...</PdsText>}
              renderItem={({item, index}) => (
                <TouchableOpacity onPress={(e) => handleSelect(e, item)}
                  style={[styles.dropDownOptionItem, {
                    borderBottomWidth: (index !== options.length-1) ? 1 : 0,
                    borderRadius: (index !== options.length-1) ? 0 : 4,
                    borderTopLeftRadius: 0, borderTopRightRadius: 0
                  }]}>
                  <PdsText fontSize={16}>{item}</PdsText>
                </TouchableOpacity>
            )} />
          </View>
        )}

      { usingAsModal && 
        <PdsModal title={placeholder} isOpened={isOpen} setIsOpen={setIsOpen}>
          <FlatList data={options} keyExtractor={(item) => item}
            ListEmptyComponent={<PdsText fontSize={14} gray>No options available...</PdsText>}
            renderItem={({item, index}) => (
              <TouchableOpacity style={[styles.optionItem, {borderBottomWidth: (index !== options.length-1) ? 1 : 0}]}
                onPress={(e) => handleSelect(e, item)}>
                <PdsText fontSize={16}>{item}</PdsText>
              </TouchableOpacity>
          )} />

          { closeWithButton && 
            <View style={{width: "100%", justifyContent: "flex-end", flexDirection: "row"}}>
              <PdsButton style={{width: isMobile ? "100%" : "25%", marginTop: 20}} text="Close" onPress={() => setIsOpen(false)} />
            </View>
          }
        </PdsModal>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
  },
  dropdownContainer: {
    position: "absolute",
    width: "100%",
    pointerEvents: "auto",
    top: 48,
    backgroundColor: Colors.sidebarBackgroundColor,
    borderRadius: 4,
    elevation: 5,
    zIndex: 9999,
    shadowColor: Colors.pdsBlack, 
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 48,
    minHeight: 48,
    padding: 10,
    flex: 1,
    borderRadius: 4,
    backgroundColor: Colors.pdsGrey2,
    color: Colors.white,
  },
  optionItem: {
    padding: 15,
    borderColor: Colors.pdsGrey,
  },
  dropDownOptionItem: {
    padding: 15,
    borderColor: Colors.pdsGrey2,
    backgroundColor: Colors.pdsGrey,
    opacity: 1,   
  },
});