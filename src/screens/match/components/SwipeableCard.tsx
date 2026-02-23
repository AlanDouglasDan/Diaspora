import React, { forwardRef, useImperativeHandle } from "react";
import { Text } from "react-native";
import Animated from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";

import { styles } from "./SwipeableCard.styles";
import { useSwipeableCardLogic } from "./useSwipeableCardLogic";
import type {
  SwipeableCardProps,
  SwipeableCardRef,
} from "./SwipeableCard.types";

const SwipeableCard = forwardRef<SwipeableCardRef, SwipeableCardProps>(
  ({ children, onSwipeLeft, onSwipeRight, enabled = true }, ref) => {
    const {
      panGesture,
      cardStyle,
      likeOpacity,
      nopeOpacity,
      swipeLeft,
      swipeRight,
    } = useSwipeableCardLogic({
      onSwipeLeft,
      onSwipeRight,
      enabled,
    });

    useImperativeHandle(ref, () => ({
      swipeLeft,
      swipeRight,
    }));

    return (
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.container, cardStyle]}>
          {children}

          <Animated.View
            style={[styles.labelContainer, styles.likeLabel, likeOpacity]}
          >
            <Text style={[styles.labelText, styles.likeLabelText]}>LIKE</Text>
          </Animated.View>

          <Animated.View
            style={[styles.labelContainer, styles.nopeLabel, nopeOpacity]}
          >
            <Text style={[styles.labelText, styles.nopeLabelText]}>NOPE</Text>
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    );
  },
);

export default SwipeableCard;
