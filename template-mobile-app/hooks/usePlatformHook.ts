import { useMemo } from "react";
import { Platform } from "react-native";
import { AppConstants } from "@/constants/Constants";

const usePlatformHook = () => {
  return useMemo(() => ({
    isWeb: Platform.OS === AppConstants.WEB,
    isIOS: Platform.OS === AppConstants.IOS,
    isAndroid: Platform.OS === AppConstants.ANDROID
  }), []);
};

export default usePlatformHook;