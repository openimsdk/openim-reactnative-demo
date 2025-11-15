import React from 'react';
import { theme } from "@/styles/theme";
import { Image, ImageProps, StyleSheet, Text, View } from "react-native";

type AvatarProps = {
  src?: ImageProps['source']; // image source
  size?: number; // avatar size, default 40
  borderRadius?: number; // border radius, default 0
  backgroundColor?: string; // background color, default primary color
  fallback?: React.ReactNode; // fallback content, can be a component or text
}

export default function Avatar(props: AvatarProps) {
  const {
    src,
    size = 48,
    borderRadius = 6,
    backgroundColor = theme.colors.primary,
    fallback,
  } = props;

  return (
    <View style={[styles.container, { width: size, height: size, borderRadius, backgroundColor }]}>
      {src ? (
        <Image source={src} style={[styles.image]} />
      ) : fallback ? (
        React.isValidElement(fallback) ? (
          fallback
        ) : (
          <Text style={{ color: '#fff', fontSize: size / 2.5 }}>{fallback}</Text>
        )
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
