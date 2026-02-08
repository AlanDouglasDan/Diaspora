import type { Profile } from "@/src/api/profile/types";
import type { Preference } from "@/src/api/preferences/types";

export const font = {
  regular: "SfProRegular",
  medium: "SfProMedium",
  bold: "SfProBold",
  semiBold: "SfProSemiBold",
};

export let customFonts = {
  SfProBold: require("../../assets/fonts/SfPro-Bold.otf"),
  SfProRegular: require("../../assets/fonts/SfPro-Regular.otf"),
  SfProMedium: require("../../assets/fonts/SfPro-Medium.otf"),
  SfProSemiBold: require("../../assets/fonts/SfPro-SemiBold.otf"),
};

export const calculateAge = (birthdate: string): number => {
  const birthDate = new Date(birthdate);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

export const calculateProfileProgress = (
  profile: Profile,
  preferences?: Preference | null,
): number => {
  if (!profile?.id) return 0;

  let filledFields = 0;
  let totalFields = 0;

  // === PROFILE FIELDS (Higher weight) ===

  // 1. Photos - up to 6 photos, each counts as a field
  const photoCount = profile.images?.length || 0;
  filledFields += Math.min(photoCount, 6);
  totalFields += 6;

  // 2. Bio
  totalFields += 1;
  if (
    profile.bio &&
    profile.bio !== "Enter your bio" &&
    profile.bio.trim() !== ""
  ) {
    filledFields += 1;
  }

  // 3. User basic info (from profile.user)
  // Name
  totalFields += 1;
  if (profile.user?.name) {
    filledFields += 1;
  }

  // Age/Birthday
  totalFields += 1;
  if (profile.user?.age) {
    filledFields += 1;
  }

  // Gender
  totalFields += 1;
  if (profile.user?.gender) {
    filledFields += 1;
  }

  // === PREFERENCE FIELDS ===
  const pref = preferences;

  if (pref) {
    // Interests
    totalFields += 1;
    if (
      pref.interests &&
      pref.interests.length > 0 &&
      pref.interests[0] !== ""
    ) {
      filledFields += 1;
    }

    // Looking to date
    totalFields += 1;
    if (pref.lookingToDate && pref.lookingToDate.length > 0) {
      filledFields += 1;
    }

    // Ethnicity
    totalFields += 1;
    if (pref.ethnicity) filledFields += 1;

    // Pronouns
    totalFields += 1;
    if (pref.pronouns) filledFields += 1;

    // Zodiac
    totalFields += 1;
    if (pref.zodiac) filledFields += 1;

    // Religion
    totalFields += 1;
    if (pref.religion) filledFields += 1;

    // Education
    totalFields += 1;
    if (pref.education) filledFields += 1;

    // Pets
    totalFields += 1;
    if (pref.pets) filledFields += 1;

    // Language
    totalFields += 1;
    if (pref.language) filledFields += 1;

    // Family Plans
    totalFields += 1;
    if (pref.familyPlans) filledFields += 1;

    // Height
    totalFields += 1;
    if (pref.height) filledFields += 1;

    // Job Title
    totalFields += 1;
    if (pref.jobTitle) filledFields += 1;

    // Company
    totalFields += 1;
    if (pref.company) filledFields += 1;

    // School
    totalFields += 1;
    if (pref.school) filledFields += 1;

    // Sexuality
    totalFields += 1;
    if (pref.sexuality) filledFields += 1;

    // Body Type
    totalFields += 1;
    if (pref.bodyType) filledFields += 1;

    // Dietary Preference
    totalFields += 1;
    if (pref.dietaryPreference) filledFields += 1;

    // Sleeping Habits
    totalFields += 1;
    if (pref.sleepingHabits) filledFields += 1;

    // Workout Frequency
    totalFields += 1;
    if (pref.workoutFrequency) filledFields += 1;

    // Love Language
    totalFields += 1;
    if (pref.loveLanguage) filledFields += 1;

    // Travel Plans
    totalFields += 1;
    if (pref.travelPlans) filledFields += 1;

    // Personality
    totalFields += 1;
    if (pref.personality) filledFields += 1;

    // Relationship Status
    totalFields += 1;
    if (pref.relationshipStatus) filledFields += 1;

    // Willing to Relocate (boolean field)
    totalFields += 1;
    if (pref.willingToRelocate) filledFields += 1;

    // Openness to Long Distance (boolean field)
    totalFields += 1;
    if (pref.opennessToLongDistance) filledFields += 1;
  }

  // Calculate percentage
  const progress = totalFields > 0 ? (filledFields / totalFields) * 100 : 0;

  return Math.min(Math.floor(progress), 100);
};

export const isFreeUser = (subscription: "economy") =>
  subscription === "economy" || !subscription;

export const isBusinessClassUser = (subscription: "premium") =>
  subscription === "premium";

export const isFirstClassUser = (subscription: "first-class") =>
  subscription === "first-class";
