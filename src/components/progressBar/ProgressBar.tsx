import React, { FC } from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { palette } from "core/styles";
import type { ProgressBarProps } from "./ProgressBar.types";
import { styles } from "./ProgressBar.styles";

const ProgressBar: FC<ProgressBarProps> = ({ progress, style }) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 1);

  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        colors={[palette.RED2, palette.RED]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={[styles.fill, { width: `${clampedProgress * 100}%` }]}
      />
    </View>
  );
};

export default ProgressBar;
