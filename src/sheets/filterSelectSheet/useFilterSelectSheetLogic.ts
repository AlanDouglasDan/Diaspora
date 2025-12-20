import { useCallback, useState } from "react";
import type { SheetProps } from "react-native-actions-sheet";
import { SheetManager } from "react-native-actions-sheet";

export const useFilterSelectSheetLogic = (
  props: SheetProps<"filter-select-sheet">
) => {
  const { payload } = props;
  const {
    fieldKey,
    title,
    variant,
    options = [],
    initialValue,
    onSubmit,
  } = payload || {};

  const [selectedSingle, setSelectedSingle] = useState<string | null>(() => {
    if (variant === "single-select" && typeof initialValue === "string") {
      return initialValue;
    }
    return null;
  });

  const [selectedMulti, setSelectedMulti] = useState<string[]>(() => {
    if (variant === "multi-select" && Array.isArray(initialValue)) {
      return initialValue as string[];
    }
    return [];
  });

  const [heightRange, setHeightRange] = useState<[number, number]>(() => {
    if (
      variant === "height" &&
      Array.isArray(initialValue) &&
      initialValue.length === 2
    ) {
      return initialValue as [number, number];
    }
    return [150, 190];
  });

  const handleClose = useCallback(() => {
    SheetManager.hide("filter-select-sheet");
  }, []);

  const toggleMultiItem = useCallback((id: string) => {
    setSelectedMulti((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  }, []);

  const handleSubmit = useCallback(() => {
    if (variant === "single-select" && selectedSingle) {
      onSubmit?.(selectedSingle);
    } else if (variant === "multi-select") {
      onSubmit?.(selectedMulti);
    } else if (variant === "height") {
      onSubmit?.(heightRange);
    }
    SheetManager.hide("filter-select-sheet");
  }, [variant, selectedSingle, selectedMulti, heightRange, onSubmit]);

  const formatHeight = useCallback((range: [number, number]) => {
    return `${range[0]} cm - ${range[1]} cm`;
  }, []);

  return {
    fieldKey,
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
  };
};
