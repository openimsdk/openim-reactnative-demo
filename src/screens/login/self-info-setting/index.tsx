import { Text, View } from "react-native";
import LinearGradientWrap from "../components/LinearGradientWrap";
import Header from "../components/Header";
import { styles } from "./style";
import { BaseInputItem, PasswordInputItem } from "../components/input-item";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@ant-design/react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp, RootStackScreenProps } from "@/navigation/types";
import { register } from "@/api/login";
import { useToast } from "@/components/Toast";
import { ApiErrCode } from "@/constants/apiErrorCode";
import { useTranslation } from 'react-i18next';

export default function SelfInfoSettingScreen({ route }: RootStackScreenProps<'SelfInfoSetting'>) {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { verifyCode, areaCode, phone, email } = route.params;

  const toast = useToast()
  const { t } = useTranslation()

  const { control, handleSubmit, watch, formState: { errors, isValid } } = useForm({
    defaultValues: {
      nickname: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const passwordValue = watch('password');

  const onSubmit = async (values: any) => {
    try {
      await register({
        verifyCode,
        deviceID: '',
        user: {
          nickname: values.nickname,
          password: values.password,
          areaCode: areaCode,
          phoneNumber: phone,
          email: email,
          
          faceURL: '',
          birth: 0,
          gender: 0,
          account: '',
        }
      })
      navigation.navigate('HomeTabs')
    } catch (error: any) {
      if(error.errCode && error.errCode === ApiErrCode.ACCOUNT_REGISTERED) {
        toast.show(t('login.selfInfoSetting.toasts.accountRegistered'))
      } else {
        toast.show(t('login.selfInfoSetting.toasts.registerFailed'))
      }
      return
    }
  };

  return (
    <LinearGradientWrap>
      <Header />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t('login.selfInfoSetting.title')}</Text>
      </View>

      <View style={styles.formContainer}>
        <Controller
          control={control}
          name="nickname"
          rules={{
            required: t('login.selfInfoSetting.rules.requiredNickname'),
            maxLength: { value: 20, message: t('login.selfInfoSetting.rules.nicknameMax') },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <BaseInputItem
              label={t('login.selfInfoSetting.labels.nickname')}
              placeholder={t('login.selfInfoSetting.placeholders.nickname')}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={(errors.nickname?.message as string) || ''}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{
            required: t('login.selfInfoSetting.rules.requiredPassword'),
            minLength: { value: 6, message: t('login.selfInfoSetting.rules.passwordMin') },
            maxLength: { value: 20, message: t('login.selfInfoSetting.rules.passwordMax') },
            validate: (v) => /^(?=.*[A-Za-z])(?=.*\d).{6,20}$/.test(v || '') || t('login.selfInfoSetting.rules.passwordComposition'),
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <PasswordInputItem
              label={t('login.selfInfoSetting.labels.password')}
              placeholder={t('login.selfInfoSetting.placeholders.password')}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              noteText={t('login.selfInfoSetting.notes.passwordRule')}
              error={(errors.password?.message as string) || ''}
            />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: t('login.selfInfoSetting.rules.requiredConfirmPassword'),
            validate: (v) => v === passwordValue || t('login.selfInfoSetting.rules.passwordMismatch'),
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <PasswordInputItem
              label={t('login.selfInfoSetting.labels.confirmPassword')}
              placeholder={t('login.selfInfoSetting.placeholders.confirmPassword')}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={(errors.confirmPassword?.message as string) || ''}
            />
          )}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button type="primary" onPress={handleSubmit(onSubmit)} disabled={!isValid}>
          {t('login.selfInfoSetting.actions.complete')}
        </Button>
      </View>
    </LinearGradientWrap>
  );
}
