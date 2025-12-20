import React, { FC } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Image } from "expo-image";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import { Button } from "components/button";
import { images } from "core/images";
import { palette } from "core/styles";

import type { UpgradeSuccessScreenProps } from "./UpgradeSuccess.types";
import { styles } from "./UpgradeSuccess.styles";
import { useUpgradeSuccessLogic } from "./useUpgradeSuccessLogic";

const FEATURES = [
  {
    icon: "filter",
    text: "Advanced filter setting to find your cabin crew",
  },
  {
    icon: "mail-heart",
    text: "Daily cruise time recharge",
  },
  {
    icon: "ban",
    text: "No ads on your timeline",
  },
];

const UpgradeSuccess: FC<UpgradeSuccessScreenProps> = (props) => {
  const { handleClose, handleContinue, handleSeeAllBenefits } =
    useUpgradeSuccessLogic(props);

  const renderFeatureIcon = (iconType: string) => {
    switch (iconType) {
      case "filter":
        return (
          <View
            style={[
              styles.featureIconContainer,
              { backgroundColor: palette.BLACK },
            ]}
          >
            <MaterialCommunityIcons
              name="tune-variant"
              size={24}
              color={palette.WHITE}
            />
          </View>
        );
      case "mail-heart":
        return (
          <View
            style={[
              styles.featureIconContainer,
              { backgroundColor: palette.BLACK },
            ]}
          >
            <MaterialCommunityIcons
              name="tune-variant"
              size={24}
              color={palette.WHITE}
            />
          </View>
        );
      case "ban":
        return (
          <View
            style={[
              styles.featureIconContainer,
              { backgroundColor: palette.RED },
            ]}
          >
            <Ionicons name="ban" size={24} color={palette.WHITE} />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "top"]}>
      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <Ionicons name="close" size={28} color={palette.BLACK} />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={images.upgradeSuccessful}
          style={styles.heroImage}
          contentFit="contain"
        />

        <Text style={styles.title}>
          You've upgraded to{"\n"}Diaspora First Class.{"\n"}Start matching.
        </Text>

        <Text style={styles.subtitle}>
          Advanced filter setting to find your{"\n"}cabin crew
        </Text>

        <LinearGradient
          colors={[palette.RED2, palette.RED]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.logoContainer}
        >
          <Image
            source={images.firstClassLogo}
            style={styles.logo}
            contentFit="contain"
          />
        </LinearGradient>

        {FEATURES.map((feature, index) => (
          <View key={index} style={styles.featureRow}>
            {renderFeatureIcon(feature.icon)}
            <Text style={styles.featureText}>{feature.text}</Text>
          </View>
        ))}

        <TouchableOpacity
          style={styles.seeAllButton}
          onPress={handleSeeAllBenefits}
          activeOpacity={0.7}
        >
          <Text style={styles.seeAllText}>See all benefits</Text>
        </TouchableOpacity>

        <Button
          title="Continue"
          onPress={handleContinue}
          style={styles.continueButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpgradeSuccess;
