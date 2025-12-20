import React, { FC } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome6, Entypo } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";

import { LayoutContainer } from "components/layoutContainer";
import { ProgressBar } from "components/progressBar";
import { layout, palette } from "core/styles";
import type { GenderScreenProps, GenderOption } from "./Gender.types";
import { styles } from "./Gender.styles";
import { useGenderLogic } from "./useGenderLogic";

const GENDER_OPTIONS: { value: GenderOption; label: string }[] = [
  { value: "WOMAN", label: "WOMAN" },
  { value: "MAN", label: "MAN" },
  { value: "NONBINARY", label: "NONBINARY" },
];

const Gender: FC<GenderScreenProps> = (props) => {
  const {
    selectedGender,
    showOnProfile,
    setShowOnProfile,
    handleGoBack,
    handleSelectGender,
    handleSubmit,
    isValid,
  } = useGenderLogic(props);

  return (
    <LayoutContainer>
      <TouchableOpacity onPress={handleGoBack}>
        <Entypo name="chevron-left" size={24} color={palette.BLACK} />
      </TouchableOpacity>

      <ProgressBar progress={3 / 6} style={styles.progressBar} />

      <Text style={styles.title}>How do you identify?</Text>

      <Text style={styles.subtitle}>
        We'll only show your profile to people interested in dating your gender.
      </Text>

      <View style={styles.optionsContainer}>
        {GENDER_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.option,
              selectedGender === option.value && styles.optionSelected,
            ]}
            onPress={() => handleSelectGender(option.value)}
          >
            <Text
              style={[
                styles.optionText,
                selectedGender === option.value && styles.optionTextSelected,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={layout.flex1} />

      <View style={styles.footer}>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={showOnProfile}
            onValueChange={setShowOnProfile}
            color={showOnProfile ? palette.RED : undefined}
            style={{ width: 16, height: 16 }}
          />

          <Text style={styles.checkboxLabel}>Show my gender on my profile</Text>
        </View>

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

export default Gender;
