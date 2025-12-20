import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { ImageSourcePropType } from "react-native";
import type { MainTabParamList } from "../../navigation";

export type MatchScreenProps = BottomTabScreenProps<MainTabParamList, "Match">;

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  flag: string;
  isVerified: boolean;
  badge: string;
  isOnline: boolean;
  bio: string;
  avatar: ImageSourcePropType;
  galleryImages: ImageSourcePropType[];
  compatibility: string[];
  aboutMe: string[];
  school: string;
  workTitle: string;
  company: string;
  ethnicity: string[];
  nationalities: string[];
  languages: { name: string; isShared: boolean }[];
  interests: { name: string; isShared: boolean }[];
  location: string;
}
