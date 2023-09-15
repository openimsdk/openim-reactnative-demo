import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { CheckVerifyClient, SendVerifyClient } from '../api/requests';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [countdownSeconds, setCountdownSeconds] = useState(0);
  const [error,setError] = useState("")
  const navigator = useNavigation<NativeStackNavigationProp<any>>();
  const navigateToLogin = () => {
      navigator.navigate("LoginPage")
  }
  const handleClearEmail = () => {
    setEmail('');
  };

  const handleSendVerification = async () => {
    if (countdownSeconds === 0) {
      const result = await SendVerifyClient({usedFor:2,phoneNumber:email})
      if(result.success)
        setCountdownSeconds(60);
      else
        setError(result.errorMsg)
    }
  };
  const handleSavePwd = async () => {
    const result = await CheckVerifyClient({ phoneNumber: email, verifyCode: password})
    if(result.success){
      navigator.navigate("SetPasswordPage",{type:"resetPwd"});
    }else{
      setError(result.errorMsg)
    }
  }
  useEffect(() => {
    // Decrease the countdown every second
    const interval = setInterval(() => {
      if (countdownSeconds > 0) {
        setCountdownSeconds(countdownSeconds - 1);
      }
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [countdownSeconds]);

  return (
    <LinearGradient
      colors={['#0E6CBE28', '#C6C6C621']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.linearGradient}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={navigateToLogin}>
            <Image
                source={require('../../../assets/imgs/back.png')} 
            />
        </TouchableOpacity>
        <View style={styles.signInText}>
          <Text style={styles.signInTitle}>Forgot Password</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputBox}>
            <Text style={styles.enterText}>Enter your email</Text>
            <View style={styles.emailContainer}>
              <View style={styles.emailInput}>
                <TextInput style={styles.emailTextInput} placeholder="Email" value={email} onChangeText={setEmail} />
                <TouchableOpacity style={styles.clearButton} onPress={handleClearEmail}>
                  <Image
                    source={require('../../../assets/imgs/clear.png')} 
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.enterText}>Enter verification code</Text>
            <View style={styles.verificationInput}>
              <TextInput style={styles.verificationTextInput} placeholder="" onChangeText={setPassword}/>
              <TouchableOpacity style={styles.sendButtonContainer} onPress={()=>{handleSendVerification()}} >
                {countdownSeconds === 0 ? <Text style={styles.sendButtonText}>Send</Text> : <Text style={styles.sendButtonText}>{countdownSeconds}s</Text>}
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.error}>{error}</Text>
          <TouchableOpacity style={styles.signInButton} onPress={handleSavePwd}>
            <Text style={styles.signInButtonText}>Save</Text>
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
  signInText: {
    marginBottom: 20,
    alignSelf: 'flex-start',
    marginTop:40,
  },
  signInTitle: {
    marginLeft: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0089FF',
  },
  inputContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 11,
    padding: 20,
    marginTop: 20,
  },
  inputBox: {},
  enterText: {
    marginTop: 25,
    fontSize: 14,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailInput: {
    flex: 3,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#CBCBCB',
    borderRadius: 5,
    paddingRight: 10,
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emailTextInput: {
    flex: 1,
  },
  clearButton: {
    marginLeft: 'auto',
  },
  verificationInput: {
    borderWidth: 1,
    borderColor: '#CBCBCB',
    borderRadius: 5,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  verificationTextInput: {
    flex: 1,
    padding: 10,
    borderWidth: 0,
  },
  error:{
    fontSize:11,
    textAlign:"center",
    color:"red"
  },
  sendButtonContainer: {
    backgroundColor: '#0089FF',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  signInButton: {
    backgroundColor: '#0089FF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 35,
  },
  signInButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ForgetPasswordPage;
