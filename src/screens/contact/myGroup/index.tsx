import { FlatList, StyleSheet, Text, View } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useState } from "react";
import { GroupItem } from "open-im-sdk-rn/lib/typescript/types/entity";

import NavBar from "@/components/NavBar";
import InfoItem from "@/components/InfoItem";
import { useContactStore } from "@/store/contact";
import { useUserStore } from "@/store/user";
import { useConversationToggle } from "@/hooks/useConversationToggle";
import { SessionType } from "@/constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  search: {
    borderRadius: 10,
    backgroundColor: "#F4F5F7",
    marginHorizontal: 20,
  },
  tabIndicator: {
    backgroundColor: "#2D9DFE",
  },
  tabBg: {
    backgroundColor: "white",
  },
  tabText: {
    color: "black",
    margin: 8,
  },
  list: {
    marginTop: 6,
  },
});

const GroupList = (groupList: GroupItem[]) => {
  const { toSpecifiedConversation } = useConversationToggle();

  const toGroup = (id: string) => {
    toSpecifiedConversation({
      sourceID: id,
      sessionType: SessionType.Group,
    });
  };

  return (
    <View style={styles.list}>
      <FlatList
        data={groupList}
        renderItem={({ item }) => (
          <InfoItem
            faceURL={item.faceURL}
            name={item.groupName}
            subText={`${item.memberCount} member`}
            callback={() => toGroup(item.groupID)}
            isGroup
          />
        )}
      />
    </View>
  );
};

const MyGroup = () => {
  const userStore = useUserStore();
  const contactStore = useContactStore();

  const createdGroup = contactStore.groupList.filter((group) => group.ownerUserID === userStore.selfInfo.userID);
  const joinedGroup = contactStore.groupList.filter((group) => group.ownerUserID !== userStore.selfInfo.userID);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "created", title: "Created" },
    { key: "joined", title: "Joined" },
  ]);

  const renderScene = SceneMap({
    created: () => GroupList(createdGroup),
    joined: () => GroupList(joinedGroup),
  });

  return (
    <View style={styles.container}>
      <NavBar title="Groups" />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={styles.tabIndicator}
            style={styles.tabBg}
            renderLabel={({ route }) => <Text style={styles.tabText}>{route.title}</Text>}
          />
        )}
      />
    </View>
  );
};

export default MyGroup;
