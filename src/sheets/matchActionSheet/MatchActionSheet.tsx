import React, { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

import { palette } from "core/styles";
import { images } from "core/images";
import { Button } from "components/button";

import { styles } from "./MatchActionSheet.styles";
import { useMatchActionSheetLogic } from "./useMatchActionSheetLogic";

const MatchActionSheet: FC<SheetProps<"match-action-sheet">> = (props) => {
  const { sheetId, handleClose, handleSeePlans } =
    useMatchActionSheetLogic(props);

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

        <Image
          source={images.emptyState2}
          style={styles.image}
          contentFit="contain"
        />

        <Text style={styles.title}>Swipe to your hearts content</Text>
        <Text style={styles.subtitle}>
          Find out who likes you. Join Diaspora premium to start a conversation.
        </Text>

        <Button
          title="See Plans"
          onPress={handleSeePlans}
          style={styles.seePlansButton}
        />
      </View>
    </ActionSheet>
  );
};

export default MatchActionSheet;
