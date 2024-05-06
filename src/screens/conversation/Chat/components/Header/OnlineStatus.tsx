import { Platform } from "@/constants";
import { useConversationStore } from "@/store/conversation";
import { useRequest } from "ahooks";
import OpenIMSDKRN, { OpenIMEmitter } from "open-im-sdk-rn";
import { UserOnlineState } from "open-im-sdk-rn/lib/typescript/types/entity";
import { useEffect, useState } from "react";
import { Text } from "react-native";

const platformMap: Record<Platform, string> = {
  1: "iOS",
  2: "Android",
  3: "Windows",
  4: "MacOSX",
  5: "Web",
  7: "Linux",
  8: "AndroidPad",
  9: "iPad",
};

enum OnlineState {
  Online = 1,
  Offline = 0,
}

const OnlineStatus = () => {
  const [onlineState, setOnlineState] = useState<UserOnlineState>();
  const userID = useConversationStore((state) => state.currentConversation?.userID) as string;

  const { cancel: cancelSubscribe } = useRequest(() => OpenIMSDKRN.subscribeUsersStatus([userID], "opid"), {
    refreshDeps: [userID],
    onSuccess: (data: UserOnlineState[]) => {
      setOnlineState(data[0]);
    },
  });

  const userStatusChangeHandler = (data: UserOnlineState) => {
    if (data.userID === userID) {
      setOnlineState(data);
    }
  };

  const platformToDetails = (state?: UserOnlineState) => {
    if (!state || state.status === OnlineState.Offline) return "Offline";
    let string = "";
    state.platformIDs?.map((platform) => {
      string += `${platformMap[platform]}/`;
      return null;
    });
    return `${string.slice(0, -1)}${" Online"}`;
  };

  useEffect(() => {
    OpenIMEmitter.addListener("onUserStatusChanged", userStatusChangeHandler);
    return () => {
      OpenIMEmitter.removeAllListeners("onUserStatusChanged");
      cancelSubscribe();
    };
  }, []);

  return <Text>{platformToDetails(onlineState)}</Text>;
};

export default OnlineStatus;
