import { theme } from "@/styles/theme";
import { Image, Pressable, StyleSheet, TouchableHighlight, View } from "react-native";

type CellProps = {
  children: React.ReactNode;
  onPress?: () => void;
  rightContent?: React.ReactNode;
  link?: boolean;
};

export function Cell({ children, onPress, rightContent, link }: CellProps) {
  return (
    <Pressable 
      onPress={onPress}
      style={({ pressed }) => ({ backgroundColor: pressed ? theme.colors.gray50 : '#fff' })}
    >
      <View style={styles.container}>
        <View style={styles.leftContent}>
          {children}
        </View>
        <View style={styles.rightContent}>
          {rightContent}
          {link && <Image source={require('@/assets/images/icons/cell_link.png')} style={styles.arrowIcon} />}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContent: {},
  rightContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowIcon: {
    width: 24,
    height: 24,
    marginLeft: 6,
  }
});
