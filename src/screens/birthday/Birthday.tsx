import React, { FC } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome6, Entypo } from "@expo/vector-icons";

import { LayoutContainer } from "components/layoutContainer";
import { ProgressBar } from "components/progressBar";
import { Input } from "components/input";
import { layout, palette } from "core/styles";
import type { BirthdayScreenProps } from "./Birthday.types";
import { styles } from "./Birthday.styles";
import { useBirthdayLogic } from "./useBirthdayLogic";

const Birthday: FC<BirthdayScreenProps> = (props) => {
  const {
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
  } = useBirthdayLogic(props);

  return (
    <LayoutContainer
      keyboardBehavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 70}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity onPress={handleGoBack}>
        <Entypo name="chevron-left" size={24} color={palette.BLACK} />
      </TouchableOpacity>

      <ProgressBar progress={2 / 6} style={styles.progressBar} />

      <Text style={styles.title}>When is your birthday?</Text>

      <Text style={styles.subtitle}>Let's make sure you should be here.</Text>

      <View style={styles.inputRow}>
        <Input
          value={day}
          onChangeText={handleDayChange}
          label="Day"
          placeholder="DD"
          backgroundColor={palette.GREY}
          keyboardType="number-pad"
          maxLength={2}
        />
        <Input
          ref={monthRef}
          value={month}
          onChangeText={handleMonthChange}
          label="Month"
          placeholder="MM"
          backgroundColor={palette.GREY}
          keyboardType="number-pad"
          maxLength={2}
        />
        <Input
          ref={yearRef}
          value={year}
          onChangeText={handleYearChange}
          label="Year"
          placeholder="YYYY"
          backgroundColor={palette.GREY}
          keyboardType="number-pad"
          maxLength={4}
        />
      </View>

      <View style={layout.flex1} />

      <View style={styles.footer}>
        <TouchableOpacity
          disabled={!isValid || isLoading}
          onPress={handleSubmit}
        >
          <LinearGradient
            colors={[palette.RED2, palette.RED]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={[
              styles.submitButton,
              { opacity: isValid && !isLoading ? 1 : 0.5 },
            ]}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={palette.WHITE} />
            ) : (
              <FontAwesome6
                name="arrow-right"
                size={20}
                color={palette.WHITE}
              />
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LayoutContainer>
  );
};

export default Birthday;
