import React, { FC } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { palette } from "core/styles";
import { LayoutContainer } from "components/layoutContainer";

import type { EditInterestsScreenProps } from "./EditInterests.types";
import { styles } from "./EditInterests.styles";
import { useEditInterestsLogic } from "./useEditInterestsLogic";

const EditInterests: FC<EditInterestsScreenProps> = (props) => {
  const {
    categories,
    selectedInterests,
    toggleInterest,
    isSelected,
    toggleCategoryExpanded,
    isCategoryExpanded,
    getVisibleInterests,
    hasMoreInterests,
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

        {/* Category Sections */}
        {categories.map((category) => (
          <View key={category.id} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            <View style={styles.interestsWrap}>
              {getVisibleInterests(category).map((interest) => {
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

            {hasMoreInterests(category) && (
              <TouchableOpacity
                style={styles.showMoreButton}
                onPress={() => toggleCategoryExpanded(category.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.showMoreText}>
                  {isCategoryExpanded(category.id) ? "Show less" : "Show more"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
    </LayoutContainer>
  );
};

export default EditInterests;
