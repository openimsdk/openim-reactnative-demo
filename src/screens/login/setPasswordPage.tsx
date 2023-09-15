import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Modal, Platform } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from '@react-navigation/native';
import { USER_URL } from "../../config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OpenIMSDKRN from "open-im-sdk-rn";
import md5 from 'react-native-md5';
import { LoginClient, ResetPasswordClient, SignUpClient } from "../api/requests";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import { initStore } from "../../../store/useGlobalEvent";
interface SetPasswordPageProps {
  // props: {
    route: {
      params: {
        type: string;
        email: any;
        verifyCode: any;
      };
    };
  // }
  onLogin: (loggedIn: boolean) => void;
}

const SetPasswordPage: React.FC<SetPasswordPageProps> = ({ route, onLogin }) => {
  const [name, setName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("")
  const [next, setNext] = useState(true);
  const navigator = useNavigation<NativeStackNavigationProp<any>>();
  const navigateBack = () => {
    navigator.navigate("SignUpPage");
  }
  useEffect(() => {
    if (newPassword === repeatPassword) {
      setNext(true);
    } else {
      setNext(false);
    }
  }, [newPassword, repeatPassword]);

  const buttonStyle = next ? styles.nextButton : styles.nextButtonDisabled;
  const handleSignUp = async () => {
    try {
      if (route.params.type === "register") {
        const result = await SignUpClient({
          nickname: name,
          phoneNumber: route.params.email,
          password: md5.hex_md5(newPassword),
          verifyCode: route.params.verifyCode,
          autoLogin: true
        });
        if (!result.success)
          setError(result.errorMsg)
      }

      if (route.params.type === "resetPwd") {
        const result = await ResetPasswordClient({
          phoneNumber: route.params.email,
          password: md5.hex_md5(newPassword),
          verifyCode: route.params.verifyCode,
        });
        if (!result.success)
          setError(result.errorMsg)
      }
      const result = await LoginClient({ password: md5.hex_md5(newPassword), phoneNumber: route.params.email, verifyCode: "verify", areaCode: "+86" })
      if (result.success) {
        onLogin(true);
        initStore()
      } else {
        setError(result.errorMsg)
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
    }


  }
  return (
    <LinearGradient
      colors={["#0E6CBE28", "#C6C6C621"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.linearGradient}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={navigateBack}>
          <Image
            source={require('../../../assets/imgs/back.png')}
          />
        </TouchableOpacity>
        <Text style={styles.signUpTitle}>Name</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.enterText}>Name</Text>
          <TextInput
            style={styles.digitInput}
            value={name}
            onChangeText={setName}
          />
          <Text style={styles.enterText}>New Password</Text>
          <TextInput
            style={styles.digitInput}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <Text style={styles.enterText}>Repeat Password</Text>
          <TextInput
            style={styles.digitInput}
            value={repeatPassword}
            onChangeText={setRepeatPassword}
          />
          <Text style={styles.error}>{error}</Text>
          <TouchableOpacity style={buttonStyle} disabled={!next} onPress={() => handleSignUp()}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  backButton: {
    marginTop: 100,
  },
  signUpTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0089FF",
    marginBottom: 20,
    marginTop: 40,
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 11,
    padding: 20,
    marginTop: 20,
  },
  enterText: {
    marginTop: 30,
    fontSize: 14,
  },
  digitInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    fontSize: 18,
    marginRight: 10,
  },
  error: {
    fontSize: 11,
    textAlign: "center",
    color: "red"
  },
  nextButton: {
    backgroundColor: "#0089FF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 60,
  },
  nextButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  nextButtonDisabled: {
    backgroundColor: "#0089FF20",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 60,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default SetPasswordPage;
