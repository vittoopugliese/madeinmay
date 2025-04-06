import {AppConstants} from "@/constants/Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import * as ImageManipulator from "expo-image-manipulator";

export const firstLetterLowercase = (str: string) =>
  str.charAt(0).toLowerCase() + str.slice(1);

export const firstLetterUppercase = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const upperCaseToCapitalized = (str: string) =>
  str.charAt(0) + str.slice(1).toLowerCase();

export const isStringUppercase = (str: string) => str === str.toUpperCase();

export const toIsosString = (date: Date) => date.toISOString().split("T")[0];

export const addSpacesToCamelCaseText = (text: string) => {
  if (text[0] == text[0].toLowerCase())
    text = text.replace(text[0], text[0].toUpperCase());
  return text.replace(/([A-Z])/g, " $1").trim();
};

export const sanitizeBuildingName = (name: string) =>
  name.replace(/[^\w.-]+/g, "_");

export const parseTableHeader = (header: string) =>
  firstLetterLowercase(header.replace(/\s/g, ""));

export const makeIconObject = (position: string, name: string) => {
  return {position, name} as any;
};

export const showToastAlert = (type: any, text: string, message: string) => {
  return Toast.show({
    type: type as any,
    visibilityTime: 4000,
    text1: text,
    text2: message,
  });
};

export const returnErrorMessage = (error: any) => {
  if (error.message.includes("401"))
    return "Unauthorized, please Login again...";

  if (error?.message) return error.message;
  return typeof (error === "string")
    ? error
    : error?.message ?? error?.message.toString() ?? "An error occurred";
};

export const getToken = async (
  cachedToken: string | null
): Promise<string | null> => {
  if (cachedToken) return cachedToken;
  const authCredentials = await AsyncStorage.getItem(
    AppConstants.AUTH_CREDENTIALS
  );

  if (authCredentials) {
    cachedToken = JSON.parse(authCredentials)?.tokenValue;
    return cachedToken;
  }

  return cachedToken;
};

export const getInputsTableLineHeight = (isWeb: any, editingMode: any) => {
  let lineHeight: any = "90%";

  if (!isWeb && !editingMode) {
    lineHeight = 60;
  } else if (editingMode && !isWeb) {
    lineHeight = 80;
  } else if (editingMode && isWeb) {
    lineHeight = "80%";
  }

  return lineHeight;
};

export const setBorderRadius = (index: number, length: number) => {
  return {
    borderBottomLeftRadius: index === length - 1 ? 4 : 0,
    borderBottomRightRadius: index === length - 1 ? 4 : 0,
  };
};

export const getUserImageSource = (authCredentials: any) => {
  if (
    authCredentials.masterUserProfile?.avatarImage &&
    authCredentials.masterUserProfile?.avatarImage !== "null"
  ) {
    return {uri: authCredentials.masterUserProfile.avatarImage};
  }

  return require("../assets/images/user.png");
};

export const parseDate = (date: Date) => {
  const utcDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );

  let year = utcDate.getUTCFullYear();
  let month = utcDate.getUTCMonth() + 1;
  let day = utcDate.getUTCDate();

  return `${year}-${returnZeroBasedNumber(month)}-${returnZeroBasedNumber(
    day
  )}`;
};

export const returnZeroBasedNumber = (number: number) => {
  return number < 10 ? `0${number}` : number;
};

export const compressImage = async (uri: string) => {
  try {
    const manipResult = await ImageManipulator.manipulateAsync(
      uri,
      [{resize: {width: 1080}}],
      {compress: 0.8, format: ImageManipulator.SaveFormat.JPEG}
    );
    return manipResult.uri;
  } catch (error) {
    console.error("Error compressing image:", error);
    return uri;
  }
};

export const getImageToSave = async (imagePickerResponse: any) => {
  const asset = imagePickerResponse.assets[0];
  return asset.uri;
  return await compressImage(asset.uri);
};

export const getFileToUpload = (
  imagePickerResponse: any,
  fileName: any,
  fileExtension: any,
  isWeb: boolean
) => {
  let file;

  if (isWeb) {
    file = imagePickerResponse.assets[0].file;
  } else {
    file = {
      name: fileName,
      uri: imagePickerResponse.assets[0].uri,
      type: imagePickerResponse.assets[0].mimeType || `image/${fileExtension}`,
    };
  }

  return file;
};

export const parseFileSize = (fileSizeInBytes: number) => {
  const fileSizeInKB = fileSizeInBytes / 1024;
  const fileSizeInMB = fileSizeInKB / 1024;

  if (fileSizeInMB < 1) return `${fileSizeInKB.toFixed(2)} KB`;
  return `${fileSizeInMB.toFixed(2)} MB`;
};

export const imageExceedsSize = (imagePickerResponse: any) => {
  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50mb

  if (
    imagePickerResponse.assets[0].fileSize &&
    imagePickerResponse.assets[0].fileSize > MAX_FILE_SIZE
  ) {
    showToastAlert(
      AppConstants.ERROR as any,
      "File too large",
      "Please select an image smaller than 50MB"
    );
    return true;
  }

  return false;
};

export const convertBase64ToFile = async function (
  image: string,
  fileName: string
): Promise<File | Blob> {
  const extension = fileName.split(".").pop();
  const type = `image/${extension}`;
  return fetch(image)
    .then((response) => response.blob())
    .then((blob) => {
      return new File([blob], fileName, {type});
    });
};

export const convertImageToBase64 = async (uri: string): Promise<string> => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const parseStepDateInputValue = (value: any) => {
  if (!value) return value;
  if (value.includes("T")) return value.split("T")[0];
  return value;
};