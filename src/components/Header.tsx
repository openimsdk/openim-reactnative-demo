import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { theme } from "@/styles/theme";

export type HeaderProps = {
  title?: string,
  backButtonVisible?: boolean,
  left?: React.ReactNode,
  right?: React.ReactNode,
}

export default function Header(props: HeaderProps) {
  const {
    title,
    backButtonVisible = true,
    left,
    right,
  } = props;

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View style={[styles.headerWrap, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true}/>
      <View style={styles.headerContent}>
        <View style={styles.headerLeft}>
          {backButtonVisible && <HeaderLeftIcon onPress={() => navigation.goBack()} />}
          {left}
        </View>
        <View style={styles.headerCenter}>
          {title && <Text style={styles.title}>{title}</Text>}
        </View>
        <View style={styles.headerRight}>
          {right}
        </View>
      </View>
    </View>
  );
}

function HeaderLeftIcon({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.backIcon}>
      <Image source={require('@/assets/images/icons/nav_back.png')} style={styles.backIcon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  headerWrap: {
    backgroundColor: '#fff',
  },
  headerContent: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  headerLeft: {
    justifyContent: 'center'
  },
  headerRight: {
    justifyContent: 'center'
  },
  headerCenter: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 17,
    color: theme.colors.fontBlack,
    fontWeight: 'semibold',
  },
  backIcon: {
    width: 24,
    height: 24,
  },
});
