import LinearGradientWrap from '../components/LinearGradientWrap'
import Header from '../components/Header'
import { Text, View } from 'react-native'
import { PhoneInputItem, EmailInputItem } from '../components/input-item'
import { Button } from '@ant-design/react-native'
import { styles } from './style'
import { useRef } from 'react'
import { isValidEmail, validatePhoneByCode } from '@/utils/validate'
import { useNavigation } from '@react-navigation/native'
import { RootStackNavigationProp, RootStackScreenProps } from '@/navigation/types'
import { PhoneInputItemRef } from '../components/input-item/phone-input-item/PhoneInputItem'
import { Controller, useForm } from 'react-hook-form'
import { sendSms } from '@/api/login'
import { UsedFor } from '@/api/data'
import { useToast } from '@/components/Toast'
import { useTranslation } from 'react-i18next'

type FormValues = {
  phone: string
  email: string
}

export default function RegisterScreen({ route }: RootStackScreenProps<'Register'>) {
  const navigation = useNavigation<RootStackNavigationProp>()
  const { registerMode } = route.params

  const toast = useToast()
  const { t } = useTranslation()

  const phoneInputItemRef = useRef<PhoneInputItemRef>(null)

  const {
    control,
    handleSubmit,
    // clearErrors,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: { phone: '', email: '' },
  })

  // useEffect(() => {
  //   // When switching mode, we could clear errors and keep values independent
  //   clearErrors()
  // }, [registerMode, clearErrors])

  const onSubmit = (values: FormValues) => {
    // After submitting, send a verification code and navigate to next step
    try {
      sendSms({
        areaCode: registerMode === 'phone' ? phoneInputItemRef.current!.getPhoneCode() : undefined,
        phoneNumber: registerMode === 'phone' ? values.phone : undefined,
        email: registerMode === 'email' ? values.email : undefined,
        usedFor: UsedFor.Register,
      })
    } catch (error) {
      toast.show(t('login.register.toasts.sendCodeFailed'))
      return
    }    

    navigation.navigate('VerifyCode', {
      registerMode,
      areaCode: registerMode === 'phone' ? phoneInputItemRef.current!.getPhoneCode() : undefined,
      phone: registerMode === 'phone' ? values.phone : undefined,
      email: registerMode === 'email' ? values.email : undefined,
    })
  }

  function validatePhone(value: string) {
    const code = phoneInputItemRef.current!.getPhoneCode()
    return validatePhoneByCode(code, value) || t('login.register.rules.invalidPhone')
  }

  function validateEmail(value: string) {
    return isValidEmail(value) || t('login.register.rules.invalidEmail')
  }

  return (
    <LinearGradientWrap>
      <Header />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t('login.register.title')}</Text>
      </View>

      <View style={styles.inputContainer}>
        {registerMode === 'phone' ? (
          <Controller
            control={control}
            name="phone"
            rules={{ required: t('login.register.rules.requiredPhone'), validate: validatePhone }}
            render={({ field: { onChange, onBlur, value } }) => (
              <PhoneInputItem
                ref={phoneInputItemRef}
                label={t('login.register.labels.phone')}
                placeholder={t('login.register.placeholders.phone')}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.phone?.message}
              />
            )}
          />
        ) : (
          <Controller
            control={control}
            name="email"
            rules={{ required: t('login.register.rules.requiredEmail'), validate: validateEmail }}
            render={({ field: { onChange, onBlur, value } }) => (
              <EmailInputItem
                label={t('login.register.labels.email')}
                placeholder={t('login.register.placeholders.email')}
                inputMode="email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.email?.message}
              />
            )}
          />
        )}
      </View>

      <Button
        type="primary"
        disabled={registerMode === 'phone' ? !watch('phone') : !watch('email')}
        onPress={handleSubmit(onSubmit)}
      >
        {t('login.register.actions.next')}
      </Button>
    </LinearGradientWrap>
  );
}
