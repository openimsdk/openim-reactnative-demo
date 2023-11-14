import { MessageItem, PublicUserItem } from "../../store/types/entity";
import { MessageType } from "../../store/types/enum";
import { useUserStore } from "../../store/user";

export const formatMessageByType = (message: MessageItem): string => {
    const selfUserID = useUserStore.getState().selfInfo.userID;
    const isSelf = (id: string) => id === selfUserID;
    const getName = (user: PublicUserItem) => {
      return user.userID === selfUserID ? "you" : user.nickname;
    };
  
    switch (message.contentType) {
      case MessageType.TextMessage:
        return message.textElem?.content || "";
      case MessageType.AtTextMessage:
        let mstr = message.atTextElem.text || "";
        const pattern = /@\S+\s/g;
        const arr = mstr.match(pattern);
        arr?.map((a) => {
          const member = (message.atTextElem.atUsersInfo ?? []).find(
            (gm) => gm.atUserID === a.slice(1, -1),
          );
          if (member) {
            const reg = new RegExp(a, "g");
            mstr = mstr.replace(reg, `@${member.groupNickname} `);
          }
        });
        return mstr;
      case MessageType.PictureMessage:
        return "messageDescription.imageMessage";
      case MessageType.VideoMessage:
        return "messageDescription.videoMessage";
      case MessageType.VoiceMessage:
        return "messageDescription.voiceMessage";
      case MessageType.LocationMessage:
        try {
          const locationInfo = JSON.parse(message.locationElem.description || "{}");
          return `messageDescription.locationMessage: ${locationInfo.name || ""}`;
        } catch (error) {
          return "";
        }
      case MessageType.CardMessage:
        return "messageDescription.cardMessage";
      case MessageType.MergeMessage:
        return "messageDescription.mergeMessage";
      case MessageType.FileMessage:
        return `messageDescription.fileMessage: ${message.fileElem.fileName || ""}`;
      case MessageType.RevokeMessage:
        try {
          const data = JSON.parse(message.notificationElem.detail || "{}");
          const revokerID = data.revokerID;
          const revoker = isSelf(revokerID) ? "you" : data.revokerNickname;
          const isAdminRevoke = data.revokerID !== data.sourceMessageSendID;
          if (isAdminRevoke) {
            return `messageDescription.advanceRevokeMessage: Operator - ${data.sourceMessageSendNickname}, Revoker - ${revoker}`;
          }
          return `messageDescription.revokeMessage: Revoker - ${revoker}`;
        } catch (error) {
          return "";
        }
      case MessageType.CustomMessage:
        return "messageDescription.customMessage";
      case MessageType.QuoteMessage:
        return message.quoteElem.text || "messageDescription.quoteMessage";
      case MessageType.FaceMessage:
        return "messageDescription.faceMessage";
      case MessageType.FriendAdded:
        return "messageDescription.alreadyFriendMessage";
      case MessageType.MemberEnter:
        try {
          const enterDetails = JSON.parse(message.notificationElem.detail || "{}");
          const enterUser = enterDetails.entrantUser;
          return `messageDescription.joinGroupMessage: Name - ${getName(enterUser)}`;
        } catch (error) {
          return "";
        }
      case MessageType.GroupCreated:
        try {
          const groupCreatedDetail = JSON.parse(message.notificationElem.detail || "{}");
          const groupCreatedUser = groupCreatedDetail.opUser;
          return `messageDescription.createGroupMessage: Creator - ${getName(groupCreatedUser)}`;
        } catch (error) {
          return "";
        }
      case MessageType.MemberInvited:
        try {
          const inviteDetails = JSON.parse(message.notificationElem.detail || "{}");
          const inviteOpUser = inviteDetails.opUser;
          const invitedUserList = inviteDetails.invitedUserList || [];
          let inviteStr = "";
          invitedUserList.find(
            (user: any, idx: number) => (inviteStr += `${getName(user)} `) && idx > 3
          );
          return `messageDescription.invitedToGroupMessage: Operator - ${getName(inviteOpUser)}, Invited Users - ${inviteStr}${invitedUserList.length > 3 ? "..." : ""}`;
        } catch (error) {
          return "";
        }
      // Continue adding cases for other message types in a similar manner
      default:
        return "";
    }
  };
  