import React from "react";
import { Text } from "react-native";
import Animated from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";

import { styles } from "./SwipeableCard.styles";
import { useSwipeableCardLogic } from "./useSwipeableCardLogic";
import type { SwipeableCardProps } from "./SwipeableCard.types";

const SwipeableCard: React.FC<SwipeableCardProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  enabled = true,
}) => {
  const { panGesture, cardStyle, likeOpacity, nopeOpacity } =
    useSwipeableCardLogic({
      onSwipeLeft,
      onSwipeRight,
      enabled,
    });

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
};

export default SwipeableCard;
