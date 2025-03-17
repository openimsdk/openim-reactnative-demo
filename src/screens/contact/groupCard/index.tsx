import NavBar from "@/components/NavBar";
import OIMAvatar from "@/components/OIMAvatar";
import { SessionType } from "@/constants";
import { useConversationToggle } from "@/hooks/useConversationToggle";
import { feedbackToast } from "@/utils/common";
import { useRoute } from "@react-navigation/native";
import OpenIMSDKRN from "open-im-sdk-rn";
import { v4 as uuidv4 } from "uuid";
import { PublicUserItem } from "open-im-sdk-rn/lib/typescript/types/entity";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

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
    marginTop: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    marginTop: 8,
    color: "black",
    fontSize: 14,
    fontWeight: "500",
  },
  input: {
    width: 260,
    marginTop: 32,
  },
  outline: {
    borderColor: "gray",
  },
  count: {
    marginTop: 16,
  },
  btnBox: {
    marginTop: "auto",
    marginBottom: 100,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  chat: {
    width: "90%",
    borderRadius: 8,
    paddingVertical: 2,
  },
});

const GroupCard = () => {
  const [text, setText] = useState("");
  const route = useRoute();
  const { userList } = route.params as { userList: PublicUserItem[] };
  const { toSpecifiedConversation } = useConversationToggle();

  const createGroup = () => {
    const baseInfo = {
      groupType: 2,
      groupName: text,
      faceURL: "",
    };
    const memberList = userList.map((member) => member.userID);
    OpenIMSDKRN.createGroup(
      {
        groupInfo: baseInfo,
        memberUserIDs: memberList,
      },
      uuidv4(),
    )
      .then((data) => {
        feedbackToast({ msg: "successfully" });
        toSpecifiedConversation({
          sourceID: data.groupID,
          sessionType: SessionType.Group,
        });
      })
      .catch((error) => feedbackToast({ error }));
  };

  return (
    <View style={styles.container}>
      <NavBar title="GroupCard" style={styles.border} />
      <View style={styles.content}>
        <OIMAvatar faceURL="" text="" size={100} fontSize={32} isGroup />
        <TextInput
          style={styles.input}
          outlineStyle={styles.outline}
          mode="outlined"
          dense
          value={text}
          placeholder="Group Name"
          onChangeText={(str: string) => setText(str)}
        />
        <Text style={styles.count}>{userList.length + 1} Group Members</Text>
      </View>
      <View style={styles.btnBox}>
        <Button mode="contained" style={styles.chat} onPress={createGroup} disabled={text.length === 0}>
          Create
        </Button>
      </View>
    </View>
  );
};

export default GroupCard;
