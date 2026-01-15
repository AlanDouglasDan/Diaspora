import { useState, useCallback, useEffect, useRef } from "react";
import { CameraType } from "expo-camera";
import { Alert, AppState, AppStateStatus } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { Call } from "@stream-io/video-react-native-sdk";

import { useStreamVideo } from "@/src/providers/StreamVideoProvider";
import { useGetRouletteStatus } from "@/src/api/roulette/useGetRouletteStatus";
import { useEndRoulette } from "@/src/api/roulette/useEndRoulette";
import { useStartRoulette } from "@/src/api/roulette/useStartRoulette";
import { useCancelRoulette } from "@/src/api/roulette/useCancelRoulette";
import { useTimer } from "@/src/hooks/useTimer";
import type { CruiseCallScreenProps } from "./CruiseCall.types";
import type { RouletteMatch } from "@/src/api/roulette/types";

const CALL_DURATION_SECONDS = 120; // 2 minutes
const SEARCH_TIMEOUT_SECONDS = 120;
const POLL_INTERVAL_MS = 2000;

export const useCruiseCallLogic = (props: CruiseCallScreenProps) => {
  const { navigation } = props;
  const { user } = useUser();
  const { client } = useStreamVideo();

  const { getRouletteStatus } = useGetRouletteStatus();
  const { endRoulette } = useEndRoulette();
  const { startRoulette } = useStartRoulette();
  const { cancelRoulette } = useCancelRoulette();

  const [facing, setFacing] = useState<CameraType>("front");
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isVideoOff, setIsVideoOff] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(true);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [searchTimeRemaining, setSearchTimeRemaining] = useState(
    SEARCH_TIMEOUT_SECONDS
  );
  const [call, setCall] = useState<Call | null>(null);
  const [matchData, setMatchData] = useState<RouletteMatch | null>(null);
  const [showTimerModal, setShowTimerModal] = useState(false);

  const callEndedRef = useRef(false);
  const isSearchingRef = useRef(true);
  const matchDataRef = useRef<RouletteMatch | null>(null);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const handleEndCallRef = useRef<() => void>(() => {});
  const userIdRef = useRef<string | null>(null);
  const hasStartedPollingRef = useRef(false);
  const getRouletteStatusRef = useRef(getRouletteStatus);
  const navigationRef = useRef(navigation);

  const {
    displayTime,
    start: startTimer,
    stop: stopTimer,
  } = useTimer(CALL_DURATION_SECONDS, () => {
    setShowTimerModal(true);
    handleEndCallRef.current();
  });

  // Keep refs in sync with state
  useEffect(() => {
    isSearchingRef.current = isSearching;
  }, [isSearching]);

  useEffect(() => {
    matchDataRef.current = matchData;
  }, [matchData]);

  useEffect(() => {
    userIdRef.current = user?.id || null;
  }, [user?.id]);

  // Keep function refs updated
  useEffect(() => {
    getRouletteStatusRef.current = getRouletteStatus;
  }, [getRouletteStatus]);

  useEffect(() => {
    navigationRef.current = navigation;
  }, [navigation]);

  // Cleanup and cancel roulette - used for back button and app close
  const cleanupAndCancel = useCallback(async () => {
    console.log("🛑 Cleaning up and cancelling roulette...");

    // Clear all intervals
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    stopTimer();

    // Leave call if active
    if (call && !callEndedRef.current) {
      console.log("📞 Leaving active call...");
      await call.leave().catch(console.error);
      setCall(null);
    }

    // Cancel or end roulette based on state
    const userId = userIdRef.current;
    const match = matchDataRef.current;

    if (match?.id) {
      console.log("🔚 Ending roulette match:", match.id);
      await endRoulette(match.id).catch(console.error);
    } else if (userId) {
      console.log("❌ Cancelling roulette for user:", userId);
      await cancelRoulette(userId).catch(console.error);
    }
  }, [call, stopTimer, endRoulette, cancelRoulette]);

  // Handle app state changes (background/close)
  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (nextAppState === "background" || nextAppState === "inactive") {
        console.log("📱 App going to background, cleaning up roulette...");
        await cleanupAndCancel();
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => subscription.remove();
  }, [cleanupAndCancel]);

  // Cleanup on unmount only - no dependencies to prevent re-running
  useEffect(() => {
    return () => {
      console.log("🧹 CruiseCall unmounting, cleaning up...");
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
      }
    };
  }, []);

  // Start polling when user.id becomes available
  useEffect(() => {
    // Skip if no user id or already started polling
    if (!user?.id) {
      console.log("⏳ Waiting for user ID to start polling...");
      return;
    }

    if (hasStartedPollingRef.current) {
      console.log("⚠️ Polling already started, skipping...");
      return;
    }

    // Mark as started to prevent duplicate polling
    hasStartedPollingRef.current = true;
    console.log("🚀 Starting roulette polling for user:", user.id);

    // Start search countdown - runs every 1 second
    const countdownId = setInterval(() => {
      setSearchTimeRemaining((prev) => {
        const newTime = prev - 1;
        console.log(`⏱️ Search countdown: ${newTime}s remaining`);

        if (newTime <= 0) {
          console.log("⏰ Search timeout reached, no match found");

          // Clear both intervals
          clearInterval(countdownId);
          if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current);
            pollIntervalRef.current = null;
          }
          countdownIntervalRef.current = null;

          // Cancel roulette since timeout reached
          const userId = userIdRef.current;
          if (userId) {
            console.log(
              "❌ Cancelling roulette due to timeout for user:",
              userId
            );
            cancelRoulette(userId).catch(console.error);
          }

          Alert.alert("No Match Found", "Please try again later.", [
            {
              text: "OK",
              onPress: () => navigationRef.current.navigate("MainTabs"),
            },
          ]);
          return 0;
        }

        return newTime;
      });
    }, 1000);

    countdownIntervalRef.current = countdownId;

    // Poll for match status function
    const pollForMatch = async () => {
      const userId = userIdRef.current;

      if (!userId) {
        console.log("🔍 Skipping poll - no userId");
        return;
      }

      if (!isSearchingRef.current) {
        console.log("🔍 Skipping poll - not searching anymore");
        return;
      }

      console.log("🔍 Polling for match status...");

      try {
        const status = await getRouletteStatusRef.current(userId);
        console.log("📊 Roulette status:", JSON.stringify(status, null, 2));

        if (status?.session?.status === "matched" && status?.match) {
          console.log("✅ Match found!", status.match);

          // Clear intervals immediately
          if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current);
            pollIntervalRef.current = null;
          }
          if (countdownIntervalRef.current) {
            clearInterval(countdownIntervalRef.current);
            countdownIntervalRef.current = null;
          }

          setMatchData(status.match);
          setIsSearching(false);
          setIsConnecting(true);
        } else {
          console.log(
            "⏳ Still waiting for match. Status:",
            status?.session?.status
          );
        }
      } catch (error) {
        console.error("❌ Error polling for match:", error);
      }
    };

    // Initial poll immediately
    console.log("🔍 Starting initial poll...");
    pollForMatch();

    // Then poll every 2 seconds
    console.log("🔄 Setting up polling interval every 2 seconds...");
    const pollId = setInterval(pollForMatch, POLL_INTERVAL_MS);
    pollIntervalRef.current = pollId;

    // Cleanup function for this effect
    return () => {
      console.log("🧹 Cleaning up polling intervals from effect");
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
      }
    };
  }, [user?.id]);

  // Initialize Stream call when match is found
  useEffect(() => {
    if (!matchData?.roomId || !client || call) return;

    const initializeCall = async () => {
      try {
        console.log("🎥 Initializing call with room:", matchData.roomId);

        const newCall = client.call("default", matchData.roomId);

        await newCall.join({
          create: true,
          data: {
            settings_override: {
              limits: {
                max_duration_seconds: CALL_DURATION_SECONDS,
                max_participants: 2,
              },
            },
          },
        });

        // Set up event listeners
        newCall.on("call.ended", async () => {
          console.log("📞 Call ended event received");
          if (!callEndedRef.current) {
            await cleanupCall();
            setShowTimerModal(true);
          }
        });

        setCall(newCall);
        setIsConnecting(false);
        startTimer();
        console.log("✅ Call joined successfully");
      } catch (error) {
        console.error("❌ Failed to initialize call:", error);
        setIsConnecting(false);
        Alert.alert("Connection Error", "Failed to connect to video call.", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      }
    };

    initializeCall();
  }, [matchData?.roomId, client, call, startTimer, navigation]);

  const cleanupCall = useCallback(async () => {
    if (callEndedRef.current) return;
    callEndedRef.current = true;
    stopTimer();

    try {
      if (call) {
        await call.leave().catch(console.error);
        setCall(null);
      }

      if (matchData?.id) {
        await endRoulette(matchData.id);
      }
    } catch (error) {
      console.error("Error cleaning up call:", error);
    }
  }, [call, matchData?.id, endRoulette, stopTimer]);

  const toggleCameraFacing = useCallback(() => {
    setFacing((current) => (current === "front" ? "back" : "front"));
  }, []);

  const toggleMute = useCallback(async () => {
    if (call) {
      try {
        await call.microphone.toggle();
        setIsMuted((current) => !current);
      } catch (error) {
        console.error("Error toggling mute:", error);
      }
    }
  }, [call]);

  const toggleVideo = useCallback(async () => {
    if (call) {
      try {
        await call.camera.toggle();
        setIsVideoOff((current) => !current);
      } catch (error) {
        console.error("Error toggling video:", error);
      }
    }
  }, [call]);

  const handleEndCall = useCallback(async () => {
    await cleanupCall();
    navigation.navigate("CruiseResult");
  }, [cleanupCall, navigation]);

  // Keep ref updated for timer callback
  useEffect(() => {
    handleEndCallRef.current = handleEndCall;
  }, [handleEndCall]);

  const handleContinueRoulette = useCallback(async () => {
    if (!user?.id) return;

    try {
      setShowTimerModal(false);
      callEndedRef.current = false;

      // Clean up current call
      if (call) {
        await call.leave().catch(console.error);
        setCall(null);
      }

      // End current match
      if (matchData?.id) {
        await endRoulette(matchData.id);
      }

      // Reset state
      setMatchData(null);
      setIsSearching(true);
      setSearchTimeRemaining(SEARCH_TIMEOUT_SECONDS);

      // Start new roulette
      await startRoulette(user.id);

      console.log("🔄 Starting new roulette match...");
    } catch (error) {
      console.error("Error continuing roulette:", error);
      Alert.alert("Error", "Failed to find another match. Please try again.");
      navigation.goBack();
    }
  }, [user?.id, call, matchData?.id, endRoulette, startRoulette, navigation]);

  const handleReport = useCallback(() => {
    Alert.alert("Report User", "Are you sure you want to report this user?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Report",
        style: "destructive",
        onPress: () => {
          // TODO: Implement report API call
          console.log("User reported:", matchData?.partnerId);
        },
      },
    ]);
  }, [matchData?.partnerId]);

  const handleCloseTimerModal = useCallback(() => {
    Alert.alert("Continue or End?", "Would you like to find another match?", [
      {
        text: "Continue",
        onPress: handleContinueRoulette,
      },
      {
        text: "End",
        style: "destructive",
        onPress: () => {
          setShowTimerModal(false);
          navigation.navigate("MainTabs");
        },
      },
    ]);
  }, [handleContinueRoulette, navigation]);

  // Handle back button - cancel roulette and go to MainTabs
  const handleBack = useCallback(async () => {
    console.log("⬅️ Back button pressed, cancelling roulette...");
    await cleanupAndCancel();
    navigation.navigate("MainTabs");
  }, [cleanupAndCancel, navigation]);

  return {
    facing,
    isMuted,
    isVideoOff,
    isSearching,
    isConnecting,
    searchTimeRemaining,
    displayTime,
    call,
    matchData,
    showTimerModal,
    toggleCameraFacing,
    toggleMute,
    toggleVideo,
    handleEndCall,
    handleBack,
    handleReport,
    handleContinueRoulette,
    handleCloseTimerModal,
  };
};
