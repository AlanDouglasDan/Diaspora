import React, { FC, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";

import { LayoutContainer } from "components/layoutContainer";
import { Button } from "components/button";
import { CruiseModal } from "components/cruiseModal";
// import Equalizer from "components/svg/Equalizer";
import StopWatch from "components/svg/StopWatch";
import Heart from "components/svg/Heart";
import Shield from "components/svg/Shield";
import { images } from "core/images";
import { spacing, common, layout } from "core/styles";

import type { CruiseScreenProps } from "./Cruise.types";
import { styles } from "./Cruise.styles";
import { useCruiseLogic } from "./useCruiseLogic";

const Cruise: FC<CruiseScreenProps> = (props) => {
  const {
    isModalVisible,
    handleReadyToGo,
    handleOpenModal,
    handleCloseModal,
    handleUpgrade,
  } = useCruiseLogic(props);

  // useEffect(() => {
  //   props.navigation.setOptions({
  //     headerRight: () => (
  //       <TouchableOpacity onPress={handleOpenModal} style={styles.headerRight}>
  //         <Equalizer />
  //       </TouchableOpacity>
  //     ),
  //   });
  // }, [handleOpenModal]);

  return (
    <LayoutContainer style={styles.container} edges={["top"]}>
      <View style={layout.flex1}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>BETA</Text>
        </View>

        <Image
          source={images.cruiseLogo}
          style={styles.image}
          contentFit="contain"
        />

        <Text style={styles.header18}>Take a Chance</Text>

        <Text style={[styles.text14, common.textCenter, spacing.marginTop8]}>
          Cruise in with your charm and connect with new people from around the
          globe, face-to-face on video.
        </Text>
      </View>

      <View>
        <View style={styles.gap}>
          <View style={styles.flexedRow}>
            <StopWatch />

            <Text style={[styles.text14, layout.flexShrink]}>
              You'll have 2 minutes of face-to-face over a call. Make it count.
            </Text>
          </View>

          <View style={styles.flexedRow}>
            <Heart />

            <Text style={[styles.text14, layout.flexShrink]}>
              If the vibe is right and you both feel a spark, swipe right to
              match and take the next step.
            </Text>
          </View>

          <View style={styles.flexedRow}>
            <Shield />

            <Text style={[styles.text14, layout.flexShrink]}>
              Be respectful and mindful of the information you share. Report any
              form of abuse and indecency.
            </Text>
          </View>
        </View>

        <Button
          title="Ready to go?"
          onPress={handleReadyToGo}
          style={spacing.marginTop44}
        />

        <Text style={styles.text10}>
          <Text style={styles.header10}>Note:</Text> Cruise is currently in
          beta, so your filters won't apply. You may be matched with people from
          different countries, genders, and age ranges.
        </Text>
      </View>

      <CruiseModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onUpgrade={handleUpgrade}
      />
    </LayoutContainer>
  );
};

export default Cruise;
