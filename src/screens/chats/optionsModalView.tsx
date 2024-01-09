import React from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';

const OptionModalView = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPressOut={onClose}>
        <View style={styles.modalContainer}>
          {/* TouchableWithoutFeedback is used to prevent closing the modal when the whiteBackground is pressed */}
          <TouchableOpacity activeOpacity={1}>
            <View style={styles.whiteBackground}>
              <TouchableOpacity style={styles.optionItem}>
                <Text>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionItem}>
                <Text>Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionItem}>
                <Text>Document</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionItem}>
                <Text>Contact Card</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionItem}>
                <Text>Location</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  whiteBackground: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 16,
    alignItems: 'stretch',
  },
  optionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
});

export default OptionModalView;
