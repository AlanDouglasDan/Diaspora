import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { MainTabParamList } from "navigation/MainTabNavigator";

export type ProfileScreenProps = BottomTabScreenProps<
  MainTabParamList,
  "Profile"
>;

export interface PlanItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  count: number;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  badge?: string;
  description: string;
  features: SubscriptionFeature[];
  price: number;
  buttonText: string;
}

export interface SubscriptionFeature {
  name: string;
  free: boolean;
  economy: boolean;
}
