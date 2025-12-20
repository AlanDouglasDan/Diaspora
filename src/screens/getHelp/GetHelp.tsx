import React, { FC, useLayoutEffect } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";

import { palette } from "core/styles";
import { LayoutContainer } from "components/layoutContainer";
import { Input } from "components/input";

import type { GetHelpScreenProps } from "./GetHelp.types";
import { styles } from "./GetHelp.styles";
import { useGetHelpLogic } from "./useGetHelpLogic";

const GetHelp: FC<GetHelpScreenProps> = (props) => {
  const { navigation } = props;
  const {
    email,
    setEmail,
    message,
    setMessage,
    handleSend,
    handleUploadScreenshot,
  } = useGetHelpLogic(props);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSend}>
          <Text style={styles.sendButton}>Send</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleSend]);

  return (
    <LayoutContainer
      style={styles.container}
      edges={["bottom"]}
      keyboardBehavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 70}
      keyboardShouldPersistTaps="handled"
    >
      {/* Email Field */}
      <View>
        <Text style={styles.fieldLabel}>Your email</Text>
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder=""
          keyboardType="email-address"
          autoCapitalize="none"
          backgroundColor={palette.GREY}
          style={styles.input}
        />
      </View>

      {/* Message Field */}
      <View>
        <Text style={styles.fieldLabel}>Write message</Text>
        <Input
          value={message}
          onChangeText={setMessage}
          placeholder=""
          multiline
          numberOfLines={5}
          backgroundColor={palette.GREY}
          style={styles.input}
        />
      </View>

      {/* Upload Screenshot */}
      <View>
        <Text style={styles.fieldLabel}>Attach screenshot</Text>
        <TouchableOpacity
          style={styles.uploadContainer}
          onPress={handleUploadScreenshot}
          activeOpacity={0.7}
        >
          <Feather name="upload-cloud" size={32} color={palette.GREY2} />

          <Text style={styles.uploadText}>Upload</Text>
        </TouchableOpacity>
      </View>
    </LayoutContainer>
  );
};

export default GetHelp;
