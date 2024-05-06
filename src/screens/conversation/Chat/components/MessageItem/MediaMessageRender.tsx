import { FC, useState } from "react";
import { Image, ImageLoadEventData, NativeSyntheticEvent, TouchableOpacity, View } from "react-native";
import { MessageType } from "@/constants";
import ImageView from "react-native-image-viewing";

import { IMessageItemProps } from ".";

const ImageMessageRender: FC<IMessageItemProps> = ({ message }) => {
  console.log(message);
  const isVideo = message.contentType === MessageType.VideoMessage;
  const imageUrl = isVideo ? message.videoElem.snapshotUrl : message.pictureElem.sourcePicture.url;

  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [visible, setIsVisible] = useState(false);

  const handleImageLoad = (event: NativeSyntheticEvent<ImageLoadEventData>) => {
    const { width, height } = event.nativeEvent.source;
    const maxWidth = 240;
    const aspectRatio = width / height;

    let newWidth = maxWidth;
    let newHeight = maxWidth / aspectRatio;

    if (newHeight > height) {
      newHeight = height;
      newWidth = height * aspectRatio;
    }

    setImageSize({ width: newWidth, height: newHeight });
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setIsVisible(true)}>
        <Image onLoad={handleImageLoad} source={{ uri: imageUrl }} style={imageSize} resizeMode="contain" />
      </TouchableOpacity>
      <ImageView images={[{ uri: imageUrl }]} imageIndex={0} visible={visible} onRequestClose={() => setIsVisible(false)} />
    </View>
  );
};

export default ImageMessageRender;
