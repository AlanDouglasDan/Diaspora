import React, { FC } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import { Image } from "expo-image";
import { Ionicons, Feather } from "@expo/vector-icons";

import { palette } from "core/styles";
import { Button } from "components/button";
import { Select } from "components/select";
import { Input } from "components/input";

import { styles } from "./ProfileFieldSheet.styles";
import { useProfileFieldSheetLogic } from "./useProfileFieldSheetLogic";

const ProfileFieldSheet: FC<SheetProps<"profile-field-sheet">> = (props) => {
  const { sheetId } = props;

  const {
    title,
    image,
    variant,
    placeholder,
    options = [],
    selectOptions = [],
    textValue,
    setTextValue,
    selectedItems,
    selectedSingle,
    setSelectedSingle,
    searchQuery,
    setSearchQuery,
    filteredOptions,
    toggleItem,
    handleClose,
    handleSubmit,
    isApplyLabel,
  } = useProfileFieldSheetLogic(props);

  const renderContent = () => {
    switch (variant) {
      case "text-input":
        return (
          <Input
            value={textValue}
            onChangeText={setTextValue}
            placeholder={placeholder}
            placeholderTextColor={palette.GREY2}
            style={styles.textInput}
          />
        );

      case "select":
        return (
          <View style={styles.selectContainer}>
            <Select
              value={selectedSingle}
              onChange={setSelectedSingle}
              options={selectOptions}
              placeholder={placeholder}
            />
          </View>
        );

      case "single-select":
        return (
          <View style={styles.singleSelectContainer}>
            {options.map((option) => {
              const isSelected = selectedSingle === option.id;
              return (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.singleSelectOption,
                    isSelected && styles.singleSelectOptionSelected,
                  ]}
                  onPress={() => setSelectedSingle(option.id)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.singleSelectLabel,
                      isSelected && styles.singleSelectLabelSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );

      case "search-list":
      case "multi-select":
        return (
          <>
            {variant === "search-list" && (
              <View style={styles.searchContainer}>
                <Input
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder={placeholder || "Search..."}
                  placeholderTextColor={palette.GREY2}
                  style={styles.searchInput}
                />
              </View>
            )}

            <ScrollView
              style={styles.listContainer}
              showsVerticalScrollIndicator={false}
            >
              {filteredOptions.map((option) => {
                const isSelected = selectedItems.includes(option.id);
                return (
                  <TouchableOpacity
                    key={option.id}
                    style={styles.listItem}
                    onPress={() => toggleItem(option.id)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.listItemLabel}>{option.label}</Text>

                    <View
                      style={[
                        styles.checkbox,
                        isSelected && styles.checkboxSelected,
                      ]}
                    >
                      {isSelected && (
                        <Feather name="check" size={12} color={palette.WHITE} />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <ActionSheet
      id={sheetId}
      gestureEnabled
      containerStyle={{ borderTopLeftRadius: 32, borderTopRightRadius: 32 }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Ionicons name="close" size={24} color={palette.BLACK} />
          </TouchableOpacity>

          <View style={styles.headerContent}>
            {image && (
              <Image
                source={image}
                style={styles.headerImage}
                contentFit="contain"
              />
            )}
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>

        {renderContent()}

        <Button
          title={isApplyLabel ? "Apply" : "Done"}
          onPress={handleSubmit}
          style={styles.submitButton}
        />
      </View>
    </ActionSheet>
  );
};

export default ProfileFieldSheet;
