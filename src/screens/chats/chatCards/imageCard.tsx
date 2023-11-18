import React, { memo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Avatar from "../../../components/avatar";
import { useUserStore } from "../../../../store/user";
import { ExMessageItem } from "../../../../store/message";

const ImageCard = memo(({ message }: { message: ExMessageItem }) => {
    const isSelf = useUserStore(state => state.selfInfo.userID === message.sendID);

    return isSelf ? <SelfImageCard message={message} /> : <OtherImageCard message={message} />;
});

const SelfImageCard = ({ message }: { message: ExMessageItem }) => (
    <View style={styles.chatContainerSelf}>
        <View style={styles.messageContainer}>
            <Text style={styles.messageText} />
            <Image style={styles.image} source={{ uri: message.pictureElem.snapshotPicture.url }} />
        </View>
        <View style={styles.avatarContainer}>
            <Avatar nickname={message.senderNickname} faceURL={message.senderFaceUrl ?? ''} />
        </View>
    </View>
);

const OtherImageCard = ({ message }: { message: ExMessageItem }) => (
    <View style={styles.chatContainerOther}>
        <View style={styles.avatarContainer}>
            <Avatar nickname={message.senderNickname} faceURL={message.senderFaceUrl ?? ''} />
        </View>
        <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{message.senderNickname}</Text>
            <Image style={styles.image} source={{ uri: message.pictureElem.snapshotPicture.url }} />
        </View>
    </View>
);

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
    messageContainer: {
        maxWidth: "80%",
    },
    messageText: {
        fontSize: 16,
    },
    image: {
        height: 300,
        width: 200,
    },
});

export default ImageCard;
