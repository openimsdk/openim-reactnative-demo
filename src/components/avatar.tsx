import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
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
}: {
  nickname: string;
  faceURL: string | null | undefined;
}) => {
  if (faceURL === null || faceURL == undefined) {
    return null; // Return null or a placeholder component if data is undefined
  }

  if (faceURL === '') {
    return (
      <LinearGradient
        colors={['#EAF27E', '#00D292']}
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
    return <Image style={styles.avatar} source={avatarSource} />;
  }

  return <Image style={styles.avatar} source={{uri: faceURL}} />;
};

const Avatar = ({
  nickname,
  faceURL,
}: {
  nickname: string;
  faceURL: string | null | undefined;
}) => {
  return getAvatarImage({nickname, faceURL});
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
  textImageText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default Avatar;
