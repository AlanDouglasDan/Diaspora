import type { ViewStyle } from "react-native";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  value: string | string[] | null;
  onChange: (value: string | string[]) => void;
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  style?: ViewStyle;
  dropdownPosition?: "auto" | "top" | "bottom";
  multiple?: boolean;
}
