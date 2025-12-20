import React, { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import { images } from "core/images";
import { palette } from "core/styles";
import { LayoutContainer } from "components/layoutContainer";
import TabNav from "components/tabNav/TabNav";
import { CircularProgress } from "components/circularProgress";
import { PlansTab } from "./components/plansTab";
import { SafetyTab } from "./components/safetyTab";

import { styles } from "./Profile.styles";
import { useProfileLogic } from "./useProfileLogic";
import type { ProfileScreenProps } from "./Profile.types";

const Profile: FC<ProfileScreenProps> = () => {
  const {
    activeTab,
    tabs,
    handleTabChange,
    cardWidth,
    modalVisible,
    selectedPlan,
    handleViewAllFeatures,
    handleCloseModal,
    getModalFeatures,
    userData,
    planItems,
    subscriptionPlans,
    handleOpenSettings,
    handleOpenProfileInfo,
  } = useProfileLogic();

  return (
    <LayoutContainer
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      edges={["top"]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={handleOpenSettings}
        >
          <Ionicons name="settings-outline" size={24} color={palette.BLACK} />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={handleOpenProfileInfo}
          activeOpacity={0.8}
        >
          <CircularProgress
            size={140}
            strokeWidth={6}
            progress={userData.profileCompletion}
          >
            <Image
              source={images.avatar}
              style={styles.avatar}
              contentFit="cover"
            />
          </CircularProgress>

          <View style={styles.editIconContainer}>
            <MaterialCommunityIcons
              name="pencil"
              size={24}
              color={palette.TEXT_COLOR}
            />
          </View>
        </TouchableOpacity>

        <LinearGradient
          colors={[palette.RED2, palette.RED]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.progressBadge}
        >
          <Text style={styles.progressText}>
            {userData.profileCompletion}% Complete
          </Text>
        </LinearGradient>

        <Text style={styles.userName}>
          {userData.name}, {userData.age}
        </Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TabNav tabs={tabs} value={activeTab} onChange={handleTabChange} />
      </View>

      {/* Tab Content */}
      {activeTab === "plans" ? (
        <PlansTab
          cardWidth={cardWidth}
          planItems={planItems}
          subscriptionPlans={subscriptionPlans}
          modalVisible={modalVisible}
          selectedPlan={selectedPlan}
          onViewAllFeatures={handleViewAllFeatures}
          onCloseModal={handleCloseModal}
          getModalFeatures={getModalFeatures}
        />
      ) : (
        <SafetyTab />
      )}
    </LayoutContainer>
  );
};

export default Profile;
