import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { useWindowDimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SheetManager } from "react-native-actions-sheet";
import { useUser } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";

import { useAppSelector, useAppDispatch, setPreferences } from "@/src/store";
import { calculateAge, calculateProfileProgress } from "@/src/core/utils";
import { useGetProfile, useUpdateProfile } from "@/src/api/profile";
import { useGetPreference, useUpdatePreference } from "@/src/api/preferences";
import { setProfile } from "@/src/store/slices/profileSlice";
import {
  useGetUploadUrl,
  useUploadToCloudinary,
  useSaveImages,
} from "@/src/api/image";

import images from "../../../assets/images";
import type {
  ProfileInfoScreenProps,
  ProfileSection,
} from "./ProfileInfo.types";
import {
  LANGUAGE_OPTIONS,
  EDUCATION_OPTIONS,
  PET_OPTIONS,
  SMOKING_OPTIONS,
  DRINKING_OPTIONS,
  RELIGION_OPTIONS,
  ZODIAC_OPTIONS,
  ETHNICITY_OPTIONS,
  HEIGHT_OPTIONS,
  FAMILY_PLANS_OPTIONS,
  SEXUALITY_OPTIONS,
  BODY_TYPE_OPTIONS,
  DIETARY_PREFERENCE_OPTIONS,
  SLEEPING_HABITS_OPTIONS,
  WORKOUT_FREQUENCY_OPTIONS,
  LOVE_LANGUAGE_OPTIONS,
  TRAVEL_PLANS_OPTIONS,
  PERSONALITY_OPTIONS,
  PERSONALITY_PROFILE_OPTIONS,
  RELATIONSHIP_STATUS_OPTIONS,
  WILLING_TO_RELOCATE_OPTIONS,
  OPENNESS_TO_LONG_DISTANCE_OPTIONS,
} from "@/src/core/constants";

const PRONOUNS_OPTIONS = [
  { id: "he_him", label: "HE/HIM" },
  { id: "she_her", label: "SHE/HER" },
  { id: "they_them", label: "THEY/THEM" },
  { id: "other", label: "OTHER" },
];

const GENDER_OPTIONS = [
  { id: "man", label: "MAN" },
  { id: "woman", label: "WOMAN" },
  { id: "non_binary", label: "NON-BINARY" },
  { id: "other", label: "OTHER" },
];

const LOOKING_FOR_OPTIONS = [
  { id: "man", label: "MAN" },
  { id: "woman", label: "WOMAN" },
  { id: "nonbinary", label: "NON-BINARY" },
];

