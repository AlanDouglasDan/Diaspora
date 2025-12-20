import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, LayoutChangeEvent } from "react-native";

export type TabItem = {
  label: string;
  value: string;
};

export function useTabNavLogic(params: { tabs: TabItem[]; value: string }) {
  const { tabs, value } = params;

  const [containerWidth, setContainerWidth] = useState(0);
  const activeIndex = Math.max(0, tabs.findIndex((t) => t.value === value));

  const tabWidth = useMemo(() => {
    return containerWidth > 0 && tabs.length > 0
      ? containerWidth / tabs.length
      : 0;
  }, [containerWidth, tabs.length]);

  const translateX = useRef(new Animated.Value(0)).current;
  const indicatorW = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!tabWidth) return;

    Animated.parallel([
      Animated.timing(indicatorW, {
        toValue: tabWidth,
        duration: 180,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }),
      Animated.timing(translateX, {
        toValue: tabWidth * activeIndex,
        duration: 220,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }),
    ]).start();
  }, [activeIndex, tabWidth, indicatorW, translateX]);

  const onContainerLayout = (e: LayoutChangeEvent) => {
    setContainerWidth(e.nativeEvent.layout.width);
  };

  return {
    activeIndex,
    onContainerLayout,
    translateX,
    indicatorW,
    tabWidth,
  };
}
