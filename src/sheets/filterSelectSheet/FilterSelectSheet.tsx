import React, { FC, useCallback } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import { Feather, Ionicons } from "@expo/vector-icons";

import { palette } from "core/styles";
import { Button } from "components/button";

import { styles } from "./FilterSelectSheet.styles";
import { useFilterSelectSheetLogic } from "./useFilterSelectSheetLogic";
import type { FilterSelectOption } from "./FilterSelectSheet.types";

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
    handleClose,
    handleSubmit,
    formatHeight,
  } = useFilterSelectSheetLogic(props);

  const renderSingleItem = useCallback(
    ({ item }: { item: FilterSelectOption }) => {
      const isSelected = selectedSingle === item.id;
      return (
        <TouchableOpacity
          style={[
            styles.singleSelectOption,
            isSelected && styles.singleSelectOptionSelected,
          ]}
          onPress={() => setSelectedSingle(item.id)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.singleSelectLabel,
              isSelected && styles.singleSelectLabelSelected,
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      );
    },
    [selectedSingle, setSelectedSingle],
  );

  const renderMultiItem = useCallback(
    ({ item }: { item: FilterSelectOption }) => {
      const isSelected = selectedMulti.includes(item.id);
      return (
        <TouchableOpacity
          style={styles.multiSelectItem}
          onPress={() => toggleMultiItem(item.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.multiSelectLabel}>{item.label}</Text>
          <View
            style={[styles.checkbox, isSelected && styles.checkboxSelected]}
          >
            {isSelected && (
              <Feather name="check" size={14} color={palette.WHITE} />
            )}
          </View>
        </TouchableOpacity>
      );
    },
    [selectedMulti, toggleMultiItem],
  );

  const keyExtractor = useCallback(
    (_: FilterSelectOption, index: number) => String(index),
    [],
  );

  const ListHeader = useCallback(
    () => (
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Ionicons name="close" size={24} color={palette.BLACK} />
        </TouchableOpacity>

        <Text style={styles.title}>{title}</Text>
      </View>
    ),
    [handleClose, title],
  );

  return (
    <ActionSheet id={sheetId} containerStyle={styles.sheetContainer}>
      <View style={styles.container}>
        <FlatList
          data={options}
          renderItem={
            variant === "single-select" ? renderSingleItem : renderMultiItem
          }
          keyExtractor={keyExtractor}
          ListHeaderComponent={ListHeader}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          extraData={
            variant === "single-select" ? selectedSingle : selectedMulti
          }
        />

        <View style={styles.footerContainer}>
          <Button
            title="Apply"
            onPress={handleSubmit}
            style={styles.submitButton}
          />
        </View>
      </View>
    </ActionSheet>
  );
};

export default FilterSelectSheet;
