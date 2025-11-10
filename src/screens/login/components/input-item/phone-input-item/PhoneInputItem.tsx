import { Image, TouchableOpacity } from "react-native";
import { BaseInputItem, BaseInputItemProps } from "../base-input-item/BaseInputItem";
import { Text } from "react-native";
import { styles } from "./styles";
import { useImperativeHandle, useState } from "react";
import { Picker, PickerProps, PickerValue } from "@ant-design/react-native";
import countryCode from "@/constants/countryCode";
import { useTranslation } from 'react-i18next';

export type PhoneInputItemRef = {
  getPhoneCode: () => string;
}

export type PhoneInputItemProps = BaseInputItemProps & {
  ref?: React.RefObject<PhoneInputItemRef | null>;
}

export function PhoneInputItem({ ref, ...props }: PhoneInputItemProps) {
  const [phoneCode, setPhoneCode] = useState('+86');
  const { t } = useTranslation();

  function handleChangePhoneCode(value: PickerValue[]) {
    setPhoneCode(value[0] as string);
  }

  useImperativeHandle(ref, () => ({
    getPhoneCode: () => phoneCode,
  }));

  return (
    <BaseInputItem {...props} inputMode="tel" left={
      <PhoneInputPicker value={phoneCode} onChange={handleChangePhoneCode} okText={t('login.components.phoneInputPicker.ok')} cancelText={t('login.components.phoneInputPicker.cancel')} />
    }/>
  );
};

const countryCodeData = countryCode.map((item) => ({
  label: item.phone_code,
  value: item.phone_code,
  key: item.english_name,
}))

type PhoneInputPickerProps = {
  value: string;
  onChange: PickerProps['onChange']
  okText: string;
  cancelText: string;
}

function PhoneInputPicker({ value, onChange, okText, cancelText }: PhoneInputPickerProps) {
  return (
    <Picker
      cascade={false}
      cols={1}
      data={countryCodeData}
      value={[value]}
      onChange={onChange}
      okText={okText}
      dismissText={cancelText}
    >
      <TouchableOpacity style={styles.phoneCodeContainer} activeOpacity={0.7}>
        <Text>{value}</Text>
        <Image source={require('@/assets/images/login/arrow_down.png')} style={styles.arrowIcon} resizeMode="contain"/>
      </TouchableOpacity>
    </Picker>
  )
};
