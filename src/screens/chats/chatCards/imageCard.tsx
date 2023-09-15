import { Image, StyleSheet, Text, View } from "react-native";
import Avatar from "../../../components/avatar";
import { GetSelfInfo, GetUsersInfo } from "../../api/openimsdk";
import { useEffect, useState } from "react";
import { useUserStore } from "../../../../store/user";
import { ExMessageItem } from "../../../../store/message";

const ImageCard = ({ message }: { message: ExMessageItem }) => {
    const [selfID, setSelfID] = useState(false);
    const currentID = useUserStore((state) => state.selfInfo);

    useEffect(() => {
        if (currentID.userID === message.sendID) {
            setSelfID(true);
        }
    }, [message.contentType, message.sendID]);

      if (selfID) {
        return (
          <View style={styles.chatContainerSelf}>

            <View style={styles.messageContainerSelf}>
              <Text style={styles.messageText}> </Text>
              <Image style={{
                    height: 300,
                    width: 200,
                }}source={{ uri: message.pictureElem.snapshotPicture.url}} ></Image>
            </View>
            <View style={styles.avatarContainer}>
              <Avatar nickname={message.senderNickname} faceURL={message.senderFaceUrl ?? ''}/>
            </View>
          </View>
        );
      }

    return (
        <View style={styles.chatContainerOther}>
            <View style={styles.avatarContainer}>
                <Avatar nickname={message.senderNickname} faceURL={message.senderFaceUrl ?? ''} />
            </View>
            <View style={styles.messageContainerOther}>
                <Text style={styles.messageText}>{message.senderNickname}</Text>
                <Image style={{
                    height: 300,
                    width: 200,
                }} source={{ uri: message.pictureElem.snapshotPicture.url }}></Image>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    chatContainerSelf: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginVertical: 5,
    },
    chatContainerOther: {
        flexDirection: "row",
        marginVertical: 5,
    },
    avatarContainer: {
        marginHorizontal: 10,
    },
    messageContainerSelf: {
        maxWidth: "80%",
    },
    messageContainerOther: {
        maxWidth: "80%",
    },
    messageText: {
        fontSize: 16,
    },
});

export default ImageCard;
