import React, { FC, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Image, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, Feather } from "@expo/vector-icons";

import { palette } from "core/styles";
import type { IncomingCallScreenProps } from "./IncomingCall.types";
import { styles } from "./IncomingCall.styles";
import { useIncomingCallLogic } from "./useIncomingCallLogic";

const IncomingCall: FC<IncomingCallScreenProps> = (props) => {
  const {
    recipientName,
    recipientAvatar,
    isVideoCall,
    handleAccept,
    handleDecline,
  } = useIncomingCallLogic(props);

  // Pulse animation for the ringing indicator dots
  const pulse1 = useRef(new Animated.Value(0.3)).current;
  const pulse2 = useRef(new Animated.Value(0.3)).current;
  const pulse3 = useRef(new Animated.Value(0.3)).current;

  // Ring animation for the avatar border
  const ringScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Staggered dot pulse animation
    const createPulse = (anim: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0.3,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      );

    const p1 = createPulse(pulse1, 0);
    const p2 = createPulse(pulse2, 200);
    const p3 = createPulse(pulse3, 400);

    p1.start();
    p2.start();
    p3.start();

    // Subtle ring scale animation
    const ring = Animated.loop(
      Animated.sequence([
        Animated.timing(ringScale, {
          toValue: 1.08,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(ringScale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );
    ring.start();

    return () => {
      p1.stop();
      p2.stop();
      p3.stop();
      ring.stop();
    };
  }, []);

  const initial = recipientName?.charAt(0)?.toUpperCase() || "?";

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[`${palette.PINK2}08`, `${palette.PINK2}18`, palette.WHITE]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.6 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Animated avatar ring */}
          <Animated.View
            style={[styles.avatarRing, { transform: [{ scale: ringScale }] }]}
          >
            {recipientAvatar?.uri ? (
              <Image
                source={recipientAvatar}
                style={styles.avatar}
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarInitial}>{initial}</Text>
              </View>
            )}
          </Animated.View>

          {/* Caller name */}
          <Text style={styles.callerName}>{recipientName}</Text>

          {/* Call type */}
          <Text style={styles.callTypeLabel}>
            Incoming {isVideoCall ? "Video" : "Voice"} Call
          </Text>

          {/* Pulsing dots indicator */}
          <View style={styles.pulseContainer}>
            <Animated.View style={[styles.pulseDot, { opacity: pulse1 }]} />
            <Animated.View style={[styles.pulseDot, { opacity: pulse2 }]} />
            <Animated.View style={[styles.pulseDot, { opacity: pulse3 }]} />
          </View>
        </View>

        {/* Accept / Decline buttons */}
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={styles.declineButton}
              onPress={handleDecline}
              activeOpacity={0.8}
            >
              <Feather name="phone-off" size={28} color={palette.WHITE} />
            </TouchableOpacity>
            <Text style={styles.buttonLabel}>Decline</Text>
          </View>

          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={handleAccept}
              activeOpacity={0.8}
            >
              <Feather
                name={isVideoCall ? "video" : "phone"}
                size={28}
                color={palette.WHITE}
              />
            </TouchableOpacity>
            <Text style={styles.buttonLabel}>Accept</Text>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default IncomingCall;
