import React, { FC } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Image } from "expo-image";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { LayoutContainer } from "components/layoutContainer";
import { Button } from "components/button";
import { images } from "core/images";
import { palette } from "core/styles";

import type { BenefitsScreenProps } from "./Benefits.types";
import { styles } from "./Benefits.styles";
import { useBenefitsLogic } from "./useBenefitsLogic";

const Benefits: FC<BenefitsScreenProps> = (props) => {
  const { benefits, handleClose, handleContinue } = useBenefitsLogic(props);

  const renderFeatureIcon = (iconType: string) => {
    switch (iconType) {
      case "heart-circle":
        return (
          <View
            style={[
              styles.featureIconContainer,
              { backgroundColor: palette.GREEN },
            ]}
          >
            <Ionicons name="heart" size={20} color={palette.WHITE} />
          </View>
        );
      case "filter":
        return (
          <View
            style={[
              styles.featureIconContainer,
              { backgroundColor: palette.GREY2 },
            ]}
          >
            <MaterialCommunityIcons
              name="tune-variant"
              size={20}
              color={palette.WHITE}
            />
          </View>
        );
      case "mail-heart":
        return (
          <View
            style={[
              styles.featureIconContainer,
              { backgroundColor: palette.RED2 },
            ]}
          >
            <MaterialCommunityIcons
              name="email-heart-outline"
              size={20}
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
            <Ionicons name="ban" size={20} color={palette.WHITE} />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <LayoutContainer
      highlighted
      edges={["top", "bottom"]}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.headerSection}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Ionicons name="close" size={28} color={palette.WHITE} />
        </TouchableOpacity>

        <Text style={styles.title}>All Benefits</Text>

        <View style={styles.logoContainer}>
          <Image
            source={images.firstClassLogo}
            style={styles.logo}
            contentFit="contain"
          />
        </View>
      </View>

      {/* Content Card */}
      <View style={styles.contentCard}>
        <Text style={styles.planDescription}>
          See all that's included in Diaspora{"\n"}First Class plan
        </Text>

        <ScrollView
          style={styles.featuresList}
          showsVerticalScrollIndicator={false}
        >
          {benefits.map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              {renderFeatureIcon(feature.icon)}
              <Text style={styles.featureText}>{feature.text}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <Button
        title="Continue"
        onPress={handleContinue}
        style={styles.continueButton}
        variant="white"
      />
    </LayoutContainer>
  );
};

export default Benefits;
