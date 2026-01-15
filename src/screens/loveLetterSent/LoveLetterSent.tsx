import React, { FC } from "react";
import { View, ImageBackground, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "components/button";
import { images } from "core/images";
import { palette } from "core/styles";

import type { LoveLetterSentScreenProps } from "./LoveLetterSent.types";
import { styles } from "./LoveLetterSent.styles";
import { useLoveLetterSentLogic } from "./useLoveLetterSentLogic";

const LoveLetterSent: FC<LoveLetterSentScreenProps> = (props) => {
  const { recipientName, recipientImage, handleContinueSwiping, handleClose } =
    useLoveLetterSentLogic(props);

  return (
    <ImageBackground
      source={recipientImage}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Ionicons name="close" size={28} color={palette.WHITE} />
          </TouchableOpacity>

          <View style={styles.content}>
            <Image
              source={images.loveLetter}
              style={styles.loveLetterImage}
              contentFit="contain"
            />

            <Text style={styles.title}>Love Letter sent to</Text>
            <Text style={styles.name}>{recipientName}</Text>

            <Button
              title="Continue Swiping"
              onPress={handleContinueSwiping}
              style={styles.button}
            />
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

export default LoveLetterSent;
