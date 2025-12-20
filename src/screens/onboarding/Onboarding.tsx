import React, { FC } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Entypo } from "@expo/vector-icons";

import { LayoutContainer } from "components/layoutContainer";
import { Button } from "components/button";
import { images } from "core/images";
import { palette } from "core/styles";
import type { OnboardingScreenProps } from "./Onboarding.types";
import { styles } from "./Onboarding.styles";
import { useOnboardingLogic } from "./useOnboardingLogic";

const Onboarding: FC<OnboardingScreenProps> = (props) => {
  const { handleGoBack, handleContinue } = useOnboardingLogic(props);

  return (
    <LayoutContainer>
      <TouchableOpacity onPress={handleGoBack}>
        <Entypo name="chevron-left" size={24} color={palette.BLACK} />
      </TouchableOpacity>

      <Text style={styles.header}>Welcome to Diaspora</Text>

      <View style={styles.imageWrapper}>
        <Image
          source={images.welcome2}
          style={styles.image}
          contentFit="cover"
        />
        <View style={styles.imageOverlay} />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Let's know you</Text>

        <Text style={styles.subtitle}>
          Tell us about yourself, be as detailed and honest as you can, let's
          meet the real you.
        </Text>

        <Button
          title="Continue"
          style={styles.button}
          onPress={handleContinue}
        />
      </View>
    </LayoutContainer>
  );
};

export default Onboarding;
