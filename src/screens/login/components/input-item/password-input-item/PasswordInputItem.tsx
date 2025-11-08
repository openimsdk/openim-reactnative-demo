import BaseInputItem, { BaseInputItemProps } from "../base-input-item/BaseInputItem";
import { Image, TouchableHighlight } from "react-native";
import { useEffect, useState } from "react";
import { eyeIconStyles } from "./styles";

export type PasswordInputItemProps = BaseInputItemProps

export default function PasswordInputItem({ ...props }: PasswordInputItemProps) {
  const [value, setValue] = useState(props.value || '');

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (props.value?.length) {
      setValue(props.value);
    } else {
      setValue('');
    }
  }, [props.value]);

  function handleChangeText(text: string) {
    setValue(text);
    props.onChangeText?.(text);
  }

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <BaseInputItem
      {...props}
      value={value}
      onChangeText={handleChangeText}
      right={<EyeIconButton showPassword={showPassword} onPress={handleShowPassword} />}
      inputMode="text"
      secureTextEntry={!showPassword}
    />
  );
}

function EyeIconButton({ showPassword, onPress }: { showPassword: boolean, onPress: () => void }) {
  return (
    <TouchableHighlight onPress={onPress} underlayColor="transparent">
      <Image source={showPassword ? require('@/assets/images/login/eye_open.png') : require('@/assets/images/login/eye_close.png')} style={eyeIconStyles.eyeIcon} />
    </TouchableHighlight>
  );
}