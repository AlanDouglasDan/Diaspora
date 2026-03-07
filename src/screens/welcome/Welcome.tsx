import React, { FC, useEffect } from "react";
import { ImageBackground, Text, View, TouchableOpacity, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { AntDesign, Feather } from "@expo/vector-icons";

import { images } from "core/images";
import { common, spacing, palette, layout } from "core/styles";
import { Button } from "components/button";
import type { WelcomeScreenProps } from "./Welcome.types";
import { styles } from "./Welcome.styles";
import { useWelcomeLogic } from "./useWelcomeLogic";

const Welcome: FC<WelcomeScreenProps> = (props) => {
  const {
    authState,
    setAuthState,
    handleContinueWithEmail,
    handleGoogleSignIn,
    handleAppleSignIn,
    handleLogout,
    isGoogleLoading,
    isAppleLoading,
  } = useWelcomeLogic(props);

  useEffect(() => {
    if (authState !== "welcome") {
      props.navigation.setOptions({
        headerShown: true,
        headerTitle: "",
        headerTransparent: true,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => setAuthState("welcome")}
            style={{ paddingLeft: 4 }}
          >
            <Feather name="chevron-left" size={24} color={palette.WHITE} />
          </TouchableOpacity>
        ),
      });
    } else {
      props.navigation.setOptions({
        headerLeft: undefined,
      });
    }
  }, [authState, props.navigation, setAuthState]);

  return (
    <ImageBackground
      source={images.welcome}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <TouchableOpacity onPress={handleLogout} activeOpacity={0.7}>
              <Image
                source={images.logo}
                style={styles.logo}
                contentFit="contain"
              />
            </TouchableOpacity>

            <Text style={[common.textCenter, styles.title]}>
              Meet. Match. Love. Anywhere.
            </Text>

            <View style={spacing.marginTop60} />

            {authState === "welcome" ? (
              <View style={common.w100}>
                <Button
                  title="Create An Account"
                  style={styles.button}
                  onPress={() => setAuthState("sign-up")}
                />

                <Button
                  title="Sign In"
                  variant="white"
                  style={styles.button}
                  onPress={() => setAuthState("sign-in")}
                />

                <Text style={[common.textCenter, styles.subtitle]}>
                  Problem signing in?
                </Text>
              </View>
            ) : (
              <View style={common.w100}>
                <Button
                  title="Continue With Email"
                  style={styles.button}
                  onPress={handleContinueWithEmail}
                />

                {Platform.OS === "ios" && <Button
                  prefixIcon={
                    <AntDesign name="apple" size={18} color={palette.BLACK} />
                  }
                  title="Continue with Apple"
                  style={styles.button}
                  variant="white"
                  onPress={handleAppleSignIn}
                  loading={isAppleLoading}
                />}

                <Button
                  prefixIcon={
                    <AntDesign name="google" size={18} color={palette.BLACK} />
                  }
                  title="Continue With Google"
                  style={styles.button}
                  variant="white"
                  onPress={handleGoogleSignIn}
                  loading={isGoogleLoading}
                />
              </View>
            )}
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

export default Welcome;
