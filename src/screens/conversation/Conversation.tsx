import React, { FC } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { palette } from "core/styles";
import { LayoutContainer } from "components/layoutContainer";

import type { ConversationScreenProps } from "./Conversation.types";
import { styles } from "./Conversation.styles";
import { useConversationLogic } from "./useConversationLogic";

const Conversation: FC<ConversationScreenProps> = (props) => {
  const {
    recipientName,
    recipientAvatar,
    matchDate,
    messages,
    inputText,
    setInputText,
    handleGoBack,
    handleCall,
    handleVideoCall,
    handleMore,
    handleAddMedia,
    handleSend,
  } = useConversationLogic(props);

  const header = (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleGoBack}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color={palette.BLACK} />
        </TouchableOpacity>
      </View>

      <View style={styles.headerCenter}>
        <Image
          source={recipientAvatar}
          style={styles.headerAvatar}
          contentFit="cover"
        />
        <Text style={styles.headerName}>{recipientName}</Text>
      </View>

      <View style={styles.headerRight}>
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={handleCall}
          activeOpacity={0.7}
        >
          <Ionicons name="call-outline" size={22} color={palette.BLACK} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.headerIcon}
          onPress={handleVideoCall}
          activeOpacity={0.7}
        >
          <Ionicons name="videocam-outline" size={24} color={palette.BLACK} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.headerIcon}
          onPress={handleMore}
          activeOpacity={0.7}
        >
          <Ionicons
            name="ellipsis-horizontal"
            size={22}
            color={palette.BLACK}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const footer = (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddMedia}
          activeOpacity={0.7}
        >
          <Ionicons name="add" size={24} color={palette.WHITE} />
        </TouchableOpacity>

        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Write a message"
            placeholderTextColor={palette.TEXT_COLOR}
            multiline
          />
        </View>

        <TouchableOpacity
          style={styles.sendButtonContainer}
          onPress={handleSend}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={[palette.RED2, palette.RED]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.sendButton}
          >
            <Ionicons name="send" size={18} color={palette.WHITE} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );

  return (
    <LayoutContainer
      style={styles.container}
      edges={["top", "bottom"]}
      header={header}
      footer={footer}
      autoScrollToBottom
      keyboardBehavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 70}
      keyboardShouldPersistTaps="handled"
      scrollStyle={{ paddingHorizontal: 0 }}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.matchDateContainer}>
        <Text style={styles.matchDateText}>
          YOU MATCHED WITH {recipientName.toUpperCase()} ON {matchDate}
        </Text>
      </View>

      <View style={styles.messagesContainer}>
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageRow,
              message.isMe ? styles.messageRowMe : styles.messageRowOther,
            ]}
          >
            {message.image ? (
              <Image
                source={message.image}
                style={styles.messageImage}
                contentFit="cover"
              />
            ) : (
              <View
                style={[
                  styles.messageBubble,
                  message.isMe
                    ? styles.messageBubbleMe
                    : styles.messageBubbleOther,
                ]}
              >
                <Text style={styles.messageText}>{message.text}</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </LayoutContainer>
  );
};

export default Conversation;
