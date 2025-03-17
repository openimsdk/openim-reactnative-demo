import NavBar from "@/components/NavBar";
import OIMAvatar from "@/components/OIMAvatar";
import RowListItem from "@/components/RowListItem";
import { useContactStore } from "@/store/contact";
import dayjs from "dayjs";
import { StyleSheet, Text, View } from "react-native";

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
    fontSize: 18,
    fontWeight: "500",
  },
  list: {
    marginTop: 8,
    paddingHorizontal: 4,
  },
});

const SelfInfo = () => {
  const contactStore = useContactStore();

  const comptGenderStr = () => {
    if (contactStore.userCardData.baseInfo?.gender === 1) {
      return "Male";
    }
    if (contactStore.userCardData.baseInfo?.gender === 2) {
      return "Female";
    }
    return "Private";
  };

  const birthStr = contactStore.userCardData.baseInfo?.birth
    ? dayjs(contactStore.userCardData.baseInfo?.birth).format("YYYY-MM-DD")
    : "-";

  const Items = [
    { id: 0, title: "Gender", rigthText: comptGenderStr() },
    { id: 1, title: "Birthday", rigthText: birthStr },
    { id: 2, title: "Phone", rigthText: contactStore.userCardData.baseInfo?.phoneNumber },
    { id: 3, title: "Email", rigthText: contactStore.userCardData.baseInfo?.email || "-" },
  ];

  return (
    <View style={styles.container}>
      <NavBar title="User Profile" style={styles.border} />
      <View style={styles.content}>
        <OIMAvatar
          faceURL={contactStore.userCardData.baseInfo?.faceURL}
          text={contactStore.userCardData.baseInfo?.nickname}
          size={90}
          fontSize={32}
        />
        <Text style={styles.name}>{contactStore.userCardData.baseInfo?.nickname}</Text>
      </View>
      <View style={styles.list}>
        {Items.map((item) => (
          <RowListItem key={item.id} {...item} showArrows={false} />
        ))}
      </View>
    </View>
  );
};

export default SelfInfo;
