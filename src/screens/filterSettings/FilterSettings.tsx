import React, { FC, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
} from "react-native";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { LayoutContainer } from "components/layoutContainer";
import { Button } from "components/button";
import { Select } from "components/select";
import { GradientSlider } from "components/gradientSlider";
import { palette } from "core/styles";

import type { FilterSettingsScreenProps } from "./FilterSettings.types";
import { styles } from "./FilterSettings.styles";
import {
  useFilterSettingsLogic,
  GENDER_OPTIONS,
  ACTIVITY_OPTIONS,
  SELECT_ROWS,
} from "./useFilterSettingsLogic";

const FilterSettings: FC<FilterSettingsScreenProps> = (props) => {
  const {
    filters,
    updateFilter,
    handleApply,
    handleSelectRowPress,
    handleClearFilter,
    getFilterDisplayValue,
    isFilterChanged,
    handleResetCountry,
    isLoadingInterests,
  } = useFilterSettingsLogic(props);

  const navigation = props.navigation;

  const [showCountryPicker, setShowCountryPicker] = useState(false);

  const handleCountrySelect = (country: Country) => {
    updateFilter("country", country.cca2);
    setShowCountryPicker(false);
  };

  const getCountryDisplayName = () => {
    if (!filters.country || filters.country === "all") return "All";
    return filters.country;
  };

  const getValidCountryCode = (): CountryCode => {
    if (!filters.country || filters.country === "all") return "US";
    return filters.country as CountryCode;
  };

  return (
    <LayoutContainer
      edges={[]}
      footer={
        isFilterChanged && (
          <View style={styles.footer}>
            <Button
              title="Apply changes"
              onPress={handleApply}
              style={styles.applyButton}
            />
          </View>
        )
      }
    >
      <View style={styles.scrollContent}>
        <View style={styles.row}>
          <Select
            label="Interested in"
            value={filters.gender}
            onChange={(value) => updateFilter("gender", value as string[])}
            options={GENDER_OPTIONS}
            placeholder="All"
            style={styles.halfWidth}
            multiple
          />

          <Select
            label="Activity"
            value={filters.activity}
            onChange={(value) => updateFilter("activity", value as string[])}
            options={ACTIVITY_OPTIONS}
            placeholder="All"
            style={styles.halfWidth}
            multiple
          />
        </View>

        <View style={styles.selectContainer}>
          <Text style={styles.selectLabel}>Country</Text>

          <TouchableOpacity
            style={styles.countryPickerButton}
            onPress={() => setShowCountryPicker(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.countryPickerText}>
              {getCountryDisplayName()}
            </Text>
          </TouchableOpacity>

          {showCountryPicker && (
            <CountryPicker
              countryCode={getValidCountryCode()}
              withFilter
              withFlag
              withCountryNameButton={false}
              withAlphaFilter
              withCallingCode={false}
              withEmoji
              onSelect={handleCountrySelect}
              visible={showCountryPicker}
              onClose={() => setShowCountryPicker(false)}
            />
          )}

          {filters.country && filters.country !== "all" && (
            <TouchableOpacity
              style={{ marginTop: 8 }}
              onPress={handleResetCountry}
              activeOpacity={0.7}
            >
              <Text style={{ color: palette.RED, fontSize: 14 }}>
                Reset to All
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <GradientSlider
          label="Distance (km)"
          value={filters.distanceRange}
          onValueChange={(value) =>
            updateFilter("distanceRange", value as [number, number])
          }
          minimumValue={1}
          maximumValue={1000}
          step={10}
          isRange
          style={styles.sliderContainer}
        />

        <GradientSlider
          label="Age"
          value={filters.ageRange}
          onValueChange={(value) =>
            updateFilter("ageRange", value as [number, number])
          }
          minimumValue={18}
          maximumValue={100}
          step={1}
          isRange
          valueFormatter={(val) => {
            const [min, max] = val as [number, number];
            return `Between age ${min} - ${max}`;
          }}
          style={styles.sliderContainer}
        />

        <View style={styles.cabinCrewSection}>
          <Text style={styles.cabinCrewTitle}>Cabin Crew</Text>
          <Text style={styles.cabinCrewDescription}>
            Cabin crew allows set advance filter settings, to find your perfect
            match faster.
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate("Upgrade")}>
            <LinearGradient
              colors={["#EC6B82", "#BA5466FC", "#9A4655", "#692F3A"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0.4, y: 1 }}
              style={styles.upgradeBadge}
            >
              <Text style={styles.upgradeBadgeText}>Upgrade</Text>
            </LinearGradient>
          </TouchableOpacity>

          <GradientSlider
            label="Minimum number of photos"
            value={filters.minPhotos}
            onValueChange={(value) =>
              updateFilter("minPhotos", value as number)
            }
            minimumValue={0}
            maximumValue={4}
            step={1}
            style={styles.sliderContainer}
          />

          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Has a bio</Text>
            <Switch
              value={filters.hasBio}
              onValueChange={(value) => updateFilter("hasBio", value)}
              trackColor={{ false: palette.RED2, true: palette.RED }}
              thumbColor={palette.WHITE}
            />
          </View>

          {SELECT_ROWS.map((row) => {
            const displayValue = getFilterDisplayValue(row.key);
            const hasValue = displayValue.length > 0;

            return (
              <TouchableOpacity
                key={row.key}
                style={styles.selectRow}
                onPress={() => handleSelectRowPress(row.key)}
                activeOpacity={0.7}
              >
                <Text style={styles.selectRowLabel}>{row.label}</Text>

                <View style={styles.selectRowRight}>
                  {row.key === "interests" && isLoadingInterests ? (
                    <ActivityIndicator size="small" color={palette.RED} />
                  ) : (
                    <Text
                      style={[
                        styles.selectRowValue,
                        hasValue && styles.selectRowValueActive,
                      ]}
                      numberOfLines={1}
                    >
                      {hasValue ? displayValue : "Select"}
                    </Text>
                  )}

                  {hasValue ? (
                    <TouchableOpacity
                      onPress={(e) => {
                        e.stopPropagation();
                        handleClearFilter(row.key as keyof typeof filters);
                      }}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Ionicons
                        name="close-circle"
                        size={20}
                        color={palette.BLACK}
                      />
                    </TouchableOpacity>
                  ) : (
                    !isLoadingInterests && (
                      <Ionicons
                        name="chevron-forward"
                        size={18}
                        color={palette.GREY2}
                      />
                    )
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </LayoutContainer>
  );
};

export default FilterSettings;
