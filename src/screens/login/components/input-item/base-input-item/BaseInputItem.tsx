import { Image, Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";
import { clearIconStyles, styles } from './styles';
import { useEffect, useState } from "react";

export type BaseInputItemProps = TextInputProps & {
  label: string;
  noteText?: string;
  error?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export default function BaseInputItem({ label, error, noteText, value: initialValue, onChangeText, left, right, ...props }: BaseInputItemProps) {
  const [value, setValue] = useState(initialValue || '');

  useEffect(() => {
    setValue(initialValue || '');
  }, [initialValue]);

  const handleChangeText = (text: string) => {
    setValue(text);
    onChangeText?.(text);
  };

  const handleClear = () => {
    setValue('');
    onChangeText?.('');
  };

  return (
    <View style={styles.inputItem}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        {left}
        <View style={styles.inputContent}>
          <TextInput 
            {...props} 
            style={[styles.input]} 
            autoCapitalize='none'
            onChangeText={handleChangeText} 
            value={value} 
            underlineColorAndroid="transparent" 
          />
        </View>
        <View style={styles.inputRight}>
          {value.length > 0 && <ClearIconButton onPress={handleClear} />}
          {right}
        </View>
        <View style={styles.noteContainer}>
          {
            error ? 
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.errorText}>{error}</Text> : 
              noteText ? 
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.noteText}>{noteText}</Text> : 
                null
            }
        </View>
      </View>
    </View>
  );
}

function ClearIconButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={require('@/assets/images/login/login_input_close.png')} style={clearIconStyles.clearIcon} />
    </TouchableOpacity>
  );
}
