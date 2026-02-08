import React, { FC } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import { Feather } from "@expo/vector-icons";

import { palette } from "core/styles";
import { Button } from "components/button";

import { styles } from "./FilterSelectSheet.styles";
import { useFilterSelectSheetLogic } from "./useFilterSelectSheetLogic";

const FilterSelectSheet: FC<SheetProps<"filter-select-sheet">> = (props) => {
  const { sheetId } = props;

  const {
    title,
    variant,
    options,
    selectedSingle,
    setSelectedSingle,
    selectedMulti,
    toggleMultiItem,
    heightRange,
    setHeightRange,
    handleSubmit,
    formatHeight,
  } = useFilterSelectSheetLogic(props);

  const renderContent = () => {
    switch (variant) {
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

      case "multi-select":
        return (
          <View style={styles.multiSelectContainer}>
            {options.map((option) => {
              const isSelected = selectedMulti.includes(option.id);
              return (
                <TouchableOpacity
                  key={option.id}
                  style={styles.multiSelectItem}
                  onPress={() => toggleMultiItem(option.id)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.multiSelectLabel}>{option.label}</Text>
                  <View
                    style={[
                      styles.checkbox,
                      isSelected && styles.checkboxSelected,
                    ]}
                  >
                    {isSelected && (
                      <Feather name="check" size={14} color={palette.WHITE} />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <ActionSheet
      id={sheetId}
      // gestureEnabled
      containerStyle={{ borderTopLeftRadius: 32, borderTopRightRadius: 32 }}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
        </View>

        {renderContent()}

        <Button
          title="Apply"
          onPress={handleSubmit}
          style={styles.submitButton}
        />
      </ScrollView>
    </ActionSheet>
  );
};

export default FilterSelectSheet;
