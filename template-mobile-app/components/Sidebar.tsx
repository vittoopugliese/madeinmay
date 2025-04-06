import { View, StyleSheet, TouchableOpacity } from "react-native";
import { router, usePathname } from "expo-router";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface SidebarIconProps {
  icon: string;
  route: string;
  currentRoute: string;
}

const SidebarIcon: React.FC<SidebarIconProps> = ({ icon, route, currentRoute }) => {
  const isActive = currentRoute === route;

  const handlePress = () => {
    if(isActive) return;
    router.push(route as any)
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={isActive ? styles.barOnSelectedIcon : {}}></View>
      <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
        <Ionicons name={icon as any} size={24} color={Colors.white} />
      </View>
    </TouchableOpacity>
  );
};

const Sidebar = () => {
  const currentRoute = usePathname();
  
  return (
    <View style={styles.sidebar}>
      <View style={styles.topIcons}>
        <SidebarIcon icon="home-outline" route="/home" currentRoute={currentRoute} />
      </View>
      <View style={styles.bottomIcons}>
        <SidebarIcon icon="log-out-outline" route="/login" currentRoute={currentRoute} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: 70,
    backgroundColor: Colors.sidebarBackgroundColor,
    height: "100%",
    paddingVertical: 10,
    paddingTop: 32,
    justifyContent: "space-between",
    borderRightWidth: 1,
    borderRightColor: Colors.pdsGrey2,
  },
  topIcons: {
    alignItems: "center",
  },
  bottomIcons: {
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  activeIconContainer: {
    backgroundColor: Colors.pdsRedDark,
    borderRadius: 10,
  },
  barOnSelectedIcon: {
    width: 3,
    height: 30,
    borderRadius: 100,
    backgroundColor: Colors.pdsRedDark,
    position: "absolute",
    left: -15,
    bottom: 15,
    zIndex: 10,
    opacity: 0.74,
  },
  iconImage: {
    width: 28,
    height: 28,
    opacity: 0.84,
  },
  userImage: {
    width: 35,
    height: 35,
    borderRadius: 100,
  },
});

export default Sidebar;
