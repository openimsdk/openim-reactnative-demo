import AsyncStorage from "@react-native-async-storage/async-storage";
import OpenIMSDKRN from "open-im-sdk-rn";
import RNFS from 'react-native-fs';
import { API_URL, WS_URL } from '../../config/config';
import { Platform } from "react-native";
import { SendMsgParams } from "../../../store/types/params";
export const Init = async () => {
  let platform = 1;
  if (Platform.OS === 'android') {
    platform = 2; // Android
  } else if (Platform.OS === 'ios') {
    platform = 1;
  }
  await RNFS.mkdir(RNFS.DocumentDirectoryPath + '/tmp');
  const config = {
    platformID: platform,
    apiAddr: API_URL,
    wsAddr: WS_URL,

    dataDir: RNFS.DocumentDirectoryPath + '/tmp',
    logLevel: 6,
    isLogStandardOutput: true,
  };
  try {
    const opid = "123456" + Date.now();
    const result = await OpenIMSDKRN.initSDK(config, opid);

  } catch (error) {
    console.error('Error initializing SDK:', error); // Log the error
  }
};
export const LoginIM = async () => {
  const tk = await AsyncStorage.getItem('imToken');
  const id = await AsyncStorage.getItem('userID');
  const options = {
    userID: id,
    token: tk,
  };
  console.log(options)
  try {
    const data = await OpenIMSDKRN.login(options, "12322111137");
    console.log("login", data);
    return { success: true, errorMsg: "" };
  }
  catch (error) {
    console.error('Error login:', error); // Log the error
    return { success: false, errorMsg: "Login failed" };
  }
};
export const LogoutIM = async () => {
  try {
    const data = await OpenIMSDKRN.logout("1232211737");
    console.log("logout", data);
    return { success: true, errorMsg: "" };
  }
  catch (error) {
    console.error('Error login:', error); // Log the error
    return { success: false, errorMsg: "Logout failed" };
  }
}
export const GetLoginStatus = async () => {
  try {
    const data = await OpenIMSDKRN.getLoginStatus("12321737");
    console.log("getLoginStatus", data);
    return { success: true, errorMsg: "", status: data };
  }
  catch (error) {
    console.error('Error getLoginStatus:', error); // Log the error
    return { success: false, errorMsg: "getLoginStatus failed", status: "" };
  }
}
export const GetAllConversationList = async () => {
  try {
    const data = await OpenIMSDKRN.getAllConversationList("12737");
    console.log("getAllConversationList", data);
    return { success: true, errorMsg: "", data: data };
  }
  catch (error) {
    console.error('Error getLoginStatus:', error); // Log the error
    return { success: false, errorMsg: "getAllConversationList  failed", data: [] };
  }
}
export const GetFriendList = async () => {
  try {
    const data = await OpenIMSDKRN.getFriendList("12837");
    console.log("GetFriendList", data);
    return { success: true, errorMsg: "", data: data };
  }
  catch (error) {
    console.error('Error GetFriendList:', error); // Log the error
    return { success: false, errorMsg: "GetFriendList  failed", data: [] };
  }
}
export const GetFriendApplicationListAsRecipient = async () => {
  try {
    const data = await OpenIMSDKRN.getFriendApplicationListAsRecipient("01229")
    console.log("GetFriendApplicationListAsRecipient", data)
    return { success: true, errorMsg: "", data: data };
  }
  catch (error) {
    console.error('Error GetFriendApplicationListAsRecipient:', error); // Log the error
    return { success: false, errorMsg: "GetFriendApplicationListAsRecipient  failed", data: [] };
  }
}
export const AcceptFriendApplication = async (options: { toUserID: any; handleMsg: string; }) => {
  try {
    const data = await OpenIMSDKRN.acceptFriendApplication(options, "012219")
    console.log("AcceptFriendApplication", data)
    return { success: true, errorMsg: "", data: data };
  }
  catch (error) {
    console.error('Error AcceptFriendApplication:', error); // Log the error
    return { success: false, errorMsg: "AcceptFriendApplication  failed", data: [] };
  }
}
export const RefuseFriendApplication = async (options: { toUserID: any; handleMsg: string; }) => {
  try {
    const data = await OpenIMSDKRN.refuseFriendApplication(options, "01221119")
    console.log("RefuseFriendApplication", data)
    return { success: true, errorMsg: "", data: data };
  }
  catch (error) {
    console.error('Error RefuseFriendApplication:', error); // Log the error
    return { success: false, errorMsg: "RefuseFriendApplication  failed", data: [] };
  }
}
export const GetAdvancedHistoryMessageListReverse = async (options: { lastMinSeq: number; count: number; startClientMsgID: string; conversationID: string; }) => {
  try {
    const data = await OpenIMSDKRN.getAdvancedHistoryMessageListReverse(options, "01221119")
    console.log("GetAdvancedHistoryMessageListReverse", data)
    return { success: true, errorMsg: "", data: data };
  }
  catch (error) {
    console.error('Error GetAdvancedHistoryMessageListReverse:', error); // Log the error
    return { success: false, errorMsg: "GetAdvancedHistoryMessageListReverse  failed", data: [] };
  }
}
export const GetUsersInfo = async (userIDList: string[]) => {
  try {
    const data = await OpenIMSDKRN.getUsersInfo(userIDList, "012211129")
    console.log("GetUsersInfo", data)
    return { success: true, errorMsg: "", data: data };
  }
  catch (error) {
    console.error('Error GetUsersInfo:', error); // Log the error
    return { success: false, errorMsg: "GetUsersInfo  failed", data: [] };
  }
}
export const GetSelfInfo = async () => {
  try {
    const data = await OpenIMSDKRN.getSelfUserInfo("012211199")
    console.log("GetSelfInfo", data)
    return { success: true, errorMsg: "", data: data };
  }
  catch (error) {
    console.error('Error GetSelfInfo:', error); // Log the error
    return { success: false, errorMsg: "GetSelfInfo  failed", data: [] };
  }
}

