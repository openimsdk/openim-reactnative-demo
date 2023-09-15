import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Avatar from "../../components/avatar";
import { useState, useEffect } from "react";
import { API } from "../api/typings";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import ChatRoom from "./chatRoom";
import { GetAdvancedHistoryMessageListReverse } from "../api/openimsdk";
import { ConversationItem } from "../../../store/types/entity";

const ConversationCard = ({ item }:{item:ConversationItem}) => {
    
    const [showMsg, setShowMsg] = useState("");
    const [showMsgTime, setShowMsgTime] = useState("");
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const handleConversation = async () =>  {
        navigation.navigate('ChatRoom',{item})
    }
    useEffect(() => {
        if (item) {
            const lastestMsgJson = JSON.parse(item.latestMsg);
            if (lastestMsgJson.contentType === 101) {
                setShowMsg(lastestMsgJson.textElem.content);
            } else if (lastestMsgJson.contentType === 1201) {
                setShowMsg("You have been added as friend");
            }
            const timestamp = item.latestMsgSendTime; // Replace with your timestamp

            // Create a Date object and pass the timestamp as an argument
            const date = new Date(timestamp);
            const currentTime = new Date()
            // Use various methods to get the components of the date and time
            const year = date.getFullYear();
            const month = date.getMonth() + 1; // Months are zero-based, so add 1
            const day = date.getDate();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();

            const currentYear = currentTime.getFullYear();
            const currentMonth = currentTime.getMonth() + 1; // Months are zero-based, so add 1
            const currentDay = currentTime.getDate();
            const currentHours = currentTime.getHours();
            const currrentMinutes = currentTime.getMinutes();
            const currentSeconds = currentTime.getSeconds();

            const formattedHours = String(hours).padStart(2,"0")
            const formattedMinutes = String(minutes).padStart(2,"0")
            // Format the date and time as a string
            let formattedDate = "";
            if (currentYear == year && currentMonth == month && currentDay == day)
                formattedDate = `${formattedHours}:${formattedMinutes}`
            else if (currentYear == year && currentMonth == month && currentDay == day + 1)
                formattedDate = `Yesterday`
            else
                formattedDate = `${year}-${month}-${day}`;
            setShowMsgTime(formattedDate);
        }
    }, [item]);

    if (!item) {
        return null; // Return null or a placeholder component if data is undefined
    }
    return (
        <TouchableOpacity style={styles.contactItem} onPress={handleConversation}>
            <Avatar nickname={item.showName} faceURL={item.faceURL} />
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text>{item.showName}</Text>
                    <Text>{showMsgTime}</Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between",marginTop:10}}>
                    <Text>{showMsg}</Text>
                    {item.unreadCount > 0  && (
                        <View style={{ backgroundColor: "red", borderRadius: 10, height: 20, width: 20,justifyContent:'center',alignItems:'center'}}>
                            <Text style={{ color: "white" }}>{item.unreadCount}</Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    contactItem: {
        padding: 16,
        flexDirection: "row",
        backgroundColor: "white",
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 25,
        marginRight: 10,
    },
});

export default ConversationCard;
