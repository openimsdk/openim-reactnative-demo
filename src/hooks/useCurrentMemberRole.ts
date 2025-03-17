import { GroupMemberRole } from "@/constants";
import { useConversationStore } from "@/store/conversation";

export function useCurrentMemberRole() {
  const currentMemberInGroup = useConversationStore((state) => state.currentMemberInGroup);

  const isOwner = currentMemberInGroup?.roleLevel === GroupMemberRole.Owner;
  const isAdmin = currentMemberInGroup?.roleLevel === GroupMemberRole.Admin;
  const isNomal = currentMemberInGroup?.roleLevel === GroupMemberRole.Nomal;
  const isJoinGroup = Boolean(currentMemberInGroup?.groupID);
  const currentRolevel = currentMemberInGroup?.roleLevel ?? 0;
  const currentIsMuted = (currentMemberInGroup?.muteEndTime ?? 0) > Date.now();

  return {
    isOwner,
    isAdmin,
    isNomal,
    isJoinGroup,
    currentRolevel,
    currentIsMuted,
    currentMemberInGroup,
  };
}
