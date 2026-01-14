import React, { FC, useEffect } from "react";
import { View, TouchableOpacity, ActivityIndicator, Text } from "react-native";
import { CameraView } from "expo-camera";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, Feather, Ionicons } from "@expo/vector-icons";
import {
  StreamCall,
  ParticipantView,
  useCallStateHooks,
} from "@stream-io/video-react-native-sdk";

import { palette } from "core/styles";

import type { CruiseCallScreenProps } from "./CruiseCall.types";
import { styles } from "./CruiseCall.styles";
import { useCruiseCallLogic } from "./useCruiseCallLogic";

// Inner component that uses Stream call hooks (must be inside StreamCall)
const CallContent: FC<{
  facing: "front" | "back";
  isMuted: boolean;
  isVideoOff: boolean;
  displayTime: string;
  toggleCameraFacing: () => void;
  toggleMute: () => void;
  toggleVideo: () => void;
  handleEndCall: () => void;
}> = ({
  facing,
  isMuted,
  isVideoOff,
  displayTime,
  toggleCameraFacing,
  toggleMute,
  toggleVideo,
  handleEndCall,
}) => {
  const { useRemoteParticipants, useLocalParticipant } = useCallStateHooks();
  const remoteParticipants = useRemoteParticipants();
  const localParticipant = useLocalParticipant();
  const remoteParticipant = remoteParticipants[0];

  return (
    <View style={styles.container}>
      {/* Remote participant video */}
      {remoteParticipant ? (
        <ParticipantView
          participant={remoteParticipant}
          style={styles.remoteVideo}
        />
      ) : (
        <LinearGradient
          colors={[palette.RED2, palette.RED]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.remoteVideo}
        />
      )}

      <View style={styles.overlay}>
        {/* Timer display */}
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>Time: {displayTime}</Text>
        </View>

        {/* Local camera preview */}
        <View style={styles.localVideoContainer}>
          {localParticipant && !isVideoOff ? (
            <ParticipantView
              participant={localParticipant}
              style={styles.localVideo}
            />
          ) : !isVideoOff ? (
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

const CruiseCall: FC<CruiseCallScreenProps> = (props) => {
  const {
    facing,
    isMuted,
    isVideoOff,
    isSearching,
    isConnecting,
    searchTimeRemaining,
    displayTime,
    call,
    matchData,
    toggleCameraFacing,
    toggleMute,
    toggleVideo,
    handleEndCall,
    handleBack,
    handleReport,
  } = useCruiseCallLogic(props);

  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={styles.headerButton} onPress={handleBack}>
          <Ionicons name="chevron-back" size={24} color={palette.WHITE} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity style={styles.headerButton} onPress={handleReport}>
          <Ionicons name="flag-outline" size={20} color={palette.WHITE} />
        </TouchableOpacity>
      ),
    });
  }, [props.navigation, handleBack, handleReport]);

  // Searching state - looking for a match
  if (isSearching) {
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
            <Text style={styles.connectingText}>Finding your match...</Text>
            <Text style={styles.countdownText}>{searchTimeRemaining}s</Text>
          </View>

          {/* Local camera preview while searching */}
          <View style={styles.localVideoContainer}>
            <CameraView style={styles.localVideo} facing={facing} />
          </View>

          <View style={styles.controlsContainer}>
            <TouchableOpacity style={styles.endCallButton} onPress={handleBack}>
              <MaterialIcons name="call-end" size={24} color={palette.WHITE} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  // Connecting state - match found, joining call
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
            <Text style={styles.connectingText}>
              Match found! Connecting...
            </Text>
            {matchData?.partner?.displayName && (
              <Text style={styles.partnerNameText}>
                {matchData.partner.displayName}
              </Text>
            )}
          </View>

          <View style={styles.localVideoContainer}>
            <CameraView style={styles.localVideo} facing={facing} />
          </View>

          <View style={styles.controlsContainer}>
            <TouchableOpacity style={styles.endCallButton} onPress={handleBack}>
              <MaterialIcons name="call-end" size={24} color={palette.WHITE} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  // Active call state - render Stream video
  return (
    <StreamCall call={call}>
      <CallContent
        facing={facing}
        isMuted={isMuted}
        isVideoOff={isVideoOff}
        displayTime={displayTime}
        toggleCameraFacing={toggleCameraFacing}
        toggleMute={toggleMute}
        toggleVideo={toggleVideo}
        handleEndCall={handleEndCall}
      />
    </StreamCall>
  );
};

export default CruiseCall;
