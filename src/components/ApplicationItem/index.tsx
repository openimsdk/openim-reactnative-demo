import { FriendApplicationItem, GroupApplicationItem } from "open-im-sdk-rn/lib/typescript/types/entity";
import { GroupJoinSource } from "open-im-sdk-rn/lib/typescript/types/enum";
import { FC } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

import send from "@/assets/images/contact/send.png";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ApplicationStackParamList } from "@/types/navigation";

import OIMAvatar from "../OIMAvatar";

export type ApplicationItemSource = FriendApplicationItem & GroupApplicationItem & { joinSource: GroupJoinSource };

export enum ApplicationTypeEnum {
  RecivedFriendApplication,
  SentFriendApplication,
  RecivedGroupApplication,
  SentGroupApplication,
}

type ApplicationItemProps = {
  source: Partial<ApplicationItemSource>;
  type: ApplicationTypeEnum;
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
  content: {
    marginLeft: 12,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    color: "black",
  },
  right: {
    marginTop: 10,
    marginLeft: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  send: {
    width: 20,
    height: 20,
  },
});

const ApplicationItem: FC<ApplicationItemProps> = ({ source, type }) => {
  const navigation = useNavigation<NavigationProp<ApplicationStackParamList>>();

  const getIcon = () => {
    switch (type) {
      case ApplicationTypeEnum.RecivedFriendApplication:
        return source.fromFaceURL;
      case ApplicationTypeEnum.SentFriendApplication:
        return source.toFaceURL;
      case ApplicationTypeEnum.RecivedGroupApplication:
        return source.userFaceURL;
      case ApplicationTypeEnum.SentGroupApplication:
        return source.groupFaceURL;
      default:
        return "";
    }
  };

  const getTitle = () => {
    switch (type) {
      case ApplicationTypeEnum.RecivedFriendApplication:
        return source.fromNickname;
      case ApplicationTypeEnum.SentFriendApplication:
        return source.toNickname;
      case ApplicationTypeEnum.RecivedGroupApplication:
        return source.nickname;
      case ApplicationTypeEnum.SentGroupApplication:
        return source.groupName;
      default:
        return "";
    }
  };

  const stateStr = () => {
    if (source.handleResult === 1) {
      return "Added";
    }
    if (source.handleResult === -1) {
      return "Rejected";
    }
    return "Pending";
  };

  const isSend = type === ApplicationTypeEnum.SentFriendApplication || type === ApplicationTypeEnum.SentGroupApplication;
  const isGroup = type === ApplicationTypeEnum.SentGroupApplication || type === ApplicationTypeEnum.RecivedGroupApplication;
  const showGroupAvatar = type === ApplicationTypeEnum.SentGroupApplication;
  const showActionBtn = source.handleResult === 0 && type === ApplicationTypeEnum.RecivedFriendApplication;

  const toPage = () => {
    console.log(source);
    navigation.navigate("ApplicationDetails", {
      type,
      application: source,
    });
  };

  return (
    <View style={styles.container}>
      <OIMAvatar faceURL={getIcon()} text={getTitle()} size={48} fontSize={20} isGroup={showGroupAvatar} />
      <View style={styles.content}>
        <Text style={styles.name}>{getTitle()}</Text>
        {isGroup && <Text>Apply to join: {source.groupName}</Text>}
        <Text>Reason: {source.reqMsg}</Text>
      </View>
      <View style={styles.right}>
        {isSend && <Image source={send} style={styles.send} />}
        {showActionBtn && <Button onPress={toPage}>Check</Button>}
        {!showActionBtn && <Text>{stateStr()}</Text>}
      </View>
    </View>
  );
};

export default ApplicationItem;
