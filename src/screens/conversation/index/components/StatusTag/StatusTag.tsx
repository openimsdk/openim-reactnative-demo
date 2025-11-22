import { Animated, Easing, Image, Text, View } from "react-native";
import { styles } from "./styles";
import { useEffect, useRef } from "react";

type StatusTagProps = {
  type: 'loading' | 'syncError';
}

export function StatusTag({ type }: StatusTagProps) {
  const styleMap = {
    loading: {
      wrap: styles.loadingWrap,
      text: styles.loadingText,
    },
    syncError: {
      wrap: styles.errorWrap,
      text: styles.errorText,
    },
  }

  const iconMap = {
    loading: <LoadingIcon />,
    syncError: <SyncErrorIcon />,
  }

  const textMap = {
    loading: '同步中',
    syncError: '同步失败',
  }

  return (
    <View style={[styles.wrap, styleMap[type].wrap]}>
      {iconMap[type]}
      <Text style={[styles.text, styleMap[type].text]}>{textMap[type]}</Text>
    </View>
  );
}

function LoadingIcon() {
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [spinAnim]);

  const rotate = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-360deg'],
  });

  return (
    <Animated.Image
      style={[styles.icon, { transform: [{ rotate }] }]}
      source={require('@/assets/images/conversation/loading.png')}
    />
  );
}

function SyncErrorIcon() {
  return (
    <Image style={styles.icon} source={require('@/assets/images/conversation/sync_error.png')} />
  );
}
