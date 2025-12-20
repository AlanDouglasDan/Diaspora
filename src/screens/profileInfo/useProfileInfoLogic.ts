import { useState, useCallback, useMemo } from "react";
import { useWindowDimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SheetManager } from "react-native-actions-sheet";

import images from "../../../assets/images";
import type {
  ProfileInfoScreenProps,
  ProfileSection,
} from "./ProfileInfo.types";

// Field options data
const LANGUAGE_OPTIONS = [
  { id: "english", label: "ENGLISH" },
  { id: "german", label: "GERMAN" },
  { id: "french", label: "FRENCH" },
  { id: "italian", label: "ITALIAN" },
  { id: "portuguese", label: "PORTUGUESE" },
  { id: "russian", label: "RUSSIAN" },
  { id: "chinese", label: "CHINESE" },
  { id: "arabic", label: "ARABIC" },
  { id: "catalan", label: "CATALAN" },
  { id: "spanish", label: "SPANISH" },
  { id: "japanese", label: "JAPANESE" },
  { id: "korean", label: "KOREAN" },
  { id: "hindi", label: "HINDI" },
  { id: "dutch", label: "DUTCH" },
  { id: "swedish", label: "SWEDISH" },
];

const EDUCATION_OPTIONS = [
  { label: "High School", value: "high_school" },
  { label: "Some College", value: "some_college" },
  { label: "Associate Degree", value: "associate" },
  { label: "Bachelor's Degree", value: "bachelors" },
  { label: "Master's Degree", value: "masters" },
  { label: "Doctorate", value: "doctorate" },
  { label: "Trade School", value: "trade_school" },
];

const PET_OPTIONS = [
  { id: "dogs", label: "DOGS" },
  { id: "cats", label: "CATS" },
  { id: "birds", label: "BIRDS" },
  { id: "fish", label: "FISH/AQUARIUMS" },
  { id: "reptiles", label: "REPTILES/AMPHIBIANS" },
  {
    id: "small_mammals",
    label: "SMALL MAMMALS (HAMSTERS/GUINEA PIGS/RABBITS/FERRETS)",
  },
  { id: "horses", label: "HORSES/EQUESTRIAN" },
  { id: "livestock", label: "LIVESTOCK (GOATS/SHEEP/CHICKENS)" },
  { id: "exotic", label: "EXOTIC PETS" },
  { id: "none", label: "NO PETS" },
];

const SMOKING_OPTIONS = [
  { id: "socially", label: "SOCIALLY" },
  { id: "occasionally", label: "OCCASIONALLY" },
  { id: "regularly", label: "REGULARLY" },
  { id: "never", label: "NEVER" },
];

const DRINKING_OPTIONS = [
  { id: "socially", label: "SOCIALLY" },
  { id: "occasionally", label: "OCCASIONALLY" },
  { id: "regularly", label: "REGULARLY" },
  { id: "never", label: "NEVER" },
];

export const useProfileInfoLogic = ({ navigation }: ProfileInfoScreenProps) => {
  const { width: screenWidth } = useWindowDimensions();
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

  const profileCompletion = 75;

  // Calculate photo sizes based on screen width
  const HORIZONTAL_PADDING = 20;
  const GAP = 4;
  const gridWidth = screenWidth - HORIZONTAL_PADDING * 2;
  // Main photo takes 2 columns worth of space
  // 3 columns total, so small = (gridWidth - 2*GAP) / 3
  const smallPhotoSize = Math.floor((gridWidth - 2 * GAP) / 3);
  const mainPhotoSize = smallPhotoSize * 2 + GAP;

  const userData = {
    name: "Jerry",
    age: 28,
    location: "New Jersey · 13:00GMT",
    country: "Canada",
    countryFlag: "🇨🇦",
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
        const uri = result.assets[0].uri;
        setPhotos((prev) =>
          prev.map((photo, idx) => (idx === index ? uri : photo))
        );
      }
    },
    [setPhotos]
  );

  const sections: ProfileSection[] = useMemo(
    () => [
      {
        id: "whyHere",
        title: "Why You're Here",
        fields: [{ id: "why", label: "", value: "Empty" }],
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
            id: "languages",
            label: "Languages",
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
          { id: "children", label: "Children", value: "Empty", icon: "baby" },
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
          {
            id: "socialMediaActivity",
            label: "Social Media Activity",
            value: "Empty",
            icon: "at",
          },
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
            value: "Empty",
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
        fields: [],
      },
    ],
    []
  );

  const handlePreview = useCallback(() => {
    // TODO: Navigate to preview screen
  }, []);

  const handleVerify = useCallback(() => {
    // TODO: Navigate to verification flow
  }, []);

  const handleEditInterests = useCallback(() => {
    navigation.navigate("EditInterests");
  }, [navigation]);

  // Helper to update field value
  const updateFieldValue = useCallback(
    (fieldId: string, value: string | string[]) => {
      setFieldValues((prev) => ({ ...prev, [fieldId]: value }));
    },
    []
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
    [fieldValues]
  );

  // Field click handlers
  const handleFieldPress = useCallback(
    (fieldId: string) => {
      switch (fieldId) {
        case "languages":
          SheetManager.show("profile-field-sheet", {
            payload: {
              fieldId: "languages",
              title: "Language",
              image: images.language,
              variant: "search-list",
              placeholder: "Search language",
              options: LANGUAGE_OPTIONS,
              initialValue: fieldValues.languages || [],
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
              variant: "multi-select",
              options: PET_OPTIONS,
              initialValue: fieldValues.pets || [],
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

        default:
          // For other fields, do nothing for now
          break;
      }
    },
    [fieldValues, updateFieldValue]
  );

  return {
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
    fieldValues,
  };
};
