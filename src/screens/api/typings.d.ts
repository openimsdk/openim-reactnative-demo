declare namespace API {
  declare namespace Login {
    enum UsedFor {
      Register = 1,
      Modify = 2,
      Login = 3,
    }
    type RegisterUserInfo = {
      nickname: string;
      faceURL: string;
      birth?: number;
      gender?: number;
      email?: string;
      account?: string;
      areaCode: string;
      phoneNumber: string;
      password: string;
    };
    type DemoRegisterType = {
      invitationCode?: string;
      verifyCode: string;
      deviceID?: string;
      autoLogin?: boolean;
      user: RegisterUserInfo;
    };
    type LoginParams = {
      verifyCode: string;
      deviceID?: string;
      phoneNumber: string;
      areaCode: string;
      account?: string;
      password: string;
    };
    type ModifyParams = {
      userID: string;
      currentPassword: string;
      newPassword: string;
    };
    type ResetParams = {
      phoneNumber: string;
      areaCode: string;
      verifyCode: string;
      password: string;
    };
    type VerifyCodeParams = {
      phoneNumber: string;
      areaCode: string;
      verifyCode: string;
      usedFor: UsedFor;
    };
    type SendSmsParams = {
      phoneNumber: string;
      areaCode: string;
      deviceID?: string;
      usedFor: UsedFor;
      invitationCode?: string;
    };
  }
  declare namespace Friend {
    type FriendData = {
      blackInfo: any;
      friendInfo: {
        addSource: number;
        attachedInfo: string;
        createTime: number;
        ex: string;
        faceURL: string;
        nickname: string;
        operatorUserID: string;
        ownerUserID: string;
        remark: string;
        userID: string;
      };
      publicInfo: any;
      offset?: number; // Add the offset property here
    };
    type FriendRequest = {
      attachedInfo: string;
      createTime: number;
      ex: string;
      fromFaceURL: string;
      fromNickname: string;
      fromUserID: string;
      handleMsg: string;
      handleResult: number;
      handleTime: number;
      handlerUserID: string;
      reqMsg: string;
      toFaceURL: string;
      toNickname: string;
      toUserID: string;
    };
  }
  declare namespace Chat {
    type ChatCard = {
      attachedInfo: string;
      burnDuration: number;
      conversationID: string;
      conversationType: number;
      draftText: string;
      draftTextTime: number;
      ex: string;
      faceURL: string;
      groupAtType: number;
      groupID: string;
      hasReadSeq: number;
      isMsgDestruct: boolean;
      isNotInGroup: boolean;
      isPinned: boolean;
      isPrivateChat: boolean;
      latestMsg: string;
      latestMsgSendTime: number;
      maxSeq: number;
      minSeq: number;
      msgDestructTime: number;
      recvMsgOpt: number;
      showName: string;
      unreadCount: number;
      updateUnreadCountTime: number;
      userID: string;
    };
    type MessageType = {
      attachedInfoElem: {
        burnDuration: number;
        groupHasReadInfo: object[]; // You can specify the actual type for groupHasReadInfo
        hasReadTime: number;
        inEncryptStatus: boolean;
        isEncryption: boolean;
        isPrivateChat: boolean;
        notSenderNotificationPush: boolean;
      };
      clientMsgID: string;
      contentType: number;
      createTime: number;
      isRead: boolean;
      msgFrom: number;
      notificationElem: {
        detail: string;
      };
      recvID: string;
      sendID: string;
      sendTime: number;
      senderPlatformID: number;
      seq: number;
      serverMsgID: string;
      sessionType: number;
      status: number;
      textElem?: {
        content: string
      }
    };

  }
}
export { API };
