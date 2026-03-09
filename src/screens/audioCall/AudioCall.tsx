import React, { FC, useEffect } from "react";
import { View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
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
    isSpeakerOn,
    isConnecting,
    callStatus,
    callDurationFormatted,
    toggleMute,
    toggleSpeaker,
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
          <Text style={styles.recipientName}>{recipientName}</Text>
          {isConnecting ? (
            <>
              <ActivityIndicator
                size="small"
                color={palette.WHITE}
                style={styles.connectingIndicator}
              />
              <Text style={styles.callingText}>{callStatus}</Text>
            </>
          ) : (
            <Text style={styles.callingText}>{callDurationFormatted}</Text>
          )}

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
            style={[
              styles.controlButton,
              isSpeakerOn && styles.controlButtonActive,
            ]}
            onPress={toggleSpeaker}
          >
            <Ionicons
              name={isSpeakerOn ? "volume-high" : "volume-medium"}
              size={24}
              color={palette.WHITE}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.controlButton,
              isMuted && styles.controlButtonActive,
            ]}
            onPress={toggleMute}
          >
            <Feather
              name={isMuted ? "mic-off" : "mic"}
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
