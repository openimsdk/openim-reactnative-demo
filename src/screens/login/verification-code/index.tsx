import { Text, View } from "react-native";
import LinearGradientWrap from "../components/LinearGradientWrap";
import Header from "../components/Header";
import { styles } from "./style";
import { RootStackNavigationProp, RootStackScreenProps } from "@/navigation/types";
import OtpInput from "../components/OtpInput";
import { useTimeCount } from "@/hooks/useTimeCount";
import LinkButton from "@/components/LinkButton";
import { useNavigation } from "@react-navigation/native";
import { sendSms, verifyCode } from "@/api/login";
import { UsedFor } from "@/api/data";
import { useToast } from "@/components/Toast";
import { useTranslation } from 'react-i18next';

export default function VerifyCodeScreen({ route }: RootStackScreenProps<'VerifyCode'>) {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { registerMode, areaCode, phone, email } = route.params;

  const toast = useToast();
  const { t } = useTranslation();

  const { isCounting, timeCount, startCountdown } = useTimeCount(60, { autoStart: true });
  
  const handleGetVerificationCode = () => {
    try {
      sendSms({
        areaCode,
        phoneNumber: phone,
        email,
        usedFor: UsedFor.Register,
      })
      startCountdown();
    } catch (error) {
      toast.show(t('login.verifyCode.toasts.sendCodeFailed'))
    }    
  };

  async function handleOtpFilled(value: string) {
    try {
      await verifyCode({
        areaCode,
        phoneNumber: phone,
        email,
        verifyCode: value,
        usedFor: UsedFor.Register,
      })
      navigation.navigate('SelfInfoSetting', {
        verifyCode: value,
        areaCode,
        phone,
        email,
      });
    } catch (error) {
      toast.show(t('login.verifyCode.toasts.invalidCode'))
      return
    }
  };

  return (
    <LinearGradientWrap>
      <Header />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t('login.verifyCode.title')}</Text>
        <Text style={styles.subtitle}>
          {registerMode === 'phone' ? `${areaCode} ${phone}` : email}
        </Text>
      </View>

      <View style={styles.otpInputContainer}>
        <OtpInput length={6} boxSize={'15%'} onFilled={handleOtpFilled}/>
      </View>

      <View style={styles.timeCountContainer}>
        {isCounting ? (
          <Text style={styles.timeCount}>{timeCount}s</Text>
        ) : (
          <LinkButton label={t('login.verifyCode.actions.resend')} onPress={handleGetVerificationCode} variant="primary" />
        )}
      </View>
    </LinearGradientWrap>
  );
}