export const useProfileInfoLogic = ({ navigation }: ProfileInfoScreenProps) => {
  const { width: screenWidth } = useWindowDimensions();
  const { user } = useUser();
  const profileData = useAppSelector((state) => state.profile.data);
  const preferencesData = useAppSelector((state) => state.preferences.data);

  const dispatch = useAppDispatch();
  const { getProfile } = useGetProfile();
  const { getPreference } = useGetPreference();
  const { updatePreference, isLoading: isUpdatingPreference } =
    useUpdatePreference();
  const { updateProfile, isLoading: isUpdatingProfile } = useUpdateProfile();

  // Photo upload hooks
  const { data: uploadUrlData, getUploadUrl } = useGetUploadUrl();
  const { uploadToCloudinary } = useUploadToCloudinary();
  const { saveImages } = useSaveImages();
  const [isUploading, setIsUploading] = useState(false);

  // Debounce timer ref for bio
  const bioDebounceRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch profile data if not in Redux
  useEffect(() => {
    if (!profileData && user?.id) {
      getProfile(user.id);
    }
  }, [profileData, user?.id, getProfile]);

  // Fetch preferences data if not in Redux
  useEffect(() => {
    if (!preferencesData && user?.id) {
      getPreference(user.id);
    }
  }, [preferencesData, user?.id, getPreference]);

  // Get upload URL on mount
  useEffect(() => {
    getUploadUrl().catch(console.error);
  }, [getUploadUrl]);

  const [bio, setBio] = useState("");
  // Photos array: 6 slots, null means empty
  const [photos, setPhotos] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  // Field values state
  const [fieldValues, setFieldValues] = useState<
    Record<string, string | string[]>
  >({});

  const profileCompletion = profileData
    ? calculateProfileProgress(profileData, preferencesData)
    : 0;

  // Prefill data from Redux
  useEffect(() => {
    if (profileData) {
      // Set bio
      if (profileData.bio) {
        setBio(profileData.bio);
      }

      // Set photos from images array
      if (profileData.images && profileData.images.length > 0) {
        const newPhotos = [...photos];
        profileData.images.forEach((image, index) => {
          if (index < 6) {
            newPhotos[index] = image;
          }
        });
        setPhotos(newPhotos);
      }

      // Set field values from user data
      const newFieldValues: Record<string, string | string[]> = {};

      if (profileData.user) {
        if (profileData.user.name) {
          newFieldValues.name = profileData.user.name;
        }
        if (profileData.user.gender) {
          newFieldValues.gender = profileData.user.gender.toLowerCase();
        }
        if (profileData.user.age) {
          newFieldValues.age = profileData.user.age;
        }
      }

      setFieldValues((prev) => ({ ...prev, ...newFieldValues }));
    }
  }, [profileData]);

  useEffect(() => {
    if (preferencesData) {
      const newFieldValues: Record<string, string | string[]> = {};

      // Map preferences data to field values
      if (preferencesData.education) {
        newFieldValues.education = preferencesData.education;
      }
      if (preferencesData.pets) {
        newFieldValues.pets = preferencesData.pets;
      }
      if (preferencesData.smoking !== undefined) {
        newFieldValues.smoking = preferencesData.smoking ? "yes" : "no";
      }
      if (preferencesData.drinking !== undefined) {
        newFieldValues.drinking = preferencesData.drinking ? "yes" : "no";
      }
      if (preferencesData.religion) {
        newFieldValues.religion = preferencesData.religion;
      }
      if (preferencesData.zodiac) {
        newFieldValues.zodiac = preferencesData.zodiac;
      }
      if (preferencesData.language) {
        newFieldValues.language = preferencesData.language;
      }
      if (preferencesData.familyPlans) {
        newFieldValues.familyPlans = preferencesData.familyPlans;
      }
      if (preferencesData.height) {
        newFieldValues.height = preferencesData.height;
      }
      if (preferencesData.pronouns) {
        newFieldValues.pronouns = preferencesData.pronouns;
      }
      if (preferencesData.ethnicity) {
        newFieldValues.ethnicity = preferencesData.ethnicity;
      }
      if (preferencesData.interests && preferencesData.interests.length > 0) {
        newFieldValues.interests = preferencesData.interests;
      }
      // New fields
      if (preferencesData.jobTitle) {
        newFieldValues.jobTitle = preferencesData.jobTitle;
      }
      if (preferencesData.company) {
        newFieldValues.company = preferencesData.company;
      }
      if (preferencesData.school) {
        newFieldValues.school = preferencesData.school;
      }
      if (preferencesData.sexuality) {
        newFieldValues.sexuality = preferencesData.sexuality;
      }
      if (preferencesData.bodyType) {
        newFieldValues.bodyType = preferencesData.bodyType;
      }
      if (preferencesData.dietaryPreference) {
        newFieldValues.dietaryPreference = preferencesData.dietaryPreference;
      }
      if (preferencesData.sleepingHabits) {
        newFieldValues.sleepingHabits = preferencesData.sleepingHabits;
      }
      if (preferencesData.workoutFrequency) {
        newFieldValues.workoutFrequency = preferencesData.workoutFrequency;
      }
      if (preferencesData.loveLanguage) {
        newFieldValues.loveLanguage = preferencesData.loveLanguage;
      }
      if (preferencesData.travelPlans) {
        newFieldValues.travelPlans = preferencesData.travelPlans;
      }
      if (preferencesData.personality) {
        newFieldValues.personality = preferencesData.personality;
      }
      if (preferencesData.personalityProfile) {
        newFieldValues.personalityProfile = preferencesData.personalityProfile;
      }
      if (preferencesData.relationshipStatus) {
        newFieldValues.relationshipStatus = preferencesData.relationshipStatus;
      }
      if (preferencesData.willingToRelocate !== undefined) {
        newFieldValues.willingToRelocate = preferencesData.willingToRelocate
          ? "yes"
          : "no";
      }
      if (preferencesData.opennessToLongDistance !== undefined) {
        newFieldValues.opennessToLongDistance =
          preferencesData.opennessToLongDistance ? "yes" : "no";
      }
      if (preferencesData.lookingToDate) {
        newFieldValues.lookingFor = preferencesData.lookingToDate;
      }

      setFieldValues((prev) => ({ ...prev, ...newFieldValues }));
    }
  }, [preferencesData]);

  // Calculate photo sizes based on screen width
  const HORIZONTAL_PADDING = 20;
  const GAP = 4;
  const gridWidth = screenWidth - HORIZONTAL_PADDING * 2;
  // Main photo takes 2 columns worth of space
  // 3 columns total, so small = (gridWidth - 2*GAP) / 3
  const smallPhotoSize = Math.floor((gridWidth - 2 * GAP) / 3);
  const mainPhotoSize = smallPhotoSize * 2 + GAP;

  const userData = {
    name: profileData?.user?.name || "User",
    age: profileData?.user?.age ? calculateAge(profileData.user.age) : 0,
    location: "N/A", // Location not available in current API response
    country: "N/A",
    countryFlag: "🏠",
  };

  const handleSelectPhoto = useCallback(
    async (index: number) => {
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
        setPhotos((prev) =>
          prev.map((photo, idx) => (idx === index ? localUri : photo)),
        );

        // Upload to Cloudinary
        if (uploadUrlData && user?.id) {
          setIsUploading(true);
          try {
            const imageUrl = await uploadToCloudinary({
              localUri,
              uploadData: uploadUrlData,
              fileName: `profile_${index}.jpg`,
            });

            if (imageUrl) {
              // Update with Cloudinary URL
              setPhotos((prev) => {
                const newPhotos = prev.map((photo, idx) =>
                  idx === index ? imageUrl : photo,
                );

                // Save to backend
                const uploadedImages = newPhotos
                  .filter((photo): photo is string => photo !== null)
                  .map((photo, idx) => ({
                    imageUrl: photo,
                    order: idx + 1,
                    userId: user.id,
                  }));

                saveImages({
                  userId: user.id,
                  images: uploadedImages,
                })
                  .then(() => {
                    // Toast.show({
                    //   type: "success",
                    //   text1: "Photo Uploaded",
                    //   text2: "Your photo has been saved successfully",
                    // });
                  })
                  .catch((error) => {
                    console.error("Save image error:", error);
                    // Toast.show({
                    //   type: "error",
                    //   text1: "Save Failed",
                    //   text2: error?.message || "Could not save image",
                    // });
                  });

                return newPhotos;
              });
            }
          } catch (error: any) {
            console.error("Upload error:", error);
            // Toast.show({
            //   type: "error",
            //   text1: "Upload Failed",
            //   text2:
            //     error?.message || "Could not upload image. Please try again.",
            // });
            // Revert to previous photo on error
            setPhotos((prev) =>
              prev.map((photo, idx) => (idx === index ? null : photo)),
            );
          } finally {
            setIsUploading(false);
          }
        }
      }
    },
    [uploadUrlData, uploadToCloudinary, saveImages, user?.id],
  );

  // Debounced bio update - uses updateProfile endpoint
  const handleBioChange = useCallback(
    (newBio: string) => {
      setBio(newBio);

      // Clear existing debounce timer
      if (bioDebounceRef.current) {
        clearTimeout(bioDebounceRef.current);
      }

      // Set new debounce timer
      bioDebounceRef.current = setTimeout(async () => {
        if (user?.id) {
          try {
            const result = await updateProfile(user.id, { bio: newBio });
            if (result) {
              dispatch(setProfile(result));
            }
            // Toast.show({
            //   type: "success",
            //   text1: "Bio Updated",
            //   text2: "Your bio has been saved",
            // });
          } catch (error: any) {
            console.error("Bio update error:", error);
            // Toast.show({
            //   type: "error",
            //   text1: "Update Failed",
            //   text2: error?.message || "Could not update bio",
            // });
          }
        }
      }, 1000);
    },
    [user?.id, updateProfile, dispatch],
  );

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (bioDebounceRef.current) {
        clearTimeout(bioDebounceRef.current);
      }
    };
  }, []);

  // Helper to update preference field via API
  const updatePreferenceField = useCallback(
    async (fieldId: string, value: string | string[] | boolean) => {
      if (!user?.id || !preferencesData?.id) return;

      try {
        const payload: Record<string, any> = { [fieldId]: value };
        const result = await updatePreference(
          String(preferencesData.id),
          user.id,
          payload,
        );
        if (result) {
          dispatch(setPreferences(result));
        }
        // Refresh profile data after preference update
        await getProfile(user.id);
        // Toast.show({
        //   type: "success",
        //   text1: "Updated",
        //   text2: "Your profile has been updated",
        // });
      } catch (error: any) {
        console.error("Update preference error:", error);
        // Toast.show({
        //   type: "error",
        //   text1: "Update Failed",
        //   text2: error?.message || "Could not update. Please try again.",
        // });
      }
    },
    [user?.id, preferencesData?.id, updatePreference, dispatch, getProfile],
  );

  // Helper to update profile field via API (for bio, interests)
  const updateProfileField = useCallback(
    async (fieldId: string, value: string | string[]) => {
      if (!user?.id) return;

      try {
        const payload: Record<string, any> = { [fieldId]: value };
        const result = await updateProfile(user.id, payload);
        if (result) {
          dispatch(setProfile(result));
        }
        // Toast.show({
        //   type: "success",
        //   text1: "Updated",
        //   text2: "Your profile has been updated",
        // });
      } catch (error: any) {
        console.error("Update profile error:", error);
        // Toast.show({
        //   type: "error",
        //   text1: "Update Failed",
        //   text2: error?.message || "Could not update. Please try again.",
        // });
      }
    },
    [user?.id, updateProfile, dispatch],
  );

  const sections: ProfileSection[] = useMemo(
    () => [
      {
        id: "whyHere",
        title: "Why You're Here",
        fields: [
          {
            id: "why",
            label: "",
            value:
              preferencesData?.lookingToDate &&
              preferencesData.lookingToDate.length > 0
                ? preferencesData.lookingToDate.join(", ")
                : "Empty",
          },
        ],
      },
      {
        id: "aboutMe",
        title: "About Me",
        fields: [
          {
            id: "jobTitle",
            label: "Job Title",
            subLabel: "Write about yourself",
            value: "Empty",
            icon: "briefcase",
          },
          {
            id: "company",
            label: "Company",
            subLabel: "Write about yourself",
            value: "Empty",
            icon: "building",
          },
          {
            id: "education",
            label: "Level of Education",
            value: "Empty",
            icon: "graduation-cap",
          },
          {
            id: "school",
            label: "School",
            value: "Empty",
            icon: "school",
          },
          {
            id: "language",
            label: "Language",
            value: "Empty",
            icon: "language",
          },
          { id: "religion", label: "Religion", value: "Empty", icon: "moon" },
          {
            id: "ethnicity",
            label: "Ethnicity",
            value: "Empty",
            icon: "users",
          },
          {
            id: "sexuality",
            label: "Sexuality",
            value: "Empty",
            icon: "venus-mars",
          },
          { id: "starSign", label: "Star Sign", value: "Empty", icon: "star" },
        ],
      },
      {
        id: "essentials",
        title: "Essentials",
        fields: [
          {
            id: "height",
            label: "Height",
            value: "Empty",
            icon: "ruler-vertical",
          },
          { id: "bodyType", label: "Body Type", value: "Empty", icon: "child" },
          {
            id: "familyPlans",
            label: "Family Plans",
            value: "Empty",
            icon: "baby",
          },
          {
            id: "drinking",
            label: "Drinking",
            value: "Empty",
            icon: "wine-glass",
          },
          { id: "smoking", label: "Smoking", value: "Empty", icon: "smoking" },
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle",
        fields: [
          {
            id: "dietaryPreference",
            label: "Dietary Preference",
            value: "Empty",
            icon: "utensils",
          },
          { id: "pets", label: "Pets", value: "Empty", icon: "paw" },
          {
            id: "sleepingHabits",
            label: "Sleeping Habits",
            value: "Empty",
            icon: "bed",
          },
          {
            id: "workoutFrequency",
            label: "Workout Frequency",
            value: "Empty",
            icon: "dumbbell",
          },
          {
            id: "loveLanguage",
            label: "Love Language",
            value: "Empty",
            icon: "heart",
          },
          // {
          //   id: "socialMediaActivity",
          //   label: "Social Media Activity",
          //   value: "Empty",
          //   icon: "at",
          // },
          {
            id: "travelPlans",
            label: "Travel Plans",
            value: "Empty",
            icon: "plane",
          },
          {
            id: "personality",
            label: "Personality",
            value: "Empty",
            icon: "brain",
          },
          {
            id: "personalityProfile",
            label: "Personality Profile",
            value: "Empty",
            icon: "brain",
          },
        ],
      },
      {
        id: "relationshipPreferences",
        title: "Relationship Preferences",
        fields: [
          {
            id: "relationshipStatus",
            label: "Relationship Status",
            value: "Empty",
            icon: "heart",
          },
          {
            id: "lookingFor",
            label: "Looking For",
            value:
              preferencesData?.lookingToDate &&
              preferencesData.lookingToDate.length > 0
                ? preferencesData.lookingToDate.join(", ")
                : "Empty",
            icon: "search",
          },
          {
            id: "willingToRelocate",
            label: "Willing to Relocate",
            value: "Empty",
            icon: "map-marker-alt",
          },
          {
            id: "opennessToLongDistance",
            label: "Openness to Long Distance",
            value: "Empty",
            icon: "globe",
          },
        ],
      },
      {
        id: "interests",
        title: "Interests",
        editable: true,
        fields: [
          {
            id: "interests",
            label: "",
            value:
              preferencesData?.interests && preferencesData.interests.length > 0
                ? preferencesData.interests.join(", ")
                : "Add your interests here",
          },
        ],
      },
    ],
    [preferencesData],
  );

  const handlePreview = useCallback(() => {
    // TODO: Navigate to preview screen
  }, []);

  const handleVerify = useCallback(() => {
    // TODO: Navigate to verification flow
  }, []);

  const handleEditInterests = useCallback(() => {
    navigation.navigate("EditInterests");
  }, []);

  // Helper to update field value and call API
  const updateFieldValue = useCallback(
    async (fieldId: string, value: string | string[]) => {
      setFieldValues((prev) => ({ ...prev, [fieldId]: value }));

      // Map field IDs to preference field names
      const fieldToPreferenceMap: Record<string, string> = {
        languages: "language",
        education: "education",
        pets: "pets",
        smoking: "smoking",
        drinking: "drinking",
        religion: "religion",
        starSign: "zodiac",
        ethnicity: "ethnicity",
        height: "height",
        familyPlans: "familyPlans",
        pronouns: "pronouns",
        gender: "gender",
        jobTitle: "jobTitle",
        company: "company",
        school: "school",
        sexuality: "sexuality",
        bodyType: "bodyType",
        dietaryPreference: "dietaryPreference",
        sleepingHabits: "sleepingHabits",
        workoutFrequency: "workoutFrequency",
        loveLanguage: "loveLanguage",
        travelPlans: "travelPlans",
        personality: "personality",
        personalityProfile: "personalityProfile",
        relationshipStatus: "relationshipStatus",
        willingToRelocate: "willingToRelocate",
        opennessToLongDistance: "opennessToLongDistance",
      };

      const preferenceField = fieldToPreferenceMap[fieldId];
      if (preferenceField) {
        // Convert boolean fields
        let apiValue: string | string[] | boolean = value;
        if (fieldId === "smoking" || fieldId === "drinking") {
          apiValue = value !== "never";
        }
        if (
          fieldId === "willingToRelocate" ||
          fieldId === "opennessToLongDistance"
        ) {
          apiValue = value === "yes";
        }
        await updatePreferenceField(preferenceField, apiValue);
      }
    },
    [updatePreferenceField],
  );

  // Helper to get display value for a field
  const getFieldDisplayValue = useCallback(
    (fieldId: string, options?: { id: string; label: string }[]) => {
      const value = fieldValues[fieldId];
      if (!value) return "Empty";
      if (Array.isArray(value)) {
        if (value.length === 0) return "Empty";
        if (options) {
          return value
            .map((v) => options.find((o) => o.id === v)?.label || v)
            .join(", ");
        }
        return value.join(", ");
      }
      if (options) {
        return options.find((o) => o.id === value)?.label || value;
      }
      return value;
    },
    [fieldValues],
  );

  // Field click handlers
  const handleFieldPress = useCallback(
    (fieldId: string) => {
      switch (fieldId) {
        case "languages":
        case "language":
          SheetManager.show("profile-field-sheet", {
            payload: {
              fieldId: "language",
              title: "Language",
              image: images.language,
              variant: "single-select",
              options: LANGUAGE_OPTIONS,
              initialValue: fieldValues.language || fieldValues.languages || "",
              onSubmit: (value) => updateFieldValue("languages", value),
            },
          });
          break;

        case "school":
          SheetManager.show("profile-field-sheet", {
            payload: {
              fieldId: "school",
              title: "Name of School",
              image: images.academics,
              variant: "text-input",
              placeholder: "What is the name of your school?",
              initialValue: fieldValues.school || "",
              onSubmit: (value) => updateFieldValue("school", value),
            },
          });
          break;

        case "education":
          SheetManager.show("profile-field-sheet", {
            payload: {
              fieldId: "education",
              title: "What's your Level of Education?",
              image: images.academics,
              variant: "select",
              placeholder: "Select level of education",
              selectOptions: EDUCATION_OPTIONS,
              initialValue: fieldValues.education || "",
              onSubmit: (value) => updateFieldValue("education", value),
            },
          });
          break;

        case "pets":
          SheetManager.show("profile-field-sheet", {
            payload: {
              fieldId: "pets",
              title: "Do you have pets?",
              image: images.pets,
              variant: "single-select",
              options: PET_OPTIONS,
              initialValue: fieldValues.pets || "",
              onSubmit: (value) => updateFieldValue("pets", value),
            },
          });
          break;

        case "smoking":
          SheetManager.show("profile-field-sheet", {
            payload: {
              fieldId: "smoking",
              title: "Do you smoke?",
              image: images.smoke,
              variant: "single-select",
              options: SMOKING_OPTIONS,
              initialValue: fieldValues.smoking || "",
              onSubmit: (value) => updateFieldValue("smoking", value),
            },
          });
          break;

        case "drinking":
          SheetManager.show("profile-field-sheet", {
            payload: {
              fieldId: "drinking",
              title: "Do you drink?",
              image: images.drink,
              variant: "single-select",
              options: DRINKING_OPTIONS,
              initialValue: fieldValues.drinking || "",
              onSubmit: (value) => updateFieldValue("drinking", value),
            },
          });
          break;

        case "religion":
          SheetManager.show("profile-field-sheet", {
            payload: {
              fieldId: "religion",
              title: "What is your religion?",
              image: images.language,
              variant: "single-select",
              options: RELIGION_OPTIONS,
              initialValue: fieldValues.religion || "",
              onSubmit: (value) => updateFieldValue("religion", value),
            },
          });
          break;

        case "starSign":
          SheetManager.show("profile-field-sheet", {
            payload: {
              fieldId: "starSign",
              title: "What is your zodiac sign?",
              image: images.language,
              variant: "single-select",
              options: ZODIAC_OPTIONS,
              initialValue: fieldValues.starSign || "",
              onSubmit: (value) => updateFieldValue("starSign", value),
            },
          });
          break;

        case "ethnicity":
          SheetManager.show("profile-field-sheet", {
            payload: {
              fieldId: "ethnicity",
              title: "What is your ethnicity?",
              image: images.language,
              variant: "single-select",
              options: ETHNICITY_OPTIONS,
              initialValue: fieldValues.ethnicity || "",
              onSubmit: (value) => updateFieldValue("ethnicity", value),
            },
          });
          break;

        case "height":
          SheetManager.show("profile-field-sheet", {
            payload: {
              fieldId: "height",
              title: "What is your height?",
              image: images.language,
              variant: "single-select",
              options: HEIGHT_OPTIONS,
              initialValue: fieldValues.height || "",
              onSubmit: (value) => updateFieldValue("height", value),
            },
          });
          break;

        case "familyPlans":
          SheetManager.show("profile-field-sheet", {
            payload: {
              fieldId: "familyPlans",
              title: "What are your family plans?",
              image: images.language,
              variant: "single-select",
              options: FAMILY_PLANS_OPTIONS,
              initialValue: fieldValues.familyPlans || "",
              onSubmit: (value) => updateFieldValue("familyPlans", value),
            },
          });
          break;

        case "pronouns":
          SheetManager.show("profile-field-sheet", {
            payload: {
              fieldId: "pronouns",
              title: "What are your pronouns?",
              image: images.language,
              variant: "single-select",
              options: PRONOUNS_OPTIONS,
              initialValue: fieldValues.pronouns || "",
              onSubmit: (value) => updateFieldValue("pronouns", value),
            },
          });
          break;

        case "gender":
          SheetManager.show("profile-field-sheet", {
            payload: {
              fieldId: "gender",
              title: "What is your gender?",
              image: images.language,
              variant: "single-select",
              options: GENDER_OPTIONS,
              initialValue: fieldValues.gender || "",
              onSubmit: (value) => updateFieldValue("gender", value),
            },
          });
          break;

        case "jobTitle":
          SheetManager.show("profile-field-sheet", {
            payload: {
              fieldId: "jobTitle",
              title: "What is your job title?",
              image: images.language,
              variant: "text-input",
              placeholder: "Enter your job title",
              initialValue: fieldValues.jobTitle || "",
              onSubmit: (value) => updateFieldValue("jobTitle", value),
            },
          });
          break;

        case "company":
          SheetManager.show("profile-field-sheet", {
            payload: {
              fieldId: "company",
              title: "Where do you work?",
              image: images.language,
              variant: "text-input",
              placeholder: "Enter your company name",
              initialValue: fieldValues.company || "",
              onSubmit: (value) => updateFieldValue("company", value),
            },
          });
          break;

        case "sexuality":
          SheetManager.show("profile-field-sheet", {
            payload: {
              fieldId: "sexuality",
              title: "What is your sexuality?",
              image: images.language,
              variant: "single-select",
              options: SEXUALITY_OPTIONS,
              initialValue: fieldValues.sexuality || "",
              onSubmit: (value) => updateFieldValue("sexuality", value),
            },
          });
          break;

        case "bodyType":
          SheetManager.show("profile-field-sheet", {
            payload: {
              fieldId: "bodyType",
              title: "What is your body type?",
              image: images.language,
              variant: "single-select",
              options: BODY_TYPE_OPTIONS,
              initialValue: fieldValues.bodyType || "",
              onSubmit: (value) => updateFieldValue("bodyType", value),
            },
          });
          break;

        case "dietaryPreference":
          SheetManager.show("profile-field-sheet", {
            payload: {
              fieldId: "dietaryPreference",
              title: "What are your dietary preferences?",
              image: images.language,
              variant: "single-select",
              options: DIETARY_PREFERENCE_OPTIONS,
              initialValue: fieldValues.dietaryPreference || "",
              onSubmit: (value) => updateFieldValue("dietaryPreference", value),
            },
          });
          break;

        case "sleepingHabits":
          SheetManager.show("profile-field-sheet", {
            payload: {
              fieldId: "sleepingHabits",
              title: "What are your sleeping habits?",
              image: images.language,
              variant: "single-select",
              options: SLEEPING_HABITS_OPTIONS,
              initialValue: fieldValues.sleepingHabits || "",
              onSubmit: (value) => updateFieldValue("sleepingHabits", value),
            },
          });
          break;

        case "workoutFrequency":
          SheetManager.show("profile-field-sheet", {
            payload: {
              fieldId: "workoutFrequency",
              title: "How often do you work out?",
              image: images.language,
              variant: "single-select",
              options: WORKOUT_FREQUENCY_OPTIONS,
              initialValue: fieldValues.workoutFrequency || "",
              onSubmit: (value) => updateFieldValue("workoutFrequency", value),
            },
          });
          break;

        case "loveLanguage":
          SheetManager.show("profile-field-sheet", {
            payload: {
              fieldId: "loveLanguage",
              title: "What is your love language?",
              image: images.language,
              variant: "single-select",
              options: LOVE_LANGUAGE_OPTIONS,
              initialValue: fieldValues.loveLanguage || "",
              onSubmit: (value) => updateFieldValue("loveLanguage", value),
            },
          });
          break;

        case "travelPlans":
          SheetManager.show("profile-field-sheet", {
            payload: {
              fieldId: "travelPlans",
              title: "What are your travel plans?",
              image: images.language,
              variant: "single-select",
              options: TRAVEL_PLANS_OPTIONS,
              initialValue: fieldValues.travelPlans || "",
              onSubmit: (value) => updateFieldValue("travelPlans", value),
            },
          });
          break;

        case "personality":
          SheetManager.show("profile-field-sheet", {
            payload: {
              fieldId: "personality",
              title: "What is your personality?",
              image: images.language,
              variant: "single-select",
              options: PERSONALITY_OPTIONS,
              initialValue: fieldValues.personality || "",
              onSubmit: (value) => updateFieldValue("personality", value),
            },
          });
          break;

        case "personalityProfile":
          SheetManager.show("profile-field-sheet", {
            payload: {
              fieldId: "personalityProfile",
              title: "What is your MBTI personality profile?",
              image: images.language,
              variant: "single-select",
              options: PERSONALITY_PROFILE_OPTIONS,
              initialValue: fieldValues.personalityProfile || "",
              onSubmit: (value) =>
                updateFieldValue("personalityProfile", value),
            },
          });
          break;

        case "relationshipStatus":
          SheetManager.show("profile-field-sheet", {
            payload: {
              fieldId: "relationshipStatus",
              title: "What is your relationship status?",
              image: images.language,
              variant: "single-select",
              options: RELATIONSHIP_STATUS_OPTIONS,
              initialValue: fieldValues.relationshipStatus || "",
              onSubmit: (value) =>
                updateFieldValue("relationshipStatus", value),
            },
          });
          break;

        case "willingToRelocate":
          SheetManager.show("profile-field-sheet", {
            payload: {
              fieldId: "willingToRelocate",
              title: "Are you willing to relocate?",
              image: images.language,
              variant: "single-select",
              options: WILLING_TO_RELOCATE_OPTIONS,
              initialValue: fieldValues.willingToRelocate || "",
              onSubmit: (value) => updateFieldValue("willingToRelocate", value),
            },
          });
          break;

        case "opennessToLongDistance":
          SheetManager.show("profile-field-sheet", {
            payload: {
              fieldId: "opennessToLongDistance",
              title: "Are you open to long distance?",
              image: images.language,
              variant: "single-select",
              options: OPENNESS_TO_LONG_DISTANCE_OPTIONS,
              initialValue: fieldValues.opennessToLongDistance || "",
              onSubmit: (value) =>
                updateFieldValue("opennessToLongDistance", value),
            },
          });
          break;

        case "lookingFor":
          SheetManager.show("profile-field-sheet", {
            payload: {
              fieldId: "lookingFor",
              title: "What are you looking for?",
              image: images.language,
              variant: "multi-select",
              options: LOOKING_FOR_OPTIONS,
              initialValue: preferencesData?.lookingToDate || [],
              onSubmit: async (value) => {
                const values = Array.isArray(value) ? value : [value];
                setFieldValues((prev) => ({
                  ...prev,
                  lookingFor: values,
                }));
                await updatePreferenceField("lookingToDate", values);
              },
            },
          });
          break;

        default:
          // For other fields, do nothing for now
          break;
      }
    },
    [fieldValues, updateFieldValue],
  );

  return {
    userData,
    bio,
    setBio: handleBioChange,
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
    fieldValues,
    isUploading,
    isUpdatingPreference,
  };
};
