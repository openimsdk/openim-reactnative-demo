import LinkButton from "@/components/LinkButton";
import { BaseInputItem, BaseInputItemProps } from "../base-input-item/BaseInputItem";
import { StyleSheet, Text } from "react-native";
import { useTimeCount } from "@/hooks/useTimeCount";
import { theme } from "@/styles/theme";
import { useImperativeHandle } from "react";
import { useTranslation } from 'react-i18next';

export type VerificationCodeInputItemRef = {
  startCountdown: () => void,
  stopCountdown: () => void,
}

export type VerificationCodeInputItemProps = BaseInputItemProps & {
  onPressGetCode?: () => void,
  ref?: React.RefObject<VerificationCodeInputItemRef | null>,
}

/**
 * Verification code input item. Shows a countdown or a button on the right.
 */
export function VerificationCodeInputItem({ onPressGetCode, ref, ...props }: VerificationCodeInputItemProps) {
  const { isCounting, timeCount, startCountdown, stopCountdown } = useTimeCount(60);
  const { t } = useTranslation();

  useImperativeHandle(ref, () => ({
    startCountdown: () => startCountdown(),
    stopCountdown: () => stopCountdown(),
  }));

  return (
    <BaseInputItem {...props} inputMode="numeric" right={
      isCounting ? (
        <Text style={styles.timeCount}>{timeCount}s</Text>
      ) : (
        <LinkButton label={t('login.components.verificationCodeInputItem.getCode')} onPress={onPressGetCode} variant="primary" />
      )
    }/>
  );
}

const styles = StyleSheet.create({
  timeCount: {
    color: theme.colors.primary,
    fontSize: 16,
  },
});
