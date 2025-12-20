import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation";

export type UpgradeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Upgrade"
>;

export interface PlanFeature {
  icon: string;
  text: string;
}

export interface PlanData {
  id: string;
  title: string;
  features: PlanFeature[];
  buttonText: string;
  price: string;
}
