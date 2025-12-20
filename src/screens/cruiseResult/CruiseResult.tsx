import React, { FC, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";

import { LayoutContainer } from "components/layoutContainer";
import { images } from "core/images";
import { palette } from "core/styles";

import type { CruiseResultScreenProps } from "./CruiseResult.types";
import { styles } from "./CruiseResult.styles";
import { useCruiseResultLogic } from "./useCruiseResultLogic";

const CruiseResult: FC<CruiseResultScreenProps> = (props) => {
  const { handleCancel, handleLike, handleDislike, handleReport } =
    useCruiseResultLogic(props);

  return (
    <LayoutContainer style={styles.container} edges={["top", "bottom"]}>
      <TouchableOpacity onPress={handleCancel}>
        <Ionicons name="close" size={32} color={palette.BLACK} />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Times up!!!</Text>
        <Text style={styles.subtitle}>
          What'd you think of Victoria?
          {"\n"}
          Yay or Nay
        </Text>

        <Image
          source={images.videoCall}
          style={styles.image}
          contentFit="cover"
        />

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.roundButton, styles.dislikeButton]}
            onPress={handleDislike}
          >
            <MaterialCommunityIcons
              name="close-thick"
              size={35}
              color={palette.WHITE}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.roundButton, styles.likeButton]}
            onPress={handleLike}
          >
            <Ionicons name="heart" size={35} color={palette.WHITE} />
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
