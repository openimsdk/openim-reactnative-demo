import { StyleProp, StyleSheet, Text, TouchableHighlight, View, ViewStyle } from "react-native";
import BottomSheet, { BottomSheetProps } from "./BottomSheet";
import { theme } from "@/styles/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

export type BottomSheetButtonGroupProps = Omit<BottomSheetProps, 'children'> & {
  buttons: {
    label: string;
    onPress: () => void;
  }[];
  cancelButtonLabel?: string;
}

export default function BottomSheetButtonGroup({ buttons, cancelButtonLabel, ...restProps }: BottomSheetButtonGroupProps) {
  const inset = useSafeAreaInsets();
  const { t } = useTranslation();

  return (
    <BottomSheet {...restProps} contentStyle={{
      paddingBottom: inset.bottom + 16,
      paddingHorizontal: 16,
    }}>
      <View style={styles.buttonGroup}>
        {buttons.map((button, index) => (
          <BottomSheetButton 
            key={button.label}
            label={button.label}
            onPress={() => {
              button.onPress()
              restProps.onRequestClose()
            }}
            style={index > 0 ? styles.buttonBorder : undefined}
          />
        ))}
      </View>

      <View style={styles.cancelButtonContainer}>
        <BottomSheetButton
          label={cancelButtonLabel || t('common.cancel')}
          onPress={() => restProps.onRequestClose()}
          style={styles.cancelButton}
        />
      </View>
    </BottomSheet>
  );
}

type BottomSheetButtonProps = {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

function BottomSheetButton({ label, onPress, style }: BottomSheetButtonProps) {
  return (
    <TouchableHighlight onPress={onPress} underlayColor={theme.colors.gray400}>
      <View style={[styles.button, style]}>
        <Text>{label}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 4,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 17,
  },
  buttonBorder: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray300,
  },
  cancelButtonContainer: {
    marginTop: 8,
  },
  cancelButton: {
    borderRadius: 4,
  },
})
