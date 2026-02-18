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
import type { DisplayNameScreenProps } from "./DisplayName.types";
import { styles } from "./DisplayName.styles";
import { useDisplayNameLogic } from "./useDisplayNameLogic";

const DisplayName: FC<DisplayNameScreenProps> = (props) => {
  const { displayName, setDisplayName, handleGoBack, handleSubmit, isLoading } =
    useDisplayNameLogic(props);

  return (
    <LayoutContainer
      keyboardBehavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 70}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity onPress={handleGoBack}>
        <Entypo name="chevron-left" size={24} color={palette.BLACK} />
      </TouchableOpacity>

      <ProgressBar progress={1 / 6} style={styles.progressBar} />

      <Text style={styles.title}>What's your display name?</Text>

      <Text style={styles.subtitle}>
        This is what everyone will see on your Diaspora profile. Be creative,
        but we suggest using your first name.
      </Text>

      <Input
        value={displayName}
        onChangeText={setDisplayName}
        placeholder="Enter your display name"
        backgroundColor={palette.GREY}
        style={styles.inputContainer}
      />

      <View style={layout.flex1} />

      <View style={styles.footer}>
        <Text style={styles.note}>
          Note: You can't change it later, so choose wisely!
        </Text>

        <TouchableOpacity
          disabled={!displayName || isLoading}
          onPress={handleSubmit}
        >
          <LinearGradient
            colors={[palette.RED2, palette.RED]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={[
              styles.submitButton,
              { opacity: displayName && !isLoading ? 1 : 0.5 },
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

export default DisplayName;
