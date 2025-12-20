import React, { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

import { palette } from "core/styles";
import { images } from "core/images";
import { Button } from "components/button";

import { styles } from "./LikesUpgradeSheet.styles";
import { useLikesUpgradeSheetLogic } from "./useLikesUpgradeSheetLogic";

const LikesUpgradeSheet: FC<SheetProps<"likes-upgrade-sheet">> = (props) => {
  const { sheetId, image, handleClose, handleUpgrade } =
    useLikesUpgradeSheetLogic(props);

  return (
    <ActionSheet
      id={sheetId}
      gestureEnabled
      containerStyle={{ borderTopLeftRadius: 32, borderTopRightRadius: 32 }}
      overlayColor={`${palette.BLACK}66`}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={handleClose}
          activeOpacity={0.7}
        >
          <Ionicons name="close" size={26} color={palette.BLACK} />
        </TouchableOpacity>

        <View style={styles.imageContainer}>
          <Image
            source={images.backdrop}
            style={styles.backdrop}
            contentFit="cover"
          />
          <Image
            source={image}
            style={styles.profileImage}
            contentFit="cover"
          />
        </View>

        <Text style={styles.title}>Join premium to see Likes</Text>
        <Text style={styles.subtitle}>
          Find out who likes you. Join Diaspora premium to start a conversation.
        </Text>

        <Button
          title="Upgrade Plan"
          onPress={handleUpgrade}
          style={styles.upgradeButton}
        />
      </View>
    </ActionSheet>
  );
};

export default LikesUpgradeSheet;
