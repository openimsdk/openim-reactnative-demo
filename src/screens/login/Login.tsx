import LinearGradient from "react-native-linear-gradient";
import { useToggle } from "ahooks";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

import logo from "@/assets/logo.png";
import { login } from "@/api/login";
import { setIMProfile } from "@/utils/storage";
import type { ApplicationScreenProps } from "@/types/navigation";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import md5 from "md5";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  linearGradient: {
    flex: 1,
  },
  logo: {
    marginTop: 80,
    width: 127,
    height: 110,
  },
  welcome: {
    fontSize: 16,
    color: "#2D9DFE",
  },
  form: {
    marginTop: 20,
    width: "80%",
  },
  label: {
    fontSize: 16,
    color: "black",
    marginBottom: 10,
    marginTop: 24,
    marginLeft: 5,
  },
  forget: {
    textAlign: "right",
    marginTop: 4,
    color: "black",
    fontSize: 14,
  },
  btn: {
    borderRadius: 10,
    padding: 4,
    marginTop: 80,
  },
  tips: {
    color: "black",
    marginTop: 6,
    textAlign: "center",
  },
  sign: {
    color: "#2D9DFE",
  },
});

function Login({ navigation }: ApplicationScreenProps) {
  const { t } = useTranslation(["login"]);
  const [phoneNumber, setPhoneNumber] = useState("17500000001");
  const [password, setPassword] = useState("123456a");
  const [secure, { toggle }] = useToggle(true);

  const tryLogin = async () => {
    try {
      const { data } = await login({
        verifyCode: "",
        phoneNumber,
        areaCode: "+86",
        password: md5(password),
      });
      await setIMProfile(data);
      navigation.reset({
        index: 0,
        routes: [{ name: "MainContentLayout" }],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const tryReg = () => {
    navigation.navigate("GetCode");
  };

  return (
    <LinearGradient
      colors={["rgba(0, 137, 255, 0.2)", "rgba(255, 255, 255, 0.1)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.linearGradient}
    >
      <View style={styles.container}>
        <Image style={styles.logo} source={logo} resizeMode="contain" />
        <Text style={styles.welcome}>{t("login:title")}</Text>
        <View style={styles.form}>
          <Text style={styles.label}>Phone</Text>
          <TextInput mode="outlined" dense value={phoneNumber} onChangeText={setPhoneNumber} />
          <Text style={styles.label}>{t("login:password")}</Text>
          <TextInput
            mode="outlined"
            dense
            secureTextEntry={secure}
            right={<TextInput.Icon icon="eye" onPress={toggle} />}
            value={password}
            onChangeText={setPassword}
          />
          {/* <Text style={styles.forget}>{t("login:forget")}</Text> */}
          <Button style={styles.btn} onPress={tryLogin} mode="contained">
            {t("login:login")}
          </Button>
          <Text style={styles.tips}>
            {t("login:signUpTips")}
            <Text style={styles.sign} onPress={tryReg}>
              {t("login:signUp")}
            </Text>
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

export default Login;
