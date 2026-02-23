import React, { FC, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Image } from "expo-image";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

import { SwipeableCard } from "./components";
import LoveLetterSend from "components/svg/LoveLetterSend";
import LoveLetter2 from "components/svg/LoveLetter2";
import { Button } from "components/button";
import { images } from "core/images";
import { common, layout, palette, spacing } from "core/styles";

import { styles } from "./Match.styles";
import { useMatchLogic } from "./useMatchLogic";
import type { MatchScreenProps, UserProfile } from "./Match.types";

const Match: FC<MatchScreenProps> = (props) => {
  const {
    users,
    currentUser,
    cardIndex,
    isLoading,
    isActionLoading,
    isSwipingEnabled,
    swipeableCardRef,
    handleOpenImages,
    handleOpenSendLoveLetter,
    handleDislike,
    handleSuperLike,
    handleLike,
    handleSwipedLeft,
    handleSwipedRight,
    handleSwipedAll,
    handleScroll,
    loveLetterText,
    setLoveLetterText,
    handleSendLoveLetter,
    isSendingLoveLetter,
  } = useMatchLogic(props);

  const renderCard = useCallback(
    (user: UserProfile) => {
      if (!user) return null;

      return (
        <View style={styles.card}>
          <TouchableOpacity
            activeOpacity={0.95}
            onPress={handleOpenImages}
            style={styles.cardImageTouchable}
          >
            <Image
              source={user.avatar}
              style={styles.cardImage}
              contentFit="cover"
            />
          </TouchableOpacity>

          <View style={styles.cardOverlay} pointerEvents="box-none">
            <View style={styles.topSection} pointerEvents="none">
              <View style={styles.userInfo}>
                <Text style={styles.flagEmoji}>{user.flag}</Text>

                <View style={styles.nameContainer}>
                  <View style={styles.nameRow}>
                    <Text style={styles.nameText}>{user.name},</Text>
                    <Text style={styles.ageText}> {user.age}</Text>

                    {user.isVerified && (
                      <View style={styles.verifiedIcon}>
                        <MaterialCommunityIcons
                          name="check-decagram"
                          size={18}
                          color={palette.WHITE}
                        />
                      </View>
                    )}
                  </View>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{user.badge}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.scrollIndicator}>
                <View style={[styles.scrollDot, styles.scrollDotActive]} />
                <View style={styles.scrollDot} />
              </View>
            </View>

            <View style={styles.bottomSection} pointerEvents="box-none">
              <View style={layout.spacedRow}>
                <View style={styles.onlineIndicator} pointerEvents="none">
                  <View
                    style={[
                      styles.onlineDot,
                      !user.isOnline && styles.offlineDot,
                    ]}
                  />
                  <Text style={styles.onlineText}>
                    {user.isOnline ? "Online" : "Offline"}
                  </Text>
                </View>

                <TouchableOpacity onPress={handleOpenSendLoveLetter}>
                  <LoveLetter2 />
                </TouchableOpacity>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    isActionLoading && { opacity: 0.6 },
                  ]}
                  onPress={handleDislike}
                  activeOpacity={0.8}
                  disabled={isActionLoading}
                >
                  {isActionLoading ? (
                    <ActivityIndicator size="small" color={palette.RED} />
                  ) : (
                    <FontAwesome name="close" size={24} color={palette.RED} />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    { backgroundColor: palette.RED },
                    isActionLoading && { opacity: 0.6 },
                  ]}
                  onPress={handleSuperLike}
                  activeOpacity={0.8}
                  disabled={isActionLoading}
                >
                  {isActionLoading ? (
                    <ActivityIndicator size="small" color={palette.WHITE} />
                  ) : (
                    <FontAwesome name="star" size={24} color={palette.WHITE} />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    isActionLoading && { opacity: 0.6 },
                  ]}
                  onPress={handleLike}
                  activeOpacity={0.8}
                  disabled={isActionLoading}
                >
                  {isActionLoading ? (
                    <ActivityIndicator size="small" color={palette.RED} />
                  ) : (
                    <FontAwesome name="heart" size={22} color={palette.RED} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      );
    },
    [
      handleOpenImages,
      handleDislike,
      handleSuperLike,
      handleLike,
      isActionLoading,
    ],
  );

  if (isLoading) {
    return (
      <View
        style={[
          styles.container,
          styles.emptyStateContainer,
          { justifyContent: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={palette.PINK} />
        <Text style={[styles.semiheader16, styles.loadingStateMessage]}>
          Finding matches near you...
        </Text>
        <Text style={[styles.text14, styles.loadingStateSubtext]}>
          This may take a moment
        </Text>
      </View>
    );
  }

  if (!currentUser || users.length === 0) {
    return (
      <View style={[styles.container, styles.emptyStateContainer]}>
        <View style={styles.emptyStateImageContainer}>
          <Image
            source={images.emptyState3}
            style={styles.emptyStateImage}
            contentFit="contain"
          />
        </View>

        <View style={styles.emptyStateBottomSection}>
          <Text style={[styles.text14, styles.emptyStateMessage]}>
            Adjust your filter to get see more prospective matchs
          </Text>

          <Button
            title="Open filter"
            onPress={() => props.navigation.navigate("FilterSettings" as never)}
            style={styles.emptyStateButton}
          />
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
      >

        {/* New SwipeableCard implementation */}
        <View style={styles.swiperContainer}>
          <SwipeableCard
            ref={swipeableCardRef}
            onSwipeLeft={handleSwipedLeft}
            onSwipeRight={handleSwipedRight}
            enabled={isSwipingEnabled}
          >
            {renderCard(currentUser)}
          </SwipeableCard>
        </View>

        {/* Bio + Compatibility + About Me card */}
        {(currentUser?.bio && currentUser?.bio !== "No bio yet") ||
        currentUser?.compatibility.length > 0 ||
        (currentUser?.aboutMe.length > 0 &&
          currentUser?.aboutMe[0] !== "No details yet") ? (
          <View style={styles.sectionCard}>
            {currentUser?.bio && currentUser?.bio !== "No bio yet" && (
              <View>
                <Text style={styles.text14}>My bio</Text>
                <Text style={styles.semiheader16}>{currentUser?.bio}</Text>
              </View>
            )}

            {currentUser?.compatibility.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Compatibility</Text>
                <View style={styles.tagsRow}>
                  {currentUser?.compatibility.map((item, index) => (
                    <View key={index} style={styles.basicTag}>
                      <Text style={styles.tagText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {currentUser?.aboutMe.length > 0 &&
              currentUser?.aboutMe[0] !== "No details yet" && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>About me</Text>
                  <View style={styles.tagsRow}>
                    {currentUser?.aboutMe.map((item, index) => (
                      <View key={index} style={styles.basicTag}>
                        <Text style={styles.tagText}>{item}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
          </View>
        ) : null}

        {/* School / Work / Company card */}
        {((currentUser?.school && currentUser?.school !== "Not specified") ||
          (currentUser?.workTitle &&
            currentUser?.workTitle !== "Not specified") ||
          (currentUser?.company &&
            currentUser?.company !== "Not specified")) && (
          <View style={styles.sectionCard}>
            {currentUser?.school && currentUser?.school !== "Not specified" && (
              <View>
                <Text style={styles.sectionTitle}>School</Text>
                <Text style={styles.sectionValue}>{currentUser?.school}</Text>
              </View>
            )}

            {currentUser?.workTitle &&
              currentUser?.workTitle !== "Not specified" && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Work title</Text>
                  <Text style={styles.sectionValue}>
                    {currentUser?.workTitle}
                  </Text>
                </View>
              )}

            {currentUser?.company &&
              currentUser?.company !== "Not specified" && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Company</Text>
                  <Text style={styles.sectionValue}>
                    {currentUser?.company}
                  </Text>
                </View>
              )}
          </View>
        )}

        <Image
          source={currentUser?.avatar}
          style={styles.galleryPhoto}
          contentFit="cover"
        />

        {/* Ethnicity + Nationalities + Languages card */}
        {((currentUser?.ethnicity.length > 0 &&
          currentUser?.ethnicity[0] !== "Not specified") ||
          (currentUser?.nationalities.length > 0 &&
            currentUser?.nationalities[0] !== "Not specified") ||
          currentUser?.languages.length > 0) && (
          <View style={styles.sectionCard}>
            {currentUser?.ethnicity.length > 0 &&
              currentUser?.ethnicity[0] !== "Not specified" && (
                <View>
                  <Text style={styles.sectionTitle}>My ethnicity</Text>
                  <View style={styles.tagsRow}>
                    {currentUser?.ethnicity.map((item, index) => (
                      <View key={index} style={styles.basicTag}>
                        <Text style={styles.tagText}>{item}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

            {currentUser?.nationalities.length > 0 &&
              currentUser?.nationalities[0] !== "Not specified" && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>My nationalities</Text>
                  <View style={styles.tagsRow}>
                    {currentUser?.nationalities.map((item, index) => (
                      <View key={index} style={styles.basicTag}>
                        <Text style={styles.tagText}>{item}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

            {currentUser?.languages.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Languages I know</Text>
                <View style={styles.tagsRow}>
                  {currentUser?.languages.map((lang, index) => (
                    <View
                      key={index}
                      style={[
                        styles.basicTag,
                        lang.isShared && { backgroundColor: palette.PINK },
                      ]}
                    >
                      <Text
                        style={[
                          styles.tagText,
                          lang.isShared && { color: palette.WHITE },
                        ]}
                      >
                        {lang.name}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}

        {currentUser?.galleryImages.length > 1 &&
          currentUser.galleryImages
            .slice(1)
            .map((img, index) => (
              <Image
                key={`gallery-${index}`}
                source={img}
                style={styles.galleryPhoto}
                contentFit="cover"
              />
            ))}

        {/* Interests + Location card */}
        {((currentUser?.interests.length > 0 &&
          currentUser?.interests[0]?.name !== "No interests yet") ||
          (currentUser?.location &&
            currentUser?.location !== "Location not available")) && (
          <View style={styles.sectionCard}>
            {currentUser?.interests.length > 0 &&
              currentUser?.interests[0]?.name !== "No interests yet" && (
                <View>
                  <Text style={styles.sectionTitle}>My interests</Text>
                  <View style={styles.tagsRow}>
                    {currentUser?.interests.map((interest, index) => (
                      <View
                        key={index}
                        style={[
                          styles.basicTag,
                          interest.isShared && {
                            backgroundColor: palette.PINK,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.tagText,
                            interest.isShared && { color: palette.WHITE },
                          ]}
                        >
                          {interest.name}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

            {currentUser?.location &&
              currentUser?.location !== "Location not available" && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>My location</Text>
                  <Text style={styles.sectionValue}>
                    {currentUser?.location}
                  </Text>
                </View>
              )}
          </View>
        )}

        <View style={styles.loveLetterContainer}>
          <View style={layout.flex1}>
            <Text style={styles.sectionTitle}>Love letter</Text>

            <TextInput
              placeholder="Send a Love Letter"
              style={styles.loveLetterInput}
              multiline
              numberOfLines={5}
              value={loveLetterText}
              onChangeText={setLoveLetterText}
              editable={!isSendingLoveLetter}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.shareButton,
              isSendingLoveLetter && { opacity: 0.6 },
            ]}
            activeOpacity={0.7}
            onPress={handleSendLoveLetter}
            disabled={isSendingLoveLetter || !loveLetterText.trim()}
          >
            {isSendingLoveLetter ? (
              <ActivityIndicator size="small" color={palette.PINK} />
            ) : (
              <LoveLetterSend />
            )}
          </TouchableOpacity>
        </View>

        <View
          style={[common.line, spacing.marginTop12, spacing.marginBottom12]}
        />

        <Text style={styles.text11}>
          Pour out your mind to {currentUser?.name} the old fashioned way
        </Text>

        <View style={spacing.marginTop44}>
          <TouchableOpacity style={styles.footerButton}>
            <Text style={styles.footerButtonText}>Share profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.footerButton}>
            <Text style={styles.footerButtonText}>
              Block & Report | {currentUser?.name}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Match;
