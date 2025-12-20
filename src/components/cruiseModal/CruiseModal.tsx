import React, { FC } from "react";
import { View, TouchableOpacity, Text, Modal } from "react-native";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

import { palette } from "core/styles";
import { Button } from "components/button";
import { images } from "core/images";

import { styles } from "./CruiseModal.styles";
import type { CruiseModalProps } from "./CruiseModal.types";

const CruiseModal: FC<CruiseModalProps> = ({ visible, onClose, onUpgrade }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <BlurView intensity={20} tint="dark" style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color={palette.BLACK} />
          </TouchableOpacity>

          <View style={styles.imageContainer}>
            <Image
              source={images.backdrop}
              style={styles.backdrop}
              contentFit="cover"
            />
            <Image
              source={images.cruiseIcon}
              style={styles.cruiseIcon}
              contentFit="contain"
            />
          </View>

          <Text style={styles.title}>You're running out of cruise</Text>

          <Text style={styles.subtitle}>
            Don't keep your matches waiting. Join Diaspora premium to start a
            conversation.
          </Text>

          <Button
            title="Upgrade"
            onPress={onUpgrade}
            style={styles.upgradeButton}
          />

          <TouchableOpacity style={styles.maybeLaterButton} onPress={onClose}>
            <Text style={styles.maybeLaterText}>Maybe later</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </Modal>
  );
};

export default CruiseModal;
