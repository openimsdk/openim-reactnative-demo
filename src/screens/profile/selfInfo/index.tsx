import NavBar from "@/components/NavBar";
import OIMAvatar from "@/components/OIMAvatar";
import RowListItem from "@/components/RowListItem";
import { useUserStore } from "@/store/user";
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
  const selfInfo = useUserStore((state) => state.selfInfo);

  const comptGenderStr = () => {
    if (selfInfo.gender === 1) {
      return "Male";
    }
    if (selfInfo.gender === 2) {
      return "Female";
    }
    return "Private";
  };

  const birthStr = selfInfo.birth ? dayjs(selfInfo.birth).format("YYYY-MM-DD") : "-";

  const Items = [
    { id: 0, title: "Gender", rigthText: comptGenderStr() },
    { id: 1, title: "Birthday", rigthText: birthStr },
    { id: 2, title: "Phone", rigthText: selfInfo.phoneNumber || "-" },
    { id: 3, title: "Email", rigthText: selfInfo.email || "-" },
  ];

  return (
    <View style={styles.container}>
      <NavBar title="My Profile" style={styles.border} />
      <View style={styles.content}>
        <OIMAvatar faceURL={selfInfo.faceURL} text={selfInfo.nickname} size={90} fontSize={32} />
        <Text style={styles.name}>{selfInfo.nickname}</Text>
      </View>
      <View style={styles.list}>
        {Items.map((item) => (
          <RowListItem key={item.id} {...item} />
        ))}
      </View>
    </View>
  );
};

export default SelfInfo;
