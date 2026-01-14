import React, { FC } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { palette } from "core/styles";
import { LayoutContainer } from "components/layoutContainer";
import { Button } from "components/button";

import type { EditInterestsScreenProps } from "./EditInterests.types";
import { styles } from "./EditInterests.styles";
import { useEditInterestsLogic } from "./useEditInterestsLogic";

const EditInterests: FC<EditInterestsScreenProps> = (props) => {
  const {
    interests,
    selectedInterests,
    toggleInterest,
    isSelected,
    toggleShowAll,
    showAll,
    hasMoreInterests,
    interestsLoading,
    isLoading,
    handleSave,
  } = useEditInterestsLogic(props);

  return (
    <LayoutContainer style={styles.container} edges={["bottom"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.pageTitle}>Things that interest you</Text>

        {/* Your Interests Section - only show when there are selected interests */}
        {selectedInterests.length > 0 && (
          <View style={styles.yourInterestsSection}>
            <Text style={styles.yourInterestsTitle}>Your interests</Text>
            <View style={styles.selectedInterestsWrap}>
              {selectedInterests.map((interest) => (
                <TouchableOpacity
                  key={interest.id}
                  style={styles.interestChip}
                  onPress={() => toggleInterest(interest)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.interestEmoji}>{interest.emoji}</Text>

                  <Text style={styles.interestLabel}>{interest.label}</Text>

                  <Ionicons
                    name="close-circle"
                    size={20}
                    color={palette.BLACK}
                    style={styles.interestIcon}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* All Interests Section */}
        {interestsLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={palette.RED2} />
            <Text style={styles.loadingText}>Loading interests...</Text>
          </View>
        ) : (
          <View style={styles.categorySection}>
            <Text style={styles.categoryTitle}>All Interests</Text>
            <View style={styles.interestsWrap}>
              {interests.map((interest) => {
                const selected = isSelected(interest.id);
                return (
                  <TouchableOpacity
                    key={interest.id}
                    style={[
                      styles.interestChip,
                      selected && styles.interestChipSelected,
                    ]}
                    onPress={() => toggleInterest(interest)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.interestEmoji}>{interest.emoji}</Text>

                    <Text style={styles.interestLabel}>{interest.label}</Text>

                    <Ionicons
                      name={selected ? "close" : "add"}
                      size={20}
                      color={palette.BLACK}
                      style={styles.interestIcon}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>

            {hasMoreInterests && (
              <TouchableOpacity
                style={styles.showMoreButton}
                onPress={toggleShowAll}
                activeOpacity={0.7}
              >
                <Text style={styles.showMoreText}>
                  {showAll ? "Show less" : "Show more"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>

      {/* Save Button */}
      <View style={styles.buttonContainer}>
        <Button
          title="Save Interests"
          onPress={handleSave}
          disabled={isLoading || selectedInterests.length === 0}
          loading={isLoading}
        />
      </View>
    </LayoutContainer>
  );
};

export default EditInterests;
