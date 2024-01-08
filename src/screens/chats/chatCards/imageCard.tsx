import React, {memo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Avatar from '../../../components/avatar';
import {useUserStore} from '../../../store/user';
import {ExMessageItem} from '../../../store/message';

const ImageCard = memo(({message}: {message: ExMessageItem}) => {
  const isSelf = useUserStore(
    state => state.selfInfo.userID === message.sendID,
  );

  return isSelf ? (
    <SelfImageCard message={message} />
  ) : (
    <OtherImageCard message={message} />
  );
});

const SelfImageCard = ({message}: {message: ExMessageItem}) => (
  <View style={styles.chatContainerSelf}>
    <View style={styles.selfMessageContainer}>
      <Text style={styles.selfMessageText}>{message.senderNickname}</Text>
      <Image
        style={styles.image}
        source={{uri: message.pictureElem.snapshotPicture.url}}
      />
    </View>
    <View style={styles.avatarContainer}>
      <Avatar
        nickname={message.senderNickname}
        faceURL={message.senderFaceUrl ?? ''}
      />
    </View>
  </View>
);

const OtherImageCard = ({message}: {message: ExMessageItem}) => (
  <View style={styles.chatContainerOther}>
    <View style={styles.avatarContainer}>
      <Avatar
        nickname={message.senderNickname}
        faceURL={message.senderFaceUrl ?? ''}
      />
    </View>
    <View style={styles.otherMessageContainer}>
      <Text style={styles.otherMessageText}>{message.senderNickname}</Text>
      <Image
        style={styles.image}
        source={{uri: message.pictureElem.snapshotPicture.url}}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  chatContainerSelf: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 5,
  },
  selfMessageContainer: {
    alignItems: 'flex-end', // Aligns children to the right
    maxWidth: '80%',
  },
  selfMessageText: {
    fontSize: 16,
    marginBottom: 4, // Optional: space between name and image
  },
  otherMessageContainer: {
    alignItems: 'flex-start', // Aligns children to the left
    maxWidth: '80%',
  },
  otherMessageText: {
    fontSize: 16,
    marginBottom: 4, // Optional: space between name and image
  },
  image: {
    height: 300,
    width: 200,
    // Add any additional styling for the image
  },
  chatContainerOther: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  avatarContainer: {
    marginHorizontal: 10,
  },
});

export default ImageCard;
