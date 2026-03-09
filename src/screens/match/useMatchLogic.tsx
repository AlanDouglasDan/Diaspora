import { useEffect, useCallback, useState, useRef, useMemo } from "react";
import {
  Image,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
  ActivityIndicator,
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
import { useGetPreference } from "@/src/api/preferences";
import { useBoostProfile } from "@/src/api/boost";
import { useStreamChat } from "@/src/providers";
import { useAppSelector } from "@/src/store";
import Rocket from "components/svg/Rocket";
import { images } from "core/images";
import { palette } from "core/styles";
import type { MatchScreenProps, UserProfile } from "./Match.types";
import { styles } from "./Match.styles";
import type { RootStackParamList } from "../../navigation";
import type { SwipeableCardRef } from "./components";

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

const getWhyHereBadge = (whyHere?: string | null): string | null => {
  if (!whyHere) return null;

  switch (whyHere) {
    case "Marriage":
      return `💍 ${whyHere}`;
    case "Fun":
      return `🥳 ${whyHere}`;
    case "Casual":
      return `💕 ${whyHere}`;
    default:
      return whyHere;
  }
};

const mapUserToProfile = (apiUser: UserListItem): UserProfile => {
  const prefs = apiUser.preferences;
  const profile = apiUser.profile;

  const sortedImages = [...(apiUser.images || [])].sort(
    (a, b) => a.order - b.order,
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

  const ethnicity: string[] = Array.isArray(prefs?.ethnicity)
    ? prefs.ethnicity
    : prefs?.ethnicity
      ? [prefs.ethnicity]
      : [];

  const nationalities: string[] = apiUser.country?.name
    ? [apiUser.country.name]
    : [];

  const languageValues = Array.isArray(prefs?.language)
    ? prefs.language
    : prefs?.language
      ? [prefs.language]
      : [];

  const languages: { name: string; isShared: boolean }[] = languageValues.length
    ? languageValues.map((language) => ({ name: language, isShared: false }))
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
    badge: getWhyHereBadge(prefs?.whyHere),
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

  // Get filters from Redux store for persistence
  const { filters, appliedFilters } = useAppSelector((state) => state.filters);

  const { data: usersData, getUsers, isLoading } = useGetUsers();
  const { likeUser } = useLikeUser();
  const { dislikeUser } = useDislikeUser();
  const { getLikes, data: likesData } = useGetLikes();
  const { getPreference, data: preferencesData } = useGetPreference();
  const { boostProfile } = useBoostProfile();
  const { sendLoveLetter, isConnected: isStreamConnected } = useStreamChat();
  const { createProfileView } = useCreateProfileView();

  const swipeableCardRef = useRef<SwipeableCardRef>(null);
  const pendingSuperLike = useRef(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [isSwipingEnabled, setIsSwipingEnabled] = useState(true);
  const [excludedUserIds, setExcludedUserIds] = useState<Set<string>>(
    new Set(),
  );
  const [viewedUserIds, setViewedUserIds] = useState<Set<string>>(new Set());
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [loveLetterText, setLoveLetterText] = useState("");
  const [isSendingLoveLetter, setIsSendingLoveLetter] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isBoosting, setIsBoosting] = useState(false);
  // Commented out - no longer using deck swiper
  // const swiperRef = useRef<Swiper<UserProfile>>(null);
  // const isProgrammaticSwipe = useRef(false);

  // Build getUsers params from applied filters and user preferences
  const buildGetUsersParams = useCallback(() => {
    const params: any = {
      userId: clerkUser?.id || "",
      radius: appliedFilters?.distanceRange || [0, 1000],
      age: appliedFilters?.ageRange || [18, 99],
    };

    // Use gender from preferences if not explicitly set in filters
    if (appliedFilters?.gender?.length) {
      params.gender = appliedFilters.gender;
    }
    // else if (preferencesData?.lookingToDate?.length) {
    //   // Use the first value in lookingToDate as gender preference
    //   const lookingFor = preferencesData.lookingToDate[0]?.toLowerCase();
    //   if (
    //     lookingFor === "man" ||
    //     lookingFor === "woman" ||
    //     lookingFor === "nonbinary"
    //   ) {
    //     params.gender = lookingFor;
    //   }
    // }

    console.log("params", params);

    if (appliedFilters?.activity?.length) {
      params.activity = appliedFilters.activity;
    }
    if (appliedFilters?.country && appliedFilters.country !== "all") {
      params.country = appliedFilters.country;
    }

    // Build advanced filters
    const advancedFilters: any = {};
    if (appliedFilters?.hasBio) advancedFilters.bio = true;
    if (appliedFilters?.ethnicity)
      advancedFilters.ethnicity = appliedFilters.ethnicity;
    if (appliedFilters?.starSign)
      advancedFilters.zodiac = appliedFilters.starSign;
    if (appliedFilters?.height) advancedFilters.height = appliedFilters.height;

    if (appliedFilters?.drinking?.length) {
      advancedFilters.drinking =
        appliedFilters.drinking.includes("socially") ||
        appliedFilters.drinking.includes("regularly");
    }

    if (appliedFilters?.smoking?.length) {
      advancedFilters.smoking =
        appliedFilters.smoking.includes("socially") ||
        appliedFilters.smoking.includes("regularly");
    }

    if (appliedFilters?.educationLevel)
      advancedFilters.educationLevel = appliedFilters.educationLevel;
    if (appliedFilters?.children)
      advancedFilters.familyPlans = appliedFilters.children;
    if (appliedFilters?.lookingFor)
      advancedFilters.lookingFor = appliedFilters.lookingFor;
    if (appliedFilters?.religion)
      advancedFilters.religion = appliedFilters.religion;

    if (Object.keys(advancedFilters).length > 0) {
      params.advancedFilters = advancedFilters;
    }

    return params;
  }, [clerkUser?.id, appliedFilters, preferencesData]);

  // Fetch users, likes and preferences
  useEffect(() => {
    const fetchData = async () => {
      if (!clerkUser?.id) return;

      setIsInitializing(true);

      try {
        // Fetch preferences and likes first to build correct params
        await Promise.all([
          getPreference(clerkUser.id),
          getLikes(clerkUser.id),
        ]);

        // buildGetUsersParams will now have updated preferencesData
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setIsInitializing(false);
      }
    };

    fetchData();
  }, []);

  // Fetch users when params change or after initial data fetch
  useEffect(() => {
    if (!clerkUser?.id || isInitializing) return;

    const fetchUsers = async () => {
      const getUsersParams = buildGetUsersParams();
      try {
        await getUsers(getUsersParams);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [isInitializing]);

  // Update excluded users when likes data changes
  useEffect(() => {
    if (likesData?.length) {
      const likedIds = new Set(likesData.map((like) => like.likedId));
      setExcludedUserIds((prev) => new Set([...prev, ...likedIds]));
    }
  }, [likesData]);

  // Map API users to UserProfile format and filter out excluded and viewed users
  const users: UserProfile[] = useMemo(() => {
    if (!usersData?.users?.length) return [];
    return usersData.users
      .filter(
        (user) => !excludedUserIds.has(user.id) && !viewedUserIds.has(user.id),
      )
      .map(mapUserToProfile);
  }, [usersData, excludedUserIds, viewedUserIds]);

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
  }, []);

  const handleBoostProfile = useCallback(async () => {
    if (!clerkUser?.id || isBoosting) return;

    setIsBoosting(true);
    try {
      await boostProfile(clerkUser.id);
      // Show boost success sheet
      SheetManager.show("boost-sheet", {
        payload: {
          onKeepSwiping: () => {},
        },
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to boost profile",
        text2: "Please try again",
      });
    } finally {
      setIsBoosting(false);
    }
  }, [clerkUser?.id, isBoosting, boostProfile]);

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
      // headerLeft: () => (
      //   <TouchableOpacity
      //     style={styles.headerButton}
      //     activeOpacity={0.7}
      //     onPress={handleRefresh}
      //   >
      //     <MaterialIcons name="refresh" size={24} color={palette.GREY2} />
      //   </TouchableOpacity>
      // ),
      headerRight: () => (
        <View style={styles.flexedRow}>
          <TouchableOpacity
            onPress={handleBoostProfile}
            disabled={isBoosting}
            activeOpacity={0.7}
          >
            {isBoosting ? (
              <ActivityIndicator size="small" color={palette.PINK} />
            ) : (
              <Rocket />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.headerButton}
            activeOpacity={0.7}
            onPress={() => rootNavigation.navigate("FilterSettings")}
          >
            <Ionicons name="options-outline" size={24} color={palette.GREY2} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, handleRefresh, handleBoostProfile, isBoosting]);

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

  const handleOpenSendLoveLetter = useCallback(() => {
    if (!currentUser) return;
    rootNavigation.navigate("SendLoveLetter", {
      userId: currentUser.id,
      userName: currentUser.name,
      userAge: currentUser.age,
      userImages: currentUser.galleryImages,
    });
  }, [rootNavigation, currentUser]);

  const excludeUser = useCallback((userId: string) => {
    setExcludedUserIds((prev) => new Set([...prev, userId]));
    setViewedUserIds((prev) => new Set([...prev, userId]));
  }, []);

  const handleLikeAction = useCallback(
    async (superLike: boolean = false): Promise<boolean> => {
      if (!currentUser || !clerkUser?.id) return false;

      // Run API call in background without loading indicator
      excludeUser(currentUser.id);

      // Fire and forget - don't await, run in background
      likeUser({
        likedId: currentUser.id,
        likerId: clerkUser.id,
        superLike,
      }).catch((error) => {
        console.error("Failed to send like:", error);
      });

      return true;
    },
    [currentUser, clerkUser?.id, likeUser, excludeUser],
  );

  const handleDislikeAction = useCallback(async (): Promise<boolean> => {
    if (!currentUser || !clerkUser?.id) return false;

    // Run API call in background without loading indicator
    excludeUser(currentUser.id);

    // Fire and forget - don't await, run in background
    dislikeUser({
      dislikedId: currentUser.id,
      dislikerId: clerkUser.id,
    }).catch((error) => {
      console.error("Failed to pass:", error);
    });

    return true;
  }, [currentUser, clerkUser?.id, dislikeUser, excludeUser]);

  // Programmatic swipe triggers - animation calls onSwipeLeft/onSwipeRight which handle the action
  const handleSuperLike = useCallback(() => {
    // Mark that the next swipe right should be a super like
    pendingSuperLike.current = true;
    if (swipeableCardRef.current) {
      swipeableCardRef.current.swipeRight();
    }
  }, []);

  // Updated for SwipeableCard - always call API since SwipeableCard handles its own swipe gestures
  const handleSwipedLeft = useCallback(async () => {
    await handleDislikeAction();
    setCardIndex((prev) => prev + 1);
  }, [handleDislikeAction]);

  const handleSwipedRight = useCallback(async () => {
    const isSuperLike = pendingSuperLike.current;
    pendingSuperLike.current = false;
    await handleLikeAction(isSuperLike);
    setCardIndex((prev) => prev + 1);
  }, [handleLikeAction]);

  const handleSwipedAll = useCallback(() => {
    // Don't reset - let it show empty state when all profiles are viewed
    // The empty state will be shown when users.length === 0
  }, []);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      const shouldEnableSwiping = offsetY < 50;
      if (shouldEnableSwiping !== isSwipingEnabled) {
        setIsSwipingEnabled(shouldEnableSwiping);
      }
    },
    [isSwipingEnabled],
  );

  // Button press handlers - trigger programmatic swipe animation
  // The animation completion callback calls handleSwipedLeft/handleSwipedRight which do the action
  const swipeLeft = useCallback(() => {
    if (swipeableCardRef.current) {
      swipeableCardRef.current.swipeLeft();
    }
  }, []);

  const swipeRight = useCallback(() => {
    if (swipeableCardRef.current) {
      swipeableCardRef.current.swipeRight();
    }
  }, []);

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
    isLoading: isInitializing || isLoading,
    isActionLoading,
    isSwipingEnabled,
    swipeableCardRef,
    handleOpenImages,
    handleOpenSendLoveLetter,
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
