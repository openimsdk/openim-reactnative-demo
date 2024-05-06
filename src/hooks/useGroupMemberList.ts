import { useConversationStore } from "@/store/conversation";
import { feedbackToast } from "@/utils/common";
import { useLatest } from "ahooks";
import OpenIMSDKRN, { OpenIMEmitter } from "open-im-sdk-rn";
import { GroupMemberItem } from "open-im-sdk-rn/lib/typescript/types/entity";
import { useCallback, useEffect, useRef, useState } from "react";

export const REACH_SEARCH_FLAG = "LAST_FLAG";

export type FetchStateType = {
  offset: number;
  searchOffset: number;
  count: number;
  loading: boolean;
  hasMore: boolean;
  groupMemberList: GroupMemberItem[];
  searchMemberList: GroupMemberItem[];
};

type UseGroupMembersProps = {
  groupID?: string;
  notRefresh?: boolean;
};

export default function useGroupMembers(props?: UseGroupMembersProps) {
  const { groupID, notRefresh } = props ?? {};
  const [fetchState, setFetchState] = useState<FetchStateType>({
    offset: 0,
    searchOffset: 0,
    count: 20,
    loading: false,
    hasMore: true,
    groupMemberList: [],
    searchMemberList: [],
  });
  const latestFetchState = useLatest(fetchState);
  const lastKeyword = useRef("");

  const searchMember = useCallback(
    async (keyword: string) => {
      const isReach = keyword === REACH_SEARCH_FLAG;
      if (latestFetchState.current.loading || (!latestFetchState.current.hasMore && isReach)) return;
      setFetchState((state) => ({
        ...state,
        loading: true,
      }));
      const currentConversationGroupID = useConversationStore.getState().currentConversation?.groupID;
      try {
        const data = await OpenIMSDKRN.searchGroupMembers(
          {
            groupID: groupID ?? currentConversationGroupID ?? "",
            offset: isReach ? latestFetchState.current.searchOffset : 0,
            count: 20,
            keywordList: [keyword === REACH_SEARCH_FLAG ? lastKeyword.current : keyword],
            isSearchMemberNickname: true,
            isSearchUserID: true,
          },
          "opid",
        );

        lastKeyword.current = keyword;
        setFetchState((state) => ({
          ...state,
          searchMemberList: [...(isReach ? state.searchMemberList : []), ...data],
          hasMore: data.length === state.count,
          searchOffset: state.searchOffset + 20,
        }));
      } catch (error) {
        feedbackToast({
          msg: "getMemberFailed",
          error,
        });
      }

      setFetchState((state) => ({
        ...state,
        loading: false,
      }));
    },
    [groupID],
  );

  const getMemberData = useCallback(
    async (refresh = false) => {
      const sourceID = groupID ?? useConversationStore.getState().currentConversation?.groupID ?? "";
      if (!sourceID) return;

      if ((latestFetchState.current.loading || !latestFetchState.current.hasMore) && !refresh) return;

      setFetchState((state) => ({
        ...state,
        loading: true,
      }));
      try {
        const data = await OpenIMSDKRN.getGroupMemberList(
          {
            groupID: sourceID,
            offset: refresh ? 0 : latestFetchState.current.offset,
            count: 20,
            filter: 0,
          },
          "opid",
        );
        setFetchState((state) => ({
          ...state,
          groupMemberList: [...(refresh ? [] : state.groupMemberList), ...data],
          hasMore: data.length === state.count,
          offset: state.offset + 20,
          loading: false,
        }));
      } catch (error) {
        feedbackToast({
          msg: "getMemberFailed",
          error,
        });
        setFetchState((state) => ({
          ...state,
          loading: false,
        }));
      }
    },
    [groupID],
  );

  const groupMemberInfoChangedHandler = (member: GroupMemberItem) => {
    if (member.groupID === latestFetchState.current.groupMemberList[0]?.groupID) {
      const idx = latestFetchState.current.groupMemberList.findIndex((item) => item.userID === member.userID);
      const newMembers = [...latestFetchState.current.groupMemberList];
      newMembers[idx] = { ...member };
      setFetchState((state) => ({
        ...state,
        groupMemberList: newMembers,
      }));
    }
  };

  const groupMemberCountHandler = (data: GroupMemberItem) => {
    if (notRefresh) {
      return;
    }
    if (data.groupID === (groupID || latestFetchState.current.groupMemberList[0]?.groupID)) {
      getMemberData(true);
    }
  };

  const setIMListener = () => {
    OpenIMEmitter.addListener("onGroupMemberInfoChanged", groupMemberInfoChangedHandler);
    OpenIMEmitter.addListener("onGroupMemberAdded", groupMemberCountHandler);
    OpenIMEmitter.addListener("onGroupMemberDeleted", groupMemberCountHandler);
    OpenIMEmitter.addListener("onJoinedGroupAdded", groupMemberCountHandler);
  };

  const disposeIMListener = () => {
    const eventNames = ["onGroupMemberInfoChanged", "onGroupMemberAdded", "onGroupMemberDeleted", "onJoinedGroupAdded"];
    eventNames.forEach((eventName) => {
      OpenIMEmitter.removeAllListeners(eventName);
    });
  };

  const resetState = () => {
    setFetchState({
      offset: 0,
      searchOffset: 0,
      count: 20,
      loading: false,
      hasMore: true,
      groupMemberList: [],
      searchMemberList: [],
    });
  };

  useEffect(() => {
    const currentConversationGroupID = useConversationStore.getState().currentConversation?.groupID;
    if (!groupID && !currentConversationGroupID) return;
    resetState();
    getMemberData();
    setIMListener();
    return () => {
      disposeIMListener();
    };
  }, [groupID]);

  return {
    fetchState,
    getMemberData,
    searchMember,
    resetState,
  };
}
