import { theme } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    // height: '100%',
    flexDirection: "column",
    justifyContent: 'space-between'
  },
  topPart: {
    // flex: 1,
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
    marginBottom: 50,
  },
  logo: {
    width: 72,
    height: 72,
    marginBottom: 5,
  },
  title: {
    color: '#0089FF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  linkButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20%',
  },
  button: {
    width: '100%',
  },
  footerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 3,
    paddingBottom: 20,
  },
  footerItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    color: theme.colors.fontGray,
    fontSize: 12,
  },
});