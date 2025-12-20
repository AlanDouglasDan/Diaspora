import { useState, useRef } from "react";
import type { TextInput } from "react-native";
import type { BirthdayScreenProps } from "./Birthday.types";

export function useBirthdayLogic({ navigation }: BirthdayScreenProps) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

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

  const handleSubmit = () => {
    navigation.navigate("Gender");
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
  };
}
