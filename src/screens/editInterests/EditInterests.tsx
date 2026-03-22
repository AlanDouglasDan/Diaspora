import React, { FC, useCallback, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { palette } from "core/styles";
import { Button } from "components/button";
import { SuccessNotification } from "components/successNotification";

import type { EditInterestsScreenProps } from "./EditInterests.types";
import type { Interest } from "./EditInterests.types";
import { styles } from "./EditInterests.styles";
import { useEditInterestsLogic } from "./useEditInterestsLogic";

type SectionItem =
  | { type: "title" }
  | { type: "yourInterests" }
  | { type: "allInterests" };

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
    successInfo,
    hideSuccess,
    searchQuery,
    setSearchQuery,
  } = useEditInterestsLogic(props);

  const sections = useMemo<SectionItem[]>(() => {
    const items: SectionItem[] = [{ type: "title" }];
    if (selectedInterests.length > 0) items.push({ type: "yourInterests" });
    if (!interestsLoading) items.push({ type: "allInterests" });
    return items;
  }, [selectedInterests.length, interestsLoading]);

  const renderSection = useCallback(
    ({ item }: { item: SectionItem }) => {
      switch (item.type) {
        case "title":
          return (
            <View>
              <Text style={styles.pageTitle}>Things that interest you</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Search interests..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          );

        case "yourInterests":
          return (
            <View style={styles.yourInterestsSection}>
              <Text style={styles.yourInterestsTitle}>Your interests</Text>
              <View style={styles.selectedInterestsWrap}>
                {selectedInterests.map((interest) => (
                  <TouchableOpacity
                    key={interest.id}
                    style={[styles.interestChip, styles.interestChipSelected]}
                    onPress={() => toggleInterest(interest)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.interestEmoji}>{interest.emoji}</Text>
                    <Text
                      style={[styles.interestLabel, { color: palette.GREY2 }]}
                    >
                      {interest.label}
                    </Text>
                    <Ionicons
                      name="close-circle"
                      size={22}
                      color={palette.BLACK}
                      style={styles.interestIcon}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          );

        case "allInterests":
          return (
            <View style={styles.allInterestsSection}>
              <Text style={styles.categoryTitle}>All Interests</Text>
              <View style={styles.interestsWrap}>
                {interests.map((interest, index) => {
                  const selected = isSelected(interest.id);
                  return (
                    <TouchableOpacity
                      key={index}
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
                        size={22}
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
          );

        default:
          return null;
      }
    },
    [
      selectedInterests,
      toggleInterest,
      interests,
      isSelected,
      hasMoreInterests,
      showAll,
      toggleShowAll,
    ],
  );

  const keyExtractor = useCallback(
    (_item: SectionItem, index: number) => index.toString(),
    [],
  );

  return (
    <View style={{ flex: 1 }}>
      <SuccessNotification
        visible={successInfo.visible}
        title={successInfo.title}
        message={successInfo.message}
        onHide={hideSuccess}
      />

      <SafeAreaView style={styles.container} edges={["bottom"]}>
        {interestsLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={palette.RED2} />
            <Text style={styles.loadingText}>Loading interests...</Text>
          </View>
        ) : (
          <FlatList
            data={sections}
            renderItem={renderSection}
            keyExtractor={keyExtractor}
            contentContainerStyle={styles.flatListContent}
            showsVerticalScrollIndicator={false}
            extraData={selectedInterests}
          />
        )}

        <View style={styles.buttonContainer}>
          <Button
            title="Save Interests"
            onPress={handleSave}
            disabled={isLoading || selectedInterests.length === 0}
            loading={isLoading}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default EditInterests;
