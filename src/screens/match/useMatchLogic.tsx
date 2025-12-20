import { useEffect, useCallback, useState, useRef } from "react";
import {
  Image,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SheetManager } from "react-native-actions-sheet";
import Swiper from "react-native-deck-swiper";

import { images } from "core/images";
import { palette } from "core/styles";
import type { MatchScreenProps, UserProfile } from "./Match.types";
import { styles } from "./Match.styles";
import type { RootStackParamList } from "../../navigation";

const MOCK_USERS: UserProfile[] = [
  {
    id: "1",
    name: "Rebecca",
    age: 25,
    flag: "🇨🇦",
    isVerified: true,
    badge: "💍 Marriage",
    isOnline: true,
    bio: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatuDuis aute irure dolor in reprehenderit.",
    avatar: images.avatar3,
    galleryImages: [images.avatar3, images.avatar3, images.avatar3],
    compatibility: [
      "💍 Single",
      "🌍 Open to long distance",
      "✈️ Willing to relocate",
    ],
    aboutMe: [
      "📏 150cm",
      "🏋️ Rarely",
      "⭐ Capricorn",
      "🎓 Bachelors",
      "🐕 Have & want more",
      "🚬 Non-smoker",
      "🍷 Socially",
    ],
    school: "University of Toronto",
    workTitle: "Product designer",
    company: "Microsoft Inc",
    ethnicity: ["Jamaican"],
    nationalities: ["Canada", "Jamaica"],
    languages: [
      { name: "🇬🇧 English", isShared: false },
      { name: "🇫🇷 French", isShared: true },
      { name: "🇪🇸 Spanish", isShared: false },
    ],
    interests: [
      { name: "🕺 Dancing", isShared: false },
      { name: "🏋️ Bodybuilding", isShared: true },
      { name: "🐶 Dogs", isShared: false },
      { name: "🐱 Cats", isShared: false },
    ],
    location: "🇨🇦 Toronto, Canada 200km away",
  },
  {
    id: "2",
    name: "Sofia",
    age: 28,
    flag: "🇧🇷",
    isVerified: true,
    badge: "💕 Dating",
    isOnline: false,
    bio: "Adventure seeker and coffee enthusiast. Love exploring new places and meeting new people. Life is too short for boring conversations!",
    avatar: images.avatar2,
    galleryImages: [images.avatar2, images.avatar2, images.avatar2],
    compatibility: ["💍 Single", "🌍 Open to long distance"],
    aboutMe: [
      "📏 165cm",
      "🏋️ Often",
      "⭐ Leo",
      "🎓 Masters",
      "🐕 Want someday",
      "🚬 Non-smoker",
      "🍷 Never",
    ],
    school: "University of São Paulo",
    workTitle: "Software Engineer",
    company: "Google",
    ethnicity: ["Brazilian"],
    nationalities: ["Brazil"],
    languages: [
      { name: "🇧🇷 Portuguese", isShared: false },
      { name: "🇬🇧 English", isShared: true },
    ],
    interests: [
      { name: "✈️ Travel", isShared: true },
      { name: "☕ Coffee", isShared: false },
      { name: "📸 Photography", isShared: false },
    ],
    location: "🇧🇷 São Paulo, Brazil 5000km away",
  },
  {
    id: "3",
    name: "Emma",
    age: 24,
    flag: "🇬🇧",
    isVerified: false,
    badge: "💍 Marriage",
    isOnline: true,
    bio: "Book lover and tea addict. Looking for someone who appreciates deep conversations and cozy nights in.",
    avatar: images.avatar2,
    galleryImages: [images.avatar2, images.avatar2, images.avatar2],
    compatibility: ["💍 Single", "✈️ Willing to relocate"],
    aboutMe: [
      "📏 160cm",
      "🏋️ Sometimes",
      "⭐ Virgo",
      "🎓 PhD",
      "🐕 Have pets",
      "🚬 Non-smoker",
      "🍷 Socially",
    ],
    school: "Oxford University",
    workTitle: "Research Scientist",
    company: "Cambridge Labs",
    ethnicity: ["British"],
    nationalities: ["United Kingdom"],
    languages: [
      { name: "🇬🇧 English", isShared: true },
      { name: "🇩🇪 German", isShared: false },
    ],
    interests: [
      { name: "📚 Reading", isShared: false },
      { name: "🎵 Music", isShared: true },
      { name: "🎨 Art", isShared: false },
    ],
    location: "🇬🇧 London, UK 3500km away",
  },
];

export const useMatchLogic = (props: MatchScreenProps) => {
  const { navigation } = props;
  const rootNavigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [cardIndex, setCardIndex] = useState(0);
  const [isSwipingEnabled, setIsSwipingEnabled] = useState(true);
  const swiperRef = useRef<Swiper<UserProfile>>(null);

  const currentUser = MOCK_USERS[cardIndex % MOCK_USERS.length];
  const users = MOCK_USERS;

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: () => (
        <Image
          source={images.logo2}
          style={styles.headerLogo}
          resizeMode="contain"
        />
      ),
      headerLeft: () => (
        <TouchableOpacity style={styles.headerButton} activeOpacity={0.7}>
          <MaterialIcons name="refresh" size={24} color={palette.GREY2} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerButton}
          activeOpacity={0.7}
          onPress={() => rootNavigation.navigate("FilterSettings")}
        >
          <Ionicons name="options-outline" size={24} color={palette.GREY2} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleSeePlans = useCallback(() => {
    rootNavigation.navigate("Upgrade");
  }, [rootNavigation]);

  const handleOpenActionSheet = useCallback(() => {
    SheetManager.show("match-action-sheet", {
      payload: {
        onSeePlans: handleSeePlans,
      },
    });
  }, [handleSeePlans]);

  const handleOpenImages = useCallback(() => {
    rootNavigation.navigate("Images", {
      images: currentUser.galleryImages,
    });
  }, [rootNavigation, currentUser.galleryImages]);

  const handleDislike = useCallback(() => {
    handleOpenActionSheet();
  }, [handleOpenActionSheet]);

  const handleSuperLike = useCallback(() => {
    rootNavigation.navigate("MatchResult");
  }, [rootNavigation]);

  const handleLike = useCallback(() => {
    handleOpenActionSheet();
  }, [handleOpenActionSheet]);

  const handleSwipedLeft = useCallback(() => {
    setCardIndex((prev) => prev + 1);
  }, []);

  const handleSwipedRight = useCallback(() => {
    setCardIndex((prev) => prev + 1);
    handleOpenActionSheet();
  }, [handleOpenActionSheet]);

  const handleSwipedAll = useCallback(() => {
    setCardIndex(0);
  }, []);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      const shouldEnableSwiping = offsetY < 50;
      if (shouldEnableSwiping !== isSwipingEnabled) {
        setIsSwipingEnabled(shouldEnableSwiping);
      }
    },
    [isSwipingEnabled]
  );

  const swipeLeft = useCallback(() => {
    swiperRef.current?.swipeLeft();
  }, []);

  const swipeRight = useCallback(() => {
    swiperRef.current?.swipeRight();
  }, []);

  return {
    users,
    currentUser,
    cardIndex,
    isSwipingEnabled,
    swiperRef,
    handleOpenImages,
    handleDislike: swipeLeft,
    handleSuperLike,
    handleLike: swipeRight,
    handleSwipedLeft,
    handleSwipedRight,
    handleSwipedAll,
    handleScroll,
  };
};
