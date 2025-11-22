import Avatar from "@/components/Avatar";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { StatusTag } from "../StatusTag/StatusTag";
import { MoreActionButton } from "../MoreActionButton/MoreActonButton";

export function ConversationHeader() {
  return (
    <View style={styles.wrap}>
      <View style={styles.left}>
        <Avatar size={42} fallback="K"/>
        <View style={styles.usernameWrap}>
          <Text style={styles.username}>小明</Text>
        </View>
        <StatusTag type="syncError" />
      </View>
      <View style={styles.right}>
        <MoreActionButton />
      </View>
    </View>
  );
}
