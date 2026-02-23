import { useCallback } from "react";
import { Dimensions } from "react-native";
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { Gesture } from "react-native-gesture-handler";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
const HORIZONTAL_ACTIVATION_THRESHOLD = 20; // Minimum horizontal movement before activating swipe

interface UseSwipeableCardLogicProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  enabled?: boolean;
}

export const useSwipeableCardLogic = ({
  onSwipeLeft,
  onSwipeRight,
  enabled = true,
}: UseSwipeableCardLogicProps) => {
  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);
  const isHorizontalSwipe = useSharedValue(false);

  const handleSwipeLeft = useCallback(() => {
    onSwipeLeft();
  }, [onSwipeLeft]);

  const handleSwipeRight = useCallback(() => {
    onSwipeRight();
  }, [onSwipeRight]);

  // Programmatic swipe left (dislike)
  const swipeLeft = useCallback(() => {
    translateX.value = withTiming(
      -SCREEN_WIDTH * 1.5,
      { duration: 300 },
      () => {
        runOnJS(handleSwipeLeft)();
        translateX.value = 0;
      },
    );
  }, [handleSwipeLeft, translateX]);

  // Programmatic swipe right (like / superlike)
  const swipeRight = useCallback(() => {
    translateX.value = withTiming(SCREEN_WIDTH * 1.5, { duration: 300 }, () => {
      runOnJS(handleSwipeRight)();
      translateX.value = 0;
    });
  }, [handleSwipeRight, translateX]);

  const panGesture = Gesture.Pan()
    .enabled(enabled)
    .activeOffsetX([
      -HORIZONTAL_ACTIVATION_THRESHOLD,
      HORIZONTAL_ACTIVATION_THRESHOLD,
    ])
    .failOffsetY([-15, 15])
    .onStart(() => {
      startX.value = translateX.value;
      isHorizontalSwipe.value = false;
    })
    .onUpdate((event) => {
      // Only start tracking horizontal movement after exceeding threshold
      if (Math.abs(event.translationX) > HORIZONTAL_ACTIVATION_THRESHOLD) {
        isHorizontalSwipe.value = true;
      }

      if (isHorizontalSwipe.value) {
        translateX.value = startX.value + event.translationX;
      }
    })
    .onEnd(() => {
      if (!isHorizontalSwipe.value) {
        translateX.value = withSpring(0, { damping: 15, stiffness: 150 });
        return;
      }

      if (translateX.value < -SWIPE_THRESHOLD) {
        translateX.value = withTiming(
          -SCREEN_WIDTH * 1.5,
          { duration: 200 },
          () => {
            runOnJS(handleSwipeLeft)();
            translateX.value = 0;
          },
        );
      } else if (translateX.value > SWIPE_THRESHOLD) {
        translateX.value = withTiming(
          SCREEN_WIDTH * 1.5,
          { duration: 200 },
          () => {
            runOnJS(handleSwipeRight)();
            translateX.value = 0;
          },
        );
      } else {
        translateX.value = withSpring(0, { damping: 15, stiffness: 150 });
      }
    });

  const cardStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      [-15, 0, 15],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{ translateX: translateX.value }, { rotate: `${rotate}deg` }],
    };
  });

  const likeOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD],
      [0, 1],
      Extrapolate.CLAMP,
    );
    return { opacity };
  });

  const nopeOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD, 0],
      [1, 0],
      Extrapolate.CLAMP,
    );
    return { opacity };
  });

  return {
    panGesture,
    cardStyle,
    likeOpacity,
    nopeOpacity,
    swipeLeft,
    swipeRight,
  };
};
