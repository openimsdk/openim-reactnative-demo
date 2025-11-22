import { useMemo } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Inset = 'top' | 'bottom' | 'left' | 'right' | 'vertical' | 'horizontal' | 'all';

interface SafeAreaWrapProps {
  children: React.ReactNode;
  insets?: Inset[];
  /** 内容区域的样式 */
  style?: StyleProp<ViewStyle>;
  /** SafeArea 容器的背景色 */
  safeAreaBgColor?: string;
  fullHeight?: boolean;
}

export default function SafeAreaWrap(props: SafeAreaWrapProps) {
  const {
    children,
    style,
    safeAreaBgColor,
    insets = ['all'],
    fullHeight = true,
  } = props;

  const safeAreaInsets = useSafeAreaInsets();

  const insetsStyle = useMemo(() => {
    const paddingStyle: ViewStyle = {};

    if (insets.includes('all')) {
      paddingStyle.paddingTop = safeAreaInsets.top;
      paddingStyle.paddingBottom = safeAreaInsets.bottom;
      paddingStyle.paddingLeft = safeAreaInsets.left;
      paddingStyle.paddingRight = safeAreaInsets.right;
      return paddingStyle;
    }

    for (const inset of insets) {
      if (inset === 'top') {
        paddingStyle.paddingTop = safeAreaInsets.top;
      } else if (inset === 'bottom') {
        paddingStyle.paddingBottom = safeAreaInsets.bottom;
      } else if (inset === 'left') {
        paddingStyle.paddingLeft = safeAreaInsets.left;
      } else if (inset === 'right') {
        paddingStyle.paddingRight = safeAreaInsets.right;
      } else if (inset === 'vertical') {
        paddingStyle.paddingTop = safeAreaInsets.top;
        paddingStyle.paddingBottom = safeAreaInsets.bottom;
      } else if (inset === 'horizontal') {
        paddingStyle.paddingLeft = safeAreaInsets.left;
        paddingStyle.paddingRight = safeAreaInsets.right;
      }
    }
    return paddingStyle;
  }, [insets, safeAreaInsets]);

  const safeAreaStyle = useMemo(() => {
    const containerStyle: ViewStyle = {
      ...insetsStyle,
      backgroundColor: safeAreaBgColor,
    };
    if (fullHeight) {
      containerStyle.height = '100%';
    }
    return containerStyle;
  }, [insetsStyle, safeAreaBgColor, fullHeight]);

  return (
    // Wrap two layers to prevent insetsStyle and style from conflicting
    <View style={safeAreaStyle}>
      <View style={style}>
        {children}
      </View>
    </View>
  );
}
