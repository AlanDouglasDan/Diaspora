import React, { useCallback, useEffect, useMemo, useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import { SheetManager } from "react-native-actions-sheet";

import {
  useAppDispatch,
  useAppSelector,
  updateFilter as updateFilterAction,
  applyFilters,
  clearFilters,
} from "@/src/store";
import { useGetPreference } from "@/src/api/preferences";
import { useGetInterests } from "@/src/api/interests";
import { useUser } from "@clerk/clerk-expo";
import type {
  FilterSettingsScreenProps,
  FilterState,
  SelectOption,
  SelectRowItem,
} from "./FilterSettings.types";
import { styles } from "./FilterSettings.styles";
import type {
  FilterSelectOption,
  FilterSelectVariant,
} from "../../sheets/filterSelectSheet";

export const GENDER_OPTIONS: SelectOption[] = [
  { label: "All", value: "all" },
  { label: "Man", value: "man" },
  { label: "Woman", value: "woman" },
  { label: "Non-binary", value: "nonbinary" },
];

export const ACTIVITY_OPTIONS: SelectOption[] = [
  { label: "All", value: "all" },
  { label: "Just Joined", value: "justJoined" },
  { label: "Online", value: "online" },
  { label: "Active", value: "active" },
];

export const COUNTRY_OPTIONS: SelectOption[] = [
  { label: "All", value: "all" },
  { label: "United States", value: "US" },
  { label: "United Kingdom", value: "GB" },
  { label: "Canada", value: "CA" },
  { label: "Australia", value: "AU" },
  { label: "Nigeria", value: "NG" },
  { label: "Ghana", value: "GH" },
  { label: "South Africa", value: "ZA" },
  { label: "Kenya", value: "KE" },
];

export const SELECT_ROWS: SelectRowItem[] = [
  { key: "interests", label: "Interests" },
  { key: "lookingFor", label: "Looking for" },
  { key: "ethnicity", label: "Ethnicity" },
  { key: "starSign", label: "Star sign" },
  { key: "height", label: "Height" },
  { key: "drinking", label: "Drinking" },
  { key: "smoking", label: "Smoking" },
  { key: "educationLevel", label: "Education level" },
  { key: "children", label: "Children" },
  { key: "religion", label: "Religion" },
  { key: "sexuality", label: "Sexuality" },
  { key: "workoutFrequency", label: "Workout Frequency" },
  { key: "personality", label: "Personality" },
  { key: "personalityProfile", label: "Personality Profile" },
  { key: "bodyType", label: "Body Type" },
  { key: "language", label: "Language" },
  { key: "opennessToLongDistance", label: "Openness to Long Distance" },
  { key: "willingToRelocate", label: "Willing to Relocate" },
  { key: "loveLanguage", label: "Love Language" },
];

const LOOKING_FOR_OPTIONS: FilterSelectOption[] = [
  { id: "marriage", label: "Marriage" },
  { id: "fun", label: "Fun" },
  { id: "casual", label: "Casual" },
];

const ETHNICITY_OPTIONS: FilterSelectOption[] = [
  { id: "Asian", label: "Asian" },
  { id: "Black/African", label: "Black/African" },
  { id: "Hispanic/Latino", label: "Hispanic/Latino" },
  { id: "Middle-Eastern", label: "Middle-Eastern" },
  { id: "Native-American", label: "Native-American" },
  { id: "Pacific-Islander", label: "Pacific-Islander" },
  { id: "White/Caucasian", label: "White/Caucasian" },
  { id: "Mixed", label: "Mixed" },
  { id: "Other", label: "Other" },
  { id: "Prefer not to say", label: "Prefer not to say" },
];

const STAR_SIGN_OPTIONS: FilterSelectOption[] = [
  { id: "Aries", label: "Aries" },
  { id: "Taurus", label: "Taurus" },
  { id: "Gemini", label: "Gemini" },
  { id: "Cancer", label: "Cancer" },
  { id: "Leo", label: "Leo" },
  { id: "Virgo", label: "Virgo" },
  { id: "Libra", label: "Libra" },
  { id: "Scorpio", label: "Scorpio" },
  { id: "Sagittarius", label: "Sagittarius" },
  { id: "Capricorn", label: "Capricorn" },
  { id: "Aquarius", label: "Aquarius" },
  { id: "Pisces", label: "Pisces" },
  {
    id: "I don't believe in zodiac signs",
    label: "I don't believe in zodiac signs",
  },
];

const DRINKING_OPTIONS: FilterSelectOption[] = [
  { id: "Non-drinker", label: "Non-drinker" },
  { id: "Social drinker", label: "Social drinker" },
  { id: "Regular drinker", label: "Regular drinker" },
];

const SMOKING_OPTIONS: FilterSelectOption[] = [
  { id: "Non-smoker", label: "Non-smoker" },
  { id: "Social smoker", label: "Social smoker" },
  { id: "Regular smoker", label: "Regular smoker" },
  { id: "Trying to quit", label: "Trying to quit" },
];

const EDUCATION_OPTIONS: FilterSelectOption[] = [
  { id: "High School", label: "High School" },
  { id: "College", label: "College" },
  { id: "Bachelor", label: "Bachelor" },
  { id: "Master", label: "Master" },
  { id: "PhD", label: "PhD" },
];

const CHILDREN_OPTIONS: FilterSelectOption[] = [
  { id: "Want children", label: "Want children" },
  { id: "Don't want children", label: "Don't want children" },
  { id: "Have children", label: "Have children" },
  { id: "Open to children", label: "Open to children" },
  { id: "Not sure yet", label: "Not sure yet" },
];

const RELIGION_OPTIONS: FilterSelectOption[] = [
  { id: "Christianity", label: "Christianity" },
  { id: "Islam", label: "Islam" },
  { id: "Hinduism", label: "Hinduism" },
  { id: "Buddhism", label: "Buddhism" },
  { id: "Judaism", label: "Judaism" },
  { id: "Sikhism", label: "Sikhism" },
  { id: "Agnostic", label: "Agnostic" },
  { id: "Atheist", label: "Atheist" },
  { id: "Spiritual", label: "Spiritual" },
  { id: "Other", label: "Other" },
  { id: "Prefer not to say", label: "Prefer not to say" },
];

const HEIGHT_FILTER_OPTIONS: FilterSelectOption[] = [
  { id: "Under 5'0\"", label: "Under 5'0\"" },
  { id: "5'0\"-5'3\"", label: "5'0\"-5'3\"" },
  { id: "5'4\"-5'7\"", label: "5'4\"-5'7\"" },
  { id: "5'8\"-5'11\"", label: "5'8\"-5'11\"" },
  { id: "6'0\"-6'3\"", label: "6'0\"-6'3\"" },
  { id: "Over 6'3\"", label: "Over 6'3\"" },
];

const SEXUALITY_OPTIONS: FilterSelectOption[] = [
  { id: "Straight", label: "Straight" },
  { id: "Gay", label: "Gay" },
  { id: "Lesbian", label: "Lesbian" },
  { id: "Bisexual", label: "Bisexual" },
  { id: "Pansexual", label: "Pansexual" },
  { id: "Asexual", label: "Asexual" },
  { id: "Queer", label: "Queer" },
  { id: "Questioning", label: "Questioning" },
  { id: "Prefer not to say", label: "Prefer not to say" },
];

const WORKOUT_FREQUENCY_FILTER_OPTIONS: FilterSelectOption[] = [
  { id: "Every day", label: "Every day" },
  { id: "Often", label: "Often" },
  { id: "Sometimes", label: "Sometimes" },
  { id: "Rarely", label: "Rarely" },
  { id: "Never", label: "Never" },
];

const PERSONALITY_FILTER_OPTIONS: FilterSelectOption[] = [
  { id: "Introvert", label: "Introvert" },
  { id: "Extrovert", label: "Extrovert" },
  { id: "Ambivert", label: "Ambivert" },
];

const PERSONALITY_PROFILE_FILTER_OPTIONS: FilterSelectOption[] = [
  { id: "INTJ", label: "INTJ" },
  { id: "INTP", label: "INTP" },
  { id: "ENTJ", label: "ENTJ" },
  { id: "ENTP", label: "ENTP" },
  { id: "INFJ", label: "INFJ" },
  { id: "INFP", label: "INFP" },
  { id: "ENFJ", label: "ENFJ" },
  { id: "ENFP", label: "ENFP" },
  { id: "ISTJ", label: "ISTJ" },
  { id: "ISFJ", label: "ISFJ" },
  { id: "ESTJ", label: "ESTJ" },
  { id: "ESFJ", label: "ESFJ" },
  { id: "ISTP", label: "ISTP" },
  { id: "ISFP", label: "ISFP" },
  { id: "ESTP", label: "ESTP" },
  { id: "ESFP", label: "ESFP" },
];

const BODY_TYPE_FILTER_OPTIONS: FilterSelectOption[] = [
  { id: "Slim", label: "Slim" },
  { id: "Athletic", label: "Athletic" },
  { id: "Average", label: "Average" },
  { id: "Curvy", label: "Curvy" },
  { id: "Plus size", label: "Plus size" },
  { id: "Muscular", label: "Muscular" },
  { id: "Prefer not to say", label: "Prefer not to say" },
];

const LANGUAGE_FILTER_OPTIONS: FilterSelectOption[] = [
  { id: "English", label: "English" },
  { id: "Spanish", label: "Spanish" },
  { id: "French", label: "French" },
  { id: "Mandarin", label: "Mandarin" },
  { id: "Hindi", label: "Hindi" },
  { id: "Arabic", label: "Arabic" },
  { id: "Portuguese", label: "Portuguese" },
  { id: "German", label: "German" },
  { id: "Japanese", label: "Japanese" },
  { id: "Russian", label: "Russian" },
  { id: "Other", label: "Other" },
];

const OPENNESS_TO_LONG_DISTANCE_FILTER_OPTIONS: FilterSelectOption[] = [
  { id: "yes", label: "Yes" },
  { id: "no", label: "No" },
  { id: "maybe", label: "Maybe" },
];

const WILLING_TO_RELOCATE_FILTER_OPTIONS: FilterSelectOption[] = [
  { id: "yes", label: "Yes" },
  { id: "no", label: "No" },
  { id: "maybe", label: "Maybe" },
];

const LOVE_LANGUAGE_FILTER_OPTIONS: FilterSelectOption[] = [
  { id: "Words of affirmation", label: "Words of affirmation" },
  { id: "Quality time", label: "Quality time" },
  { id: "Physical touch", label: "Physical touch" },
  { id: "Acts of service", label: "Acts of service" },
  { id: "Receiving gifts", label: "Receiving gifts" },
];

interface FieldConfig {
  title: string;
  variant: FilterSelectVariant;
  options?: FilterSelectOption[];
  isMulti?: boolean;
}

const FIELD_CONFIG: Record<string, FieldConfig> = {
  lookingFor: {
    title: "Looking for",
    variant: "multi-select",
    options: LOOKING_FOR_OPTIONS,
  },
  ethnicity: {
    title: "Ethnicity",
    variant: "multi-select",
    options: ETHNICITY_OPTIONS,
  },
  starSign: {
    title: "Star sign",
    variant: "multi-select",
    options: STAR_SIGN_OPTIONS,
  },
  height: {
    title: "Height",
    variant: "multi-select",
    options: HEIGHT_FILTER_OPTIONS,
  },
  drinking: {
    title: "Drinking",
    variant: "multi-select",
    options: DRINKING_OPTIONS,
  },
  smoking: {
    title: "Smoking",
    variant: "multi-select",
    options: SMOKING_OPTIONS,
  },
  educationLevel: {
    title: "Education level",
    variant: "multi-select",
    options: EDUCATION_OPTIONS,
  },
  children: {
    title: "Children",
    variant: "multi-select",
    options: CHILDREN_OPTIONS,
  },
  religion: {
    title: "Religion",
    variant: "multi-select",
    options: RELIGION_OPTIONS,
  },
  sexuality: {
    title: "Sexuality",
    variant: "multi-select",
    options: SEXUALITY_OPTIONS,
  },
  workoutFrequency: {
    title: "Workout Frequency",
    variant: "multi-select",
    options: WORKOUT_FREQUENCY_FILTER_OPTIONS,
  },
  personality: {
    title: "Personality",
    variant: "multi-select",
    options: PERSONALITY_FILTER_OPTIONS,
  },
  personalityProfile: {
    title: "Personality Profile",
    variant: "multi-select",
    options: PERSONALITY_PROFILE_FILTER_OPTIONS,
  },
  bodyType: {
    title: "Body Type",
    variant: "multi-select",
    options: BODY_TYPE_FILTER_OPTIONS,
  },
  language: {
    title: "Language",
    variant: "multi-select",
    options: LANGUAGE_FILTER_OPTIONS,
  },
  opennessToLongDistance: {
    title: "Openness to Long Distance",
    variant: "multi-select",
    options: OPENNESS_TO_LONG_DISTANCE_FILTER_OPTIONS,
  },
  willingToRelocate: {
    title: "Willing to Relocate",
    variant: "multi-select",
    options: WILLING_TO_RELOCATE_FILTER_OPTIONS,
  },
  loveLanguage: {
    title: "Love Language",
    variant: "multi-select",
    options: LOVE_LANGUAGE_FILTER_OPTIONS,
  },
  interests: {
    title: "Interests",
    variant: "multi-select",
    options: [], // Will be populated dynamically from API
  },
};

export const useFilterSettingsLogic = (props: FilterSettingsScreenProps) => {
  const { navigation } = props;
  const dispatch = useAppDispatch();
  const { user } = useUser();
  const { filters, appliedFilters } = useAppSelector((state) => state.filters);
  const { data: preferencesData, getPreference } = useGetPreference();

  // Interests from API
  const interestsFromRedux = useAppSelector(
    (state) => state.preferences.data?.interests,
  );
  const {
    data: interestsData,
    getInterests,
    isLoading: isLoadingInterests,
  } = useGetInterests();
  const [interestsOptions, setInterestsOptions] = useState<
    FilterSelectOption[]
  >([]);

  // Load preferences to set default gender if needed
  useEffect(() => {
    if (user?.id) {
      getPreference(user.id);
    }
  }, [user?.id, getPreference]);

  // Set default gender from lookingToDate if gender filter is empty
  useEffect(() => {
    if (
      (!filters.gender || filters.gender.length === 0) &&
      preferencesData?.lookingToDate?.length
    ) {
      dispatch(
        updateFilterAction({
          key: "gender",
          value: preferencesData.lookingToDate.map((v) => v.toLowerCase()),
        }),
      );
    }
  }, [preferencesData, filters.gender, dispatch]);

  // Fetch all interests for the options list
  useEffect(() => {
    getInterests();
  }, [getInterests]);

  // Transform interests data to options
  useEffect(() => {
    if (interestsData && interestsData.length > 0) {
      const options = interestsData.map((interest) => ({
        id: interest.title,
        label: interest.title,
      }));
      setInterestsOptions(options);
    }
  }, [interestsData]);

  // Prefill interests filter from user's saved interests in Redux
  useEffect(() => {
    if (
      interestsFromRedux &&
      interestsFromRedux.length > 0 &&
      (!filters.interests || filters.interests.length === 0)
    ) {
      dispatch(
        updateFilterAction({
          key: "interests",
          value: interestsFromRedux,
        }),
      );
    }
  }, [interestsFromRedux]);

  const handleResetCountry = useCallback(() => {
    dispatch(updateFilterAction({ key: "country", value: "all" }));
  }, [dispatch]);

  const handleClearAll = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerRight}
          onPress={handleClearAll}
          activeOpacity={0.7}
        >
          <Text style={styles.clearAllText}>Clear all</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleClearAll]);

  const updateFilter = useCallback(
    <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
      dispatch(updateFilterAction({ key, value }));
    },
    [dispatch],
  );

  const isFilterChanged = useMemo(() => {
    return JSON.stringify(filters) !== JSON.stringify(appliedFilters);
  }, [filters, appliedFilters]);

  const handleApply = useCallback(() => {
    dispatch(applyFilters());
    // Navigate back to Match
    navigation.navigate("MainTabs", {
      screen: "Match",
    } as any);
  }, [navigation, dispatch]);

  const handleClearFilter = useCallback(
    (key: keyof FilterState) => {
      const initialValue = [] as string[];
      dispatch(updateFilterAction({ key, value: initialValue }));
    },
    [dispatch],
  );

  const getFilterDisplayValue = useCallback(
    (key: string): string => {
      const value = filters[key as keyof FilterState];
      if (!value || (Array.isArray(value) && value.length === 0)) return "";
      if (Array.isArray(value)) {
        return value.join(", ");
      }
      return String(value);
    },
    [filters],
  );

  const handleSelectRowPress = useCallback(
    (field: string) => {
      const config = FIELD_CONFIG[field];
      if (!config) return;

      // Use dynamic interests options if field is interests
      const options = field === "interests" ? interestsOptions : config.options;

      SheetManager.show("filter-select-sheet", {
        payload: {
          fieldKey: field,
          title: config.title,
          variant: config.variant,
          options: options,
          initialValue: filters[field as keyof FilterState] as
            | string
            | string[]
            | [number, number]
            | undefined,
          onSubmit: (value) => {
            updateFilter(
              field as keyof FilterState,
              value as FilterState[keyof FilterState],
            );
          },
        },
      });
    },
    [filters, updateFilter, interestsOptions],
  );

  return {
    filters,
    updateFilter,
    handleApply,
    handleSelectRowPress,
    handleClearFilter,
    getFilterDisplayValue,
    isFilterChanged,
    handleResetCountry,
    isLoadingInterests,
    interestsOptions,
  };
};
