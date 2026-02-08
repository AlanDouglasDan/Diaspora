import React, { FC } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";

import { LayoutContainer } from "components/layoutContainer";
import { palette } from "core/styles";

import type { CruiseResultScreenProps } from "./CruiseResult.types";
import { styles } from "./CruiseResult.styles";
import { useCruiseResultLogic } from "./useCruiseResultLogic";

const CruiseResult: FC<CruiseResultScreenProps> = (props) => {
  const {
    handleCancel,
    handleLike,
    handleDislike,
    handleReport,
    partnerName,
    isLoading,
  } = useCruiseResultLogic(props);

  return (
    <LayoutContainer style={styles.container} edges={["top", "bottom"]}>
      <TouchableOpacity onPress={handleCancel}>
        <Ionicons name="close" size={32} color={palette.BLACK} />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Times up!!!</Text>
        <Text style={styles.subtitle}>
          What'd you think of {partnerName}?{"\n"}
          Yay or Nay
        </Text>

        <View style={styles.profileIconContainer}>
          <Ionicons name="person-circle" size={200} color={palette.GREY2} />
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.roundButton, styles.dislikeButton]}
            onPress={handleDislike}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={palette.WHITE} />
            ) : (
              <MaterialCommunityIcons
                name="close-thick"
                size={35}
                color={palette.WHITE}
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.roundButton, styles.likeButton]}
            onPress={handleLike}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={palette.WHITE} />
            ) : (
              <Ionicons name="heart" size={35} color={palette.WHITE} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.reportButton} onPress={handleReport}>
        <Feather name="flag" size={17} color={palette.GREY2} />

        <Text style={styles.reportText}>Report</Text>
      </TouchableOpacity>
    </LayoutContainer>
  );
};

export default CruiseResult;
