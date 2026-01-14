import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BaseToast, BaseToastProps } from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

import { palette, typography } from "./styles";

const CustomToast = ({
  props,
  iconName,
  iconColor,
  borderColor,
  backgroundColor,
}: {
  props: BaseToastProps;
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  borderColor: string;
  backgroundColor: string;
}) => (
  <BaseToast
    {...props}
    style={[
      styles.toastContainer,
      {
        borderLeftColor: borderColor,
        backgroundColor,
      },
    ]}
    contentContainerStyle={styles.contentContainer}
    text1Style={styles.title}
    text2Style={styles.description}
    text1NumberOfLines={0}
    text2NumberOfLines={0}
    renderLeadingIcon={() => (
      <View style={styles.iconContainer}>
        <Ionicons name={iconName} size={24} color={iconColor} />
      </View>
    )}
  />
);

export const toastConfig = {
  success: (props: BaseToastProps) => (
    <CustomToast
      props={props}
      iconName="checkmark-circle"
      iconColor={palette.SUCCESS}
      borderColor={palette.SUCCESS}
      backgroundColor={palette.LIGHT_GREEN}
    />
  ),

  info: (props: BaseToastProps) => (
    <CustomToast
      props={props}
      iconName="information-circle"
      iconColor={palette.BLUE}
      borderColor={palette.BLUE}
      backgroundColor={palette.WHITE}
    />
  ),

  error: (props: BaseToastProps) => (
    <CustomToast
      props={props}
      iconName="close-circle"
      iconColor={palette.RED}
      borderColor={palette.RED}
      backgroundColor={palette.WHITE}
    />
  ),
};

const styles = StyleSheet.create({
  toastContainer: {
    borderLeftWidth: 5,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    width: "90%",
    marginTop: 30,
    shadowColor: palette.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  contentContainer: {
    paddingHorizontal: 12,
    flex: 1,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 4,
  },
  title: {
    ...typography.header14,
    color: palette.BLACK,
    marginBottom: 4,
  },
  description: {
    ...typography.text12,
    color: palette.BLACK,
    lineHeight: 18,
  },
});
