import { FC } from "react";
import { Text } from "react-native";
import { IMessageItemProps } from ".";

const TextMessageRender: FC<IMessageItemProps> = ({ message, style }) => {
  return <Text style={style}>{message.textElem.content}</Text>;
};

export default TextMessageRender;
