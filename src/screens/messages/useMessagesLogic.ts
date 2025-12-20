import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SheetManager } from "react-native-actions-sheet";

import { images } from "core/images";
import type { RootStackParamList } from "navigation/RootNavigator";

import type { Match, Message } from "./Messages.types";

const MATCHES: Match[] = [
  { id: "1", name: "Halimah", avatar: images.avatar2, countryFlag: "🇨🇦" },
  { id: "2", name: "Tarah", avatar: images.avatar2, countryFlag: "🇨🇦" },
  { id: "3", name: "Victoria", avatar: images.avatar2, countryFlag: "🇺🇸" },
  { id: "4", name: "Anna", avatar: images.avatar2, countryFlag: "🇺🇸" },
  { id: "5", name: "Anna", avatar: images.avatar2, countryFlag: "🇺🇸" },
];

const MESSAGES: Message[] = [
  {
    id: "1",
    name: "Vera",
    avatar: images.avatar2,
    countryFlag: "🇨🇦",
    lastMessage: "Hello, how are you doing?",
    isPremium: true,
  },
  {
    id: "2",
    name: "Jasmine",
    avatar: images.avatar2,
    countryFlag: "🇨🇦",
    lastMessage: "Hello, how are you doing?",
  },
  {
    id: "3",
    name: "Anita",
    avatar: images.avatar2,
    countryFlag: "🇨🇦",
    lastMessage: "Hello, how are you doing?",
    isOnline: true,
  },
  {
    id: "4",
    name: "Mariah",
    avatar: images.avatar2,
    countryFlag: "🇳🇬",
    lastMessage: "Hello, how are you doing?",
  },
  {
    id: "5",
    name: "Jasmine",
    avatar: images.avatar2,
    countryFlag: "🇨🇦",
    lastMessage: "Hello, how are you doing?",
  },
];

export const useMessagesLogic = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const matches = MATCHES;
  const messages = MESSAGES;

  const handleMatchPress = useCallback(
    (matchId: string) => {
      const match = MATCHES.find((m) => m.id === matchId);
      if (match) {
        SheetManager.show("match-upgrade-sheet", {
          payload: {
            name: match.name,
            avatar: match.avatar,
            countryFlag: match.countryFlag,
            onUpgrade: () => {
              navigation.navigate("Upgrade");
            },
            onMaybeLater: () => {
              console.log("Maybe later pressed");
            },
          },
        });
      }
    },
    [navigation]
  );

  const handleMessagePress = useCallback(
    (messageId: string) => {
      const message = MESSAGES.find((m) => m.id === messageId);
      if (message) {
        navigation.navigate("Conversation", {
          recipientId: message.id,
          recipientName: message.name,
          recipientAvatar: message.avatar,
          matchDate: "24/10/2023",
        });
      }
    },
    [navigation]
  );

  const handleLoveLettersPress = useCallback(() => {
    console.log("Love letters pressed");
  }, []);

  return {
    matches,
    messages,
    handleMatchPress,
    handleMessagePress,
    handleLoveLettersPress,
  };
};
