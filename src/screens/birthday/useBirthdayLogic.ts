import { useState, useRef } from "react";
import type { TextInput } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";
import type { BirthdayScreenProps } from "./Birthday.types";
import { useUpdateUser } from "@/src/api/user";

export function useBirthdayLogic({ navigation }: BirthdayScreenProps) {
  const { user } = useUser();
  const { updateUser } = useUpdateUser();

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const monthRef = useRef<TextInput>(null);
  const yearRef = useRef<TextInput>(null);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleDayChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, "").slice(0, 2);
    setDay(numericText);
    if (numericText.length === 2) {
      monthRef.current?.focus();
    }
  };

  const handleMonthChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, "").slice(0, 2);
    setMonth(numericText);
    if (numericText.length === 2) {
      yearRef.current?.focus();
    }
  };

  const handleYearChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, "").slice(0, 4);
    setYear(numericText);
  };

  const isValid = day.length === 2 && month.length === 2 && year.length === 4;

  const handleSubmit = async () => {
    if (!user || !isValid) return;

    setIsLoading(true);
    try {
      await updateUser(user.id, {
        birthday: `${month}-${day}-${year}`, // MM-DD-YYYY format
        email: user.primaryEmailAddress?.emailAddress,
        userId: user.id,
      });

      Toast.show({
        type: "success",
        text1: "Birthday Saved!",
        text2: "Your birthday has been updated",
      });

      navigation.navigate("Gender");
    } catch (error: any) {
      console.error("Update birthday error:", error);
      const errorMessage =
        error?.message || "Could not update birthday. Please try again.";
      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    day,
    month,
    year,
    monthRef,
    yearRef,
    handleDayChange,
    handleMonthChange,
    handleYearChange,
    handleGoBack,
    handleSubmit,
    isValid,
    isLoading,
  };
}
