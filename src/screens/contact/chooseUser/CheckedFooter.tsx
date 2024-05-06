import { ApplicationStackParamList } from "@/types/navigation";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { PublicUserItem } from "open-im-sdk-rn/lib/typescript/types/entity";
import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

type CheckedFooterProps = {
  userList: PublicUserItem[];
};

const styles = StyleSheet.create({
  footer: {
    height: 80,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    justifyContent: "space-between",
  },
  textBox: {
    width: 240,
  },
  selected: {
    color: "#2D9DFE",
    marginBottom: 6,
  },
  btn: {
    borderRadius: 8,
  },
});

const CheckedFooter: FC<CheckedFooterProps> = ({ userList }) => {
  const navigation = useNavigation<NavigationProp<ApplicationStackParamList>>();
  const toCreate = () => {
    navigation.navigate("GroupCard", { userList });
  };

  return (
    <View style={styles.footer}>
      <View style={styles.textBox}>
        <Text style={styles.selected}>Selected: ({userList.length})</Text>
        <Text numberOfLines={1} ellipsizeMode="tail">
          {userList.map((user) => user.nickname).join("、")}
        </Text>
      </View>
      <Button style={styles.btn} mode="contained" disabled={userList.length === 0} onPress={toCreate}>
        Next ({userList.length}/999)
      </Button>
    </View>
  );
};

export default CheckedFooter;
