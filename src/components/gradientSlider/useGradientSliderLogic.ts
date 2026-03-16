import { useCallback, useRef, useState, useMemo } from "react";
import { PanResponder, LayoutChangeEvent } from "react-native";

import type { GradientSliderProps } from "./GradientSlider.types";

export const useGradientSliderLogic = (props: GradientSliderProps) => {
  const {
    value,
    onValueChange,
    minimumValue = 0,
    maximumValue = 100,
    step = 1,
    valueFormatter,
    isRange = false,
  } = props;

  const [trackWidth, setTrackWidth] = useState(0);
  const activeThumb = useRef<"min" | "max" | null>(null);

  const getValues = useCallback((): [number, number] => {
    if (isRange && Array.isArray(value)) {
      return value;
    }
    return [minimumValue, typeof value === "number" ? value : maximumValue];
  }, [value, isRange, minimumValue, maximumValue]);

  const [minVal, maxVal] = getValues();

  const valueToPosition = useCallback(
    (val: number) => {
      if (trackWidth === 0) return 0;
      const range = maximumValue - minimumValue;
      return ((val - minimumValue) / range) * trackWidth;
    },
    [minimumValue, maximumValue, trackWidth],
  );

  const positionToValue = useCallback(
    (position: number) => {
      if (trackWidth === 0) return minimumValue;
      const range = maximumValue - minimumValue;
      const rawValue = (position / trackWidth) * range + minimumValue;
      const steppedValue = Math.round(rawValue / step) * step;
      return Math.max(minimumValue, Math.min(maximumValue, steppedValue));
    },
    [minimumValue, maximumValue, step, trackWidth],
  );

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    setTrackWidth(event.nativeEvent.layout.width);
  }, []);

  const createPanResponder = useCallback(
    (thumbType: "min" | "max") =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          activeThumb.current = thumbType;
        },
        onPanResponderMove: (_, gestureState) => {
          if (trackWidth === 0) return;

          const currentPos =
            thumbType === "min"
              ? valueToPosition(minVal)
              : valueToPosition(maxVal);
          const newPos = Math.max(
            0,
            Math.min(trackWidth, currentPos + gestureState.dx),
          );
          const newValue = positionToValue(newPos);

          if (isRange) {
            if (thumbType === "min") {
              const clampedValue = Math.min(newValue, maxVal - step);
              onValueChange([clampedValue, maxVal]);
            } else {
              const clampedValue = Math.max(newValue, minVal + step);
              onValueChange([minVal, clampedValue]);
            }
          } else {
            onValueChange(newValue);
          }
        },
        onPanResponderRelease: () => {
          activeThumb.current = null;
        },
      }),
    [
      trackWidth,
      valueToPosition,
      positionToValue,
      minVal,
      maxVal,
      step,
      isRange,
      onValueChange,
    ],
  );

  const minPanResponder = useMemo(
    () => createPanResponder("min"),
    [createPanResponder],
  );
  const maxPanResponder = useMemo(
    () => createPanResponder("max"),
    [createPanResponder],
  );

  const formatValue = useCallback(() => {
    if (valueFormatter) {
      return valueFormatter(isRange ? [minVal, maxVal] : maxVal);
    }
    if (isRange) {
      return `${minVal} - ${maxVal}`;
    }
    return `${maxVal}`;
  }, [valueFormatter, isRange, minVal, maxVal]);

  const minThumbPos = valueToPosition(minVal);
  const maxThumbPos = valueToPosition(maxVal);

  return {
    trackWidth,
    minVal,
    maxVal,
    minThumbPos,
    maxThumbPos,
    handleLayout,
    minPanResponder,
    maxPanResponder,
    formatValue,
    isRange,
  };
};
