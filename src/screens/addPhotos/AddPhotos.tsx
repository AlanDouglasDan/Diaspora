import React, { FC } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome6, Entypo, Feather } from "@expo/vector-icons";

import { LayoutContainer } from "components/layoutContainer";
import { ProgressBar } from "components/progressBar";
import { layout, palette } from "core/styles";
import type { AddPhotosScreenProps } from "./AddPhotos.types";
import { styles } from "./AddPhotos.styles";
import { useAddPhotosLogic } from "./useAddPhotosLogic";

const AddPhotos: FC<AddPhotosScreenProps> = (props) => {
  const {
    photoSlots,
    handleGoBack,
    handlePickImage,
    handleSubmit,
    isValid,
    isLoading,
    isUploading,
  } = useAddPhotosLogic(props);

  return (
    <LayoutContainer>
      <TouchableOpacity onPress={handleGoBack}>
        <Entypo name="chevron-left" size={24} color={palette.BLACK} />
      </TouchableOpacity>

      <ProgressBar progress={1} style={styles.progressBar} />

      <Text style={styles.title}>Add photos</Text>

      <Text style={styles.subtitle}>
        Your photos are your first impression, pick your best angles to show
        potential matches. keep it classy and add at least two photos.
      </Text>

      <View style={styles.photosGrid}>
        {photoSlots.map((slot) => (
          <TouchableOpacity
            key={slot.id}
            style={styles.photoSlot}
            onPress={() => handlePickImage(slot.id)}
          >
            {slot.uri ? (
              <>
                <Image
                  source={{ uri: slot.uri }}
                  style={styles.photoImage}
                  contentFit="cover"
                />
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handlePickImage(slot.id)}
                >
                  <Feather name="edit-2" size={16} color={palette.BLACK} />
                </TouchableOpacity>
              </>
            ) : (
              <Feather name="plus" size={32} color={palette.TEXT_COLOR} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={layout.flex1} />

      <View style={styles.footer}>
        {isUploading && (
          <View style={styles.uploadingContainer}>
            <ActivityIndicator size="small" color={palette.RED} />
            <Text style={styles.uploadingText}>Uploading...</Text>
          </View>
        )}

        <TouchableOpacity
          disabled={!isValid || isLoading || isUploading}
          onPress={handleSubmit}
        >
          <LinearGradient
            colors={[palette.RED2, palette.RED]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={[
              styles.submitButton,
              { opacity: isValid && !isLoading && !isUploading ? 1 : 0.5 },
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

export default AddPhotos;
