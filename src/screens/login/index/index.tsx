import LinearGradientWrap from "../components/LinearGradientWrap";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";
import { 
  PasswordInputItem,
  PhoneInputItem,
  EmailInputItem,
  VerificationCodeInputItem,
  PhoneInputItemRef,
  VerificationCodeInputItemRef
} from "../components/input-item";
import { Button } from "@ant-design/react-native";
import Divider from "@/components/Divider";
import LinkButton from "@/components/LinkButton";
import { useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@/navigation/types";
import { useToast } from "@/components/Toast";
import { login, sendSms } from "@/api/login";
import md5 from 'md5';
import { DemoLoginParams, SendSmsParams, UsedFor } from "@/api/data";
import { useTranslation } from 'react-i18next';

type LoginAccountType = 'phone' | 'email';
type LoginValidateType = 'password' | 'verification-code';

type LoginFormValues = {
  phoneNumber: string
  email: string
  password: string
  verificationCode: string
}

export default function LoginScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const toast = useToast()
  const { t } = useTranslation();

  const [loginAccountType, setLoginAccountType] = useState<LoginAccountType>('phone');
  const [loginValidateType, setLoginValidateType] = useState<LoginValidateType>('password');
  const handleLoginValidateTypeSwitch = () => {
    setLoginValidateType(loginValidateType === 'password' ? 'verification-code' : 'password');
  }

  const handleLoginAccountTypeSwitch = () => {
    setLoginAccountType(loginAccountType === 'phone' ? 'email' : 'phone');
    verificationCodeInputItemRef.current?.stopCountdown()
  }

  const { control, handleSubmit, watch } = useForm<LoginFormValues>({
    defaultValues: {
      phoneNumber: '',
      email: '',
      password: '',
      verificationCode: '',
    },
    mode: 'onChange',
  })

  const phoneNumber = watch('phoneNumber')
  const email = watch('email')
  const password = watch('password')
  const verificationCode = watch('verificationCode')

  const phoneInputItemRef = useRef<PhoneInputItemRef>(null)
  const verificationCodeInputItemRef = useRef<VerificationCodeInputItemRef>(null)

  const isFormFilled = useMemo(() => {
    const hasAccount = loginAccountType === 'phone' ? !!phoneNumber?.trim() : !!email?.trim()
    const hasCredential = loginValidateType === 'password' ? !!password?.trim() : !!verificationCode?.trim()
    return hasAccount && hasCredential
  }, [loginAccountType, loginValidateType, phoneNumber, email, password, verificationCode])

  async function handleLogin(values: LoginFormValues) {
    const areaCode = loginAccountType === 'phone' ? phoneInputItemRef.current?.getPhoneCode() : ''
    const params: DemoLoginParams = {}
    if(loginAccountType === 'phone') {
      params.areaCode = areaCode
      params.phoneNumber = values.phoneNumber
    } else {
      params.email = values.email
    }

    if(loginValidateType === 'password') {
      params.password = md5(values.password)
    } else {
      params.verifyCode = values.verificationCode
    }

    try {
      console.log(params)
      const res = await login(params)
      // TODO: store token
      console.log(res)

      navigation.navigate('HomeTabs')
    } catch (error) {
      console.log(error)
      toast.show(t('login.index.toasts.loginFailed'))
    }
  }

  async function handleSendSms() {
    if(loginAccountType === 'phone' && !phoneNumber) {
      toast.show(t('login.index.toasts.enterPhone'))
      return
    }
    if(loginAccountType === 'email' && !email) {
      toast.show(t('login.index.toasts.enterEmail'))
      return
    }
    
    const params: SendSmsParams = { usedFor: UsedFor.Login }
    if(loginAccountType === 'phone') {
      params.phoneNumber = phoneNumber
      params.areaCode = phoneInputItemRef.current?.getPhoneCode() || ''
    } else {
      params.email = email
    }

    try {
      await sendSms(params)
      verificationCodeInputItemRef.current?.startCountdown()
    } catch (error) {
      console.log(error)
      toast.show(t('login.index.toasts.sendCodeFailed'))
    }
  }

  function goRegister() {
    navigation.navigate('Register', { registerMode: loginAccountType });
  }

  function goForgetPassword() {
    navigation.navigate('ForgetPassword', { mode: loginAccountType });
  }

  return (
    <LinearGradientWrap style={styles.container}>
      <View style={styles.topPart}>
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>{t('login.index.welcome')}</Text>
        </View>

        <View style={styles.inputContainer}>
          {
            loginAccountType === 'phone' ?
              <Controller 
                control={control}
                name="phoneNumber" 
                render={({ field: { onChange, onBlur, value } }) => (
                  <PhoneInputItem label={t('login.index.labels.phone')} placeholder={t('login.index.placeholders.phone')} onChangeText={onChange} onBlur={onBlur} value={value} ref={phoneInputItemRef}/>
                )}
              /> :
              <Controller 
                control={control}
                name="email" 
                render={({ field: { onChange, onBlur, value } }) => (
                  <EmailInputItem label={t('login.index.labels.email')} placeholder={t('login.index.placeholders.email')} onChangeText={onChange} onBlur={onBlur} value={value} />
                )}
              /> 
          }
          {
            loginValidateType === 'password' ? 
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <PasswordInputItem label={t('login.index.labels.password')} placeholder={t('login.index.placeholders.password')} onChangeText={onChange} onBlur={onBlur} value={value} />
                )}
              /> :
              <Controller
                control={control}
                name="verificationCode"
                render={({ field: { onChange, onBlur, value } }) => (
                  <VerificationCodeInputItem 
                    ref={verificationCodeInputItemRef}
                    onPressGetCode={handleSendSms}
                    label={t('login.index.labels.verificationCode')}
                    placeholder={t('login.index.placeholders.verificationCode')}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              />
          }
        </View>
        <View style={styles.linkButtonContainer}>
          <LinkButton label={t('login.index.actions.forgotPassword')} onPress={goForgetPassword} variant="gray" style={{ fontSize: 12 }} />
          <LinkButton label={loginValidateType === 'password' ? t('login.index.actions.loginWithCode') : t('login.index.actions.loginWithPassword')} onPress={handleLoginValidateTypeSwitch} style={{ fontSize: 12 }} />
        </View>

        <View style={styles.buttonContainer}>
          <Button disabled={!isFormFilled} style={styles.button} type="primary" onPress={handleSubmit(handleLogin)}>
            {t('login.index.actions.login')}
          </Button>
          <Divider orientation="horizontal" paddingVertical={18} style={{ width: '100%' }}/>
          <Button style={styles.button} onPress={handleLoginAccountTypeSwitch}>
            {loginAccountType === 'phone' ? t('login.index.actions.switchToEmail') : t('login.index.actions.switchToPhone')}
          </Button>
        </View>
      </View>

      <View style={styles.footerContainer}>
        <View style={styles.footerItem}>
          <Text style={styles.footerText}>{t('login.index.tips.noAccount')} </Text>
          <LinkButton label={t('login.index.actions.registerNow')} onPress={goRegister} style={{ fontSize: 12 }}/>
        </View>
        <View>
          <Text style={styles.footerText}>{t('login.index.footerBrand')}</Text>
        </View>
      </View>
    </LinearGradientWrap>
  );
}
