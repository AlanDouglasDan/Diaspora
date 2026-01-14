import React, { FC } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StripeProvider } from "@stripe/stripe-react-native";

import { LayoutContainer } from "components/layoutContainer";
import { TabNav } from "components/tabNav";
import { Button } from "components/button";
import { images } from "core/images";
import { palette } from "core/styles";

import type { UpgradeScreenProps, PlanFeature } from "./Upgrade.types";
import { styles } from "./Upgrade.styles";
import { useUpgradeLogic } from "./useUpgradeLogic";

const STRIPE_PUBLISHABLE_KEY =
  process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";

const Upgrade: FC<UpgradeScreenProps> = (props) => {
  const {
    tabs,
    selectedTab,
    currentPlan,
    isLoading,
    handleClose,
    handleTabChange,
    handleUpgrade,
  } = useUpgradeLogic(props);

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

  const renderFeature = (feature: PlanFeature, index: number) => (
    <View key={index} style={styles.featureRow}>
      {renderFeatureIcon(feature.icon)}
      <Text style={styles.featureText}>{feature.text}</Text>
    </View>
  );

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

        <Text style={styles.title}>Need More cruise ?</Text>

        <Text style={styles.subtitle}>
          Don't keep your matches waiting. Join Diaspora{"\n"}premium to start a
          conversation.
        </Text>

        <View style={styles.logoContainer}>
          <Image
            source={images.firstClassLogo}
            style={styles.logo}
            contentFit="contain"
          />
        </View>

        <TabNav
          tabs={tabs}
          value={selectedTab}
          onChange={handleTabChange}
          style={styles.tabContainer}
          indicatorStyle={{ backgroundColor: palette.WHITE }}
          labelStyle={{ color: palette.WHITE }}
          activeLabelStyle={{ color: palette.WHITE }}
        />
      </View>

      {/* Content Card */}
      <View style={styles.contentCard}>
        <Text style={styles.planDescription}>
          See all that's included in Diaspora{"\n"}
          {currentPlan.title} plan
        </Text>

        <ScrollView
          style={styles.featuresList}
          showsVerticalScrollIndicator={false}
        >
          {currentPlan.features.map(renderFeature)}
        </ScrollView>
      </View>

      <Button
        title={isLoading ? "Processing..." : currentPlan.buttonText}
        onPress={handleUpgrade}
        style={styles.upgradeButton}
        variant="white"
        disabled={isLoading}
      />
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={palette.PINK} />
        </View>
      )}
    </LayoutContainer>
  );
};

const UpgradeWithStripe: FC<UpgradeScreenProps> = (props) => {
  return (
    <StripeProvider
      publishableKey={STRIPE_PUBLISHABLE_KEY}
      merchantIdentifier="merchant.com.diaspora.app"
      urlScheme="diaspora"
    >
      <Upgrade {...props} />
    </StripeProvider>
  );
};

export default UpgradeWithStripe;
