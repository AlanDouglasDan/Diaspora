import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import type { AddPhotosScreenProps, PhotoSlot } from "./AddPhotos.types";

const INITIAL_SLOTS: PhotoSlot[] = [
  { id: 1, uri: null },
  { id: 2, uri: null },
  { id: 3, uri: null },
  { id: 4, uri: null },
];

export function useAddPhotosLogic({ navigation }: AddPhotosScreenProps) {
  const [photoSlots, setPhotoSlots] = useState<PhotoSlot[]>(INITIAL_SLOTS);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handlePickImage = async (slotId: number) => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access photos is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setPhotoSlots((prev) =>
        prev.map((slot) =>
          slot.id === slotId ? { ...slot, uri: result.assets[0].uri } : slot
        )
      );
    }
  };

  const handleSubmit = () => {
    navigation.navigate("SetupComplete");
  };

  const photosCount = photoSlots.filter((slot) => slot.uri !== null).length;
  const isValid = photosCount >= 1;

  return {
    photoSlots,
    handleGoBack,
    handlePickImage,
    handleSubmit,
    isValid,
  };
}
