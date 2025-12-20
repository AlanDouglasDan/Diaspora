import React, { FC } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { common, palette, spacing } from "core/styles";
import { LayoutContainer } from "components/layoutContainer";

import { styles } from "./Messages.styles";
import { useMessagesLogic } from "./useMessagesLogic";

const Messages: FC = () => {
  const {
    matches,
    messages,
    handleMatchPress,
    handleMessagePress,
    handleLoveLettersPress,
  } = useMessagesLogic();

  return (
    <LayoutContainer
      style={styles.container}
      edges={["top"]}
      header={<Text style={styles.title}>Chats</Text>}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.matchesContainer}>
          <Text style={styles.sectionTitle}>Matches</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.matchesList, spacing.marginTop12]}
          >
            {matches.map((match) => (
              <TouchableOpacity
                key={match.id}
                style={styles.matchItem}
                onPress={() => handleMatchPress(match.id)}
                activeOpacity={0.7}
              >
                <View style={styles.matchAvatarContainer}>
                  <Image
                    source={match.avatar}
                    style={styles.matchAvatar}
                    contentFit="cover"
                  />
                  <View style={styles.matchFlagContainer}>
                    <Text style={styles.matchFlag}>{match.countryFlag}</Text>
                  </View>
                </View>
                <Text style={styles.matchName}>{match.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.messagesHeader}>
          <Text style={styles.sectionTitle}>Messages</Text>

          <TouchableOpacity
            style={styles.loveLettersButton}
            onPress={handleLoveLettersPress}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={[palette.RED2, palette.RED]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.loveLettersGradient}
            >
              <Text style={styles.loveLettersText}>Open Love Letters 💌</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {messages.map((message, index) => (
          <View key={message.id}>
            <TouchableOpacity
              style={styles.messageItem}
              onPress={() => handleMessagePress(message.id)}
              activeOpacity={0.7}
            >
              <View style={styles.messageAvatarContainer}>
                <Image
                  source={message.avatar}
                  style={styles.messageAvatar}
                  contentFit="cover"
                />
                <View style={styles.messageFlagContainer}>
                  <Text style={styles.messageFlag}>{message.countryFlag}</Text>
                </View>
              </View>

              <View style={styles.messageContent}>
                <View style={styles.messageNameRow}>
                  <Text style={styles.messageName}>{message.name}</Text>
                  {message.isPremium && (
                    <Ionicons
                      name="star"
                      size={14}
                      color={palette.PURPLE}
                      style={styles.premiumIcon}
                    />
                  )}
                  {message.isOnline && <View style={styles.onlineIndicator} />}
                </View>
                <Text style={styles.messagePreview} numberOfLines={1}>
                  {message.lastMessage}
                </Text>
              </View>
            </TouchableOpacity>

            {index !== messages.length - 1 && (
              <View style={styles.messageDivider}>
                <View style={[common.line, styles.messageDividerLine]} />
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </LayoutContainer>
  );
};

export default Messages;
