import React, { FC } from "react";
import { TouchableOpacity, Text, View, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { palette } from "core/styles";
import type { ButtonProps } from "./Button.types";
import { styles } from "./Button.styles";
import { useButtonLogic } from "./useButtonLogic";

const Button: FC<ButtonProps> = (props) => {
  const { title, onPress, loading, prefixIcon, suffixIcon } = props;
  const { isWhite, isDisabled, containerStyle, titleStyle } =
    useButtonLogic(props);

  const renderContent = () => (
    <>
      {loading ? (
        <ActivityIndicator
          color={isWhite ? palette.BLACK : palette.WHITE}
          size="small"
        />
      ) : (
        <>
          {prefixIcon && <View style={styles.prefixIcon}>{prefixIcon}</View>}
          <Text style={titleStyle}>{title}</Text>
          {suffixIcon && <View style={styles.suffixIcon}>{suffixIcon}</View>}
        </>
      )}
    </>
  );

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      {isWhite ? (
        <View style={styles.innerContainer}>{renderContent()}</View>
      ) : (
        <LinearGradient
          colors={[palette.RED2, palette.RED]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.gradient}
        >
          {renderContent()}
        </LinearGradient>
      )}
    </TouchableOpacity>
  );
};

export default Button;
