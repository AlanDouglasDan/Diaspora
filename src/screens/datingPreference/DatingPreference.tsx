import React, { FC } from "react";
import { Text, View, TouchableOpacity, Switch } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome6, Entypo } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";

import { LayoutContainer } from "components/layoutContainer";
import { ProgressBar } from "components/progressBar";
import { layout, palette } from "core/styles";
import type {
  DatingPreferenceScreenProps,
  PreferenceOption,
} from "./DatingPreference.types";
import { styles } from "./DatingPreference.styles";
import { useDatingPreferenceLogic } from "./useDatingPreferenceLogic";

const PREFERENCE_OPTIONS: { value: PreferenceOption; label: string }[] = [
  { value: "WOMEN", label: "WOMEN" },
  { value: "MEN", label: "MEN" },
  { value: "NONBINARY", label: "NONBINARY" },
];

const DatingPreference: FC<DatingPreferenceScreenProps> = (props) => {
  const {
    openToEveryone,
    setOpenToEveryone,
    handleGoBack,
    handleTogglePreference,
    isPreferenceSelected,
    handleSubmit,
    isValid,
  } = useDatingPreferenceLogic(props);

  return (
    <LayoutContainer>
      <TouchableOpacity onPress={handleGoBack}>
        <Entypo name="chevron-left" size={24} color={palette.BLACK} />
      </TouchableOpacity>

      <ProgressBar progress={4 / 6} style={styles.progressBar} />

      <Text style={styles.title}>Who Are You Looking to Date?</Text>

      <Text style={styles.subtitle}>
        Let's find your perfect match. Its all about your preference.
      </Text>

      <View style={styles.switchContainer}>
        <Switch
          value={openToEveryone}
          onValueChange={setOpenToEveryone}
          trackColor={{ false: palette.GREY, true: palette.RED }}
          thumbColor={palette.WHITE}
        />

        <Text style={styles.switchLabel}>I'm open to dating everyone</Text>
      </View>

      <View style={styles.optionsContainer}>
        {PREFERENCE_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={styles.option}
            onPress={() => handleTogglePreference(option.value)}
          >
            <Text style={styles.optionText}>{option.label}</Text>

            <Checkbox
              value={isPreferenceSelected(option.value)}
              onValueChange={() => handleTogglePreference(option.value)}
              color={
                isPreferenceSelected(option.value) ? palette.RED : undefined
              }
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>
        ))}
      </View>

      <View style={layout.flex1} />

      <View style={styles.footer}>
        <TouchableOpacity disabled={!isValid} onPress={handleSubmit}>
          <LinearGradient
            colors={[palette.RED2, palette.RED]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={[styles.submitButton, { opacity: isValid ? 1 : 0.5 }]}
          >
            <FontAwesome6 name="arrow-right" size={20} color={palette.WHITE} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LayoutContainer>
  );
};

export default DatingPreference;
