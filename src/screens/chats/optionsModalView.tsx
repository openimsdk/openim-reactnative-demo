import React from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";


const OptionModalView = ({ isVisible, onClose }: { isVisible: boolean, onClose: () => void }) => {
    return (
        <Modal visible={isVisible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.whiteBackground}>
                    <TouchableOpacity style={styles.optionItem}>
                        <Text>Video</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionItem}>
                        <Text>Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionItem}>
                        <Text>Location</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionItem}>
                        <Text>Document</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionItem}>
                        <Text>Contact Card</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <Text>Close</Text>
                </TouchableOpacity>

            </View>
        </Modal>
    );
};
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    whiteBackground: {
        backgroundColor:'white',
    },
    optionItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        width: "100%",
    },
    closeButton: {
        marginTop: 10,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5,
        
    },
});
export default OptionModalView;
