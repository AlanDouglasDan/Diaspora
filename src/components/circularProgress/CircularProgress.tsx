import React, { FC } from "react";
import { Animated, View } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";

import { styles } from "./CircularProgress.styles";
import { useCircularProgressLogic } from "./useCircularProgressLogic";
import type { CircularProgressProps } from "./CircularProgress.types";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgress: FC<CircularProgressProps> = ({
  size,
  strokeWidth,
  progress,
  children,
  style,
}) => {
  const { radius, circumference, animatedStrokeDashoffset } =
    useCircularProgressLogic({
      size,
      strokeWidth,
      progress,
    });

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <Svg width={size} height={size} style={styles.svg}>
        <Defs>
          <LinearGradient
            id="progressGradient"
            x1="0%"
            y1="100%"
            x2="0%"
            y2="0%"
          >
            <Stop offset="0%" stopColor="#CF0018" />
            <Stop offset="100%" stopColor="#FF7578" />
          </LinearGradient>
        </Defs>
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E5E5"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle - starts at 6 o'clock (bottom) and goes clockwise */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={animatedStrokeDashoffset}
          strokeLinecap="round"
          rotation="90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={styles.childrenContainer}>{children}</View>
    </View>
  );
};

export default CircularProgress;
