import type { StyleProp, ViewStyle } from "react-native";
import type { CountryCode } from "react-native-country-picker-modal";

export interface PhoneInputProps {
  value: string;
  onChangeText: (text: string) => void;
  countryCode: CountryCode;
  callingCode: string;
  onSelectCountry: (countryCode: CountryCode, callingCode: string) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
}
