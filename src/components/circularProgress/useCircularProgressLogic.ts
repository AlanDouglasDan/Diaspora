import { useEffect, useRef } from "react";
import { Animated } from "react-native";

import type { CircularProgressProps } from "./CircularProgress.types";

export const useCircularProgressLogic = ({
  size,
  strokeWidth,
  progress,
}: Pick<CircularProgressProps, "size" | "strokeWidth" | "progress">) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Animated value for the progress
  const animatedProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate from 0 to the target progress
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [progress, animatedProgress]);

  // Interpolate the animated value to strokeDashoffset
  const animatedStrokeDashoffset = animatedProgress.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  return {
    radius,
    circumference,
    animatedStrokeDashoffset,
  };
};
