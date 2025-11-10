import { Text, View } from "react-native";
import LinearGradientWrap from "../components/LinearGradientWrap";
import Header from "../components/Header";
import { styles } from "./styles";
import { PasswordInputItem } from "../components/input-item";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@ant-design/react-native";
import { isValidPasswordComposition, PASSWORD_MAX, PASSWORD_MIN } from "@/utils/validate";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "@/components/Toast";
import { RootStackNavigationProp, RootStackScreenProps } from "@/navigation/types";
import { modifyPassword } from "@/api/login";
import { useTranslation } from 'react-i18next';

export default function ResetPasswordScreen({ route }: RootStackScreenProps<'ResetPassword'>) {
  const { mode, phoneNumber, areaCode, email, verifyCode } = route.params;
  const navigation = useNavigation<RootStackNavigationProp>();

  const toast = useToast();
  const { t } = useTranslation();

  const { control, handleSubmit, watch, formState: { errors }, getValues } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });
  const passwordValue = watch('password');
  const confirmPasswordValue = watch('confirmPassword');
  const isAllEmpty = !(passwordValue?.trim()) && !(confirmPasswordValue?.trim());

  async function onSubmit(values: any) {
    try {
      await modifyPassword({
        phoneNumber: mode === 'phone' ? phoneNumber : undefined,
        areaCode: mode === 'phone' ? areaCode : undefined,
        email: mode === 'email' ? email : undefined,
        password: values.password,
        verifyCode: verifyCode,
      })
      toast.show(t('login.resetPassword.toasts.success'))
      navigation.popTo('Login')
    } catch (error: any) {
      console.log('onSubmit error', error);
      toast.show(t('login.resetPassword.toasts.failed'))
      return
    }
  }

  return (
    <LinearGradientWrap>
      <Header />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t('login.resetPassword.title')}</Text>
      </View>

      <View style={styles.formContainer}>
        <Controller
          control={control}
          name="password"
          rules={{
            required: t('login.resetPassword.rules.requiredPassword'),
            minLength: { value: PASSWORD_MIN, message: t('login.resetPassword.rules.passwordMin') },
            maxLength: { value: PASSWORD_MAX, message: t('login.resetPassword.rules.passwordMax') },
            validate: v => isValidPasswordComposition(v || '') || t('login.resetPassword.rules.passwordComposition'),
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <PasswordInputItem label={t('login.selfInfoSetting.labels.password')} placeholder={t('login.selfInfoSetting.placeholders.password')} onChangeText={onChange} onBlur={onBlur} value={value} error={(errors as any).password?.message as string} />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: t('login.resetPassword.rules.requiredConfirmPassword'),
            validate: v => (v || '') === (getValues('password') || '') || t('login.resetPassword.rules.passwordMismatch'),
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <PasswordInputItem label={t('login.selfInfoSetting.labels.confirmPassword')} placeholder={t('login.selfInfoSetting.placeholders.confirmPassword')} onChangeText={onChange} onBlur={onBlur} value={value} error={(errors as any).confirmPassword?.message as string} />
          )}
        />
      </View>

      <View>
        <Button type="primary" onPress={handleSubmit(onSubmit)} disabled={isAllEmpty}>{t('login.resetPassword.actions.complete')}</Button>
      </View>
    </LinearGradientWrap>
  );
}
