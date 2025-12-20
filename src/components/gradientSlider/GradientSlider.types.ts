import type { ViewStyle } from "react-native";

export interface GradientSliderProps {
  value: number | [number, number];
  onValueChange: (value: number | [number, number]) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  label?: string;
  showValue?: boolean;
  valueFormatter?: (value: number | [number, number]) => string;
  style?: ViewStyle;
  isRange?: boolean;
}
