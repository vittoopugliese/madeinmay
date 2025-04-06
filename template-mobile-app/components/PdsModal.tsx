import {View, StyleSheet, Modal, TouchableOpacity} from "react-native";
import Colors from "@/constants/Colors";
import useMediaWidth from "@/hooks/useMediaWidth";
import { PdsText } from "./PdsText";
import { Ionicons } from "@expo/vector-icons";

type TModal = {
  title: string;
  isOpened: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
  onClose?: () => void;
};

const PdsModal = ({ title, isOpened, setIsOpen, children, onClose }: TModal) => {
  const {isMobile, isSmallMobile} = useMediaWidth();

  const handleCloseModal = () => {
    if(onClose) {
      onClose();
    } else {
      setIsOpen(false); 
    };
  };

  return (
    <Modal visible={isOpened} transparent={true} animationType="fade" onRequestClose={handleCloseModal}>
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, {width: isSmallMobile ? "95%" : isMobile ? "85%" : "65%"}]}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <PdsText fontSize={isMobile ? 20 : 25} bold style={{marginBottom: 10}}>{title}</PdsText>
            <TouchableOpacity onPress={handleCloseModal}>
              <Ionicons name="close" size={32} color={Colors.statusGrey} style={{bottom: 8}} />
            </TouchableOpacity>
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  dropdownButton: {
    height: 50,
    padding: 10,
    flex: 1,
    marginTop: 12,
    marginBottom: 12,
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: Colors.pdsGrey2,
    color: Colors.white,
    borderColor: Colors.pdsGrey,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: Colors.pdsBlack,
    borderRadius: 10,
    padding: 20,
    paddingTop: 15,
    maxHeight: "80%",
    borderWidth: 1,
    borderColor: Colors.pdsGrey2,
  },
  optionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: Colors.pdsGrey,
  },
  optionText: {
    fontSize: 16,
    color: Colors.white,
  },
});

export default PdsModal;
