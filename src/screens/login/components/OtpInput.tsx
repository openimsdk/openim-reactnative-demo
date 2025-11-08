import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native';

type OtpInputProps = {
  length?: number;          // number of digits
  value?: string;           // optional controlled value
  onChange?: (code: string) => void;
  onFilled?: (code: string) => void; // callback when fully filled
  autoFocus?: boolean;
  secure?: boolean;         // mask digits with •
  boxSize?: ViewStyle['width'];         // size of each box
};

export default function OtpInput({
  length = 6,
  value,
  onChange,
  onFilled,
  autoFocus = true,
  secure = false,
  boxSize = 48,
}: OtpInputProps) {
  const [inner, setInner] = useState('');
  const code = value ?? inner;

  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);

  // Blinking cursor
  const blink = useRef(new Animated.Value(1)).current;
  const loopRef = useRef<Animated.CompositeAnimation | null>(null);

  // Start/stop animation based on focus
  useEffect(() => {
    if (focused) {
      // Reset to visible, then start loop
      blink.setValue(1);
      loopRef.current?.stop();
      loopRef.current = Animated.loop(
        Animated.sequence([
          Animated.timing(blink, { toValue: 0, duration: 500, useNativeDriver: true }),
          Animated.timing(blink, { toValue: 1, duration: 500, useNativeDriver: true }),
        ])
      );
      loopRef.current.start();
    } else {
      // Stop and reset on blur to avoid being stuck transparent next time
      loopRef.current?.stop();
      blink.setValue(1);
    }
    return () => {
      loopRef.current?.stop();
    };
  }, [focused, blink]);

  const chars = useMemo(
    () => Array.from({ length }, (_, i) => code[i] ?? ''),
    [code, length]
  );

  const handleChange = (t: string) => {
    const v = t.replace(/\D/g, '').slice(0, length); // digits only
    if (value === undefined) setInner(v);
    onChange?.(v);
    if (v.length === length) onFilled?.(v);
  };

  return (
    <Pressable onPress={() => inputRef.current?.focus()}>
      <View style={styles.row}>
        {chars.map((char, idx) => {
          const isActive = focused && idx === Math.min(code.length, length - 1);
          return (
            <View
              key={idx}
              style={[
                styles.box,
                { width: boxSize, borderRadius: 10 },
                isActive && styles.boxActive,
                !!char && styles.boxFilled,
              ]}
            >
              {char ? (
                <Text style={styles.digit}>{secure ? '•' : char}</Text>
              ) : isActive ? (
                <Animated.View style={[styles.cursor, { opacity: blink }]} />
              ) : null}
            </View>
          );
        })}
      </View>

      {/* Hidden real input field */}
      <TextInput
        ref={inputRef}
        value={code}
        onChangeText={handleChange}
        onKeyPress={(e) => {
          if (e.nativeEvent.key === 'Backspace' && code.length === 0) {
            // Fallback: some devices do not trigger onChangeText when backspacing empty
            handleChange('');
          }
        }}
        maxLength={length}
        keyboardType="number-pad"
        inputMode="numeric"
        // OTP autofill (iOS & Android)
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        // Hide system caret
        caretHidden
        autoFocus={autoFocus}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        // Move off-screen
        style={styles.hiddenInput}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  box: {
    borderWidth: 1,
    borderColor: '#E1E5EE',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
  },
  boxActive: {
    borderColor: '#4C8DF6',
    shadowColor: '#4C8DF6',
    shadowOpacity: 0.18,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  boxFilled: {
    borderColor: '#C9D3E6',
  },
  digit: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1F2A44',
  },
  cursor: {
    width: 2,
    height: 24,
    backgroundColor: '#4C8DF6',
    borderRadius: 1,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    height: 0,
    width: 0,
  },
});
