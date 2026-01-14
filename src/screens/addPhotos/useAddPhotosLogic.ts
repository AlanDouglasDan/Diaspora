import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { useUser } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";

import type { AddPhotosScreenProps, PhotoSlot } from "./AddPhotos.types";
import {
  useGetUploadUrl,
  useUploadToCloudinary,
  useSaveImages,
} from "@/src/api/image";

const INITIAL_SLOTS: PhotoSlot[] = [
  { id: 1, uri: null },
  { id: 2, uri: null },
  { id: 3, uri: null },
  { id: 4, uri: null },
];

export function useAddPhotosLogic({ navigation }: AddPhotosScreenProps) {
  const { user } = useUser();
  const { data: uploadUrlData, getUploadUrl } = useGetUploadUrl();
  const { uploadToCloudinary } = useUploadToCloudinary();
  const { saveImages } = useSaveImages();

  const [photoSlots, setPhotoSlots] = useState<PhotoSlot[]>(INITIAL_SLOTS);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    getUploadUrl().catch(console.error);
  }, [getUploadUrl]);

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
      const localUri = result.assets[0].uri;

      // Show local image immediately while uploading
      setPhotoSlots((prev) =>
        prev.map((slot) =>
          slot.id === slotId ? { ...slot, uri: localUri } : slot
        )
      );

      // Upload to Cloudinary
      if (uploadUrlData) {
        setIsUploading(true);
        try {
          const imageUrl = await uploadToCloudinary({
            localUri,
            uploadData: uploadUrlData,
            fileName: `upload_${slotId}.jpg`,
          });

          if (imageUrl) {
            // Update with Cloudinary URL
            setPhotoSlots((prev) =>
              prev.map((slot) =>
                slot.id === slotId ? { ...slot, uri: imageUrl } : slot
              )
            );
          }
        } catch (error: any) {
          console.error("Upload error:", error);
          Toast.show({
            type: "error",
            text1: "Upload Failed",
            text2:
              error?.message || "Could not upload image. Please try again.",
          });
          // Revert to null on error
          setPhotoSlots((prev) =>
            prev.map((slot) =>
              slot.id === slotId ? { ...slot, uri: null } : slot
            )
          );
        } finally {
          setIsUploading(false);
        }
      }
    }
  };

  const handleSubmit = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      // Collect all uploaded image URLs
      const uploadedImageUrls = photoSlots
        .filter((slot) => slot.uri !== null)
        .map((slot, idx) => ({
          imageUrl: slot.uri!,
          order: idx + 1,
          userId: user.id,
        }));

      // Save uploaded images to backend
      await saveImages({
        userId: user.id,
        images: uploadedImageUrls,
      });

      Toast.show({
        type: "success",
        text1: "Photos Saved!",
        text2: "Your photos have been uploaded successfully",
      });

      navigation.navigate("SetupComplete");
    } catch (error: any) {
      console.error("Save images error:", error);
      Toast.show({
        type: "error",
        text1: "Save Failed",
        text2: error?.message || "Could not save images. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const photosCount = photoSlots.filter((slot) => slot.uri !== null).length;
  const isValid = photosCount >= 1;

  return {
    photoSlots,
    handleGoBack,
    handlePickImage,
    handleSubmit,
    isValid,
    isLoading,
    isUploading,
  };
}
