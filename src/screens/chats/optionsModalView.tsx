import React from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {CreateImage} from '../../api/openimsdk';

const OptionModalView = ({
  isVisible,
  onClose,
  onImageSelected,
}: {
  isVisible: boolean;
  onClose: () => void;
  onImageSelected: (imageMessage: any) => void;
}) => {
  const processImage = async (uri: string, type: any, fileSize: any) => {
    if (uri.startsWith('file://')) {
      uri = uri.substring(7); // Remove 'file://' scheme
    }
    return await CreateImage(uri);
  };

  const handleImageSelection = async (response: ImagePickerResponse) => {
    if (response.didCancel || response.errorCode) {
      console.log('User cancelled image picker or error occurred');
      return;
    }

    const {uri, type, fileSize} = response.assets[0];
    if (uri && type && fileSize) {
      const imageMessage = await processImage(uri, type, fileSize);
      onImageSelected(imageMessage);
    }
  };

  const openCamera = () =>
    launchCamera({mediaType: 'photo'}, handleImageSelection);
  const openGallery = () =>
    launchImageLibrary({mediaType: 'photo'}, handleImageSelection);

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPressOut={onClose}>
        <View style={styles.modalContainer}>
          <TouchableOpacity activeOpacity={1}>
            <View style={styles.whiteBackground}>
              {['Camera', 'Photo', 'Document', 'Contact Card', 'Location'].map(
                (option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.optionItem}
                    onPress={option === 'Camera' ? openCamera : openGallery}>
                    <Text>{option}</Text>
                  </TouchableOpacity>
                ),
              )}
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
