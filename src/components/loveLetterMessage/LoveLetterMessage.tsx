import React, { FC, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import { palette, typography } from "core/styles";
import { images } from "core/images";

interface LoveLetterMessageProps {
  senderName: string;
  senderAvatar?: any;
  message: string;
  isMe: boolean;
}

const LoveLetterMessage: FC<LoveLetterMessageProps> = ({
  senderName,
  senderAvatar,
  message,
  isMe,
}) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => {
    setIsOpened(true);
  };

  const handleClose = () => {
    setIsOpened(false);
  };

  return (
    <>
      <View style={[styles.container, isMe && styles.containerMe]}>
        <View style={styles.cardContainer}>
          <Image
            source={senderAvatar || images.logo2}
            style={styles.backgroundImage}
            contentFit={senderAvatar ? "cover" : "contain"}
          />
          <View style={styles.overlay} />
          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <Ionicons name="mail" size={24} color={palette.WHITE} />
            </View>
            <Text style={styles.title}>Love Letter</Text>
            <Text style={styles.subtitle}>from {senderName}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.openButton}
          onPress={handleOpen}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[palette.RED2, palette.RED]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.openButtonGradient}
          >
            <Text style={styles.openButtonText}>Open it</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isOpened}
        animationType="fade"
        transparent
        onRequestClose={handleClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Image
              source={senderAvatar || images.logo2}
              style={styles.modalBackgroundImage}
              contentFit={senderAvatar ? "cover" : "contain"}
            />
            <LinearGradient
              colors={["rgba(220, 53, 69, 0.9)", "rgba(220, 53, 69, 0.95)"]}
              style={styles.modalGradientOverlay}
            />
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <View style={styles.modalIconContainer}>
                  <Ionicons name="mail" size={20} color={palette.WHITE} />
                </View>
                <View>
                  <Text style={styles.modalHeaderTitle}>New Message</Text>
                  <Text style={styles.modalHeaderSubtitle}>
                    from {senderName}
                  </Text>
                </View>
              </View>

              <Text style={styles.modalMessage}>{message}</Text>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleClose}
                activeOpacity={0.8}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    alignSelf: "flex-start",
  },
  containerMe: {
    alignSelf: "flex-end",
  },
  cardContainer: {
    width: "100%",
    height: 180,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: palette.RED,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    ...typography.semiheader14,
    color: palette.WHITE,
    textAlign: "center",
  },
  subtitle: {
    ...typography.text12,
    color: palette.WHITE,
    textAlign: "center",
    opacity: 0.9,
  },
  openButton: {
    marginTop: 8,
    borderRadius: 20,
    overflow: "hidden",
  },
  openButtonGradient: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  openButtonText: {
    ...typography.semiheader14,
    color: palette.WHITE,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalContainer: {
    width: "100%",
    maxWidth: 300,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
  },
  modalBackgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  modalGradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    padding: 24,
    minHeight: 250,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  modalIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  modalHeaderTitle: {
    ...typography.semiheader14,
    color: palette.WHITE,
  },
  modalHeaderSubtitle: {
    ...typography.text12,
    color: palette.WHITE,
    opacity: 0.8,
  },
  modalMessage: {
    ...typography.text16,
    color: palette.WHITE,
    lineHeight: 24,
    flex: 1,
  },
  closeButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 24,
  },
  closeButtonText: {
    ...typography.semiheader14,
    color: palette.WHITE,
  },
});

export default LoveLetterMessage;
