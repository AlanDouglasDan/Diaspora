import React, { FC } from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { palette } from "core/styles";

import type { GradientSliderProps } from "./GradientSlider.types";
import { styles } from "./GradientSlider.styles";
import { useGradientSliderLogic } from "./useGradientSliderLogic";

const GradientSlider: FC<GradientSliderProps> = (props) => {
  const { label, showValue = true, style } = props;

  const {
    trackWidth,
    minThumbPos,
    maxThumbPos,
    handleLayout,
    minPanResponder,
    maxPanResponder,
    formatValue,
    isRange,
  } = useGradientSliderLogic(props);

  return (
    <View style={[styles.container, style]}>
      {(label || showValue) && (
        <View style={styles.labelRow}>
          {label && <Text style={styles.label}>{label}</Text>}
          {showValue && <Text style={styles.valueText}>{formatValue()}</Text>}
        </View>
      )}

      <View style={styles.sliderContainer} onLayout={handleLayout}>
        <View style={styles.track}>
          <View style={styles.trackBackground} />
          <LinearGradient
            colors={[palette.RED2, palette.RED]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[
              styles.trackGradient,
              {
                left: isRange ? minThumbPos : 0,
                right: trackWidth - maxThumbPos,
              },
            ]}
          />
        </View>

        {isRange && (
          <LinearGradient
            colors={[palette.RED2, palette.RED]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={[
              styles.thumb,
              {
                left: minThumbPos - 12,
              },
            ]}
            {...minPanResponder.panHandlers}
          />
        )}

        <LinearGradient
          colors={[palette.RED2, palette.RED]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={[
            styles.thumb,
            {
              left: maxThumbPos - 12,
            },
          ]}
          {...maxPanResponder.panHandlers}
        />
      </View>
    </View>
  );
};

export default GradientSlider;
