import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { CheckVerifyClient, LoginClient, SendVerifyClient } from '../api/requests';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { initStore } from '../../../store/useGlobalEvent';
interface LoginWithVerificationPageProps{
  onLogin: (value:boolean) => void;
}
const LoginWithVerificationPage:React.FC<LoginWithVerificationPageProps> = ({onLogin}) => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [passwordHidden,setPasswordHidden] = useState(true);
  const [seconds,setSeconds] = useState(0)
  const [error,setError] = useState("")
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const navigateToLogin = () => {
    navigation.navigate('LoginPage'); 
  }
  const navigateToSignUp = () => {
    navigation.navigate('SignUpPage'); 
  };
  const handleClearEmail = () => {
    setEmail('');
  };

  const handleSendVerification = async () => {
    if(seconds == 0){
      setSeconds(60)
      const result = await SendVerifyClient({usedFor:3,phoneNumber:email})
      if(!result.success){
        setError(result.errorMsg)
      }
    }
        
  }
  const handleLogIn = () => {
    navigateToLogin();
  }
  const handleSignIn = async () => {
    const result = await CheckVerifyClient({ phoneNumber: email, verifyCode: password });
    if(result.success){
      const result2 = await LoginClient({password:"",phoneNumber:email,verifyCode:password,areaCode:"+86"});
      if(result2.success){
        onLogin(true)
        initStore()
      }else{
        setError(result2.errorMsg)
      }
    }else{
      setError(result.errorMsg)
    }
  }
  const handleSignUpPage = () => {
    navigateToSignUp();
  }
  useEffect(() => {
    // Decrease the countdown every second
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <LinearGradient
      colors={['#0E6CBE28', '#C6C6C621']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.linearGradient}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('../../../assets/imgs/loginLogo.png')} style={styles.logo} />
        </View>
        <View>
          <Text style={styles.welcomeText}>Welcome to OpenIM</Text>
        </View>
        <View style={styles.signInText}>
          <Text style={styles.signInTitle}>Sign in</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputBox}>
            <Text style={styles.enterText}>Enter your email</Text>
            <View style={styles.emailContainer}>
              <View style={styles.emailInput}>
                <TextInput  style={styles.emailTextInput} placeholder="Email" value={email} onChangeText={setEmail}/>
                <TouchableOpacity style={styles.clearButton} onPress={handleClearEmail}>
                  <Image
                    source={require('../../../assets/imgs/clear.png')} // Replace with your image file path
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.enterText}>Enter your verification code</Text>
            <View style={styles.verificationInput}>
              <TextInput  style={styles.verificationTextInput} placeholder="" secureTextEntry={passwordHidden} value={password} onChangeText={setPassword}/>
              <TouchableOpacity style={styles.sendButtonContainer} onPress={handleSendVerification}>
                {seconds==0?<Text style = {styles.sendButtonText}>Send</Text>:<Text style = {styles.sendButtonText}>{seconds}s</Text> }
              </TouchableOpacity>
            </View>
            <View style={styles.veriLoginHolder}>
              <TouchableOpacity onPress={handleLogIn}>
                <Text style={styles.passwordLoginText}>Password Login</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.error}>{error}</Text>
          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signUpText}>
          <Text style={{fontSize:11,fontStyle: 'italic',}}>Don't have an account yet?</Text>
          <View style={styles.clickToSignUpContainer}>
            <Text style={{fontSize:11,fontStyle: 'italic',}}>Click to  </Text>
            <TouchableOpacity onPress={handleSignUpPage}>
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient> 
  );
};

const styles = StyleSheet.create({
  linearGradient:{
    flex:1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  welcomeText: {
    color:"#0089FF",
    marginBottom: 20,
  },
  signInText: {
    marginBottom: 20,
    alignSelf:'flex-start',
  },
  signInTitle: {
    marginLeft:10,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0089FF'
  },
  inputContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius:11,
    paddingLeft:25,
    paddingRight:25,
    paddingBottom:31,
  },
  inputBox: {
    // marginBottom: 10,
  },
  enterText:{
    marginTop:25,
    fontSize:14,
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
    paddingRight:10,
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
  veriLoginHolder: {
    flexDirection: 'row',
    alignSelf:'flex-end'
  },
  passwordLoginText: {
    color: '#0089FF',
    textDecorationLine: 'underline',
    marginBottom: 10,
    marginLeft:10,
    fontSize:11,
  },
  error:{
    fontSize:11,
    textAlign:"center",
    color:"red"
  },
  signInButton: {

    backgroundColor: '#0089FF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop:35,
  },
  signInButtonText: {
    color: 'white',
    fontSize:18,
    fontWeight:'bold',
  },
  signUpText: {
    marginTop: 35,
    textDecorationLine: 'underline',
    color: 'blue',
    marginLeft:'auto',
  },
  clickToSignUpContainer:{
    flexDirection:'row',
    marginLeft:'auto',
    alignItems: 'baseline',
  },
  signUpButtonText:{
    color: '#0089FF',
    fontSize:14,
    fontStyle: 'italic',
  }
});

export default LoginWithVerificationPage;
