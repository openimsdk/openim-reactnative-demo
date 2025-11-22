import { theme } from "@/styles/theme";
import { useRef, useState } from "react";
import { Image, ImageProps, Modal, Pressable, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { styles } from "./style";
import { WINDOW_WIDTH } from "@/constants/size";

async function getElementRect(elementRef: React.RefObject<View | null>): Promise<{
  x: number;
  y: number;
  width: number;
  height: number;
  pageX: number;
  pageY: number;
}> {
  return new Promise((resolve) => {
    if (!elementRef.current) resolve({ x: 0, y: 0, width: 0, height: 0, pageX: 0, pageY: 0 });

    elementRef.current!.measure((x, y, width, height, pageX, pageY) => {
      resolve({ x, y, width, height, pageX, pageY });
    });
  });
}

export function MoreActionButton() {
  const [floatPositionStyle, setFloatPositionStyle] = useState<ViewStyle>({});
  const [visible, setVisible] = useState(false);

  const moreActionButtonRef = useRef<View>(null);

  async function handlePress() {
    setVisible(!visible);
    const rect = await getElementRect(moreActionButtonRef);
    setFloatPositionStyle({
      top: rect.pageY + rect.height + 6,
      right: WINDOW_WIDTH - rect.pageX - rect.width,
    });
  }

  return (
    <>
      <TouchableOpacity activeOpacity={0.6} onPress={handlePress}>
        <View ref={moreActionButtonRef} style={styles.moreWrap}>
          <Image style={styles.moreIcon} source={require('@/assets/images/conversation/add.png')} />
        </View>
      </TouchableOpacity>

      <Modal visible={visible} transparent={true} statusBarTranslucent={true} animationType="none">
        <Pressable onPress={handlePress} style={styles.mask} />

        <View style={[styles.floatWrap, floatPositionStyle]}>
          <View style={styles.actionList}>
            <ActionListItem icon={require('@/assets/images/conversation/add_friend.png')} children="添加好友" onPress={() => {}} />
            <ActionListItemSeparator />
            <ActionListItem icon={require('@/assets/images/conversation/add_group.png')} children="添加群组" onPress={() => {}} />
            <ActionListItemSeparator />
            <ActionListItem icon={require('@/assets/images/conversation/create_group.png')} children="发起群聊" onPress={() => {}} />
          </View>
        </View>
      </Modal>
    </>
  )
}

type ActionListItemProps = {
  icon: ImageProps['source'];
  children: string;
  onPress: () => void;
}

function ActionListItem({ icon, children, onPress }: ActionListItemProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [{ backgroundColor: pressed ? theme.colors.gray50 : '#fff' }]}>
      <View style={styles.actionListItem}>
        <Image style={styles.actionListItemIcon} source={icon} />
        <Text style={styles.actionListItemText}>{children}</Text>
      </View>
    </Pressable>
  )
}

function ActionListItemSeparator() {
  return <View style={styles.actionListItemSeparator} />
}