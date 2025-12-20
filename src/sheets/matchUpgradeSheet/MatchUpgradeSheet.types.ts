import type { ImageSourcePropType } from "react-native";

export interface MatchUpgradeSheetPayload {
  name: string;
  avatar: ImageSourcePropType;
  countryFlag: string;
  onUpgrade: () => void;
  onMaybeLater: () => void;
}
