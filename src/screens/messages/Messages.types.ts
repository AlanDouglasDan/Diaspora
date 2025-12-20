import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { MainTabParamList } from "navigation/MainTabNavigator";

export type MessagesScreenProps = BottomTabScreenProps<
  MainTabParamList,
  "Messages"
>;

export interface Match {
  id: string;
  name: string;
  avatar: any;
  countryFlag: string;
}

export interface Message {
  id: string;
  name: string;
  avatar: any;
  countryFlag: string;
  lastMessage: string;
  isPremium?: boolean;
  isOnline?: boolean;
}
