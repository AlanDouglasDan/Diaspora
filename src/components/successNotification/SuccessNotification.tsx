import React, { FC, useEffect, useRef } from "react";
import { View, Text, Image } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  runOnJS,
  cancelAnimation,
  Easing,
} from "react-native-reanimated";

import { images } from "core/images";

import type { SuccessNotificationProps } from "./SuccessNotification.types";
import { styles } from "./SuccessNotification.styles";

const SLIDE_DURATION = 400;
const DEFAULT_DISPLAY_DURATION = 5000;

const SuccessNotification: FC<SuccessNotificationProps> = ({
  visible,
  title,
  message,
  duration = DEFAULT_DISPLAY_DURATION,
  onHide,
}) => {
  const translateY = useSharedValue(-120);
  const opacity = useSharedValue(0);
  const onHideRef = useRef(onHide);
  onHideRef.current = onHide;

  useEffect(() => {
    if (visible) {
      // Cancel any previous animations
      cancelAnimation(translateY);
      cancelAnimation(opacity);

      // Reset to start position
      translateY.value = -120;
      opacity.value = 0;

      // Slide in, hold, then slide out using withSequence
      translateY.value = withSequence(
        withTiming(0, {
          duration: SLIDE_DURATION,
          easing: Easing.out(Easing.cubic),
        }),
        withDelay(
          duration,
          withTiming(-120, {
            duration: SLIDE_DURATION,
            easing: Easing.in(Easing.cubic),
          }),
        ),
      );

      opacity.value = withSequence(
        withTiming(1, { duration: SLIDE_DURATION }),
        withDelay(
          duration,
          withTiming(0, { duration: SLIDE_DURATION }, () => {
            if (onHideRef.current) {
              runOnJS(onHideRef.current)();
            }
          }),
        ),
      );
    } else {
      cancelAnimation(translateY);
      cancelAnimation(opacity);
      translateY.value = -120;
      opacity.value = 0;
    }
  }, [visible, duration]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  if (!visible) return null;

  return (
    <Animated.View
      style={[styles.container, animatedStyle]}
      pointerEvents="none"
    >
      <View style={styles.content}>
        <Image source={images.icon} style={styles.icon} resizeMode="contain" />

        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message} numberOfLines={2}>
            {message}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default SuccessNotification;
