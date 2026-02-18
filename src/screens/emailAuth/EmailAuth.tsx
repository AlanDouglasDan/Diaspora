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
import { Input } from "components/input";
import { layout, palette } from "core/styles";
import type { EmailAuthScreenProps } from "./EmailAuth.types";
import { styles } from "./EmailAuth.styles";
import { useEmailAuthLogic } from "./useEmailAuthLogic";

const EmailAuth: FC<EmailAuthScreenProps> = (props) => {
  const { email, setEmail, handleGoBack, handleSubmit, isLoading } =
    useEmailAuthLogic(props);

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

        <Text style={styles.title}>What's your email address?</Text>

        <Text style={styles.subtitle}>
          We need to verify your email to make it easy for you to access your
          profile.
        </Text>

        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="Email address"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.inputContainer}
        />
      </View>

      <TouchableOpacity
        disabled={!email || isLoading}
        style={[styles.button, { opacity: email && !isLoading ? 1 : 0.5 }]}
        onPress={handleSubmit}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={palette.BLACK} />
        ) : (
          <FontAwesome6 name="arrow-right" size={20} color={palette.BLACK} />
        )}
      </TouchableOpacity>
    </LayoutContainer>
  );
};

export default EmailAuth;
