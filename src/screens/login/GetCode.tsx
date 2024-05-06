import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Button, TextInput } from "react-native-paper";

import type { ApplicationScreenProps } from "@/types/navigation";
import back from "@/assets/back.png";
import { feedbackToast } from "@/utils/common";
import { useState } from "react";
import { sendSms } from "@/api/login";

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
    marginBottom: 60,
  },
  input: {
    borderColor: "gray",
  },
  btn: {
    borderRadius: 10,
    padding: 4,
    marginTop: 360,
  },
});

function GetCode({ navigation }: ApplicationScreenProps) {
  const { t } = useTranslation(["login"]);
  const [phone, setPhone] = useState("");
  const phoneRegExp = /^1[3-9]\d{9}$/;
  const toBack = () => {
    navigation.goBack();
  };

  const toVerifyCode = async () => {
    if (!phoneRegExp.test(phone)) {
      feedbackToast({
        msg: "Please enter a correct phone number",
        error: "Please enter a correct phone number",
      });
      return;
    }
    await sendSms({
      phoneNumber: phone,
      areaCode: "+86",
      usedFor: 1,
      invitationCode: "",
    });
    navigation.navigate("VerifyCode", { areaCode: "+86", phone: Number(phone) });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toBack}>
          <Image style={styles.back} source={back} resizeMode="contain" />
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <Text style={styles.title}>Countinue with Phone</Text>
        <Text style={styles.subTitle}>Sign up with your phone</Text>
        <TextInput
          mode="outlined"
          dense
          outlineStyle={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter your phone"
        />
        <Button style={styles.btn} mode="contained" onPress={toVerifyCode}>
          {t("login:Continue")}
        </Button>
      </View>
    </View>
  );
}

export default GetCode;
