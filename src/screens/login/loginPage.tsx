import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet,Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import md5 from 'react-native-md5';
import { LoginClient } from '../api/requests';
import { GetLoginStatus } from '../api/openimsdk';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { initStore } from '../../../store/useGlobalEvent';
interface LoginPageProps{
  onLogin: (value:boolean) => void;
}
const LoginPage:React.FC<LoginPageProps> = ({onLogin}) => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [passwordHidden,setPasswordHidden] = useState(true);
  const [error,setError] = useState("");
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  useEffect(() => {
    const checkLoginStatus = async () => {
      const result = await GetLoginStatus();
      if (result.status === 3) {
        onLogin(true);
      }
    };
  
    checkLoginStatus();
  }, []);
  
  const navigateToForgetPwd = () => {
    navigation.navigate('ForgetPasswordPage');
  };
  const navigateToVeri = () => {
    navigation.navigate('LoginWithVerificationPage'); 
  };
  const navigateToSignUp = () => {
    navigation.navigate('SignUpPage'); 
  };

  const handleClearEmail = () => {
    setEmail('');
  };
  const handleClearPassword = () => {
    setPassword('');
  };
  
  const handleShowPassword = () => {
    setPasswordHidden(!passwordHidden);
  };
  const handleForgetPassword = () => {
    navigateToForgetPwd();
  };
  const handleVerificationLogin = () => {
    navigateToVeri();
  }
  const handleSignUp = () => {
    navigateToSignUp();
  }
  const handleSignIn = async () => {
    const result = await LoginClient({password:md5.hex_md5(password),phoneNumber:email,verifyCode:"verify",areaCode:"+86"});
    if(result.success){
      setError("")
      onLogin(true)
      initStore()
    }else{
      setError(result.errorMsg)
    }
  };
  
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
            <Text style={styles.enterText}>Enter your password</Text>
            <View style={styles.passwordInput}>
              <TextInput  style={styles.passwordTextInput} placeholder="Password" secureTextEntry={passwordHidden} value={password} onChangeText={setPassword}/>
              <TouchableOpacity style={styles.clearButton} onPress={handleClearPassword}>
                <Image
                  source={require('../../../assets/imgs/clear.png')} // Replace with your image file path
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleShowPassword}>
                <Image
                  source={require('../../../assets/imgs/visibility.png')} // Replace with your image file path
                />
              </TouchableOpacity>
            </View>
            <View style={styles.forgetPwdVeriLoginHolder}>
              <TouchableOpacity onPress={handleForgetPassword}>
                <Text style={styles.forgetPasswordText}>Forgot Password</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleVerificationLogin}>
                <Text style={styles.verificationLoginText}>Verification Login</Text>
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
            <TouchableOpacity>
              <Text style={styles.signUpButtonText} onPress={handleSignUp}>Sign Up</Text>
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
  passwordInput: {
    borderWidth: 1,
    borderColor: '#CBCBCB',
    borderRadius: 5,
    marginTop: 10,
    paddingRight:10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  passwordTextInput:{
    flex:1,
  },
  clearButton: {
    marginLeft: 'auto',
  },
  forgetPwdVeriLoginHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forgetPasswordText: {
    color: '#1E1E1E8A',
    textDecorationLine: 'underline',
    marginBottom: 10,
    fontSize:11,
  },
  verificationLoginText: {
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

export default LoginPage;
