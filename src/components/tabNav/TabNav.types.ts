import { StyleProp, TextStyle, ViewStyle } from "react-native";

export type TabItem = {
  label: string;
  value: string;
};

export interface TabNavProps {
  tabs: TabItem[];
  value: string;
  onChange?: (value: string) => void;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  activeLabelStyle?: StyleProp<TextStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
}
