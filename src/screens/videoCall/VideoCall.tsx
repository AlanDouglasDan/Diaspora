import React, { FC, useEffect } from "react";
import { View, TouchableOpacity, ActivityIndicator, Text } from "react-native";
import { CameraView } from "expo-camera";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, Feather, Ionicons } from "@expo/vector-icons";

import { images } from "core/images";
import { palette } from "core/styles";

import type { VideoCallScreenProps } from "./VideoCall.types";
import { styles } from "./VideoCall.styles";
import { useVideoCallLogic } from "./useVideoCallLogic";

const VideoCall: FC<VideoCallScreenProps> = (props) => {
  const {
    facing,
    isMuted,
    isVideoOff,
    isConnecting,
    toggleCameraFacing,
    toggleMute,
    toggleVideo,
    handleEndCall,
    handleReport,
  } = useVideoCallLogic(props);

  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={styles.headerButton} onPress={handleEndCall}>
          <Ionicons name="chevron-back" size={24} color={palette.WHITE} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity style={styles.headerButton} onPress={handleReport}>
          <Ionicons name="flag-outline" size={20} color={palette.WHITE} />
        </TouchableOpacity>
      ),
    });
  }, [props.navigation, handleEndCall, handleReport]);

  return (
    <View style={styles.container}>
      {/* Remote video / connecting state */}
      {isConnecting ? (
        <LinearGradient
          colors={[palette.RED2, palette.RED]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.remoteVideo}
        />
      ) : (
        <Image
          source={images.videoCall}
          style={styles.remoteVideo}
          contentFit="cover"
        />
      )}

      <View style={styles.overlay}>
        {isConnecting && (
          <View style={styles.connectingContainer}>
            <ActivityIndicator size="large" color={palette.WHITE} />
            <Text style={styles.connectingText}>Connecting...</Text>
          </View>
        )}

        {/* Local camera preview */}
        <View style={styles.localVideoContainer}>
          {!isVideoOff ? (
            <CameraView style={styles.localVideo} facing={facing} />
          ) : (
            <View
              style={[styles.localVideo, { backgroundColor: palette.BLACK }]}
            />
          )}
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

export default VideoCall;
