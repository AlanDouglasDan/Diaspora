import React, { FC, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Switch } from "react-native";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

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
  COUNTRY_OPTIONS,
  SELECT_ROWS,
} from "./useFilterSettingsLogic";

const FilterSettings: FC<FilterSettingsScreenProps> = (props) => {
  const { filters, updateFilter, handleApply, handleSelectRowPress } =
    useFilterSettingsLogic(props);

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
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.row}>
          <Select
            label="Gender"
            value={filters.gender}
            onChange={(value) => updateFilter("gender", value)}
            options={GENDER_OPTIONS}
            placeholder="All"
            style={styles.halfWidth}
          />

          <Select
            label="Activity"
            value={filters.activity}
            onChange={(value) => updateFilter("activity", value)}
            options={ACTIVITY_OPTIONS}
            placeholder="Just Joined"
            style={styles.halfWidth}
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

          <LinearGradient
            colors={[palette.RED2, palette.RED]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.upgradeBadge}
          >
            <Text style={styles.upgradeBadgeText}>Upgrade</Text>
          </LinearGradient>

          <GradientSlider
            label="Minimum number of photos"
            value={filters.minPhotos}
            onValueChange={(value) =>
              updateFilter("minPhotos", value as number)
            }
            minimumValue={1}
            maximumValue={10}
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

          {SELECT_ROWS.map((row) => (
            <TouchableOpacity
              key={row.key}
              style={styles.selectRow}
              onPress={() => handleSelectRowPress(row.key)}
              activeOpacity={0.7}
            >
              <Text style={styles.selectRowLabel}>{row.label}</Text>
              <View style={styles.selectRowRight}>
                <Text style={styles.selectRowValue}>Select</Text>
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={palette.GREY2}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Button
          title="Apply changes"
          onPress={handleApply}
          style={styles.applyButton}
        />
      </ScrollView>
    </View>
  );
};

export default FilterSettings;
