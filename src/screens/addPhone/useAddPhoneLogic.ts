import { useState } from "react";
import type { CountryCode } from "react-native-country-picker-modal";
import type { AddPhoneScreenProps } from "./AddPhone.types";

export function useAddPhoneLogic({ navigation }: AddPhoneScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState<CountryCode>("AU");
  const [callingCode, setCallingCode] = useState("61");

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSelectCountry = (code: CountryCode, calling: string) => {
    setCountryCode(code);
    setCallingCode(calling);
  };

  const handleSubmit = () => {
    const fullPhoneNumber = `+${callingCode}${phoneNumber}`;
    navigation.navigate("VerifyOtp", {
      value: fullPhoneNumber,
      context: "phone",
    });
  };

  const handleSkip = () => {
    // TODO: Navigate to next screen or skip phone verification
  };

  return {
    phoneNumber,
    setPhoneNumber,
    countryCode,
    callingCode,
    handleGoBack,
    handleSelectCountry,
    handleSubmit,
    handleSkip,
  };
}
