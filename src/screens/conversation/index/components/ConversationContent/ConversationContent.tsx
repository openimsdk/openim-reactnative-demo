import { Platform } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { styles } from "./styles";
import { ConversationItem } from "../ConnversationItem/ConversationItem";

export function ConversationContent() {
  const data = Array.from({ length: 5 }, (_, index) => index);

  return (
    <FlashList
      data={data}
      renderItem={() => <ConversationItem />}
      keyExtractor={item => item.toString()}
      // 样式
      style={styles.wrap}
      contentContainerStyle={styles.contentContainer}
      // iOS 滚动优化
      bounces={true}
      alwaysBounceVertical={true}
      // Android 滚动优化
      overScrollMode="always"
      nestedScrollEnabled={true}
      // 通用优化
      showsVerticalScrollIndicator={true}
      scrollEventThrottle={16}
      removeClippedSubviews={Platform.OS === 'android'}
    />
  );
}
