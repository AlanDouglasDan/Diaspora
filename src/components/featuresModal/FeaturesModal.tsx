import React, { FC } from "react";
import { View, TouchableOpacity, Text, Modal } from "react-native";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

import { palette } from "core/styles";
import { Button } from "components/button";

import { styles } from "./FeaturesModal.styles";
import type { FeaturesModalProps } from "./FeaturesModal.types";

const FeaturesModal: FC<FeaturesModalProps> = ({
  visible,
  onClose,
  logoImage,
  features,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <BlurView intensity={20} tint="light" style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color={palette.BLACK} />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Image
              source={logoImage}
              style={styles.logo}
              contentFit="contain"
            />
          </View>

          {features.map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <Text style={styles.featureLabel}>{feature.label}</Text>
              <Text style={styles.featureValue}>{feature.value}</Text>
            </View>
          ))}

          <Button
            title="Close"
            variant="white"
            onPress={onClose}
            style={styles.closeActionButton}
          />
        </View>
      </BlurView>
    </Modal>
  );
};

export default FeaturesModal;
