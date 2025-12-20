import type { ImageSourcePropType } from "react-native";

export interface ListOption {
  id: string;
  label: string;
}

export interface ProfileFieldSheetPayload {
  fieldId: string;
  title: string;
  image?: ImageSourcePropType;
  variant:
    | "search-list"
    | "text-input"
    | "select"
    | "single-select"
    | "multi-select";
  placeholder?: string;
  options?: ListOption[];
  selectOptions?: { label: string; value: string }[];
  initialValue?: string | string[];
  onSubmit: (value: string | string[]) => void;
}
