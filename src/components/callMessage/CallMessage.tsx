import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { palette, typography } from "core/styles";

export type CallType = "voice" | "video";

interface CallMessageProps {
  callType: CallType;
  durationSeconds: number;
  timestamp: string;
  isMe: boolean;
}

const CallMessage: FC<CallMessageProps> = ({
  callType,
  durationSeconds,
  timestamp,
  isMe,
}) => {
  // Format duration for display
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes > 0) {
      return remainingSeconds > 0
        ? `${minutes} min ${remainingSeconds} sec`
        : `${minutes} min`;
    }
    return `${seconds} sec`;
  };

  const isVideoCall = callType === "video";
  const iconName = isVideoCall ? "videocam" : "call";
  const callLabel = isVideoCall ? "Video call" : "Voice call";

  return (
    <View style={[styles.container, isMe && styles.containerMe]}>
      <View style={styles.iconContainer}>
        <Ionicons name={iconName} size={20} color={palette.WHITE} />
        {/* Arrow indicator for incoming/outgoing */}
        <View style={styles.arrowContainer}>
          <Ionicons
            name={isMe ? "arrow-up" : "arrow-down"}
            size={10}
            color={palette.WHITE}
          />
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.callTypeText}>{callLabel}</Text>
        <Text style={styles.durationText}>
          {formatDuration(durationSeconds)}
        </Text>
      </View>

      {/* <Text style={styles.timestampText}>{timestamp}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.GREY,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    minWidth: 200,
    maxWidth: 280,
    alignSelf: "flex-start",
  },
  containerMe: {
    alignSelf: "flex-end",
    backgroundColor: palette.SATURATED_RED,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.GREY2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    position: "relative",
  },
  arrowContainer: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: palette.GREY2,
    borderRadius: 6,
    padding: 1,
  },
  contentContainer: {
    flex: 1,
  },
  callTypeText: {
    ...typography.semiheader14,
    color: palette.BLACK,
    marginBottom: 2,
  },
  durationText: {
    ...typography.text12,
    color: palette.TEXT_COLOR || "#666666",
  },
  timestampText: {
    ...typography.text12,
    color: palette.TEXT_COLOR || "#666666",
    marginLeft: 8,
  },
});

export default CallMessage;
