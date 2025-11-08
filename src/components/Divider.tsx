import { theme } from '@/styles/theme'
import React, { useMemo } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

type Orientation = 'horizontal' | 'vertical'

interface DividerProps {
  orientation?: Orientation
  color?: string
  thickness?: number
  style?: StyleProp<ViewStyle>
  // Padding controls (default 0)
  padding?: number
  paddingHorizontal?: number
  paddingVertical?: number
  paddingTop?: number
  paddingBottom?: number
  paddingLeft?: number
  paddingRight?: number
}

export default function Divider({
  orientation = 'horizontal',
  color = theme.colors.gray300,
  thickness = 1,
  style,
  padding = 0,
  paddingHorizontal,
  paddingVertical,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
}: DividerProps) {
  const containerStyle = useMemo<ViewStyle>(() => {
    const s: ViewStyle = {}
    // base
    s.padding = padding
    if (paddingVertical != null) {
      s.paddingTop = paddingVertical
      s.paddingBottom = paddingVertical
    }
    if (paddingHorizontal != null) {
      s.paddingLeft = paddingHorizontal
      s.paddingRight = paddingHorizontal
    }
    if (paddingTop != null) s.paddingTop = paddingTop
    if (paddingBottom != null) s.paddingBottom = paddingBottom
    if (paddingLeft != null) s.paddingLeft = paddingLeft
    if (paddingRight != null) s.paddingRight = paddingRight
    return s
  }, [
    padding,
    paddingHorizontal,
    paddingVertical,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
  ])

  const lineStyle = useMemo<ViewStyle>(() => {
    if (orientation === 'vertical') {
      return {
        width: thickness,
        alignSelf: 'stretch',
        backgroundColor: color,
      }
    }
    return {
      height: thickness,
      width: '100%',
      backgroundColor: color,
    }
  }, [orientation, color, thickness])

  return (
    <View style={[containerStyle, style]}>
      <View style={lineStyle} />
    </View>
  )
}
