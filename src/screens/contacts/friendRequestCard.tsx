import { Image, StyleSheet, Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Avatar from "../../components/avatar";
export const FriendRequestCard = ({ nickname, faceURL, handleResult, reqMsg, fromUserID }: { nickname: string, faceURL: string, handleResult: number, reqMsg: string, fromUserID: string }) => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    let result = <Text>accepted</Text>
    if (handleResult == -1)
        result = <Text>rejected</Text>
    if (handleResult == 0) {
        const handleViewPress = () => {
            navigation.navigate("FriendRequests", { nickname: nickname, faceURL: faceURL, fromUserID: fromUserID, reqMsg: reqMsg })
        }
        return (
            <View style={[styles.contactItem, { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Avatar nickname={nickname} faceURL={faceURL} />
                    <View style={{ marginBottom: 30 }}>
                        <Text>nickname</Text>
                    </View>
                </View>
                <TouchableOpacity style={{ backgroundColor: "blue", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5 }} onPress={handleViewPress}>
                    <Text style={{ color: "white" }}>View</Text>
                </TouchableOpacity>
            </View>
        );
    };
    return (
        <View style={styles.contactItem}>
            <Avatar nickname={nickname} faceURL="" />
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text>{nickname}</Text>
                    <Text>{result}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>

                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contactItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        flexDirection: "row",
        backgroundColor: "white",
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 25,
        marginRight: 10,
    },
})
