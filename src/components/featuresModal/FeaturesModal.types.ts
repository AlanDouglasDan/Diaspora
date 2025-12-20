export interface FeatureDetail {
  label: string;
  value: string;
}

export interface FeaturesModalProps {
  visible: boolean;
  onClose: () => void;
  planId: string;
  logoImage: any;
  features: FeatureDetail[];
}
