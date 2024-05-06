import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { Button } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";

import type { ApplicationScreenProps } from "@/types/navigation";
import back from "@/assets/back.png";
import { useRoute } from "@react-navigation/native";
import { verifyCode } from "@/api/login";

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
  email: {
    color: "#2D9DFE",
  },
  codeFiledRoot: {
    marginTop: 20,
  },
  cellRoot: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  cellText: {
    color: "#000",
    fontSize: 26,
    textAlign: "center",
  },
  focusCell: {
    borderBottomColor: "#007AFF",
    borderBottomWidth: 2,
  },
  btn: {
    borderRadius: 10,
    padding: 4,
    marginTop: 340,
  },
});

function VerifyCode({ navigation }: ApplicationScreenProps) {
  const { t } = useTranslation(["login"]);
  const route = useRoute();
  const { areaCode, phone } = route.params as {
    areaCode: string;
    phone: number;
  };

  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: 6 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const toBack = () => {
    navigation.goBack();
  };

  const toSetBaseInfo = async () => {
    await verifyCode({
      phoneNumber: String(phone),
      areaCode,
      verifyCode: value,
      usedFor: 1,
    });
    navigation.navigate("SetBaseInfo", {
      areaCode,
      phone,
      verifyCode: value,
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
        <Text style={styles.title}>Confirm Phone</Text>
        <Text style={styles.subTitle}>
          <Text>We sent a verification code to your phone </Text>
          <Text style={styles.email}>
            {areaCode} {phone}
          </Text>
        </Text>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={6}
          rootStyle={styles.codeFiledRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <View onLayout={getCellOnLayoutHandler(index)} key={index} style={[styles.cellRoot, isFocused && styles.focusCell]}>
              <Text style={styles.cellText}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
            </View>
          )}
        />
        <Button style={styles.btn} mode="contained" onPress={toSetBaseInfo} disabled={value.length !== 6}>
          {t("login:continue")}
        </Button>
      </View>
    </View>
  );
}

export default VerifyCode;
