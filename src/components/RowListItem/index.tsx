import { Image, ImageSourcePropType, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import arrow_left from "@/assets/images/contact/arrow_left.png";
import { ReactNode } from "react";

type ContactItemProps = {
  id: number;
  title: string;
  danger?: boolean;
  subTitle?: string;
  img?: ImageSourcePropType;
  rigthText?: string;
  rigthNode?: ReactNode;
  showLine?: boolean;
  showArrows?: boolean;
  callback?: (id: number) => void;
};

const styles = StyleSheet.create({
  btn: {
    width: 30,
    height: 30,
  },
  item: {
    backgroundColor: "white",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  textBox: {
    color: "black",
    marginLeft: 16,
    fontSize: 16,
  },
  title: {
    color: "black",
    fontSize: 16,
  },
  danger: {
    color: "#FF381F",
  },
  subTitle: {
    color: "#8896A3",
  },
  rigth: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
    color: "balck",
  },
  text: {
    color: "black",
    fontSize: 16,
    marginRight: 16,
  },
  gap: {
    height: 8,
    backgroundColor: "#F8F9FA",
  },
  line: {
    height: 0.5,
    backgroundColor: "#ccc",
    width: "83%",
    marginLeft: "auto",
  },
});

const RowListItem = ({
  id,
  title,
  danger,
  subTitle,
  img,
  showLine,
  showArrows = true,
  rigthText,
  rigthNode,
  callback,
}: ContactItemProps) => {
  const onPress = () => {
    callback?.(id);
  };

  return (
    <View>
      <TouchableHighlight onPress={onPress}>
        <View style={styles.item}>
          {img && <Image source={img} style={styles.btn} />}
          <View style={styles.textBox}>
            <Text style={[styles.title, danger ? styles.danger : null]}>{title}</Text>
            {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
          </View>
          <View style={styles.rigth}>
            {rigthNode}
            {rigthText && <Text style={styles.text}>{rigthText}</Text>}
            {showArrows && <Image source={arrow_left} style={styles.btn} />}
          </View>
        </View>
      </TouchableHighlight>
      {showLine && <View style={styles.line} />}
    </View>
  );
};

export default RowListItem;
