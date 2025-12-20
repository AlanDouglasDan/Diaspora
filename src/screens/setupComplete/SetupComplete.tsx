import React, { FC } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { images } from "core/images";
import { palette } from "core/styles";
import type { SetupCompleteScreenProps } from "./SetupComplete.types";
import { styles } from "./SetupComplete.styles";
import { useSetupCompleteLogic } from "./useSetupCompleteLogic";

const SetupComplete: FC<SetupCompleteScreenProps> = (props) => {
  const { handleContinue } = useSetupCompleteLogic(props);
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={images.setupComplete}
          style={styles.image}
          contentFit="contain"
        />
      </View>

      <View style={[styles.content, { paddingBottom: insets.bottom + 20 }]}>
        <Text style={styles.subtitle}>Prepare for takeoff Jackson.</Text>

        <Text style={styles.title}>Sit back and enjoy the ride.</Text>

        <TouchableOpacity onPress={handleContinue}>
          <LinearGradient
            colors={[palette.RED2, palette.RED]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SetupComplete;
