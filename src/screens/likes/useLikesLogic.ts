import { useState, useCallback, useMemo, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SheetManager } from "react-native-actions-sheet";
import { useUser } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";

import type { TabItem } from "components/tabNav/TabNav.types";
import type { LikesTab, LikeItem } from "./Likes.types";
import type { RootStackParamList } from "../../navigation";
import {
  useGetMutualLikes,
  useGetProfileViews,
  useLikeUser,
  useDislikeUser,
  useGetLikes,
} from "@/src/api";
import { useAppSelector } from "@/src/store";
import type { Like, MutualLike } from "@/src/api/likes/types";
import type { ProfileView } from "@/src/api/profileViews/types";

const TABS: TabItem[] = [
  { label: "Priority Aisles", value: "priority" },
  { label: "Your Likes", value: "likes" },
  { label: "Views", value: "views" },
];

// Helper to check if a like is recent (within 24 hours)
const isRecentLike = (likedAt: string): boolean => {
  const likeDate = new Date(likedAt);
  const now = new Date();
  const diffHours = (now.getTime() - likeDate.getTime()) / (1000 * 60 * 60);
  return diffHours <= 24;
};

// Map API Like to LikeItem
const mapLikeToItem = (like: Like): LikeItem => ({
  id: like.likedId + like.likedAt,
  image: like.images?.[0] || "",
  isRecentlyActive: isRecentLike(like.likedAt),
  userId: like.user?.id || like.likedId,
  userName: like.user?.name,
  superLike: like.superLike,
  age: like.user?.age,
});

// Map API MutualLike to LikeItem
const mapMutualLikeToItem = (mutualLike: MutualLike): LikeItem => ({
  id: mutualLike.userId + mutualLike.likedAt,
  image: mutualLike.images?.[0] || "",
  isRecentlyActive: isRecentLike(mutualLike.likedAt),
  userId: mutualLike.user?.id || mutualLike.userId,
  userName: mutualLike.user?.name,
  superLike: mutualLike.superLike,
  age: mutualLike.user?.age,
});

// Map API ProfileView to LikeItem
const mapProfileViewToItem = (view: ProfileView): LikeItem => ({
  id: view.viewer.id + view.viewedAt,
  image: view.viewer.image || "",
  isRecentlyActive: view.isNew,
  userId: view.viewer.id,
  userName: view.viewer.displayName,
  age: view.viewer.age,
});

