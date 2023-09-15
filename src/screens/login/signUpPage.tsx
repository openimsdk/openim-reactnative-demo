import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Platform } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from '@react-navigation/native';
import { SendVerifyClient } from "../api/requests";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
const SignUpPage = () => {
    const [email,setEmail] = useState("")
    const [error,setError] = useState("")
    const navigator = useNavigation<NativeStackNavigationProp<any>>();
    const navigateBack = () => {
        navigator.navigate("LoginPage")
    }
    const navigateToVeriCode = async () => {
      const result = await SendVerifyClient({usedFor:1,phoneNumber:email})
        if(result.success){
          navigator.navigate("SetVerificationPage",{email});        
        }else
          setError(result.errorMsg)
           
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
          <Text style={styles.enterText}>Enter your email address</Text>
          <TextInput style={styles.emailInput} placeholder="Email" value={email} onChangeText={setEmail}/>
          <Text style={styles.error}>{error}</Text>
          <TouchableOpacity style={styles.nextButton} onPress={navigateToVeriCode}>
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
    marginTop:40,
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 11,
    padding: 20,
    marginTop: 20,
  },  
  enterText:{
    marginTop:30,
    fontSize:14,
  },
  emailInput: {
    borderWidth: 1,
    borderColor: "#CBCBCB",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
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
  nextButtonText:{
    color: 'white',
    fontSize:18,
    fontWeight:'bold'
  }
});

export default SignUpPage;
