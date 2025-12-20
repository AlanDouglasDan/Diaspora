import { useCallback } from "react";
import { SheetManager } from "react-native-actions-sheet";
import type { SheetProps } from "react-native-actions-sheet";

import type { LikesUpgradeSheetPayload } from "./LikesUpgradeSheet.types";

export const useLikesUpgradeSheetLogic = (
  props: SheetProps<"likes-upgrade-sheet">
) => {
  const { sheetId, payload } = props;

  const { image, onUpgrade } = payload as LikesUpgradeSheetPayload;

  const handleClose = useCallback(() => {
    SheetManager.hide(sheetId);
  }, [sheetId]);

  const handleUpgrade = useCallback(() => {
    SheetManager.hide(sheetId);
    onUpgrade();
  }, [onUpgrade, sheetId]);

  return {
    sheetId,
    image,
    handleClose,
    handleUpgrade,
  };
};
