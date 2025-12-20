import React, { useCallback, useEffect, useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import { SheetManager } from "react-native-actions-sheet";

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

const INITIAL_FILTER_STATE: FilterState = {
  gender: "all",
  activity: "just_joined",
  country: "all",
  distanceRange: [1, 43],
  ageRange: [21, 32],
  minPhotos: 4,
  hasBio: false,
  lookingFor: null,
  ethnicity: null,
  starSign: null,
  height: null,
  drinking: null,
  smoking: null,
  educationLevel: null,
  children: null,
  sexuality: null,
};

export const GENDER_OPTIONS: SelectOption[] = [
  { label: "All", value: "all" },
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

export const ACTIVITY_OPTIONS: SelectOption[] = [
  { label: "Just Joined", value: "just_joined" },
  { label: "Recently Active", value: "recently_active" },
  { label: "Online Now", value: "online_now" },
];

export const COUNTRY_OPTIONS: SelectOption[] = [
  { label: "All", value: "all" },
  { label: "United States", value: "us" },
  { label: "United Kingdom", value: "uk" },
  { label: "Canada", value: "ca" },
  { label: "Australia", value: "au" },
];

export const SELECT_ROWS: SelectRowItem[] = [
  { key: "lookingFor", label: "Looking for" },
  { key: "ethnicity", label: "Ethnicity" },
  { key: "starSign", label: "Star sign" },
  { key: "height", label: "Height" },
  { key: "drinking", label: "Drinking" },
  { key: "smoking", label: "Smoking" },
  { key: "educationLevel", label: "Education level" },
  { key: "children", label: "Children" },
  { key: "sexuality", label: "Sexuality" },
];

const LOOKING_FOR_OPTIONS: FilterSelectOption[] = [
  { id: "relationship", label: "Relationship" },
  { id: "casual", label: "Casual" },
  { id: "friendship", label: "Friendship" },
  { id: "not_sure", label: "Not sure yet" },
];

const ETHNICITY_OPTIONS: FilterSelectOption[] = [
  { id: "african", label: "African" },
  { id: "asian", label: "Asian" },
  { id: "caucasian", label: "Caucasian" },
  { id: "hispanic", label: "Hispanic/Latino" },
  { id: "middle_eastern", label: "Middle Eastern" },
  { id: "mixed", label: "Mixed" },
  { id: "other", label: "Other" },
];

const STAR_SIGN_OPTIONS: FilterSelectOption[] = [
  { id: "aries", label: "Aries" },
  { id: "taurus", label: "Taurus" },
  { id: "gemini", label: "Gemini" },
  { id: "cancer", label: "Cancer" },
  { id: "leo", label: "Leo" },
  { id: "virgo", label: "Virgo" },
  { id: "libra", label: "Libra" },
  // { id: "scorpio", label: "Scorpio" },
  // { id: "sagittarius", label: "Sagittarius" },
  // { id: "capricorn", label: "Capricorn" },
  // { id: "aquarius", label: "Aquarius" },
  // { id: "pisces", label: "Pisces" },
];

const DRINKING_OPTIONS: FilterSelectOption[] = [
  { id: "never", label: "Never" },
  { id: "socially", label: "Socially" },
  { id: "regularly", label: "Regularly" },
  { id: "prefer_not_say", label: "Prefer not to say" },
];

const SMOKING_OPTIONS: FilterSelectOption[] = [
  { id: "never", label: "Never" },
  { id: "socially", label: "Socially" },
  { id: "regularly", label: "Regularly" },
  { id: "prefer_not_say", label: "Prefer not to say" },
];

const EDUCATION_OPTIONS: FilterSelectOption[] = [
  { id: "high_school", label: "High School" },
  { id: "some_college", label: "Some College" },
  { id: "bachelors", label: "Bachelor's Degree" },
  { id: "masters", label: "Master's Degree" },
  { id: "doctorate", label: "Doctorate" },
  { id: "prefer_not_say", label: "Prefer not to say" },
];

const CHILDREN_OPTIONS: FilterSelectOption[] = [
  { id: "none", label: "None" },
  { id: "dont_have_but_want", label: "Don't have but want" },
  { id: "dont_have_dont_want", label: "Don't have & don't want" },
  { id: "have_want_more", label: "Have & want more" },
  { id: "have_dont_want_more", label: "Have & don't want more" },
  { id: "prefer_not_say", label: "Prefer not to say" },
];

const SEXUALITY_OPTIONS: FilterSelectOption[] = [
  { id: "straight", label: "Straight" },
  { id: "gay", label: "Gay" },
  { id: "lesbian", label: "Lesbian" },
  { id: "bisexual", label: "Bisexual" },
  { id: "pansexual", label: "Pansexual" },
  { id: "asexual", label: "Asexual" },
  { id: "other", label: "Other" },
  { id: "prefer_not_say", label: "Prefer not to say" },
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
    variant: "height",
  },
  drinking: {
    title: "Drinking",
    variant: "single-select",
    options: DRINKING_OPTIONS,
  },
  smoking: {
    title: "Smoking",
    variant: "single-select",
    options: SMOKING_OPTIONS,
  },
  educationLevel: {
    title: "Education level",
    variant: "single-select",
    options: EDUCATION_OPTIONS,
  },
  children: {
    title: "Children",
    variant: "single-select",
    options: CHILDREN_OPTIONS,
  },
  sexuality: {
    title: "Sexuality",
    variant: "single-select",
    options: SEXUALITY_OPTIONS,
  },
};

export const useFilterSettingsLogic = (props: FilterSettingsScreenProps) => {
  const { navigation } = props;

  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTER_STATE);

  const handleClearAll = useCallback(() => {
    setFilters(INITIAL_FILTER_STATE);
  }, []);

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
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleApply = useCallback(() => {
    // TODO: Apply filters
    navigation.goBack();
  }, [navigation]);

  const handleSelectRowPress = useCallback(
    (field: string) => {
      const config = FIELD_CONFIG[field];
      if (!config) return;

      SheetManager.show("filter-select-sheet", {
        payload: {
          fieldKey: field,
          title: config.title,
          variant: config.variant,
          options: config.options,
          initialValue: filters[field as keyof FilterState] as
            | string
            | string[]
            | [number, number]
            | undefined,
          onSubmit: (value) => {
            updateFilter(
              field as keyof FilterState,
              value as FilterState[keyof FilterState]
            );
          },
        },
      });
    },
    [filters, updateFilter]
  );

  return {
    filters,
    updateFilter,
    handleApply,
    handleSelectRowPress,
  };
};
