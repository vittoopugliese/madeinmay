import { StatusBar } from "react-native";
import { Stack } from "expo-router";
import CustomToast from "@/components/CustomToast";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { configureReanimatedLogger, ReanimatedLogLevel, } from 'react-native-reanimated';
import Colors from "@/constants/Colors";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";

export default function RootLayout() {
  configureReanimatedLogger({level: ReanimatedLogLevel.warn, strict: false});

  const customTheme = {...DarkTheme,colors: {...DarkTheme.colors, background: Colors.sidebarBackgroundColor}};

  return (
    <ThemeProvider value={customTheme}>
      <GestureHandlerRootView>
        <StatusBar barStyle="light-content" backgroundColor={Colors.sidebarBackgroundColor} />
        <Stack screenOptions={{headerShown: false, contentStyle: {backgroundColor: Colors.sidebarBackgroundColor}}} />
        <CustomToast />
      </GestureHandlerRootView>
    </ThemeProvider>
  );
};