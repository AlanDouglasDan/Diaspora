import React, { FC } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import { Feather } from "@expo/vector-icons";

import { palette } from "core/styles";
import { Button } from "components/button";
import { GradientSlider } from "components/gradientSlider";

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
          <ScrollView
            style={styles.singleSelectContainer}
            showsVerticalScrollIndicator={false}
          >
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
          </ScrollView>
        );

      case "multi-select":
        return (
          <ScrollView
            style={styles.multiSelectContainer}
            showsVerticalScrollIndicator={false}
          >
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
          </ScrollView>
        );

      case "height":
        return (
          <View style={styles.heightContainer}>
            <Text style={styles.heightValueText}>
              {formatHeight(heightRange)}
            </Text>
            <GradientSlider
              value={heightRange}
              onValueChange={(value) =>
                setHeightRange(value as [number, number])
              }
              minimumValue={100}
              maximumValue={220}
              step={1}
              isRange
              showValue={false}
            />
          </View>
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
          <Text style={styles.title}>{title}</Text>
        </View>

        {renderContent()}

        <Button
          title="Apply"
          onPress={handleSubmit}
          style={styles.submitButton}
        />
      </View>
    </ActionSheet>
  );
};

export default FilterSelectSheet;
