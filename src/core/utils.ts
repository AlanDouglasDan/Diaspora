import type { Profile } from "@/src/api/profile/types";

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

export const calculateProfileProgress = (profile: Profile): number => {
  if (!profile?.id) return 0;

  let progress = 0;

  // 1. Images - Count how many images the user has, we are giving higher priority to images because this is what users mainly want to see

  const totalImages = profile.images?.length;
  const imageProgress = totalImages === 4 ? 85 : totalImages * 21.5;
  progress += imageProgress;

  // 2. Bio - Check if bio is provided
  const bioProgress = profile.bio ? 5 : 0;
  progress += bioProgress;

  // 3. Email - Check if email is provided
  const emailProgress = profile.user?.email ? 5 : 0;
  progress += emailProgress;

  // 4. Preferences - Check if preferences are provided
  const preferencesProgress = profile.preferences ? 5 : 0;
  progress += preferencesProgress;

  // 5. Zodiac - Check if preferences are provided
  const preferencesZodiacProgress = profile?.preferences?.zodiac ? 1 : 0;
  progress += preferencesZodiacProgress;

  // 6. Religion - Check if preferences are provided
  const preferencesReligionProgress = profile?.preferences?.religion ? 1 : 0;
  progress += preferencesReligionProgress;

  // 7. Age - Check if preferences are provided
  const preferencesAgeProgress = profile?.preferences?.age ? 1 : 0;
  progress += preferencesAgeProgress;

  // 8. MinNumberOfPhotos - Check if preferences are provided
  const preferencesMinNumberOfPhotosProgress = profile?.preferences
    ?.minNumberOfPhotos
    ? 1
    : 0;
  progress += preferencesMinNumberOfPhotosProgress;

  // 9. HasBio - Check if preferences are provided
  const preferencesHasBioProgress = profile?.preferences?.hasBio ? 0.5 : 0;
  progress += preferencesHasBioProgress;

  // 10. Ethnicity - Check if preferences are provided
  const preferencesEthnicityProgress = profile?.preferences?.ethnicity
    ? 0.5
    : 0;
  progress += preferencesEthnicityProgress;

  // 11. Education - Check if preferences are provided
  const preferencesEducationProgress = profile?.preferences?.education
    ? 0.5
    : 0;
  progress += preferencesEducationProgress;

  // 12. Height - Check if preferences are provided
  const preferencesHeightProgress = profile?.preferences?.height ? 1 : 0;
  progress += preferencesHeightProgress;

  // 12. Connections - Check if preferences are provided
  const preferencesConnectionsProgress = profile?.preferences?.connections
    ? 1
    : 0;
  progress += preferencesConnectionsProgress;

  return Math.min(Math.floor(progress), 100);
};

export const isFreeUser = (subscription: "economy") =>
  subscription === "economy" || !subscription;

export const isBusinessClassUser = (subscription: "premium") =>
  subscription === "premium";

export const isFirstClassUser = (subscription: "first-class") =>
  subscription === "first-class";
