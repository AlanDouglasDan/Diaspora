import type { ViewStyle } from "react-native";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  value: string | null;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  style?: ViewStyle;
  dropdownPosition?: "auto" | "top" | "bottom";
}
