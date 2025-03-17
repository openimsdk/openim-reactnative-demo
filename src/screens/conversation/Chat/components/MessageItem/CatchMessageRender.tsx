import { FC } from "react";
import { Text } from "react-native";
import { IMessageItemProps } from ".";

const CatchMessageRender: FC<IMessageItemProps> = ({ style }) => {
  return <Text style={style}>Unknown message</Text>;
};

export default CatchMessageRender;
