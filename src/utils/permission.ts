import { PermissionsAndroid, Platform } from "react-native";

export const requestAndroidPerm = async (kind: 'camera' | 'library') => {
  if (Platform.OS !== 'android') return true;
  const perm =
    kind === 'camera'
      ? PermissionsAndroid.PERMISSIONS.CAMERA
      : (Platform.Version >= 33
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);

  const granted = await PermissionsAndroid.request(perm);
  return granted === PermissionsAndroid.RESULTS.GRANTED;
};