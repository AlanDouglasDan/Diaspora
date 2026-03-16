import { useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";
import type { CountryCode } from "react-native-country-picker-modal";
import type { AddPhoneScreenProps } from "./AddPhone.types";
import { useCreateUser } from "@/src/api/user";

export function useAddPhoneLogic({ navigation }: AddPhoneScreenProps) {
  const { user } = useUser();
  const { createUser, isLoading: isCreatingUser } = useCreateUser();

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState<CountryCode>("AU");
  const [callingCode, setCallingCode] = useState<string>("61");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSelectCountry = (code: CountryCode, calling: string) => {
    setCountryCode(code);
    setCallingCode(calling);
  };

  const handleSubmit = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const fullPhoneNumber = `+${callingCode}${phoneNumber}`;

      console.log(user.id, fullPhoneNumber);

      // Create user in backend with clerkId and phone
      await createUser({
        clerkId: user.id,
        phone: fullPhoneNumber,
      });

      // Toast.show({
      //   type: "success",
      //   text1: "Phone Number Added",
      //   text2: "Your account has been created successfully",
      // });

      navigation.navigate("Onboarding");

      // --- Original phone verification logic (commented out) ---
      // // Add phone number to user and prepare verification
      // await user.createPhoneNumber({ phoneNumber: fullPhoneNumber });
      // await user.phoneNumbers[0].prepareVerification();
      //
      // Toast.show({
      //   type: "success",
      //   text1: "Verification Code Sent",
      //   text2: "Check your phone for the verification code",
      // });
      // navigation.navigate("VerifyOtp", {
      //   value: fullPhoneNumber,
      //   context: "phone",
      // });
      // --- End of original phone verification logic ---
    } catch (error: any) {
      console.error("Add phone error:", error);
      const errorMessage =
        error?.message || "Could not add phone number. Please try again.";
      Toast.show({
        type: "error",
        text1: "Failed to Add Phone",
        text2: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    navigation.navigate("Onboarding");
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
    isLoading: isCreatingUser,
  };
}
