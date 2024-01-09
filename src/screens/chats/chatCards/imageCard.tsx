import React, {memo, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
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

const SelfImageCard = ({message}: {message: ExMessageItem}) => {
  const [isLoading, setLoading] = useState(true);
  const {width, height} = message.pictureElem.snapshotPicture;
  const ratio = width / height;
  var renderWidth;
  var renderHeight;

  if (width > height) {
    renderWidth = 200;
    renderHeight = 200 / ratio;
  } else {
    renderWidth = 200 * ratio;

    renderHeight = 200;
  }
  return (
    <View style={styles.chatContainerSelf}>
      <View style={styles.selfMessageContainer}>
        <Text style={styles.selfMessageText}>{message.senderNickname}</Text>
        <View
          style={{
            width: renderWidth,
            height: renderHeight,
            position: 'relative',
          }}>
          <Image
            style={{width: renderWidth, height: renderHeight}}
            source={{uri: message.pictureElem.snapshotPicture.url}}
            onLoadStart={() => setLoading(true)}
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
          />
          {isLoading && (
            <ActivityIndicator
              style={StyleSheet.absoluteFillObject} // Position over the image
              size="large"
            />
          )}
        </View>
      </View>
      <View style={styles.avatarContainer}>
        <Avatar
          nickname={message.senderNickname}
          faceURL={message.senderFaceUrl ?? ''}
        />
      </View>
    </View>
  );
};

const OtherImageCard = ({message}: {message: ExMessageItem}) => {
  const [isLoading, setLoading] = useState(true);
  const {width, height} = message.pictureElem.snapshotPicture;
  const ratio = width / height;
  var renderWidth;
  var renderHeight;
  if (width > height) {
    renderWidth = 200;
    renderHeight = 200 / ratio;
  } else {
    renderWidth = 200 * ratio;
    renderHeight = 200;
  }
  return (
    <View style={styles.chatContainerOther}>
      <View style={styles.avatarContainer}>
        <Avatar
          nickname={message.senderNickname}
          faceURL={message.senderFaceUrl ?? ''}
        />
      </View>
      <View style={styles.otherMessageContainer}>
        <Text style={styles.otherMessageText}>{message.senderNickname}</Text>
        <View
          style={{
            width: renderWidth,
            height: renderHeight,
            position: 'relative',
          }}>
          <Image
            style={{width: renderWidth, height: renderHeight}}
            source={{uri: message.pictureElem.snapshotPicture.url}}
            onLoadStart={() => setLoading(true)}
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
          />
          {isLoading && (
            <ActivityIndicator
              style={StyleSheet.absoluteFillObject} // Position over the image
              size="large"
            />
          )}
        </View>
      </View>
    </View>
  );
};

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
