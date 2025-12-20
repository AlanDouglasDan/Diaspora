import React, { FC, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Image } from "expo-image";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";

import LoveLetterSend from "components/svg/LoveLetterSend";
import { common, layout, palette, spacing } from "core/styles";

import { styles, CARD_HEIGHT } from "./Match.styles";
import { useMatchLogic } from "./useMatchLogic";
import type { MatchScreenProps, UserProfile } from "./Match.types";

const Match: FC<MatchScreenProps> = (props) => {
  const {
    users,
    currentUser,
    cardIndex,
    isSwipingEnabled,
    swiperRef,
    handleOpenImages,
    handleDislike,
    handleSuperLike,
    handleLike,
    handleSwipedLeft,
    handleSwipedRight,
    handleSwipedAll,
    handleScroll,
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

              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={handleDislike}
                  activeOpacity={0.8}
                >
                  <FontAwesome name="close" size={24} color={palette.RED} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    { backgroundColor: palette.RED },
                  ]}
                  onPress={handleSuperLike}
                  activeOpacity={0.8}
                >
                  <FontAwesome name="star" size={24} color={palette.WHITE} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={handleLike}
                  activeOpacity={0.8}
                >
                  <FontAwesome name="heart" size={22} color={palette.RED} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      );
    },
    [handleOpenImages, handleDislike, handleSuperLike, handleLike]
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.swiperContainer}>
          <Swiper
            ref={swiperRef}
            cards={users}
            cardIndex={cardIndex % users.length}
            renderCard={renderCard}
            onSwipedLeft={handleSwipedLeft}
            onSwipedRight={handleSwipedRight}
            onSwipedAll={handleSwipedAll}
            stackSize={3}
            stackScale={5}
            stackSeparation={14}
            animateCardOpacity
            animateOverlayLabelsOpacity
            disableTopSwipe
            disableBottomSwipe
            horizontalSwipe={isSwipingEnabled}
            verticalSwipe={false}
            backgroundColor="transparent"
            cardVerticalMargin={0}
            cardHorizontalMargin={0}
            useViewOverflow={false}
            cardStyle={styles.swiperCard}
            containerStyle={styles.swiperInnerContainer}
            infinite
            overlayLabels={{
              left: {
                title: "NOPE",
                style: {
                  label: {
                    backgroundColor: palette.RED,
                    color: palette.WHITE,
                    fontSize: 24,
                    borderRadius: 8,
                    padding: 10,
                  },
                  wrapper: {
                    flexDirection: "column",
                    alignItems: "flex-end",
                    justifyContent: "flex-start",
                    marginTop: 30,
                    marginLeft: -30,
                  },
                },
              },
              right: {
                title: "LIKE",
                style: {
                  label: {
                    backgroundColor: "#4DED30",
                    color: palette.WHITE,
                    fontSize: 24,
                    borderRadius: 8,
                    padding: 10,
                  },
                  wrapper: {
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    marginTop: 30,
                    marginLeft: 30,
                  },
                },
              },
            }}
          />
        </View>

        <View style={spacing.marginTop12}>
          <Text style={styles.text14}>My bio</Text>

          <Text style={styles.semiheader16}>{currentUser.bio}</Text>
        </View>

        {/* Info Tags */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compatibility</Text>

          <View style={styles.tagsRow}>
            {currentUser.compatibility.map((item, index) => (
              <View key={index} style={styles.basicTag}>
                <Text style={styles.tagText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About me</Text>

          <View style={styles.tagsRow}>
            {currentUser.aboutMe.map((item, index) => (
              <View key={index} style={styles.basicTag}>
                <Text style={styles.tagText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>School</Text>
          <Text style={styles.sectionValue}>{currentUser.school}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work title</Text>
          <Text style={styles.sectionValue}>{currentUser.workTitle}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Company</Text>
          <Text style={styles.sectionValue}>{currentUser.company}</Text>
        </View>

        <Image
          source={currentUser.avatar}
          style={styles.galleryPhoto}
          contentFit="cover"
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My ethnicity</Text>

          <View style={styles.tagsRow}>
            {currentUser.ethnicity.map((item, index) => (
              <View key={index} style={styles.basicTag}>
                <Text style={styles.tagText}>{item}</Text>
              </View>
            ))}
          </View>

          <View style={[common.line, spacing.marginTop12]} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>My nationalities</Text>

            <View style={styles.tagsRow}>
              {currentUser.nationalities.map((item, index) => (
                <View key={index} style={styles.basicTag}>
                  <Text style={styles.tagText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages I know</Text>

            <View style={styles.tagsRow}>
              {currentUser.languages.map((lang, index) => (
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
        </View>

        <Image
          source={currentUser.avatar}
          style={styles.galleryPhoto}
          contentFit="cover"
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My interests</Text>

          <View style={styles.tagsRow}>
            {currentUser.interests.map((interest, index) => (
              <View
                key={index}
                style={[
                  styles.basicTag,
                  interest.isShared && { backgroundColor: palette.PINK },
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My location</Text>

          <Text style={styles.sectionValue}>{currentUser.location}</Text>
        </View>

        <View style={styles.loveLetterContainer}>
          <View style={layout.flex1}>
            <Text style={styles.sectionTitle}>Love letter</Text>

            <TextInput
              placeholder="Send a Love Letter"
              style={styles.loveLetterInput}
            />
          </View>

          <TouchableOpacity style={styles.shareButton} activeOpacity={0.7}>
            <LoveLetterSend />
          </TouchableOpacity>
        </View>

        <View
          style={[common.line, spacing.marginTop12, spacing.marginBottom12]}
        />

        <Text style={styles.text11}>
          Pour out your mind to {currentUser.name} the old fashioned way
        </Text>

        <View style={spacing.marginTop44}>
          <TouchableOpacity style={styles.footerButton}>
            <Text style={styles.footerButtonText}>Share profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.footerButton}>
            <Text style={styles.footerButtonText}>
              Block & Report | {currentUser.name}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Match;
