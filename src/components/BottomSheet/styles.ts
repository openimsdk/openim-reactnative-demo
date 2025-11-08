import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalWrap: {
    flex: 1,
  },
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 8,
    zIndex: 100,
  },
  contentHeader: {

  }
});
