import React from 'react'
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native'
import { theme } from '@/styles/theme'

type Variant = 'primary' | 'gray'

interface LinkButtonProps {
  label: string
  onPress?: (e: GestureResponderEvent) => void
  variant?: Variant
  disabled?: boolean
  underline?: boolean
  style?: StyleProp<TextStyle>
  containerStyle?: StyleProp<ViewStyle>
  numberOfLines?: number
}

export default function LinkButton({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  underline = false,
  style,
  containerStyle,
  numberOfLines = 1,
}: LinkButtonProps) {
  const color = variant === 'gray' ? theme.colors.fontGray : theme.colors.primary

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        { opacity: disabled ? 0.5 : pressed ? 0.7 : 1 },
        containerStyle,
      ]}
      hitSlop={6}
    >
      <Text
        style={[
          { color, textDecorationLine: underline ? 'underline' : 'none' },
          style,
        ]}
        numberOfLines={numberOfLines}
      >
        {label}
      </Text>
    </Pressable>
  )
}
