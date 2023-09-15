import React, { useRef, useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from '@react-navigation/native';
import { SendVerifyClient, CheckVerifyClient } from "../api/requests";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
const SetVerificationPage = (props: { route: { params: { email: string }; }; }) => {
  const totalDigits = 6;
  const digitInputs = Array.from({ length: totalDigits }, (_, index) => index);
  const digitRefs = useRef<TextInput[]>([]);
  const [digits, setDigits] = useState(Array(totalDigits).fill(''));
  const [error,setError] = useState("")
  const navigator = useNavigation<NativeStackNavigationProp<any>>();
  const navigateBack = () => {
    navigator.navigate("SignUpPage");
}
const navigateToSetPwd = async () => {
  const result = await CheckVerifyClient({ phoneNumber: props.route.params.email, verifyCode: digits.join("") })
    if(result.success)
        navigator.navigate("SetPasswordPage",{email:props.route.params.email,verifyCode:digits.join(""),type:"register"});
    else{
      setDigits(['','','','','','',''])
      setError(result.errorMsg)
      }
    }
        
  const handleDigitChange = (index: number, value: string) => {
    const newDigits = [...digits];
    newDigits[index] = value;

    if (value === '') {
      // If a digit is deleted, move to the previous input
      if (index > 0) {
        digitRefs.current[index - 1].focus();
      }
    } else if (index < totalDigits - 1) {
      // If a digit is entered, move to the next input
      digitRefs.current[index + 1].focus();
    }

    setDigits(newDigits);
  };
  const sendVeriCode = () => {
    SendVerifyClient({usedFor:1,phoneNumber:props.route.params.email});
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
            source={require('../../../assets/imgs/back.png')} // Replace with your image file path
          />
        </TouchableOpacity>
        <Text style={styles.signUpTitle}>Sign Up</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.enterText}>Enter the code that was sent to</Text>
          <Text style={styles.userEmail}>{props.route.params.email}</Text>
          <View style={styles.digitInputContainer}>
            {digitInputs.map((index) => (
              <TextInput
                key={index}
                ref={(input) => (digitRefs.current[index] = input)}
                style={styles.digitInput}
                value={digits[index]}
                onChangeText={(value) => handleDigitChange(index, value)}
                keyboardType="numeric"
                maxLength={1}
              />
            ))}
          </View>
          <View style={styles.didnotReceivedCodeContainer}>
            <Text >Did't received code?</Text>
            <TouchableOpacity style={styles.didnotReceivedCodeButton} onPress={()=>{sendVeriCode()}}>
                <Text style={styles.didnotReceivedCodeButtonText}>Resend Code</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.error}>{error}</Text>
          <TouchableOpacity style={styles.nextButton} onPress={()=>navigateToSetPwd()}>
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
    paddingRight:20,
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
  userEmail: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E1E1E",
  },
  digitInputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  digitInput: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    textAlign: "center",
    fontSize: 18,
    marginRight: 10,
  },
  didnotReceivedCodeContainer:{
    flexDirection:"row",
    justifyContent:"center"
  },
  didnotReceivedCodeButton:{
    
  },
  didnotReceivedCodeButtonText:{
    color: '#0089FF',
  },
  error:{
    fontSize:11,
    textAlign:"center",
    color:"red"
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
});

export default SetVerificationPage;
