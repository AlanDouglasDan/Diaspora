import { useState, useMemo, useCallback } from "react";
import { SheetManager, SheetProps } from "react-native-actions-sheet";

import type { ProfileFieldSheetPayload } from "./ProfileFieldSheet.types";

export const useProfileFieldSheetLogic = (
  props: SheetProps<"profile-field-sheet">
) => {
  const { sheetId, payload } = props;

  const {
    title,
    image,
    variant,
    placeholder,
    options = [],
    selectOptions = [],
    initialValue,
    onSubmit,
  } = payload as ProfileFieldSheetPayload;

  const [textValue, setTextValue] = useState<string>(
    typeof initialValue === "string" ? initialValue : ""
  );
  const [selectedItems, setSelectedItems] = useState<string[]>(
    Array.isArray(initialValue) ? initialValue : []
  );
  const [selectedSingle, setSelectedSingle] = useState<string>(
    typeof initialValue === "string" ? initialValue : ""
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options;
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [options, searchQuery]);

  const toggleItem = useCallback((id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }, []);

  const handleClose = useCallback(() => {
    SheetManager.hide(sheetId);
  }, [sheetId]);

  const handleSubmit = useCallback(() => {
    if (variant === "text-input") {
      onSubmit(textValue);
    } else if (variant === "select") {
      onSubmit(selectedSingle);
    } else if (variant === "single-select") {
      onSubmit(selectedSingle);
    } else if (variant === "search-list" || variant === "multi-select") {
      onSubmit(selectedItems);
    }
    handleClose();
  }, [
    variant,
    textValue,
    selectedSingle,
    selectedItems,
    onSubmit,
    handleClose,
  ]);

  const isApplyLabel = variant === "search-list" || variant === "multi-select";

  return {
    // payload data
    title,
    image,
    variant,
    placeholder,
    options,
    selectOptions,

    // state
    textValue,
    setTextValue,
    selectedItems,
    selectedSingle,
    setSelectedSingle,
    searchQuery,
    setSearchQuery,

    // derived
    filteredOptions,
    isApplyLabel,

    // handlers
    toggleItem,
    handleClose,
    handleSubmit,
  };
};
