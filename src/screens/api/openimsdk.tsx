import AsyncStorage from "@react-native-async-storage/async-storage";
import OpenIMSDKRN from "open-im-sdk-rn";

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
        console.log("GetFriendApplicationListAsRecipient",data)
        return { success: true, errorMsg: "", data: data };
    } 
    catch (error) {
        console.error('Error GetFriendApplicationListAsRecipient:', error); // Log the error
        return { success: false, errorMsg: "GetFriendApplicationListAsRecipient  failed", data: [] };
    }
}
export const AcceptFriendApplication = async (options: { toUserID: any; handleMsg: string; }) => {
    try {
        const data = await OpenIMSDKRN.acceptFriendApplication(options,"012219")
        console.log("AcceptFriendApplication",data)
        return { success: true, errorMsg: "", data: data };
    } 
    catch (error) {
        console.error('Error AcceptFriendApplication:', error); // Log the error
        return { success: false, errorMsg: "AcceptFriendApplication  failed", data: [] };
    }
}
export const RefuseFriendApplication = async (options: { toUserID: any; handleMsg: string; }) => {
    try {
        const data = await OpenIMSDKRN.refuseFriendApplication(options,"01221119")
        console.log("RefuseFriendApplication",data)
        return { success: true, errorMsg: "", data: data };
    } 
    catch (error) {
        console.error('Error RefuseFriendApplication:', error); // Log the error
        return { success: false, errorMsg: "RefuseFriendApplication  failed", data: [] };
    }
}
export const GetAdvancedHistoryMessageListReverse = async (options:{lastMinSeq: number; count: number; startClientMsgID: string; conversationID: string;}) => {
    try {
        const data = await OpenIMSDKRN.getAdvancedHistoryMessageListReverse(options,"01221119")
        console.log("GetAdvancedHistoryMessageListReverse",data)
        return { success: true, errorMsg: "", data: data };
    } 
    catch (error) {
        console.error('Error GetAdvancedHistoryMessageListReverse:', error); // Log the error
        return { success: false, errorMsg: "GetAdvancedHistoryMessageListReverse  failed", data: [] };
    }
}
export const GetUsersInfo = async (userIDList:string[]) => {
    try {
        const data = await OpenIMSDKRN.getUsersInfo(userIDList,"012211129")
        console.log("GetUsersInfo",data)
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
        console.log("GetSelfInfo",data)
        return { success: true, errorMsg: "", data: data };
    } 
    catch (error) {
        console.error('Error GetSelfInfo:', error); // Log the error
        return { success: false, errorMsg: "GetSelfInfo  failed", data: [] };
    }
}

export const SendMessage = async (options) => {
    try {
        console.log(options)
        const data = await OpenIMSDKRN.sendMessage(options,"01342199")
        return data
    } 
    catch (error) {
        console.error('Error SendMessage:', error); 
    }
}