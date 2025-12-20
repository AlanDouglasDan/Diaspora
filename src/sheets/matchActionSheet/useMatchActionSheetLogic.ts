import { useCallback } from "react";
import { SheetManager } from "react-native-actions-sheet";
import type { SheetProps } from "react-native-actions-sheet";

import type { MatchActionSheetPayload } from "./MatchActionSheet.types";

export const useMatchActionSheetLogic = (
  props: SheetProps<"match-action-sheet">
) => {
  const { sheetId, payload } = props;

  const { onSeePlans } = payload as MatchActionSheetPayload;

  const handleClose = useCallback(() => {
    SheetManager.hide(sheetId);
  }, [sheetId]);

  const handleSeePlans = useCallback(() => {
    SheetManager.hide(sheetId);
    onSeePlans();
  }, [onSeePlans, sheetId]);

  return {
    sheetId,
    handleClose,
    handleSeePlans,
  };
};
