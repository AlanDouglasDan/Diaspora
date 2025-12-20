import React, { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

import { palette } from "core/styles";
import { Button } from "components/button";

import { styles } from "./MatchUpgradeSheet.styles";
import { useMatchUpgradeSheetLogic } from "./useMatchUpgradeSheetLogic";

const MatchUpgradeSheet: FC<SheetProps<"match-upgrade-sheet">> = (props) => {
  const {
    sheetId,
    name,
    avatar,
    countryFlag,
    handleClose,
    handleUpgrade,
    handleMaybeLater,
  } = useMatchUpgradeSheetLogic(props);

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
          <Ionicons name="close" size={24} color={palette.BLACK} />
        </TouchableOpacity>

        <View style={styles.avatarContainer}>
          <Image source={avatar} style={styles.avatar} contentFit="cover" />
          <View style={styles.flagContainer}>
            <Text style={styles.flagText}>{countryFlag}</Text>
          </View>
        </View>

        <Text style={styles.title}>{name} is outside the country</Text>
        <Text style={styles.subtitle}>
          Don't keep your matches waiting. Join Diaspora premium to start a
          conversation.
        </Text>

        <Button
          title="Upgrade for $50"
          onPress={handleUpgrade}
          style={styles.upgradeButton}
        />

        <TouchableOpacity
          style={styles.maybeLaterButton}
          onPress={handleMaybeLater}
          activeOpacity={0.7}
        >
          <Text style={styles.maybeLaterText}>Maybe later</Text>
        </TouchableOpacity>
      </View>
    </ActionSheet>
  );
};

export default MatchUpgradeSheet;
