import { useCallback } from "react";
import type { SheetProps } from "react-native-actions-sheet";
import { SheetManager } from "react-native-actions-sheet";

export const useBoostSheetLogic = (props: SheetProps<"boost-sheet">) => {
  const { sheetId, payload } = props;
  const { onKeepSwiping } = payload || {};

  const handleClose = useCallback(() => {
    SheetManager.hide("boost-sheet");
  }, []);

  const handleKeepSwiping = useCallback(() => {
    SheetManager.hide("boost-sheet");
    onKeepSwiping?.();
  }, [onKeepSwiping]);

  return {
    sheetId,
    handleClose,
    handleKeepSwiping,
  };
};
