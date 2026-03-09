import React, { FC, useCallback } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome6, Entypo } from "@expo/vector-icons";

import { ProgressBar } from "components/progressBar";
import { palette } from "core/styles";
import type { InterestsScreenProps } from "./Interests.types";
import { styles } from "./Interests.styles";
import { useInterestsLogic } from "./useInterestsLogic";

const Interests: FC<InterestsScreenProps> = (props) => {
  const {
    handleGoBack,
    handleToggleInterest,
    isInterestSelected,
    handleSkip,
    handleSubmit,
    isValid,
    isLoading,
    interestsLoading,
    transformedInterests,
    selectedInterests,
  } = useInterestsLogic(props);

  const renderInterestChip = useCallback(
    ({
      item,
      index,
    }: {
      item: { id: string; label: string; emoji: string };
      index: number;
    }) => {
      const selected = isInterestSelected(item.id);
      return (
        <TouchableOpacity
          style={[styles.interestChip, selected && styles.interestChipSelected]}
          onPress={() => handleToggleInterest(item.id)}
        >
          <Text style={styles.interestEmoji}>{item.emoji}</Text>
          <Text
            style={[
              styles.interestLabel,
              selected && styles.interestLabelSelected,
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      );
    },
    [isInterestSelected, handleToggleInterest],
  );

  const keyExtractor = useCallback(
    (_item: { id: string }, index: number) => index.toString(),
    [],
  );

  const ListHeader = useCallback(
    () => (
      <View style={styles.headerSection}>
        <TouchableOpacity onPress={handleGoBack}>
          <Entypo name="chevron-left" size={24} color={palette.BLACK} />
        </TouchableOpacity>

        <ProgressBar progress={5 / 6} style={styles.progressBar} />

        <Text style={styles.title}>Your interest</Text>

        <Text style={styles.subtitle}>
          What are you passionate about? Pick a few things you enjoy. Potential
          matches want to know!
        </Text>
      </View>
    ),
    [handleGoBack],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {interestsLoading ? (
        <View style={styles.loadingContainer}>
          <ListHeader />
          <ActivityIndicator size="large" color={palette.RED} />
          <Text style={styles.loadingText}>Loading interests...</Text>
        </View>
      ) : (
        <FlatList
          data={transformedInterests}
          renderItem={renderInterestChip}
          keyExtractor={keyExtractor}
          ListHeaderComponent={ListHeader}
          contentContainerStyle={styles.interestsContainer}
          showsVerticalScrollIndicator={false}
          initialNumToRender={20}
          maxToRenderPerBatch={15}
          windowSize={5}
          extraData={selectedInterests}
        />
      )}

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSkip} disabled={isLoading}>
          <Text style={[styles.skipText, { opacity: isLoading ? 0.5 : 1 }]}>
            Skip
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={!isValid || isLoading}
          onPress={handleSubmit}
        >
          <LinearGradient
            colors={[palette.RED2, palette.RED]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={[
              styles.submitButton,
              { opacity: isValid && !isLoading ? 1 : 0.5 },
            ]}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={palette.WHITE} />
            ) : (
              <FontAwesome6
                name="arrow-right"
                size={20}
                color={palette.WHITE}
              />
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Interests;
