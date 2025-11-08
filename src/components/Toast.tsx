// Toast.tsx
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Platform,
} from 'react-native';

type Preset = 'neutral' | 'success' | 'error' | 'warning';
type Position = 'top' | 'center' | 'bottom';

export type ToastOptions = {
  message: string;
  preset?: Preset;
  duration?: number;          // ms; 0 or negative = do not auto-dismiss
  position?: Position;
  onPress?: () => void;       // Tap callback (default tap = close)
  icon?: ReactNode;           // Optional custom icon
  allowQueue?: boolean;       // Whether to enqueue when showing (default true)
};

type ToastController = {
  show: (message: string | ToastOptions, override?: Partial<ToastOptions>) => void;
  hide: () => void;
  isShowing: () => boolean;
};

const DEFAULTS: Required<Pick<ToastOptions, 'preset' | 'duration' | 'position' | 'allowQueue'>> = {
  preset: 'neutral',
  duration: 2400,
  position: 'center',
  allowQueue: true,
};

const COLORS: Record<Preset, { bg: string; fg: string; border?: string }> = {
  neutral: { bg: '#222428', fg: '#FFFFFF' },
  success: { bg: '#0F8C4B', fg: '#FFFFFF' },
  error:   { bg: '#C62828', fg: '#FFFFFF' },
  warning: { bg: '#CC8800', fg: '#111111' },
};

const SPACING = {
  top:  16 + (Platform.OS === 'ios' ? 4 : 0),
  bottom: 28 + (Platform.OS === 'ios' ? 4 : 0),
  hPad: 14,
  vPad: 12,
  radius: 12,
  maxWidth: Math.min(560, Dimensions.get('window').width - 32),
};

const ToastContext = createContext<ToastController | null>(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>');
  return ctx;
};

type QueueItem = Required<Omit<ToastOptions, 'icon' | 'onPress'>>
  & Pick<ToastOptions, 'icon' | 'onPress'> 
  & { key: number };

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const anim = useRef(new Animated.Value(0)).current; // 0 = hidden, 1 = visible
  const [current, setCurrent] = useState<QueueItem | null>(null);
  const queue = useRef<QueueItem[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  const dequeueAndShowNext = useCallback(() => {
    if (current || queue.current.length === 0) return;
    setCurrent(queue.current.shift()!);
  }, [current]);

  const hide = useCallback(() => {
    clearTimer();
    Animated.timing(anim, {
      toValue: 0,
      duration: 160,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setCurrent(null);
        // Show the next queued item
        requestAnimationFrame(dequeueAndShowNext);
      }
    });
  }, [anim, dequeueAndShowNext]);

  const isShowing = useCallback(() => !!current, [current]);

  const show = useCallback(
    (messageOrOpts: string | ToastOptions, override?: Partial<ToastOptions>) => {
      const base: ToastOptions =
        typeof messageOrOpts === 'string'
          ? { message: messageOrOpts }
          : messageOrOpts;

      const merged: QueueItem = {
        key: Date.now() + Math.random(),
        message: base.message,
        preset: base.preset ?? override?.preset ?? DEFAULTS.preset,
        duration:
          base.duration ?? override?.duration ?? DEFAULTS.duration,
        position:
          base.position ?? override?.position ?? DEFAULTS.position,
        onPress: base.onPress ?? override?.onPress ?? undefined,
        icon: base.icon ?? override?.icon,
        allowQueue:
          base.allowQueue ?? override?.allowQueue ?? DEFAULTS.allowQueue,
      };

      // If one is currently showing
      if (current) {
        if (merged.allowQueue) {
          // Limit queue length to avoid flooding
          if (queue.current.length > 4) queue.current.shift();
          queue.current.push(merged);
        } else {
          // Replace current: put at front, hide current, then show immediately after
          queue.current.unshift(merged);
          hide();
        }
        return;
      }

      setCurrent(merged);
    },
    [current, hide]
  );

  // Handle current item changes: play entrance animation and auto close on timer
  useEffect(() => {
    if (!current) return;

    // Entrance animation
    anim.stopAnimation();
    Animated.timing(anim, {
      toValue: 1,
      duration: 180,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();

    // Reset old timer and start a new one
    clearTimer();
    if (current.duration > 0) {
      timer.current = setTimeout(hide, current.duration);
    }

    return clearTimer;
  }, [current, anim, hide]);

  const controller = useMemo<ToastController>(() => ({ show, hide, isShowing }), [show, hide, isShowing]);

  // Compute position and animation
  const translateY =
    current?.position === 'top' ? anim.interpolate({
      inputRange: [0, 1],
      outputRange: [-12, 0],
    }) : current?.position === 'bottom' ? anim.interpolate({
      inputRange: [0, 1],
      outputRange: [12, 0],
    }) : 0;

  const opacity = anim;

  return (
    <ToastContext.Provider value={controller}>
      <View style={styles.root} pointerEvents="box-none">
        {children}
        {current && (
          <View
            pointerEvents="box-none"
            style={[
              styles.portal,
              current.position === 'top' && { top: SPACING.top, alignItems: 'center' },
              current.position === 'center' && { top: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' },
              current.position === 'bottom' && { bottom: SPACING.bottom, alignItems: 'center' },
            ]}
          >
            <Animated.View
              style={[
                styles.toastWrap,
                { opacity, transform: [{ translateY: translateY }] },
              ]}
            >
              <Pressable
                accessibilityRole="alert"
                accessibilityLiveRegion="polite"
                onPress={() => {
                  current.onPress?.();
                  hide();
                }}
                style={[
                  styles.toast,
                  { maxWidth: SPACING.maxWidth },
                  { backgroundColor: COLORS[current.preset].bg },
                ]}
              >
                {current.icon && <View style={styles.icon}>{current.icon}</View>}
                <Text
                  style={[styles.text, { color: COLORS[current.preset].fg }]}
                  numberOfLines={3}
                >
                  {current.message}
                </Text>
              </Pressable>
            </Animated.View>
          </View>
        )}
      </View>
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  portal: {
    position: 'absolute',
    left: 0,
    right: 0,
    // Write top/bottom at runtime according to position
    paddingHorizontal: 16,
  },
  toastWrap: {
    // Container for the animated view only
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.hPad,
    paddingVertical: SPACING.vPad,
    borderRadius: SPACING.radius,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    includeFontPadding: false,
  },
});
