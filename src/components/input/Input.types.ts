import type { TextInputProps, StyleProp, ViewStyle } from "react-native";

export interface InputProps extends Omit<TextInputProps, "style"> {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  label?: string;
}
