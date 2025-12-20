import React, { FC } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome6, Entypo } from "@expo/vector-icons";

import { LayoutContainer } from "components/layoutContainer";
import { ProgressBar } from "components/progressBar";
import { layout, palette } from "core/styles";
import type { InterestsScreenProps } from "./Interests.types";
import { styles } from "./Interests.styles";
import { useInterestsLogic, INTERESTS_DATA } from "./useInterestsLogic";

const Interests: FC<InterestsScreenProps> = (props) => {
  const {
    handleGoBack,
    handleToggleInterest,
    isInterestSelected,
    handleSkip,
    handleSubmit,
    isValid,
  } = useInterestsLogic(props);

  return (
    <LayoutContainer>
      <TouchableOpacity onPress={handleGoBack}>
        <Entypo name="chevron-left" size={24} color={palette.BLACK} />
      </TouchableOpacity>

      <ProgressBar progress={5 / 6} style={styles.progressBar} />

      <Text style={styles.title}>Your interest</Text>

      <Text style={styles.subtitle}>
        What are you passionate about? Pick a few things you enjoy. Potential
        matches want to know!
      </Text>

      <View style={styles.interestsContainer}>
        {INTERESTS_DATA.map((interest) => (
          <TouchableOpacity
            key={interest.id}
            style={[
              styles.interestChip,
              isInterestSelected(interest.id) && styles.interestChipSelected,
            ]}
            onPress={() => handleToggleInterest(interest.id)}
          >
            <Text style={styles.interestEmoji}>{interest.emoji}</Text>
            <Text
              style={[
                styles.interestLabel,
                isInterestSelected(interest.id) && styles.interestLabelSelected,
              ]}
            >
              {interest.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={layout.flex1} />

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

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

export default Interests;
