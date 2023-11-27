import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

type InputProps = {
  placeholder: string;
  onChangeText: (text: string) => void;
  value?: string;
  secureTextEntry?: boolean;
  handleOnSubmit: () => void;
};

const Input: React.FC<InputProps> = ({
  placeholder,
  onChangeText,
  value,
  secureTextEntry,
  handleOnSubmit,
}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      autoFocus={true}
      secureTextEntry={secureTextEntry}
      onSubmitEditing={handleOnSubmit}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default Input;
