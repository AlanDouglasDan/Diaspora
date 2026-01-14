import React, { FC } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Image } from "expo-image";
import { Ionicons, FontAwesome5, Entypo } from "@expo/vector-icons";

import { palette, layout } from "core/styles";
import { LayoutContainer } from "components/layoutContainer";
import { Button } from "components/button";
import { ProgressBar } from "components/progressBar";

import type { ProfileInfoScreenProps } from "./ProfileInfo.types";
import { styles } from "./ProfileInfo.styles";
import { useProfileInfoLogic } from "./useProfileInfoLogic";

const ProfileInfo: FC<ProfileInfoScreenProps> = (props) => {
  const { navigation } = props;
  const {
    userData,
    bio,
    setBio,
    sections,
    handlePreview,
    handleVerify,
    profileCompletion,
    photos,
    handleSelectPhoto,
    mainPhotoSize,
    smallPhotoSize,
    handleEditInterests,
    handleFieldPress,
    getFieldDisplayValue,
  } = useProfileInfoLogic(props);

  const renderFieldIcon = (iconName: string) => {
    return (
      <View style={styles.fieldIcon}>
        <FontAwesome5 name={iconName} size={14} color={palette.GREY2} />
      </View>
    );
  };

  const renderPhotoSlot = (index: number, isMain: boolean = false) => {
    const photo = photos[index];
    const size = isMain ? mainPhotoSize : smallPhotoSize;

    if (photo) {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => handleSelectPhoto(index)}
          activeOpacity={0.8}
        >
          <Image
            source={{ uri: photo }}
            style={{
              width: size,
              height: size,
              borderRadius: 8,
            }}
            contentFit="cover"
          />
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        key={index}
        style={{
          width: size,
          height: size,
          borderRadius: 8,
          backgroundColor: palette.GREY,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => handleSelectPhoto(index)}
        activeOpacity={0.7}
      >
        <Entypo name="plus" size={isMain ? 32 : 24} color={palette.GREY2} />
      </TouchableOpacity>
    );
  };

  return (
    <LayoutContainer style={styles.container} edges={["top", "bottom"]}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={palette.BLACK} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{profileCompletion}% complete</Text>

          <ProgressBar
            progress={profileCompletion / 100}
            style={styles.headerProgress}
          />
        </View>

        <TouchableOpacity onPress={handlePreview}>
          <Text style={styles.previewButton}>Preview</Text>
        </TouchableOpacity>
      </View>

      {/* Photos Grid - 3x3 with first slot being 2x2 */}
      <View style={styles.photosGrid}>
        {/* Row 1: Main photo (2x2) + 2 small photos stacked */}
        <View style={{ flexDirection: "row", gap: 4 }}>
          {renderPhotoSlot(0, true)}
          <View style={{ gap: 4 }}>
            {renderPhotoSlot(1)}
            {renderPhotoSlot(2)}
          </View>
        </View>

        {/* Row 2: 3 small photos */}
        <View style={{ flexDirection: "row", gap: 4, marginTop: 4 }}>
          {renderPhotoSlot(3)}
          {renderPhotoSlot(4)}
          {renderPhotoSlot(5)}
        </View>
      </View>

      {/* User Info */}
      <TouchableOpacity style={styles.sectionContainer}>
        <View style={styles.flexedRow}>
          <Text style={styles.userName}>
            {userData.name}, {userData.age}
          </Text>

          <Text style={styles.semiheader14}>Male</Text>
        </View>

        <View style={styles.flexedRow}>
          <Ionicons name="location-outline" size={20} color={palette.GREY2} />

          <Text style={[styles.semiheader14, { flex: 1 }]}>
            {userData.location}
          </Text>

          <Ionicons name="chevron-forward" size={16} color={palette.GREY2} />
        </View>

        <View style={styles.flexedRow}>
          <Text style={[styles.semiheader14, { flex: 1 }]}>
            {userData.countryFlag} {userData.country}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Why You're Here Section */}
      {sections
        .filter((section) => section.id === "whyHere")
        .map((section) => (
          <TouchableOpacity key={section.id} style={styles.sectionContainer}>
            <View style={layout.spacedRow}>
              <View>
                <Text style={styles.sectionTitle}>Why You're Here</Text>

                <Text style={styles.fieldValue}>{section.fields[0]?.value}</Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={16}
                color={palette.GREY2}
                style={{ marginLeft: 8 }}
              />
            </View>
          </TouchableOpacity>
        ))}

      {/* Bio Section */}
      <View style={styles.sectionContainer}>
        <View style={layout.spacedRow}>
          <Text style={styles.sectionTitle}>Bio</Text>
        </View>

        <View style={styles.sectionContent}>
          <TextInput
            style={styles.bioInput}
            value={bio}
            onChangeText={setBio}
            placeholder="Write about yourself"
            placeholderTextColor={`${palette.GREY2}60`}
            multiline
            maxLength={400}
          />

          <Text style={styles.bioCounter}>{bio.length}/400</Text>
        </View>
      </View>

      {/* About Me Section */}
      {sections
        .filter((s) => s.id !== "whyHere" && s.id !== "interests")
        .map((section) => (
          <View key={section.id} style={styles.sectionContainer}>
            <View style={layout.spacedRow}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>

            <View style={styles.sectionContent}>
              {section.fields.map((field) => (
                <TouchableOpacity
                  key={field.id}
                  style={styles.fieldRow}
                  onPress={() => handleFieldPress(field.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.fieldLeft}>
                    {field.icon && renderFieldIcon(field.icon)}
                    <View style={styles.fieldLabelContainer}>
                      <Text style={styles.fieldLabel}>{field.label}</Text>

                      {field.subLabel && (
                        <Text style={styles.fieldSubLabel}>
                          {field.subLabel}
                        </Text>
                      )}
                    </View>
                  </View>

                  <Text style={styles.fieldValue}>
                    {getFieldDisplayValue(field.id) || field.value}
                  </Text>

                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={palette.GREY2}
                    style={styles.fieldChevron}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

      {/* Interests Section */}
      {sections
        .filter((s) => s.id === "interests")
        .map((section) => (
          <TouchableOpacity
            key={section.id}
            style={styles.sectionContainer}
            onPress={handleEditInterests}
            activeOpacity={0.7}
          >
            <View style={layout.spacedRow}>
              <Text style={styles.sectionTitle}>Interests</Text>

              <View style={styles.flexedRow}>
                <Text style={styles.sectionEdit}>Edit</Text>

                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color={palette.GREY2}
                  style={styles.fieldChevron}
                />
              </View>
            </View>

            <View style={styles.sectionContent}>
              <Text style={styles.fieldValue}>{section.fields[0]?.value}</Text>
            </View>
          </TouchableOpacity>
        ))}

      {/* Get Verified Section */}
      <View style={styles.verifySection}>
        <Text style={styles.verifyTitle}>Get verified</Text>

        <Text style={styles.verifyDescription}>
          Enhance your chances by letting people you swipe on know you're real
          and verified.
        </Text>

        <Button
          title="Verify by photo"
          onPress={handleVerify}
          prefixIcon={
            <Ionicons name="checkmark-circle" size={20} color={palette.WHITE} />
          }
          style={styles.verifyButton}
        />
      </View>
    </LayoutContainer>
  );
};

export default ProfileInfo;
