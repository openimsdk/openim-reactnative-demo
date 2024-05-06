import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Button, TextInput } from "react-native-paper";

import type { ApplicationScreenProps } from "@/types/navigation";
import back from "@/assets/back.png";
import { useRoute } from "@react-navigation/native";
import { register } from "@/api/login";
import { useState } from "react";
import md5 from "md5";
import { feedbackToast } from "@/utils/common";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  header: {
    width: "100%",
  },
  back: {
    width: 43,
    height: 43,
    marginLeft: 20,
    marginTop: 40,
  },
  form: {
    flex: 1,
    marginTop: 40,
    width: "80%",
  },
  title: {
    color: "black",
    fontSize: 24,
    fontWeight: "500",
  },
  subTitle: {
    color: "black",
    fontSize: 16,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "black",
    fontWeight: "500",
    marginBottom: 10,
    marginTop: 24,
    marginLeft: 5,
  },
  input: {
    borderColor: "gray",
  },
  btn: {
    borderRadius: 10,
    padding: 4,
    marginTop: 120,
  },
});

const passwordRegExp = /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,20}$/;

function SetBaseInfo({ navigation }: ApplicationScreenProps) {
  const { t } = useTranslation(["login"]);
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const route = useRoute();
  const { verifyCode, areaCode, phone } = route.params as {
    verifyCode: string;
    areaCode: string;
    phone: number;
  };

  const toBack = () => {
    navigation.goBack();
  };

  const toVerifyCode = async () => {
    if (!passwordRegExp.test(password)) {
      feedbackToast({
        msg: "Incorrect password format",
        error: "Incorrect password format",
      });
      return;
    }
    if (password !== confirmPassword) {
      feedbackToast({
        msg: "Passwords do not match",
        error: "Passwords do not match",
      });
      return;
    }
    await register({
      verifyCode,
      deviceID: "",
      user: {
        faceURL: "",
        nickname,
        gender: 0,
        birth: 0,
        phoneNumber: String(phone),
        areaCode,
        password: md5(password),
        email: "",
      },
    });
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toBack}>
          <Image style={styles.back} source={back} resizeMode="contain" />
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <Text style={styles.title}>{t("login:setAccount")}</Text>
        <Text style={styles.subTitle}>{t("login:setAccountTip")}</Text>
        <Text style={styles.label}>{t("login:name")}</Text>
        <TextInput mode="outlined" dense outlineStyle={styles.input} value={nickname} onChangeText={setNickname} />
        <Text style={styles.label}>{t("login:password")}</Text>
        <TextInput
          mode="outlined"
          dense
          outlineStyle={styles.input}
          placeholder={t("login:inputPassword")}
          value={password}
          onChangeText={setPassword}
        />
        <Text style={styles.label}>{t("login:repeatPassword")}</Text>
        <TextInput
          mode="outlined"
          dense
          outlineStyle={styles.input}
          placeholder={t("login:inputPassword")}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Button style={styles.btn} mode="contained" onPress={toVerifyCode}>
          {t("login:continue")}
        </Button>
      </View>
    </View>
  );
}

export default SetBaseInfo;
