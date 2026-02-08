import React, { FC } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import { images } from "core/images";
import { palette } from "core/styles";
import { navigate } from "@/src/navigation/utils";
import { Button } from "components/button";
import { FeaturesModal } from "components/featuresModal";
import LoveLetter from "components/svg/LoveLetter";
import TakeOff from "components/svg/TakeOff";
import SuperLike2 from "components/svg/SuperLike2";

import type { PlansTabProps, PlansTabSubscriptionPlan } from "./PlansTab.types";
import { styles } from "./PlansTab.styles";

const PlansTab: FC<PlansTabProps> = ({
  cardWidth,
  planItems,
  subscriptionPlans,
  modalVisible,
  selectedPlan,
  onViewAllFeatures,
  onCloseModal,
  getModalFeatures,
  onTakeOff,
  isBoosting,
}) => {
  const renderPlanIcon = (id: string) => {
    switch (id) {
      case "love-letter":
        return <LoveLetter />;
      case "super-like":
        return <SuperLike2 />;
      case "take-off":
        return <TakeOff />;
      default:
        return null;
    }
  };

  const renderFeatureIcon = (enabled: boolean) => {
    if (enabled) {
      return <Ionicons name="checkmark" size={18} color={palette.WHITE} />;
    }
    return <Ionicons name="close" size={18} color={palette.WHITE} />;
  };

  const renderSubscriptionCard = ({
    item: plan,
  }: {
    item: PlansTabSubscriptionPlan;
  }) => {
    const cardContent = (
      <>
        {/* Header Logo */}
        <Image
          source={plan.logoImage}
          style={styles.subscriptionLogo}
          contentFit="contain"
        />

        <Text style={styles.subscriptionDescription}>{plan.description}</Text>

        {/* Features Table */}
        <View style={styles.featuresTable}>
          <View style={styles.featuresHeader}>
            <View style={styles.featureNameHeader} />
            <View style={styles.featureColumnHeader}>
              <Text style={styles.featureColumnText}>Free</Text>
            </View>
            <View style={styles.featureColumnHeader}>
              <Text style={styles.featureColumnText}>Included</Text>
            </View>
          </View>

          {plan.features.map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <Text style={styles.featureName}>{feature.name}</Text>
              <View style={styles.featureColumn}>
                {renderFeatureIcon(feature.free)}
              </View>
              <View style={styles.featureColumn}>
                {renderFeatureIcon(feature.included)}
              </View>
            </View>
          ))}

          <TouchableOpacity
            style={styles.viewAllFeatures}
            onPress={() => onViewAllFeatures(plan.id)}
          >
            <Text style={styles.viewAllFeaturesText}>View all features</Text>
          </TouchableOpacity>
        </View>

        {/* Upgrade Button */}
        <Button
          title={plan.buttonText}
          variant="white"
          style={styles.upgradeButton}
          textStyle={styles.text14}
          onPress={() => navigate("Upgrade")}
        />
      </>
    );

    if (plan.useGradient) {
      return (
        <LinearGradient
          colors={[palette.RED2, palette.RED]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.subscriptionCard, { width: cardWidth }]}
        >
          {cardContent}
        </LinearGradient>
      );
    }

    return (
      <View
        style={[
          styles.subscriptionCard,
          {
            width: cardWidth,
            backgroundColor: plan.backgroundColor,
          },
        ]}
      >
        {cardContent}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Plan Items Row */}
      <View style={styles.planItemsRow}>
        {planItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.planItem}
            activeOpacity={0.7}
            onPress={item.id === "take-off" ? onTakeOff : undefined}
            disabled={item.id === "take-off" && isBoosting}
          >
            {item.id === "take-off" && isBoosting ? (
              <ActivityIndicator size="small" color={palette.PINK} />
            ) : (
              renderPlanIcon(item.id)
            )}
            <Text style={styles.planItemLabel}>{item.label}</Text>
            <Text style={styles.planItemCount}>{item.count} left</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Subscription Carousel */}
      <FlatList
        data={subscriptionPlans}
        renderItem={renderSubscriptionCard}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardWidth}
        decelerationRate="fast"
        contentContainerStyle={styles.carouselContentContainer}
        style={styles.carouselContainer}
      />

      {/* Features Modal */}
      <FeaturesModal
        visible={modalVisible}
        onClose={onCloseModal}
        planId={selectedPlan || ""}
        logoImage={images.darkFirstClassLogo}
        features={getModalFeatures()}
      />
    </View>
  );
};

export default PlansTab;