export const SendMessage = async (options: SendMsgParams) => {
  try {
    console.log(options)
    const data = await OpenIMSDKRN.sendMessage(options, "01342199")
    return data
  }
  catch (error) {
    console.error('Error SendMessage:', error);
  }
}
export const AddFriend = async (toUserID: string) => {
  try {
    const paramsReq = {
      toUserID: toUserID,
      reqMsg: ''
    };
    const operationID = 'OperationID_value1';

    await OpenIMSDKRN.addFriend(
      paramsReq,
      operationID
    );

    console.log("addFriend: Friend request sent with parameters", paramsReq);
  } catch (error) {
    console.error('Error addFriend:', error);
  }
}
export const SearchFriend = async (keywordList: string, isSearchUserID: boolean, isSearchNickname: boolean, isSearchRemark: boolean) => {
  try {
    const options = {
      keywordList: [keywordList],
      isSearchUserID: isSearchUserID,
      isSearchNickname: isSearchNickname,
      isSearchRemark: isSearchRemark,
    };
    const operationID = 'OperationID_value2';

    const data = await OpenIMSDKRN.searchFriends(options, operationID);

    console.log("searchFriends: Searched for friends with options", options, "and received data", data);
  } catch (error) {
    console.error('Error searchFriends:', error);
  }
}
export const SearchGroup = async (keywordList: string[], isSearchGroupID: boolean, isSearchGroupName: boolean) => {
  try {
    const options = {
      keywordList: keywordList,
      isSearchGroupID: true,
      isSearchGroupName: false,
    };
    const operationID = 'OperationID_value5';

    const data = await OpenIMSDKRN.searchGroups(options, operationID);

    console.log("searchGroups: Searched for groups with options", options, "and received data", data);

    return JSON.parse(data);
  } catch (error) {
    console.error('Error searchGroups:', error);
  }
}
export const CreateGroup = async (groupName: string, groupType: number, memberUserIDs: string[]) => {
  try {

    const operationID = 'OperationID_value22';
    const groupInfo = {
      groupName: groupName,
      groupType: groupType,
    }
    await OpenIMSDKRN.createGroup(
      {
        groupInfo: groupInfo,
        memberUserIDs: memberUserIDs,
      },
      operationID
    );

    console.log("createGroup: Created a group with group information", groupInfo);
  } catch (error) {
    console.error('Error createGroup:', error);
  }
}
export const GetOneConversation = async (sourceID: string, type: number) => {
  try {
    const options = {
      sessionType: type,         // Replace with the actual session type
      sourceID: sourceID,  // Replace with the actual source ID
    };
    const operationID = 'OperationID_value';

    const data = await OpenIMSDKRN.getOneConversation(options, operationID);

    console.log("getOneConversation", data);
    return data;
  } catch (error) {
    console.error('Error getOneConversation:', error);
  }
}
export const JoinGroup = async (groupID: string, joinSource: number) => {
  try {
    const options = {
      groupID: groupID,      // Replace with the actual group ID
      reqMsg: 'Join request',   // Replace with the actual join request message
      joinSource: joinSource,           // Replace with the actual join source
    };
    const operationID = 'OperationID_value';

    const data = await OpenIMSDKRN.joinGroup(options, operationID);

    console.log("joinGroup: Requested to join group", options.groupID, "with message", options.reqMsg, "and join source", options.joinSource, "and received data", data);
  } catch (error) {
    console.error('Error joinGroup:', error);
  }
}
export const MarkConversationMessageAsRead = async (conversationID: string) => {
  try {

    const operationID = 'OperationID_value1231';

    const data = await OpenIMSDKRN.markConversationMessageAsRead(conversationID, operationID);

    console.log("markConversationMessageAsRead: conversationID", conversationID, "and received data", data);
  } catch (error) {
    console.error('Error markConversationMessageAsRead:', error);
  }
}
export const CreateMessage = async (inputMessage: string) => {
  // Add your logic to send the message here
  try {
    const data = await OpenIMSDKRN.createTextMessage(inputMessage, '289893');
    console.log("CreateMessage: inputMessage", inputMessage, "and received data", data)
    return data;
  } catch (error) {
    console.error('Error CreateTextMsg:', error); // Log the error
  }


};