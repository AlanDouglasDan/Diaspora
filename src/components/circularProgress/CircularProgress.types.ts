import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export interface CircularProgressProps {
  size: number;
  strokeWidth: number;
  progress: number; // 0 to 100
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}
