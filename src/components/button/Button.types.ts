import { ReactNode } from "react";
import { StyleProp, ViewStyle, TextStyle } from "react-native";

export type ButtonVariant = "default" | "white";

export interface ButtonProps {
  title: string;
  variant?: ButtonVariant;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}
