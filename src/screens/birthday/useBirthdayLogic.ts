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

  const isValid = (() => {
    if (day.length !== 2 || month.length !== 2 || year.length !== 4)
      return false;

    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);

    if (isNaN(d) || isNaN(m) || isNaN(y)) return false;
    if (m < 1 || m > 12) return false;
    if (d < 1 || d > 31) return false;

    const daysInMonth = new Date(y, m, 0).getDate();
    if (d > daysInMonth) return false;

    const birthDate = new Date(y, m - 1, d);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age >= 18;
  })();

  const handleSubmit = async () => {
    if (!user || !isValid) return;

    setIsLoading(true);
    try {
      await updateUser(user.id, {
        birthday: `${month}-${day}-${year}`, // MM-DD-YYYY format
        // email: user.primaryEmailAddress?.emailAddress,
        // userId: user.id,
      });

      // Toast.show({
      //   type: "success",
      //   text1: "Birthday Saved!",
      //   text2: "Your birthday has been updated",
      // });

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
