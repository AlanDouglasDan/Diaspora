import React, { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

import { palette } from "core/styles";
import { Button } from "components/button";
import { images } from "core/images";

import { styles } from "./BoostSheet.styles";
import { useBoostSheetLogic } from "./useBoostSheetLogic";

const BoostSheet: FC<SheetProps<"boost-sheet">> = (props) => {
  const { sheetId, handleClose, handleKeepSwiping } = useBoostSheetLogic(props);

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

        <View style={styles.imageContainer}>
          <Image
            source={images.boost}
            style={styles.boostImage}
            contentFit="contain"
          />
        </View>

        <Text style={styles.title}>You are Taking Off</Text>
        <Text style={styles.subtitle}>
          Jump the queue for 30 minutes. Your profile is getting priority
          placement so you show up to more people.
        </Text>

        <Button
          title="Keep Swiping"
          onPress={handleKeepSwiping}
          style={styles.keepSwipingButton}
        />
      </View>
    </ActionSheet>
  );
};

export default BoostSheet;
