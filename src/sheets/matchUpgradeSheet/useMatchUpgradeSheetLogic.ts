import { useCallback } from "react";
import type { SheetProps } from "react-native-actions-sheet";
import { SheetManager } from "react-native-actions-sheet";

export const useMatchUpgradeSheetLogic = (
  props: SheetProps<"match-upgrade-sheet">
) => {
  const { sheetId, payload } = props;
  const { name, avatar, countryFlag, onUpgrade, onMaybeLater } = payload || {};

  const handleClose = useCallback(() => {
    SheetManager.hide("match-upgrade-sheet");
  }, []);

  const handleUpgrade = useCallback(() => {
    SheetManager.hide("match-upgrade-sheet");
    onUpgrade?.();
  }, [onUpgrade]);

  const handleMaybeLater = useCallback(() => {
    SheetManager.hide("match-upgrade-sheet");
    onMaybeLater?.();
  }, [onMaybeLater]);

  return {
    sheetId,
    name,
    avatar,
    countryFlag,
    handleClose,
    handleUpgrade,
    handleMaybeLater,
  };
};
