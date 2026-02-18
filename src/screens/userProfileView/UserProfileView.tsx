import React, { FC, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

import { palette, layout, spacing, common } from "core/styles";
import { LayoutContainer } from "components/layoutContainer";
import LoveLetterSend from "components/svg/LoveLetterSend";
import { useGetUserPreference } from "@/src/api/preferences/useGetUserPreference";
import type { Preference } from "@/src/api/preferences/types";

import type { UserProfileViewScreenProps } from "./UserProfileView.types";
import { styles } from "./UserProfileView.styles";

const UserProfileView: FC<UserProfileViewScreenProps> = ({
  navigation,
  route,
}) => {
  const { userId, avatar, userName } = route.params;

  const { data: prefs, getUserPreference, isLoading } = useGetUserPreference();

  const [loveLetterText, setLoveLetterText] = useState("");

  useEffect(() => {
    if (userId) {
      getUserPreference(userId);
    }
  }, [userId]);

  const displayName = userName || "User";

  // Helper to build about me tags from preferences
  const buildAboutMeTags = (p: Preference): string[] => {
    const tags: string[] = [];
    if (p.height) tags.push(p.height);
    if (p.bodyType) tags.push(p.bodyType);
    if (p.zodiac) tags.push(p.zodiac);
    if (p.religion) tags.push(p.religion);
    if (p.education) tags.push(p.education);
    if (p.familyPlans) tags.push(p.familyPlans);
    if (p.pets) tags.push(p.pets);
    if (p.smoking) tags.push("Smokes");
    if (p.drinking) tags.push("Drinks");
    if (p.sexuality) tags.push(p.sexuality);
    if (p.dietaryPreference) tags.push(p.dietaryPreference);
    if (p.workoutFrequency) tags.push(`Works out: ${p.workoutFrequency}`);
    if (p.personality) tags.push(p.personality);
    if (p.loveLanguage) tags.push(p.loveLanguage);
    if (p.sleepingHabits) tags.push(p.sleepingHabits);
    if (p.travelPlans) tags.push(p.travelPlans);
    return tags;
  };

  if (isLoading) {
    return (
      <LayoutContainer>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={palette.PINK} />
        </View>
      </LayoutContainer>
    );
  }

  return (
    <LayoutContainer
      edges={["top"]}
      header={
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color={palette.BLACK} />
          </TouchableOpacity>
        </View>
      }
    >
      {/* Hero Image */}
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={() => {
          navigation.navigate("Images", {
            images: [{ uri: avatar }],
          });
        }}
        style={styles.heroImageContainer}
      >
        <Image
          source={{ uri: avatar }}
          style={styles.heroImage}
          contentFit="cover"
        />

        <View style={styles.heroOverlay}>
          <View style={styles.nameRow}>
            <Text style={styles.nameText}>{displayName}</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Bio */}
      {prefs?.bio ? (
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>My bio</Text>
          <Text style={styles.semiheader16}>{prefs.bio}</Text>
        </View>
      ) : null}

      {/* About Me tags */}
      {prefs && buildAboutMeTags(prefs).length > 0 && (
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>About me</Text>
          <View style={styles.tagsRow}>
            {buildAboutMeTags(prefs).map((item, index) => (
              <View key={index} style={styles.basicTag}>
                <Text style={styles.tagText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* School / Work / Company */}
      {(prefs?.school || prefs?.jobTitle || prefs?.company) && (
        <View style={styles.sectionCard}>
          {prefs.school ? (
            <View>
              <Text style={styles.sectionTitle}>School</Text>
              <Text style={styles.sectionValue}>{prefs.school}</Text>
            </View>
          ) : null}

          {prefs.jobTitle ? (
            <View style={{ marginTop: prefs.school ? 12 : 0 }}>
              <Text style={styles.sectionTitle}>Work title</Text>
              <Text style={styles.sectionValue}>{prefs.jobTitle}</Text>
            </View>
          ) : null}

          {prefs.company ? (
            <View style={{ marginTop: 12 }}>
              <Text style={styles.sectionTitle}>Company</Text>
              <Text style={styles.sectionValue}>{prefs.company}</Text>
            </View>
          ) : null}
        </View>
      )}

      {/* Ethnicity + Language */}
      {(prefs?.ethnicity || prefs?.language) && (
        <View style={styles.sectionCard}>
          {prefs.ethnicity ? (
            <View>
              <Text style={styles.sectionTitle}>My ethnicity</Text>
              <View style={styles.tagsRow}>
                <View style={styles.basicTag}>
                  <Text style={styles.tagText}>{prefs.ethnicity}</Text>
                </View>
              </View>
            </View>
          ) : null}

          {prefs.language ? (
            <View style={{ marginTop: prefs.ethnicity ? 16 : 0 }}>
              <Text style={styles.sectionTitle}>Languages</Text>
              <View style={styles.tagsRow}>
                <View style={styles.basicTag}>
                  <Text style={styles.tagText}>{prefs.language}</Text>
                </View>
              </View>
            </View>
          ) : null}
        </View>
      )}

      {/* Interests */}
      {prefs?.interests && prefs.interests.length > 0 && (
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>My interests</Text>
          <View style={styles.tagsRow}>
            {prefs.interests.map((interest, index) => (
              <View key={index} style={styles.basicTag}>
                <Text style={styles.tagText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Looking to date */}
      {prefs?.lookingToDate && prefs.lookingToDate.length > 0 && (
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Looking for</Text>
          <View style={styles.tagsRow}>
            {prefs.lookingToDate.map((item, index) => (
              <View key={index} style={styles.basicTag}>
                <Text style={styles.tagText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Love Letter */}
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
          />
        </View>

        <TouchableOpacity
          style={[
            styles.shareButton,
            !loveLetterText.trim() && { opacity: 0.6 },
          ]}
          activeOpacity={0.7}
          disabled={!loveLetterText.trim()}
        >
          <LoveLetterSend />
        </TouchableOpacity>
      </View>

      <View
        style={[common.line, spacing.marginTop12, spacing.marginBottom12]}
      />

      <Text style={styles.text11}>
        Pour out your mind to {displayName} the old fashioned way
      </Text>

      {/* Footer */}
      <View style={spacing.marginTop44}>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Share profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>
            Block & Report | {displayName}
          </Text>
        </TouchableOpacity>
      </View>
    </LayoutContainer>
  );
};

export default UserProfileView;
