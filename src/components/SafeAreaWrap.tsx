import { useMemo } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Inset = 'top' | 'bottom' | 'left' | 'right' | 'vertical' | 'horizontal' | 'all';

interface SafeAreaWrapProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  insets?: Inset[];
}

export default function SafeAreaWrap({ children, style, insets = ['all'] }: SafeAreaWrapProps) {
  const safeAreaInsets = useSafeAreaInsets();

  const insetsStyle = useMemo(() => {
    let style: ViewStyle = {};
    
    for (const inset of insets) {
      if (inset === 'top') {
        style.paddingTop = safeAreaInsets.top;
      }
      if (inset === 'bottom') {
        style.paddingBottom = safeAreaInsets.bottom;
      }
      if (inset === 'left') {
        style.paddingLeft = safeAreaInsets.left;
      }
      if (inset === 'right') {
        style.paddingRight = safeAreaInsets.right;
      }
      if (inset === 'vertical') {
        style.paddingTop = safeAreaInsets.top;
        style.paddingBottom = safeAreaInsets.bottom;
      }
      if (inset === 'horizontal') {
        style.paddingLeft = safeAreaInsets.left;
        style.paddingRight = safeAreaInsets.right;
      }
      if (inset === 'all') {
        style.paddingTop = safeAreaInsets.top;
        style.paddingBottom = safeAreaInsets.bottom;
        style.paddingLeft = safeAreaInsets.left;
        style.paddingRight = safeAreaInsets.right;
      }
    }
    return style;
  }, [insets]);

  return (
    // Wrap two layers to prevent insetsStyle and style from conflicting
    <View style={[insetsStyle]}>
      <View style={[style]}>
        {children}
      </View>
    </View>
  );
}
