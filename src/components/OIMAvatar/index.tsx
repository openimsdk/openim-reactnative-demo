import { FC } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import group_icon from "@/assets/images/contact/my_groups.png";

type AvatarProps = {
  faceURL?: string;
  isGroup?: boolean;
  // isnotification?: boolean;
  size?: number;
  fontSize?: number;
  text?: string;
};

const Avatar: FC<AvatarProps> = ({ faceURL, text, size = 42, fontSize = 18, isGroup = false }) => {
  const styles = StyleSheet.create({
    avatar: {
      width: size,
      height: size,
      borderRadius: 50,
      backgroundColor: "transparent",
    },
    textAvatar: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#1877F2",
    },
    text: {
      fontSize,
      color: "white",
    },
  });

  if (isGroup) {
    return <Image source={group_icon} style={styles.avatar} />;
  }

  if (faceURL) {
    return <Image source={{ uri: faceURL }} style={styles.avatar} />;
  }

  // const lastChar = text ?? text.charAt(0);
  const lastChar = text ? text.charAt(0) : "";

  return (
    <View style={[styles.avatar, styles.textAvatar]}>
      <Text style={styles.text}>{lastChar}</Text>
    </View>
  );
};

export default Avatar;
