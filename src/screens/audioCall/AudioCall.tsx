import React, { FC, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, Feather, Ionicons } from "@expo/vector-icons";

import { palette } from "core/styles";

import type { AudioCallScreenProps } from "./AudioCall.types";
import { styles } from "./AudioCall.styles";
import { useAudioCallLogic } from "./useAudioCallLogic";

const AudioCall: FC<AudioCallScreenProps> = (props) => {
  const {
    recipientName,
    recipientAvatar,
    isMuted,
    isVideoOff,
    isConnecting,
    callStatus,
    toggleCameraFacing,
    toggleMute,
    toggleVideo,
    handleEndCall,
  } = useAudioCallLogic(props);

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: recipientName,
      headerTitleStyle: {
        color: palette.WHITE,
      },
      headerLeft: () => (
        <TouchableOpacity style={styles.headerButton} onPress={handleEndCall}>
          <Ionicons name="chevron-back" size={24} color={palette.WHITE} />
        </TouchableOpacity>
      ),
    });
  }, [props.navigation, handleEndCall, recipientName]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[palette.RED2, palette.RED]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradient}
      />

      <View style={styles.overlay}>
        <View style={styles.callingContainer}>
          <Text style={styles.callingText}>{callStatus}</Text>
          <View style={styles.avatarContainer}>
            <Image
              source={recipientAvatar}
              style={styles.avatar}
              contentFit="cover"
            />
          </View>
        </View>

        {/* Control buttons */}
        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={toggleCameraFacing}
          >
            <MaterialIcons
              name="flip-camera-ios"
              size={24}
              color={palette.WHITE}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlButton} onPress={toggleMute}>
            <Feather
              name={isMuted ? "mic-off" : "mic"}
              size={24}
              color={palette.WHITE}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlButton} onPress={toggleVideo}>
            <Feather
              name={isVideoOff ? "video-off" : "video"}
              size={24}
              color={palette.WHITE}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.endCallButton}
            onPress={handleEndCall}
          >
            <MaterialIcons name="call-end" size={24} color={palette.WHITE} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AudioCall;
