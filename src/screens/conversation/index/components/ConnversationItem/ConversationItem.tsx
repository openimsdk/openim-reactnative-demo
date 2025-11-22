import Avatar from "@/components/Avatar";
import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./styles";
import { theme } from "@/styles/theme";

export function ConversationItem() {
  return (
    <Pressable style={({ pressed }) => [styles.wrap, { backgroundColor: pressed ? theme.colors.gray50 : '#fff' }]}>
      <Avatar size={48} fallback="K"/>
      <View style={styles.contentPart}>
        <View style={styles.contentTop}>
          <Text style={styles.nickname}>小明</Text>
          <Text style={styles.time}>10:00</Text>
        </View>
        <View style={styles.contentBottom}>
          <Text
            style={styles.message}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            你好，我是小明，这是一个很长的文本，需要超出显示省略号
          </Text>
          <Image style={styles.notAcceptIcon} source={require('@/assets/images/conversation/not_accept.png')} />
        </View>
      </View>
      <View style={styles.topTag} />
    </Pressable>
  )
}