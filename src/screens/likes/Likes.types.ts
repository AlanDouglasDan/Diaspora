import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { ImageSourcePropType } from "react-native";
import type { MainTabParamList } from "../../navigation";

export type LikesScreenProps = BottomTabScreenProps<MainTabParamList, "Likes">;

export type LikesTab = "priority" | "likes" | "views";

export type LikeItem = {
  id: string;
  image: ImageSourcePropType;
  isRecentlyActive: boolean;
};
