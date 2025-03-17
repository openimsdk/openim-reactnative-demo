import { ExMessageItem } from "@/store/type";
import { notificationMessageFormat } from "@/utils/imCommon";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

type NotificationMessageProps = {
  message: ExMessageItem;
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    alignItems: "center",
  },
  text: {
    color: "#8896A3",
  },
});

const NotificationMessage: FC<NotificationMessageProps> = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text>{notificationMessageFormat(message)}</Text>
    </View>
  );
};

export default NotificationMessage;
