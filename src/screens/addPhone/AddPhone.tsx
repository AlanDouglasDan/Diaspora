import React, { FC } from "react";
import {
  Platform,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { FontAwesome6, Entypo } from "@expo/vector-icons";

import { LayoutContainer } from "components/layoutContainer";
import { PhoneInput } from "components/phoneInput";
import { layout, palette } from "core/styles";
import type { AddPhoneScreenProps } from "./AddPhone.types";
import { styles } from "./AddPhone.styles";
import { useAddPhoneLogic } from "./useAddPhoneLogic";

const AddPhone: FC<AddPhoneScreenProps> = (props) => {
  const {
    phoneNumber,
    setPhoneNumber,
    countryCode,
    callingCode,
    handleGoBack,
    handleSelectCountry,
    handleSubmit,
    handleSkip,
    isLoading,
  } = useAddPhoneLogic(props);

  return (
    <LayoutContainer
      keyboardBehavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 70}
      keyboardShouldPersistTaps="handled"
      highlighted
    >
      <View style={layout.flex1}>
        <TouchableOpacity onPress={handleGoBack}>
          <Entypo name="chevron-left" size={24} color={palette.WHITE} />
        </TouchableOpacity>

        <Text style={styles.title}>What's your phone number?</Text>

        <Text style={styles.subtitle}>
          We will text you a verification code. Standard message and data rates
          may apply
        </Text>

        <PhoneInput
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          countryCode={countryCode}
          callingCode={callingCode}
          onSelectCountry={handleSelectCountry}
          style={styles.inputContainer}
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSkip} disabled={isLoading}>
          <Text style={[styles.skipText, { opacity: isLoading ? 0.5 : 1 }]}>
            Skip
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={!phoneNumber || isLoading}
          style={[
            styles.button,
            { opacity: phoneNumber && !isLoading ? 1 : 0.5 },
          ]}
          onPress={handleSubmit}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={palette.BLACK} />
          ) : (
            <FontAwesome6 name="arrow-right" size={20} color={palette.BLACK} />
          )}
        </TouchableOpacity>
      </View>
    </LayoutContainer>
  );
};

export default AddPhone;
