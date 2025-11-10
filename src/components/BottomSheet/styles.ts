import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalWrap: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    width: '100%',
    zIndex: 99,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  content: {
    zIndex: 100,
  },
});
