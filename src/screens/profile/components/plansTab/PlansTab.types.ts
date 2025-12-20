import type { FeatureDetail } from "components/featuresModal";

export interface PlansTabFeature {
  name: string;
  free: boolean;
  included: boolean;
}

export interface PlansTabItem {
  id: string;
  label: string;
  count: number;
}

export interface PlansTabSubscriptionPlan {
  id: string;
  logoImage: any;
  backgroundColor: string;
  useGradient?: boolean;
  description: string;
  features: PlansTabFeature[];
  buttonText: string;
}

export interface PlansTabProps {
  cardWidth: number;
  planItems: PlansTabItem[];
  subscriptionPlans: PlansTabSubscriptionPlan[];
  modalVisible: boolean;
  selectedPlan: string | null;
  onViewAllFeatures: (planId: string) => void;
  onCloseModal: () => void;
  getModalFeatures: () => FeatureDetail[];
}
