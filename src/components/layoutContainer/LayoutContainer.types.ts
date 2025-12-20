import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import type { Edge } from "react-native-safe-area-context";

export interface LayoutContainerProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  scrollStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  keyboardAvoidingViewStyle?: StyleProp<ViewStyle>;
  edges?: Edge[];
  scrollEnabled?: boolean;
  showsVerticalScrollIndicator?: boolean;
  keyboardShouldPersistTaps?: "always" | "handled" | "never";
  keyboardBehavior?: "height" | "position" | "padding";
  keyboardVerticalOffset?: number;
  onContentSizeChange?: (contentWidth: number, contentHeight: number) => void;
  footer?: ReactNode;
  highlighted?: boolean;
  stickyHeaderIndices?: number[];
  header?: ReactNode;
  autoScrollToBottom?: boolean;
  gradientColors?: readonly [string, string, ...string[]];
}
