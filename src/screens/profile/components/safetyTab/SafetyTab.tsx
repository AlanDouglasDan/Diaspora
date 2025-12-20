import React, { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { layout, palette } from "core/styles";
import Shield from "components/svg/Shield";
import Padlock from "components/svg/Padlock";
import Verify from "components/svg/Verify";

import type { SafetyTabProps } from "./SafetyTab.types";
import { styles } from "./SafetyTab.styles";
import { useSafetyTabLogic } from "./useSafetyTabLogic";

const SafetyTab: FC<SafetyTabProps> = () => {
  const { safetyOptions, handleOptionPress } = useSafetyTabLogic();

  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case "shield":
        return <Shield />;
      case "verify":
        return <Verify />;
      case "padlock":
        return <Padlock />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {safetyOptions.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[styles.safetyOption, layout.spacedRow]}
          onPress={() => handleOptionPress(option)}
          activeOpacity={0.7}
        >
          <View style={[layout.flexedRow, { gap: 14 }]}>
            {renderIcon(option.iconType)}

            <Text style={styles.text16}>{option.label}</Text>
          </View>

          <FontAwesome5
            name="chevron-right"
            size={16}
            color={palette.TEXT_COLOR}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SafetyTab;
