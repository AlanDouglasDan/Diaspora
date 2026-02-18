import React, { FC, useEffect } from "react";
import { View, TouchableOpacity, ActivityIndicator, Text } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, Feather, Ionicons } from "@expo/vector-icons";
import {
  StreamCall,
  ParticipantView,
  useCallStateHooks,
} from "@stream-io/video-react-native-sdk";

import { images } from "core/images";
import { palette } from "core/styles";

import type { VideoCallScreenProps } from "./VideoCall.types";
import { styles } from "./VideoCall.styles";
import { useVideoCallLogic } from "./useVideoCallLogic";

// Inner component that uses Stream Video hooks (must be inside StreamCall)
interface VideoCallContentProps {
  recipientName: string;
  recipientAvatar: any;
  isMuted: boolean;
  isVideoOff: boolean;
  toggleCameraFacing: () => void;
  toggleMute: () => void;
  toggleVideo: () => void;
  handleEndCall: () => void;
}

const VideoCallContent: FC<VideoCallContentProps> = ({
  recipientName,
  recipientAvatar,
  isMuted,
  isVideoOff,
  toggleCameraFacing,
  toggleMute,
  toggleVideo,
  handleEndCall,
}) => {
  const { useParticipants, useLocalParticipant } = useCallStateHooks();
  const participants = useParticipants();
  const localParticipant = useLocalParticipant();

  // Find the remote participant (not the local user)
  const remoteParticipant = participants.find(
    (p) => p.sessionId !== localParticipant?.sessionId
  );

  return (
    <View style={styles.container}>
      {/* Remote video */}
      {remoteParticipant ? (
        <ParticipantView
          participant={remoteParticipant}
          style={styles.remoteVideo}
        />
      ) : (
        <View style={styles.remoteVideo}>
          <Image
            source={recipientAvatar || images.avatar2}
            style={styles.remoteVideo}
            contentFit="cover"
          />
          <View style={styles.waitingOverlay}>
            <Text style={styles.waitingText}>
              Waiting for {recipientName} to join...
            </Text>
          </View>
        </View>
      )}

      <View style={styles.overlay}>
        {/* Local camera preview */}
        <View style={styles.localVideoContainer}>
          {localParticipant && !isVideoOff ? (
            <ParticipantView
              participant={localParticipant}
              style={styles.localVideo}
            />
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

const VideoCall: FC<VideoCallScreenProps> = (props) => {
  const {
    recipientName,
    recipientAvatar,
    call,
    facing,
    isMuted,
    isVideoOff,
    isConnecting,
    callStatus,
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

  // Render connecting state
  if (isConnecting || !call) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={[palette.RED2, palette.RED]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.remoteVideo}
        />
        <View style={styles.overlay}>
          <View style={styles.connectingContainer}>
            <ActivityIndicator size="large" color={palette.WHITE} />
            <Text style={styles.connectingText}>{callStatus}</Text>
          </View>
          <View style={styles.controlsContainer}>
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
  }

  return (
    <StreamCall call={call}>
      <VideoCallContent
        recipientName={recipientName}
        recipientAvatar={recipientAvatar}
        isMuted={isMuted}
        isVideoOff={isVideoOff}
        toggleCameraFacing={toggleCameraFacing}
        toggleMute={toggleMute}
        toggleVideo={toggleVideo}
        handleEndCall={handleEndCall}
      />
    </StreamCall>
  );
};

export default VideoCall;
