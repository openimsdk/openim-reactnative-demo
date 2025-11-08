import { Animated, Dimensions, Easing, Modal, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { styles } from "./styles";
import { useEffect, useRef, useState } from "react";

export type BottomSheetProps = {
  visible: boolean;
  children: React.ReactNode;
  onRequestClose: () => void;
  delay?: number;
  height?: ViewStyle['height'];
}

const { height: windowHeight } = Dimensions.get('window');

export default function BottomSheet({ visible, children, onRequestClose, delay = 300, height = '30%' }: BottomSheetProps) {
  const maskOpacity = useRef(new Animated.Value(0)).current;
  const [modalMounted, setModalMounted] = useState(false);

  const contentTranslateY = useRef(new Animated.Value(0)).current;

  const animateMask = (visible: boolean) => {
    return Animated.timing(maskOpacity, {
      toValue: visible ? 1 : 0,
      duration: delay,
      useNativeDriver: true,
    });
  };

  const getContentTranslateY = (visible: boolean) => {
    return visible ? 0 : windowHeight;
  };

  const animateContent = (visible: boolean) => {
    contentTranslateY.setValue(getContentTranslateY(!visible));
    return Animated.timing(contentTranslateY, {
      toValue: getContentTranslateY(visible),
      duration: delay,
      useNativeDriver: true,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
    });
  };

  useEffect(() => {
    if (visible) {
      // First mount then fade in
      setModalMounted(true);
      animateMask(true).start();
      animateContent(true).start();
    } else {
      // First fade out then unmount
      animateMask(false).start(() => {
        setModalMounted(false);
      });
      animateContent(false).start();
    }
  }, [visible]);

  return (
    <Modal visible={modalMounted} transparent>
      <View style={styles.modalWrap}>
        <TouchableWithoutFeedback onPress={onRequestClose}>
          <Animated.View style={[styles.mask, { opacity: maskOpacity }]}></Animated.View>
        </TouchableWithoutFeedback>
        <Animated.View style={[styles.content, { height: height }, { transform: [{ translateY: contentTranslateY }] }]}>
          <View style={styles.contentHeader}></View>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}
