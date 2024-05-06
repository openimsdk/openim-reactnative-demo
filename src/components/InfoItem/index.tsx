import { FC, ReactNode } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import OIMAvatar from "../OIMAvatar";

type InfoItemProps = {
  name: string;
  subText?: string;
  showCheck?: boolean;
  checked?: boolean;
  faceURL?: string;
  isGroup?: boolean;
  right?: ReactNode;
  callback?: () => void;
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 8,
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  checkbox: {
    marginRight: 8,
  },
  content: {
    marginLeft: 12,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    color: "black",
  },
  right: {
    marginLeft: "auto",
    alignItems: "flex-end",
  },
  time: {
    marginBottom: 4,
  },
});

const InfoItem: FC<InfoItemProps> = ({ name, subText, showCheck, checked, faceURL, isGroup, right, callback }) => {
  return (
    <TouchableHighlight onPress={callback}>
      <View style={styles.container}>
        {showCheck && <BouncyCheckbox isChecked={checked} fillColor="#0089FF" onPress={callback} />}
        <OIMAvatar faceURL={faceURL} text={name} size={47} fontSize={20} isGroup={isGroup} />
        <View style={styles.content}>
          <Text style={styles.name}>{name}</Text>
          {subText && <Text>{subText}</Text>}
        </View>
        <View style={styles.right}>{right}</View>
      </View>
    </TouchableHighlight>
  );
};

export default InfoItem;
