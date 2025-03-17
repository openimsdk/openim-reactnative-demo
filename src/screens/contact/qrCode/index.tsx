import NavBar from "@/components/NavBar";
import { useConversationStore } from "@/store/conversation";
import { useUserStore } from "@/store/user";
import { AddGroupQrCodePrefix, AddFriendQrCodePrefix } from "@/utils/imCommon";
import { useRoute } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  qr: {
    marginTop: 160,
  },
});

const QrCode = () => {
  const userStore = useUserStore();
  const conversationStore = useConversationStore();

  const route = useRoute();
  const { isGroup } = route.params as { isGroup: boolean };

  const url = isGroup
    ? `${AddGroupQrCodePrefix}${conversationStore?.currentGroupInfo?.groupID as string}`
    : `${AddFriendQrCodePrefix}${userStore?.selfInfo?.userID}`;

  return (
    <View style={styles.container}>
      <NavBar title="QR Code" style={styles.border} />
      <View style={styles.qr}>
        <QRCode size={280} value={url} />
      </View>
    </View>
  );
};

export default QrCode;
