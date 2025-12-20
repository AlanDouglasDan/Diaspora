import React, { FC } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";

import styles from "./TabNav.styles";
import { useTabNavLogic } from "./useTabNavLogic";
import { TabNavProps } from "./TabNav.types";

const TabNav: FC<TabNavProps> = ({
  tabs,
  value,
  onChange,
  style,
  labelStyle,
  activeLabelStyle,
  indicatorStyle,
}) => {
  const { activeIndex, onContainerLayout, translateX, indicatorW, tabWidth } =
    useTabNavLogic({ tabs, value });

  return (
    <View style={[styles.container, style]}>
      <View style={styles.row} onLayout={onContainerLayout}>
        {tabWidth > 0 && (
          <Animated.View
            style={[
              styles.indicator,
              { width: indicatorW, transform: [{ translateX }] },
              indicatorStyle,
            ]}
          />
        )}

        {tabs.map((t, i) => {
          const isActive = i === activeIndex;
          return (
            <TouchableOpacity
              key={t.value}
              activeOpacity={0.7}
              style={[styles.tabItem, { flex: 1, alignItems: "center" }]}
              onPress={() => {
                if (t.value !== value) {
                  onChange?.(t.value);
                }
              }}
            >
              <Text
                style={[
                  styles.label,
                  labelStyle,
                  isActive && styles.labelActive,
                  isActive && activeLabelStyle,
                ]}
              >
                {t.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default TabNav;