export function useLikesLogic() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { user } = useUser();
  const subscriptionType = useAppSelector(
    (state) => state.user.data?.subscription,
  );

  // User is subscribed if subscriptionType exists and is not "free"
  const isSubscribed = useMemo(
    () => subscriptionType !== null && subscriptionType !== "free",
    [subscriptionType],
  );

  console.log(isSubscribed);

  const [activeTab, setActiveTab] = useState<LikesTab>("priority");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<{
    visible: boolean;
    title: string;
    message: string;
  }>({ visible: false, title: "", message: "" });

  const {
    data: mutualLikesData,
    getMutualLikes,
    isLoading: mutualLikesLoading,
  } = useGetMutualLikes();
  const { data: likesData, getLikes, isLoading: likesLoading } = useGetLikes();
  const {
    data: profileViewsData,
    getProfileViews,
    isLoading: profileViewsLoading,
  } = useGetProfileViews();
  const { likeUser } = useLikeUser();
  const { dislikeUser } = useDislikeUser();

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;

      try {
        await Promise.all([
          getMutualLikes(user.id),
          getLikes(user.id),
          getProfileViews(user.id),
        ]);
      } catch (error) {
        console.log("Error fetching likes data:", error);
      }
    };

    fetchData();
  }, [user?.id, getMutualLikes, getLikes, getProfileViews]);

  // Pull to refresh handler
  const handleRefresh = useCallback(async () => {
    if (!user?.id) return;

    setIsRefreshing(true);
    try {
      await Promise.all([
        getMutualLikes(user.id),
        getLikes(user.id),
        getProfileViews(user.id),
      ]);
    } catch (error) {
      console.log("Error refreshing data:", error);
    } finally {
      setIsRefreshing(false);
    }
  }, [user?.id, getMutualLikes, getLikes, getProfileViews]);

  // Priority Aisles: mutual likes
  const priorityLikes = useMemo((): LikeItem[] => {
    if (!mutualLikesData?.length) return [];
    return mutualLikesData.map(mapMutualLikeToItem);
  }, [mutualLikesData]);

  // Your Likes: users I have liked
  const yourLikes = useMemo((): LikeItem[] => {
    if (!likesData?.length) return [];
    return likesData.map(mapLikeToItem);
  }, [likesData]);

  // Profile Views: users who have viewed my profile
  const profileViews = useMemo((): LikeItem[] => {
    if (!profileViewsData?.length) return [];
    return profileViewsData.map(mapProfileViewToItem);
  }, [profileViewsData]);

  // Get current tab data
  const currentTabData = useMemo((): LikeItem[] => {
    switch (activeTab) {
      case "priority":
        return priorityLikes;
      case "likes":
        return yourLikes;
      case "views":
        return profileViews;
      default:
        return [];
    }
  }, [activeTab, priorityLikes, yourLikes, profileViews]);

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value as LikesTab);
  }, []);

  const getHeaderContent = useCallback(() => {
    switch (activeTab) {
      case "priority":
        return {
          title: "Someone thinks you are special",
          subtitle: "See everyone who has super liked your profile",
        };
      case "likes":
        return {
          title: "Your likes list",
          subtitle: "See everyone who has liked your profile",
        };
      case "views":
        return {
          title: "See who viewed your profile",
          subtitle: "Upgrade your plan to see who's into you before you match",
        };
      default:
        return {
          title: "",
          subtitle: "",
        };
    }
  }, [activeTab]);

  // Only show action buttons on views tab
  const showActionButtons = useMemo(() => activeTab === "views", [activeTab]);

  const isLoading = useMemo(
    () => mutualLikesLoading || profileViewsLoading || likesLoading,
    [mutualLikesLoading, profileViewsLoading, likesLoading],
  );

  const handleUpgrade = useCallback(() => {
    navigation.navigate("Upgrade");
  }, [navigation]);

  const handleOpenUpgradeSheet = useCallback(
    (image: LikeItem["image"]) => {
      const imageSource = typeof image === "string" ? { uri: image } : image;
      SheetManager.show("likes-upgrade-sheet", {
        payload: {
          image: imageSource,
          onUpgrade: handleUpgrade,
        },
      });
    },
    [handleUpgrade],
  );

  // Refetch data for the current active tab
  const refetchCurrentTab = useCallback(async () => {
    if (!user?.id) return;
    try {
      switch (activeTab) {
        case "priority":
          await getMutualLikes(user.id);
          break;
        case "likes":
          await getLikes(user.id);
          break;
        case "views":
          await getProfileViews(user.id);
          break;
      }
    } catch (error) {
      console.log("Error refetching tab data:", error);
    }
  }, [user?.id, activeTab, getMutualLikes, getLikes, getProfileViews]);

  const hideSuccess = useCallback(() => {
    setSuccessInfo((prev) => ({ ...prev, visible: false }));
  }, []);

  // Handle like action for profile views
  const handleLikeFromViews = useCallback(
    async (item: LikeItem, superLike: boolean = false) => {
      if (!user?.id || !item.userId) return;

      setLoadingUserId(item.userId);
      try {
        await likeUser({
          likedId: item.userId,
          likerId: user.id,
          superLike,
        });

        setSuccessInfo({
          visible: true,
          title: superLike ? "Super Like Sent!" : "Like Sent!",
          message: `You ${superLike ? "super liked" : "liked"} ${item.userName || "this profile"}`,
        });

        await refetchCurrentTab();
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Failed to send like",
          text2: "Please try again",
        });
      } finally {
        setLoadingUserId(null);
      }
    },
    [user?.id, likeUser, refetchCurrentTab],
  );

  // Handle dislike action for profile views
  const handleDislikeFromViews = useCallback(
    async (item: LikeItem) => {
      if (!user?.id || !item.userId) return;

      setLoadingUserId(item.userId);
      try {
        await dislikeUser({
          dislikedId: item.userId,
          dislikerId: user.id,
        });

        setSuccessInfo({
          visible: true,
          title: "Passed",
          message: `You passed on ${item.userName || "this profile"}`,
        });

        await refetchCurrentTab();
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Failed to pass",
          text2: "Please try again",
        });
      } finally {
        setLoadingUserId(null);
      }
    },
    [user?.id, dislikeUser, refetchCurrentTab],
  );

  // Check if I have already liked this user
  const hasLikedUser = useCallback(
    (userId: string): boolean => {
      if (!userId) return false;
      return likesData?.some((like) => like.likedId === userId) || false;
    },
    [likesData],
  );

  // Check if there is a mutual like (both users liked each other)
  const isMutualLike = useCallback(
    (userId: string): boolean => {
      if (!userId) return false;
      // Check if I have liked this user
      const iLikedThem = hasLikedUser(userId);
      // Check if this user is in mutual likes
      const theyLikedMe =
        mutualLikesData?.some(
          (like) => (like.user?.id || like.userId) === userId,
        ) || false;
      return iLikedThem && theyLikedMe;
    },
    [hasLikedUser, mutualLikesData],
  );

  // Navigate to conversation if mutual like, otherwise open profile view
  // Views tab always opens profile screen regardless of mutual match status
  const handleOpenConversation = useCallback(
    (item: LikeItem) => {
      if (!item.userId) return;

      // Views tab always opens profile screen
      if (activeTab === "views") {
        const imageUri = typeof item.image === "string" ? item.image : "";
        navigation.navigate("UserProfileView", {
          userId: item.userId,
          avatar: imageUri,
          userName: item.userName || "User",
        });
        return;
      }

      if (isMutualLike(item.userId)) {
        // Mutual like - open conversation
        const matchDate = new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });

        navigation.navigate("Conversation", {
          recipientId: item.userId,
          recipientName: item.userName || "User",
          recipientAvatar:
            typeof item.image === "string" ? { uri: item.image } : item.image,
          matchDate,
        });
      } else {
        // Not mutual - open user profile view
        const imageUri = typeof item.image === "string" ? item.image : "";
        navigation.navigate("UserProfileView", {
          userId: item.userId,
          avatar: imageUri,
          userName: item.userName || "User",
        });
      }
    },
    [navigation, isMutualLike, activeTab],
  );

  const handleGetSwiping = useCallback(() => {
    navigation.navigate("MainTabs", { screen: "Match" } as any);
  }, [navigation]);

  return {
    tabs: TABS,
    activeTab,
    handleTabChange,
    likes: currentTabData,
    getHeaderContent,
    showActionButtons,
    handleOpenUpgradeSheet,
    handleRefresh,
    isRefreshing,
    isLoading,
    handleLikeFromViews,
    loadingUserId,
    handleOpenConversation,
    handleGetSwiping,
    hasLikedUser,
    handleDislikeFromViews,
    successInfo,
    hideSuccess,
    isSubscribed,
  };
}
