import { Image, StyleSheet, Text, View } from "react-native";
import images from "./defaultAvatarHelper";
import LinearGradient from "react-native-linear-gradient";

const Avatar = ({ nickname,faceURL }: {  nickname:string,faceURL:string}) => {
  if (faceURL===null) {
    return null; // Return null or a placeholder component if data is undefined
  }
  if (faceURL==='') {

    return (
      <LinearGradient
        colors={['#EAF27E', '#00D292']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.textImage}
      >
        <Text style={styles.textImageText}>{nickname.charAt(0).toUpperCase()}</Text>
      </LinearGradient>
    );
  } 
  else if (faceURL === "ic_avatar_01") {
    return (
      <Image style={styles.avatar} source={images.ic_avatar_01} />
    );
  } else if (faceURL === "ic_avatar_02") {
    return (
      <Image style={styles.avatar} source={images.ic_avatar_02} />
    );
  } else if (faceURL === "ic_avatar_03") {
    return (
      <Image style={styles.avatar} source={images.ic_avatar_03} />
    );
  } else if (faceURL === "ic_avatar_04") {
    return (
      <Image style={styles.avatar} source={images.ic_avatar_04} />
    );
  } else if (faceURL === "ic_avatar_05") {
    return (
      <Image style={styles.avatar} source={images.ic_avatar_05} />
    );
  } else if (faceURL === "ic_avatar_06") {
    return (
      <Image style={styles.avatar} source={images.ic_avatar_06} />
    );
  } else if (faceURL === "New Friend") {
    return (
      <Image style={styles.avatar} source={images.newFriend} />
    );
  } else if (faceURL === "New Group") {
    return (
      <Image style={styles.avatar} source={images.newGroup} />
    );
  } else if (faceURL === "My Groups") {
    return (
      <Image style={styles.avatar} source={images.myGroups} />
    );
  }
  return (
    <Image style={styles.avatar} source={{ uri: faceURL }} />
  );
};

const styles = StyleSheet.create({
  contactItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    backgroundColor: "white",
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
    backgroundColor: "blue"
  },
  textImageText: {
    color: "white",
    textAlign: 'center'
  }
});

export default Avatar;