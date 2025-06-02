import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {theme} from '../../constants/colors';

export const CustomInput = ({
  placeholder,
  label,
  onChangeText,
  defaultValue,
  secured,
  disabled,
  isMultiple,
}: {
  placeholder?: string;
  defaultValue?: string;
  onChangeText: (value: string) => void;
  label?: string;
  secured?: boolean;
  disabled?: boolean;
  isMultiple?: boolean;
}) => {
  return (
    <View style={{gap: 5}}>
      {label && <Text>{label}</Text>}
      <TextInput
        style={{
          height: isMultiple ? undefined : 45,
          ...styles.input,
        }}
        defaultValue={defaultValue}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={'#555'}
        secureTextEntry={secured}
        editable={!disabled}
        multiline={isMultiple}
        maxLength={100}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    backgroundColor: theme.card,
    borderRadius: 12,
    color: theme.textPrimary,
    paddingHorizontal: 15,
  },
});
