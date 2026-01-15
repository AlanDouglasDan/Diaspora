import { useEffect, useCallback, useState, useRef, useMemo } from "react";
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
import { useUser } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";

import { useGetUsers, UserListItem } from "@/src/api/user";
import { useLikeUser, useDislikeUser, useGetLikes } from "@/src/api/likes";
import { useCreateProfileView } from "@/src/api/profileViews";
import { useStreamChat } from "@/src/providers";
import { images } from "core/images";
import { palette } from "core/styles";
import type { MatchScreenProps, UserProfile } from "./Match.types";
import { styles } from "./Match.styles";
import type { RootStackParamList } from "../../navigation";

const calculateAge = (birthday: string): number => {
  const birthDate = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

const getLookingToDateBadge = (lookingToDate?: string[]): string => {
  if (!lookingToDate || lookingToDate.length === 0) return "💕 Dating";
  const first = lookingToDate[0]?.toLowerCase() || "";
  if (first.includes("marriage") || first.includes("serious"))
    return "💍 Marriage";
  if (first.includes("casual")) return "💕 Casual";
  if (first.includes("network")) return "🤝 Networking";
  return `💕 ${lookingToDate[0]}`;
};

const mapUserToProfile = (apiUser: UserListItem): UserProfile => {
  const prefs = apiUser.preferences;
  const profile = apiUser.profile;

  const sortedImages = [...(apiUser.images || [])].sort(
    (a, b) => a.order - b.order
  );
  const avatarUri = sortedImages[0]?.imageUrl || "";
  const galleryUris = sortedImages.map((img) => img.imageUrl);

  const compatibility: string[] = [];
  if (prefs?.lookingToDate?.length) {
    prefs.lookingToDate.forEach((item) => {
      if (item) compatibility.push(`💕 ${item}`);
    });
  }
  if (!compatibility.length) {
    compatibility.push("💍 Single", "🌍 Open to long distance");
  }

  const aboutMe: string[] = [];
  if (prefs?.height) aboutMe.push(`📏 ${prefs.height}`);
  if (prefs?.zodiac) aboutMe.push(`⭐ ${prefs.zodiac}`);
  if (prefs?.education) aboutMe.push(`🎓 ${prefs.education}`);
  if (prefs?.pets) aboutMe.push(`🐕 ${prefs.pets}`);
  if (prefs?.smoking !== null && prefs?.smoking !== undefined) {
    aboutMe.push(prefs.smoking ? "🚬 Smoker" : "🚬 Non-smoker");
  }
  if (prefs?.drinking !== null && prefs?.drinking !== undefined) {
    aboutMe.push(prefs.drinking ? "🍷 Drinks" : "🍷 Non-drinker");
  }
  if (prefs?.religion) aboutMe.push(`🙏 ${prefs.religion}`);
  if (prefs?.familyPlans) aboutMe.push(`👨‍👩‍👧 ${prefs.familyPlans}`);

  const interests: { name: string; isShared: boolean }[] = (
    prefs?.interests || []
  ).map((interest) => ({
    name: interest,
    isShared: false,
  }));

  const ethnicity: string[] = prefs?.ethnicity ? [prefs.ethnicity] : [];

  const nationalities: string[] = apiUser.country?.name
    ? [apiUser.country.name]
    : [];

  const languages: { name: string; isShared: boolean }[] = prefs?.language
    ? [{ name: prefs.language, isShared: false }]
    : [{ name: "English", isShared: false }];

  const distanceDisplay =
    typeof apiUser.distanceKm === "number"
      ? `${Math.round(apiUser.distanceKm)}km away`
      : apiUser.distanceKm || "";
  const location = apiUser.country
    ? `${apiUser.country.flag} ${apiUser.country.name}`
    : distanceDisplay;

  return {
    id: apiUser.id,
    name: apiUser.displayName || "User",
    age: apiUser.birthday ? calculateAge(apiUser.birthday) : 25,
    flag: apiUser.country?.flag || "🌍",
    isVerified: apiUser.verified || false,
    badge: getLookingToDateBadge(prefs?.lookingToDate),
    isOnline: apiUser.onlineStatus || false,
    bio: profile?.bio || "No bio yet",
    avatar: avatarUri ? { uri: avatarUri } : images.avatar2,
    galleryImages: galleryUris.length
      ? galleryUris.map((uri) => ({ uri }))
      : [images.avatar2],
    compatibility,
    aboutMe: aboutMe.length ? aboutMe : ["No details yet"],
    school: "Not specified",
    workTitle: "Not specified",
    company: "Not specified",
    ethnicity: ethnicity.length ? ethnicity : ["Not specified"],
    nationalities: nationalities.length ? nationalities : ["Not specified"],
    languages,
    interests: interests.length
      ? interests
      : [{ name: "No interests yet", isShared: false }],
    location: location || "Location not available",
  };
};

export const useMatchLogic = (props: MatchScreenProps) => {
  const { navigation, route } = props;
  const rootNavigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user: clerkUser } = useUser();

  // Get filters from route params
  const filterParams = route.params?.filters;

  const { data: usersData, getUsers, isLoading } = useGetUsers();
  const { likeUser } = useLikeUser();
  const { dislikeUser } = useDislikeUser();
  const { getLikes, data: likesData } = useGetLikes();
  const { sendLoveLetter, isConnected: isStreamConnected } = useStreamChat();
  const { createProfileView } = useCreateProfileView();

  const [cardIndex, setCardIndex] = useState(0);
  const [isSwipingEnabled, setIsSwipingEnabled] = useState(true);
  const [excludedUserIds, setExcludedUserIds] = useState<Set<string>>(
    new Set()
  );
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [loveLetterText, setLoveLetterText] = useState("");
  const [isSendingLoveLetter, setIsSendingLoveLetter] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const swiperRef = useRef<Swiper<UserProfile>>(null);

  // Build getUsers params from filter params
  const buildGetUsersParams = useCallback(() => {
    const params: any = {
      userId: clerkUser?.id || "",
      radius: filterParams?.radius || [1, 1000],
      age: filterParams?.age || [18, 99],
    };

    // Add optional filters only if they exist
    if (filterParams?.gender) {
      params.gender = filterParams.gender;
    }
    if (filterParams?.activity) {
      params.activity = filterParams.activity;
    }
    if (filterParams?.country) {
      params.country = filterParams.country;
    }

    // Build advanced filters
    const advancedFilters: any = {};
    if (filterParams?.hasBio) advancedFilters.bio = true;
    if (filterParams?.ethnicity)
      advancedFilters.ethnicity = filterParams.ethnicity;
    if (filterParams?.zodiac) advancedFilters.zodiac = filterParams.zodiac;
    if (filterParams?.height) advancedFilters.height = filterParams.height;
    if (filterParams?.drinking) advancedFilters.drinking = true;
    if (filterParams?.smoking) advancedFilters.smoking = true;
    if (filterParams?.educationLevel)
      advancedFilters.educationLevel = filterParams.educationLevel;
    if (filterParams?.familyPlans)
      advancedFilters.familyPlans = filterParams.familyPlans;
    if (filterParams?.lookingFor)
      advancedFilters.lookingFor = filterParams.lookingFor;

    if (Object.keys(advancedFilters).length > 0) {
      params.advancedFilters = advancedFilters;
    }

    return params;
  }, [clerkUser?.id, filterParams]);

  // Fetch users and likes
  useEffect(() => {
    const fetchUsersAndLikes = async () => {
      if (!clerkUser?.id) return;

      setIsInitializing(true);
      const getUsersParams = buildGetUsersParams();

      try {
        await Promise.all([getUsers(getUsersParams), getLikes(clerkUser.id)]);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsInitializing(false);
      }
    };

    fetchUsersAndLikes();
  }, [clerkUser?.id, getUsers, getLikes, buildGetUsersParams, filterParams]);

  // Update excluded users when likes data changes
  useEffect(() => {
    if (likesData?.length) {
      const likedIds = new Set(likesData.map((like) => like.likedId));
      setExcludedUserIds((prev) => new Set([...prev, ...likedIds]));
    }
  }, [likesData]);

  // Map API users to UserProfile format and filter out excluded users
  const users: UserProfile[] = useMemo(() => {
    if (!usersData?.users?.length) return [];
    return usersData.users
      .filter((user) => !excludedUserIds.has(user.id))
      .map(mapUserToProfile);
  }, [usersData, excludedUserIds]);

  const currentUser: UserProfile | null = useMemo(() => {
    if (!users.length) return null;
    return users[cardIndex % users.length];
  }, [users, cardIndex]);

  // Track profile views when viewing a user
  useEffect(() => {
    if (currentUser && clerkUser?.id && currentUser.id !== clerkUser.id) {
      createProfileView({
        viewedId: currentUser.id,
        viewerId: clerkUser.id,
      });
    }
  }, [currentUser?.id, clerkUser?.id, createProfileView]);

  console.log(users.length);

  const handleRefresh = useCallback(async () => {
    if (!clerkUser?.id) return;

    try {
      const getUsersParams = buildGetUsersParams();
      await Promise.all([getUsers(getUsersParams), getLikes(clerkUser.id)]);
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  }, [clerkUser?.id, getUsers, getLikes, buildGetUsersParams]);

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
        <TouchableOpacity
          style={styles.headerButton}
          activeOpacity={0.7}
          onPress={handleRefresh}
        >
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
  }, [navigation, handleRefresh]);

  const handleSeePlans = useCallback(() => {
    rootNavigation.navigate("Upgrade");
  }, [rootNavigation]);

  // const handleOpenActionSheet = useCallback(() => {
  //   SheetManager.show("match-action-sheet", {
  //     payload: {
  //       onSeePlans: handleSeePlans,
  //     },
  //   });
  // }, [handleSeePlans]);

  const handleOpenImages = useCallback(() => {
    if (!currentUser) return;
    rootNavigation.navigate("Images", {
      images: currentUser.galleryImages,
    });
  }, [rootNavigation, currentUser]);

  const excludeUser = useCallback((userId: string) => {
    setExcludedUserIds((prev) => new Set([...prev, userId]));
  }, []);

  const handleLikeAction = useCallback(
    async (superLike: boolean = false): Promise<boolean> => {
      if (!currentUser || !clerkUser?.id) return false;

      setIsActionLoading(true);
      try {
        await likeUser({
          likedId: currentUser.id,
          likerId: clerkUser.id,
          superLike,
        });

        Toast.show({
          type: "success",
          text1: superLike ? "Super Like Sent! 💖" : "Like Sent! ❤️",
          text2: `You ${superLike ? "super liked" : "liked"} ${
            currentUser.name
          }`,
        });

        excludeUser(currentUser.id);
        return true;
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Failed to send like",
          text2: "Please try again",
        });
        return false;
      } finally {
        setIsActionLoading(false);
      }
    },
    [currentUser, clerkUser?.id, likeUser, excludeUser]
  );

  const handleDislikeAction = useCallback(async (): Promise<boolean> => {
    if (!currentUser || !clerkUser?.id) return false;

    setIsActionLoading(true);
    try {
      await dislikeUser({
        dislikedId: currentUser.id,
        dislikerId: clerkUser.id,
      });

      Toast.show({
        type: "success",
        text1: "Passed 👋",
        text2: `You passed on ${currentUser.name}`,
      });

      excludeUser(currentUser.id);
      return true;
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to pass",
        text2: "Please try again",
      });
      return false;
    } finally {
      setIsActionLoading(false);
    }
  }, [currentUser, clerkUser?.id, dislikeUser, excludeUser]);

  const handleSuperLike = useCallback(async () => {
    const success = await handleLikeAction(true);
    if (success) {
      swiperRef.current?.swipeRight();
    }
  }, [handleLikeAction]);

  const handleSwipedLeft = useCallback(async () => {
    await handleDislikeAction();
    setCardIndex((prev) => prev + 1);
  }, [handleDislikeAction]);

  const handleSwipedRight = useCallback(async () => {
    await handleLikeAction(false);
    setCardIndex((prev) => prev + 1);
  }, [handleLikeAction]);

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

  const swipeLeft = useCallback(async () => {
    const success = await handleDislikeAction();
    if (success) {
      swiperRef.current?.swipeLeft();
    }
  }, [handleDislikeAction]);

  const swipeRight = useCallback(async () => {
    const success = await handleLikeAction(false);
    if (success) {
      swiperRef.current?.swipeRight();
    }
  }, [handleLikeAction]);

  const handleSendLoveLetter = useCallback(async () => {
    if (!currentUser || !loveLetterText.trim() || isSendingLoveLetter) return;

    if (!isStreamConnected) {
      Toast.show({
        type: "error",
        text1: "Connection Error",
        text2: "Please wait for chat to connect",
      });
      return;
    }

    setIsSendingLoveLetter(true);
    try {
      const success = await sendLoveLetter(currentUser.id, loveLetterText);

      if (success) {
        setLoveLetterText("");
        // Navigate to LoveLetterSent screen
        const recipientImage =
          typeof currentUser.avatar === "object" && "uri" in currentUser.avatar
            ? (currentUser.avatar as { uri: string })
            : { uri: "" };
        rootNavigation.navigate("LoveLetterSent", {
          recipientName: currentUser.name,
          recipientImage,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Failed to send",
          text2: "Please try again",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to send",
        text2: "Please try again",
      });
    } finally {
      setIsSendingLoveLetter(false);
    }
  }, [
    currentUser,
    loveLetterText,
    isSendingLoveLetter,
    isStreamConnected,
    sendLoveLetter,
  ]);

  return {
    users,
    currentUser,
    cardIndex,
    isLoading: isInitializing,
    isActionLoading,
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
    loveLetterText,
    setLoveLetterText,
    handleSendLoveLetter,
    isSendingLoveLetter,
  };
};
