import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { GetAllConversationList } from "../api/openimsdk";
import { useEffect, useState } from "react";
import ConversationCard from "./conversationCard";
import { API } from "../api/typings";
import { useMessageStore } from "../../../store/message";
import { useConversationStore } from "../../../store/conversation";
import { ConversationItem } from "../../../store/types/entity";

const ChatPage = () => {
    const rawData:ConversationItem[] = useConversationStore((state) => state.conversationList);
    
    const renderConversationItem = ({item}:{item:ConversationItem} ) => {
        return (
            <View style={{}}>
                <ConversationCard item={item}></ConversationCard>
            </View>
        );
    };

    return (
        <View>
            <View style={styles.header}>
                <View style={styles.topBar}>
                    <TouchableOpacity style={styles.button}>
                        <Text>Edit</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Contacts</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text>Add Friend</Text>
                    </TouchableOpacity>
                </View>

            </View>
            <FlatList
                data={rawData}
                keyExtractor={(item) => item.conversationID.toString()}
                renderItem={renderConversationItem}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        backgroundColor: '#F6F6F6FF',
        padding: 16,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginBottom: 16,
    },
    button: {
        padding: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    searchBar: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        // marginBottom: 16,
        paddingLeft: 8,
        backgroundColor: '#E5E5E5FF',
        textAlign: "center"
    },
});
export default ChatPage;