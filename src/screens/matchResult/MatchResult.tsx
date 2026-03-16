import React, { FC } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

import { images } from "core/images";
import { palette } from "core/styles";
import { SuccessNotification } from "@/src/components/successNotification";

import type { MatchResultScreenProps } from "./MatchResult.types";
import { styles } from "./MatchResult.styles";
import { useMatchResultLogic } from "./useMatchResultLogic";

const SUGGESTIONS = [
  { type: "text", value: "Hi!" },
  { type: "text", value: "Hey" },
  { type: "emoji", value: "😍" },
  { type: "emoji", value: "😉" },
];

const MatchResult: FC<MatchResultScreenProps> = (props) => {
  const {
    message,
    setMessage,
    handleClose,
    handleSend,
    handleSuggestionPress,
    userName,
    userImage,
    isSending,
    showSuccessNotification,
    navigateToMessages,
  } = useMatchResultLogic(props);

  return (
    <View style={styles.container}>
      <SuccessNotification
        visible={showSuccessNotification}
        title="Message Sent!"
        message={`Your message to ${userName} was sent successfully`}
        duration={2000}
        onHide={navigateToMessages}
      />

      <Image
        source={userImage ? { uri: userImage } : images.avatar3}
        style={styles.backgroundImage}
        contentFit="cover"
      />

      <View style={styles.overlay}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Ionicons name="close" size={28} color={palette.WHITE} />
        </TouchableOpacity>

        <View style={styles.contentContainer}>
          <View style={styles.matchedImageContainer}>
            <Image
              source={images.matched}
              style={styles.matchedImage}
              contentFit="contain"
            />
          </View>

          <Text style={styles.subtitle}>{userName} likes you back!</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Say something nice"
              value={message}
              onChangeText={setMessage}
              editable={!isSending}
            />

            <TouchableOpacity
              style={[styles.sendButton, isSending && { opacity: 0.6 }]}
              onPress={handleSend}
              disabled={isSending}
            >
              <Text style={styles.sendText}>{isSending ? "..." : "Send"}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.suggestionsContainer}>
            {SUGGESTIONS.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionChip}
                onPress={() => handleSuggestionPress(suggestion.value)}
                activeOpacity={0.8}
                disabled={isSending}
              >
                <Text style={styles.suggestionText}>{suggestion.value}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default MatchResult;
