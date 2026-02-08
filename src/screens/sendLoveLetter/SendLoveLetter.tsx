import React, { FC, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import type { ImageSourcePropType } from "react-native";

import LoveLetterSend from "components/svg/LoveLetterSend";
import { palette, layout } from "core/styles";

import { styles, IMAGE_WIDTH } from "./SendLoveLetter.styles";
import { useSendLoveLetterLogic } from "./useSendLoveLetterLogic";
import type { SendLoveLetterScreenProps } from "./SendLoveLetter.types";

const SendLoveLetter: FC<SendLoveLetterScreenProps> = (props) => {
  const {
    userName,
    userAge,
    userImages,
    message,
    setMessage,
    isSending,
    handleClose,
    handleSend,
  } = useSendLoveLetterLogic(props);

  const renderImage = useCallback(
    ({ item }: { item: ImageSourcePropType }) => (
      <View style={styles.imageContainer}>
        <Image source={item} style={styles.userImage} contentFit="cover" />
      </View>
    ),
    [],
  );

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "top"]}>
      <ScrollView>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={100}
        >
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleClose}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={28} color={palette.TEXT_COLOR} />
          </TouchableOpacity>

          <View style={styles.content}>
            <FlatList
              data={userImages}
              renderItem={renderImage}
              keyExtractor={(_, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.imageListContainer}
              snapToInterval={IMAGE_WIDTH + 16}
              decelerationRate="fast"
            />

            <View style={styles.userInfoContainer}>
              <Text>
                <Text style={styles.userNameText}>{userName}, </Text>
                <Text style={styles.userAgeText}>{userAge}</Text>
              </Text>
            </View>

            <View style={styles.loveLetterContainer}>
              <View style={layout.flex1}>
                {/* <Text style={styles.sectionTitle}>Love letter</Text> */}

                <TextInput
                  placeholder="Send a Love Letter"
                  style={styles.loveLetterInput}
                  multiline
                  numberOfLines={5}
                  value={message}
                  onChangeText={setMessage}
                  editable={!isSending}
                />
              </View>

              <TouchableOpacity
                style={[styles.shareButton, isSending && { opacity: 0.6 }]}
                activeOpacity={0.7}
                onPress={handleSend}
                disabled={isSending || !message.trim()}
              >
                {isSending ? (
                  <ActivityIndicator size="small" color={palette.PINK} />
                ) : (
                  <LoveLetterSend />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SendLoveLetter;
