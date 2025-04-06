import { useState } from "react";
import { AppConstants } from "@/constants/Constants";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { PdsText } from "./PdsText";
import Colors from "@/constants/Colors";
import PdsModal from "./PdsModal";
import Hr from "./Hr";

export default function ShortenedTextModal({placeholder, text, style, gray = true, usingToShowDetails = false, fontSize = 15, description}: any) {
  const [allTextModalOpen, setAllTextModalOpen] = useState(false)
  const handleShowFullTextModal = () => setAllTextModalOpen(true);

  return (
    <View style={[s.textInfoModalContainer, style]}>
      <TouchableOpacity onPress={handleShowFullTextModal} hitSlop={{top: 12, bottom: 12, left: 12, right: 12}}
        style={[s.textInfoContainer, {flexDirection: usingToShowDetails ? "row-reverse" : "row", justifyContent: usingToShowDetails ? "flex-end" : "space-between"}]}>
        <PdsText fontSize={fontSize} gray={gray} numberOfLines={1} ellipsizeMode="tail">{text ?? AppConstants.TYPE_NA}</PdsText>
      </TouchableOpacity>

      { allTextModalOpen && 
        <PdsModal title={placeholder} isOpened={allTextModalOpen} setIsOpen={setAllTextModalOpen}>
          <View style={{gap: 12}}>
            <PdsText fontSize={18} gray style={{color: Colors.white}}>{text}</PdsText>
            { description && 
              <>
                <Hr />
                <PdsText fontSize={fontSize} gray={gray} numberOfLines={1} ellipsizeMode="tail" italic>{description ?? "No description provided."}</PdsText>
              </>
            }
          </View>
        </PdsModal>
      }
    </View>
  );
};

const s = StyleSheet.create({
  textInfoModalContainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    paddingRight: 2,
  },
  textInfoContainer: {
    width: "100%",
    alignItems: "center",
    gap: 6,
  }
});