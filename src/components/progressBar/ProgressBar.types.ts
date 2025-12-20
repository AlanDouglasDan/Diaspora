import type { StyleProp, ViewStyle } from "react-native";

export interface ProgressBarProps {
  progress: number; // 0 to 1
  style?: StyleProp<ViewStyle>;
}
