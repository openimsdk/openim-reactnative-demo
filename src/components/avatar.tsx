import React from 'react';
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const images = {
  ic_avatar_01: require('../../assets/avatar/ic_avatar_01.png'),
  ic_avatar_02: require('../../assets/avatar/ic_avatar_02.png'),
  ic_avatar_03: require('../../assets/avatar/ic_avatar_03.png'),
  ic_avatar_04: require('../../assets/avatar/ic_avatar_04.png'),
  ic_avatar_05: require('../../assets/avatar/ic_avatar_05.png'),
  ic_avatar_06: require('../../assets/avatar/ic_avatar_06.png'),
  newFriend: require('../../assets/avatar/NewFriend.png'),
  newGroup: require('../../assets/avatar/NewGroup.png'),
  myGroups: require('../../assets/avatar/MyGroups.png'),
};

const avatarImages: Record<string, any> = {
  ic_avatar_01: images.ic_avatar_01,
  ic_avatar_02: images.ic_avatar_02,
  ic_avatar_03: images.ic_avatar_03,
  ic_avatar_04: images.ic_avatar_04,
  ic_avatar_05: images.ic_avatar_05,
  ic_avatar_06: images.ic_avatar_06,
  'New Friend': images.newFriend,
  'New Group': images.newGroup,
  'My Groups': images.myGroups,
};

const getAvatarImage = ({
  nickname,
  faceURL,
  style,
  isGroup,
}: {
  nickname: string;
  faceURL: string | null | undefined;
  style?: StyleProp<ImageStyle>;
  isGroup?: boolean;
}) => {
  if (faceURL === null || faceURL == undefined) {
    return null; // Return null or a placeholder component if data is undefined
  }

  if (faceURL === '') {
    return (
      <LinearGradient
        colors={isGroup ? ['#00D2C4', '#7EBCF2'] : ['#EAF27E', '#00D292']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.textImage}>
        <Text style={styles.textImageText}>
          {nickname.charAt(0).toUpperCase()}
        </Text>
      </LinearGradient>
    );
  }

  const avatarSource = avatarImages[faceURL as keyof typeof avatarImages]; // Type assertion

  if (avatarSource) {
    return <Image style={[styles.avatar, style]} source={avatarSource} />;
  }

  return <Image style={[styles.avatar, style]} source={{uri: faceURL}} />;
};

const Avatar = ({
  nickname,
  faceURL,
  style,
  isGroup,
}: {
  nickname: string;
  faceURL: string | null | undefined;
  style?: StyleProp<ImageStyle>;
  isGroup?: boolean;
}) => {
  return getAvatarImage({nickname, faceURL, style, isGroup});
};
const styles = StyleSheet.create({
  contactItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  groupextImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  textImageText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default Avatar;
