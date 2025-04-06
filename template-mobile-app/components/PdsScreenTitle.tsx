import React, {  } from 'react';
import { StyleSheet, View } from "react-native";
import { PdsText } from "./PdsText";
import useMediaWidth from "@/hooks/useMediaWidth";
import { Ionicons } from "@expo/vector-icons";
import usePlatformHook from '@/hooks/usePlatformHook';

const PdsScreenTitle = ({ title, subtitle, icon, iconColor, style}:any) => {
  const { isWeb } = usePlatformHook();
  const { isMobile } = useMediaWidth();
  
  return (
    <View style={[style, isMobile ? styles.mobileHeaderContainer : styles.headerContainer]}>
      <View style={styles.title}>
        { icon && <Ionicons name={icon as any} size={21} color={iconColor ?? "white"} style={{top: isWeb ? 1 : 0}} /> }
        <PdsText fontSize={isMobile ? 24 : 28} bold>{title}</PdsText>
      </View>

      { subtitle && <PdsText fontSize={isMobile ? 16 : 18} gray style={styles.subtitle}>{subtitle}</PdsText> }

    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  mobileHeaderContainer: {
    marginBottom: 10,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  subtitle: {
    marginTop: 4
  },
  routesContainer: {
    paddingVertical: 12,
    marginTop: 14,
    flexDirection: "row",
  },
  routeButton: {
    opacity: 1,
  },
  routeText: {
    opacity: 0.74,
  }
});

export default PdsScreenTitle;