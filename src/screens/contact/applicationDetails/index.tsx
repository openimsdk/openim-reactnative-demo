import { StyleSheet, Text, View } from "react-native";
import OpenIMSDKRN from "open-im-sdk-rn";
import { v4 as uuidv4 } from "uuid";

import { ApplicationItemSource, ApplicationTypeEnum } from "@/components/ApplicationItem";
import { useNavigation, useRoute } from "@react-navigation/native";
import NavBar from "@/components/NavBar";
import OIMAvatar from "@/components/OIMAvatar";
import { GroupJoinSource } from "@/constants";
import { Button } from "react-native-paper";
import { feedbackToast } from "@/utils/common";

const friendApplicationTypes = [ApplicationTypeEnum.RecivedFriendApplication, ApplicationTypeEnum.SentFriendApplication];

type ApplicationDetailsProps = {
  type: ApplicationTypeEnum;
  application: Partial<ApplicationItemSource>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  content: {
    marginVertical: 24,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    marginTop: 8,
    color: "black",
    fontSize: 18,
    fontWeight: "500",
  },
  row: {
    marginHorizontal: 40,
    flexDirection: "row",
  },
  label: {
    width: 120,
    height: 40,
    color: "#8896A3",
    fontSize: 16,
  },
  desc: {
    color: "black",
    fontSize: 16,
  },
  reqMsg: {
    flex: 1,
    padding: 12,
    backgroundColor: "#F4F5F7",
    borderRadius: 8,
  },
  btnBox: {
    marginTop: "auto",
    marginBottom: 100,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    borderRadius: 8,
    marginHorizontal: 8,
    paddingHorizontal: 36,
  },
  btnBorder: {
    borderColor: "#DEDEDE",
    borderWidth: 1,
  },
});

const ApplicationDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { type, application } = route.params as ApplicationDetailsProps;

  const getIcon = () => {
    switch (type) {
      case ApplicationTypeEnum.RecivedFriendApplication:
        return application.fromFaceURL;
      case ApplicationTypeEnum.SentFriendApplication:
        return application.toFaceURL;
      case ApplicationTypeEnum.RecivedGroupApplication:
        return application.userFaceURL;
      case ApplicationTypeEnum.SentGroupApplication:
        return application.groupFaceURL;
      default:
        return "";
    }
  };

  const getTitle = () => {
    switch (type) {
      case ApplicationTypeEnum.RecivedFriendApplication:
        return application.fromNickname;
      case ApplicationTypeEnum.SentFriendApplication:
        return application.toNickname;
      case ApplicationTypeEnum.RecivedGroupApplication:
        return application.nickname;
      case ApplicationTypeEnum.SentGroupApplication:
        return application.groupName;
      default:
        return "";
    }
  };

  const joinSource = () => {
    if (application.joinSource === GroupJoinSource.Invitation) {
      return "Group Member Apply";
    }
    if (application.joinSource === GroupJoinSource.Search) {
      return "Search GroupID";
    }
    return "Scan Qr Code";
  };

  const applicationTitle = friendApplicationTypes.includes(type) ? "New Friends" : "New Group";
  const isGroup = type === ApplicationTypeEnum.SentGroupApplication || type === ApplicationTypeEnum.RecivedGroupApplication;

  const accessApplication = (isAccept: boolean) => {
    const funcName = isGroup
      ? `${isAccept ? "accept" : "refuse"}GroupApplication`
      : `${isAccept ? "accept" : "refuse"}FriendApplication`;
    // @ts-ignore
    OpenIMSDKRN[funcName](
      {
        groupID: application.groupID,
        fromUserID: application.userID,
        toUserID: application.fromUserID,
        handleMsg: "",
      },
      uuidv4(),
    )
      .then(() => {
        feedbackToast({ msg: "successfully", onClose: () => navigation.goBack() });
      })
      .catch((error: unknown) => feedbackToast({ error }));
  };

  return (
    <View style={styles.container}>
      <NavBar title={applicationTitle} style={styles.border} />
      <View style={styles.content}>
        <OIMAvatar faceURL={getIcon()} text={getTitle()} size={90} fontSize={32} />
        <Text style={styles.name}>{getTitle()}</Text>
      </View>
      {isGroup && (
        <View style={styles.row}>
          <Text style={styles.label}>Apply to join</Text>
          <Text style={styles.desc}>{application.groupName}</Text>
        </View>
      )}
      {isGroup && (
        <View style={styles.row}>
          <Text style={styles.label}>From</Text>
          <Text style={styles.desc}>{joinSource()}</Text>
        </View>
      )}
      <View style={styles.row}>
        <Text style={styles.label}>Reason</Text>
        <Text style={[styles.desc, styles.reqMsg]}>{application.reqMsg}</Text>
      </View>
      <View style={styles.btnBox}>
        <Button mode="outlined" style={[styles.btn, styles.btnBorder]} onPress={() => accessApplication(false)}>
          Reject
        </Button>
        <Button mode="contained" style={styles.btn} onPress={() => accessApplication(true)}>
          Confirm
        </Button>
      </View>
    </View>
  );
};

export default ApplicationDetails;
