import React, { FC } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
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
    isLoading,
    isRefreshing,
    handleRefresh,
    handleMatchPress,
    handleMessagePress,
    handleLoveLettersPress,
  } = useMessagesLogic();

  return (
    <LayoutContainer
      style={styles.container}
      edges={["top"]}
      header={<Text style={styles.title}>Chats</Text>}
      scrollEnabled={false}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={palette.PINK}
          />
        }
      >
        {matches.length > 0 && (
          <View style={styles.matchesContainer}>
            <Text style={styles.sectionTitle}>Matches</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[styles.matchesList, spacing.marginTop12]}
            >
              {matches.map((match, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.matchItem}
                  onPress={() => handleMatchPress(match)}
                  activeOpacity={0.7}
                >
                  <View style={styles.matchAvatarContainer}>
                    <Image
                      source={match.images[0]}
                      style={styles.matchAvatar}
                      contentFit="cover"
                    />

                    {/* <View style={styles.matchFlagContainer}>
                    <Text style={styles.matchFlag}>
                      {match.location.countryAbbreviation}
                    </Text>
                  </View> */}
                  </View>

                  <Text style={styles.matchName}>{match.user.displayName}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

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

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={palette.PINK} />
          </View>
        ) : messages.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No messages yet</Text>
            <Text style={styles.emptySubtext}>
              Start a conversation with someone you like!
            </Text>
          </View>
        ) : (
          messages.map((message, index) => (
            <View key={message.id}>
              <TouchableOpacity
                style={styles.messageItem}
                onPress={() => handleMessagePress(message)}
                activeOpacity={0.7}
              >
                <View style={styles.messageAvatarContainer}>
                  <Image
                    source={message.avatar}
                    style={styles.messageAvatar}
                    contentFit="cover"
                  />
                  <View style={styles.messageFlagContainer}>
                    <Text style={styles.messageFlag}>
                      {message.countryFlag}
                    </Text>
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
                    {message.isOnline && (
                      <View style={styles.onlineIndicator} />
                    )}
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
          ))
        )}
      </ScrollView>
    </LayoutContainer>
  );
};

export default Messages;
