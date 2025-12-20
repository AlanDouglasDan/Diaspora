import type { ImageSourcePropType } from "react-native";

export interface LikesUpgradeSheetPayload {
  image: ImageSourcePropType;
  onUpgrade: () => void;
}
