import { Text, View } from "react-native";
import LinearGradientWrap from "../components/LinearGradientWrap";
import Header from "../components/Header";
import { styles } from "./styles";
import {
  EmailInputItem,
  PhoneInputItem,
  PhoneInputItemRef,
  VerificationCodeInputItem,
  VerificationCodeInputItemRef
} from "../components/input-item";
import { useMemo, useRef } from "react";
import { RootStackNavigationProp, RootStackScreenProps } from "@/navigation/types";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@ant-design/react-native";
import { isValidEmail, validatePhoneByCode } from "@/utils/validate";
import { sendSms, verifyCode } from "@/api/login";
import { UsedFor, VerifyCodeParams } from "@/api/data";
import { useToast } from "@/components/Toast";
import { ApiErrCode } from "@/constants/apiErrorCode";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from 'react-i18next';

type FormValues = {
  phoneNumber: string;
  email: string;
  verificationCode: string;
};

export default function ForgetPasswordScreen({ route }: RootStackScreenProps<'ForgetPassword'>) {
  const { mode } = route.params;
  const toast = useToast();
  const navigation = useNavigation<RootStackNavigationProp>();
  const { t } = useTranslation();

  const phoneInputItemRef = useRef<PhoneInputItemRef>(null);
  const verificationCodeInputItemRef = useRef<VerificationCodeInputItemRef>(null);

  const { control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      phoneNumber: '',
      email: '',
      verificationCode: '',
    },
    mode: 'onTouched',
  });

  const phoneNumber = watch('phoneNumber');
  const email = watch('email');
  const verificationCode = watch('verificationCode');

  async function handlePressGetCode() {
    let params = {}
    if(mode === 'phone') {
      if(!phoneNumber) {
        toast.show(t('login.forgetPassword.rules.requiredPhone'))
        return
      }
      const code = phoneInputItemRef.current!.getPhoneCode()
      if(!validatePhoneByCode(code, phoneNumber)) {
        toast.show(t('login.forgetPassword.rules.invalidPhone'))
        return
      }
      params = {
        phoneNumber,
        areaCode: code,
      };
    } else if(mode === 'email') {
      if(!email) {
        toast.show(t('login.forgetPassword.rules.requiredEmail'))
        return
      }
      if(!isValidEmail(email)) {
        toast.show(t('login.forgetPassword.rules.invalidEmail'))
        return
      }
      params = { email };
    }

    try {
      await sendSms({ ...params, usedFor: UsedFor.Modify });
      verificationCodeInputItemRef.current?.startCountdown()
    } catch (error: any) {
      console.log('handlePressGetCode error', error);
      if(error.errCode === ApiErrCode.ACCOUNT_NOT_EXIST) {
        toast.show(t('login.forgetPassword.toasts.accountNotExist'))
        return
      }
      toast.show(t('login.forgetPassword.toasts.sendCodeFailed'))
      return
    }
  }

  async function onSubmit(values: FormValues) {
    let params: VerifyCodeParams = { 
      verifyCode: values.verificationCode,
      usedFor: UsedFor.Modify
    };
    if(mode === 'phone') {
      params = {
        ...params,
        phoneNumber,
        areaCode: phoneInputItemRef.current!.getPhoneCode(),
      }
    } else if(mode === 'email') {
      params = { ...params, email };
    }

    try {
      await verifyCode(params)
      navigation.navigate('ResetPassword', {
        mode,
        phoneNumber: params.phoneNumber,
        areaCode: params.areaCode,
        email: params.email,
        verifyCode: params.verifyCode,
      });
    } catch (error: any) {
      console.log('onSubmit error', error);
      toast.show(t('login.forgetPassword.toasts.verifyFailed'))
      return
    }
  }

  const isValid = useMemo(() => {
    const code = phoneInputItemRef.current?.getPhoneCode() || '+86';
    const hasCode = !!(verificationCode || '').trim();
    if (mode === 'phone') {
      return validatePhoneByCode(code, phoneNumber || '') && hasCode;
    }
    return isValidEmail(email || '') && hasCode;
  }, [mode, phoneNumber, email, verificationCode]);

  function validatePhone(value: string) {
    const val = (value || '').trim();
    if (!val) return t('login.forgetPassword.rules.requiredPhone');
    const code = phoneInputItemRef.current?.getPhoneCode() || '+86';
    return validatePhoneByCode(code, val) || t('login.forgetPassword.rules.invalidPhone');
  }

  function validateEmail(value: string) {
    const val = (value || '').trim();
    if (!val) return t('login.forgetPassword.rules.requiredEmail');
    return isValidEmail(val) || t('login.forgetPassword.rules.invalidEmail');
  }

  function validateVerificationCode(value: string) {
    const val = (value || '').trim();
    if (!val) return t('login.forgetPassword.rules.requiredVerificationCode');
    return true;
  }

  return (
    <LinearGradientWrap>
      <Header />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t('login.forgetPassword.title')}</Text>
      </View>

      <View style={styles.formContainer}>
        {mode === 'phone' ? (
          <Controller
            control={control}
            name="phoneNumber"
            rules={{ validate: validatePhone }}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <PhoneInputItem label={t('login.index.labels.phone')} placeholder={t('login.index.placeholders.phone')} onChangeText={onChange} onBlur={onBlur} value={value} ref={phoneInputItemRef} error={error?.message} />
            )}
          />
        ) : (
          <Controller
            control={control}
            name="email"
            rules={{ validate: validateEmail }}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <EmailInputItem label={t('login.index.labels.email')} placeholder={t('login.index.placeholders.email')} onChangeText={onChange} onBlur={onBlur} value={value} error={error?.message} />
            )}
          />
        )}
        <Controller
          control={control}
          name="verificationCode"
          rules={{ validate: validateVerificationCode }}
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <VerificationCodeInputItem onPressGetCode={handlePressGetCode} ref={verificationCodeInputItemRef} label={t('login.index.labels.verificationCode')} placeholder={t('login.index.placeholders.verificationCode')} onChangeText={onChange} onBlur={onBlur} value={value} error={error?.message} />
          )}
        />
      </View>

      <View>
        <Button disabled={!isValid} type="primary" onPress={handleSubmit(onSubmit)}>{t('login.forgetPassword.actions.next')}</Button>
      </View>
    </LinearGradientWrap>
  )
}
