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
  useGetReceivedLikes,
  useGetProfileViews,
  useLikeUser,
  useGetLikes,
} from "@/src/api";
import type { Like } from "@/src/api/likes/types";
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
});

// Map API ProfileView to LikeItem
const mapProfileViewToItem = (view: ProfileView): LikeItem => ({
  id: view.viewer.id + view.viewedAt,
  image: view.viewer.image || "",
  isRecentlyActive: view.isNew,
  userId: view.viewer.id,
  userName: view.viewer.displayName,
});

export function useLikesLogic() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { user } = useUser();

  const [activeTab, setActiveTab] = useState<LikesTab>("priority");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);

  const {
    data: receivedLikesData,
    getReceivedLikes,
    isLoading: receivedLikesLoading,
  } = useGetReceivedLikes();
  const { data: likesData, getLikes, isLoading: likesLoading } = useGetLikes();
  const {
    data: profileViewsData,
    getProfileViews,
    isLoading: profileViewsLoading,
  } = useGetProfileViews();
  const { likeUser } = useLikeUser();

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;

      try {
        await Promise.all([
          getReceivedLikes(user.id),
          getLikes(user.id),
          getProfileViews(user.id),
        ]);
      } catch (error) {
        console.log("Error fetching likes data:", error);
      }
    };

    fetchData();
  }, [user?.id, getReceivedLikes, getLikes, getProfileViews]);

  // Pull to refresh handler
  const handleRefresh = useCallback(async () => {
    if (!user?.id) return;

    setIsRefreshing(true);
    try {
      await Promise.all([
        getReceivedLikes(user.id),
        getLikes(user.id),
        getProfileViews(user.id),
      ]);
    } catch (error) {
      console.log("Error refreshing data:", error);
    } finally {
      setIsRefreshing(false);
    }
  }, [user?.id, getReceivedLikes, getLikes, getProfileViews]);

  // Priority Aisles: all received likes
  const priorityLikes = useMemo((): LikeItem[] => {
    if (!receivedLikesData?.length) return [];
    return receivedLikesData.map(mapLikeToItem);
  }, [receivedLikesData]);

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

  const blurImages = useMemo(() => activeTab === "views", [activeTab]);

  const isLoading = useMemo(
    () => receivedLikesLoading || profileViewsLoading || likesLoading,
    [receivedLikesLoading, profileViewsLoading, likesLoading],
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

  // Handle like action for profile views
  const handleLikeFromViews = useCallback(
    async (item: LikeItem, superLike: boolean = false) => {
      if (!user?.id || !item.userId) return;

      setIsLikeLoading(true);
      try {
        await likeUser({
          likedId: item.userId,
          likerId: user.id,
          superLike,
        });

        Toast.show({
          type: "success",
          text1: superLike ? "Super Like Sent! 💖" : "Like Sent! ❤️",
          text2: `You ${superLike ? "super liked" : "liked"} this profile`,
        });
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Failed to send like",
          text2: "Please try again",
        });
      } finally {
        setIsLikeLoading(false);
      }
    },
    [user?.id, likeUser],
  );

  // Check if there is a mutual like (both users liked each other)
  const isMutualLike = useCallback(
    (userId: string): boolean => {
      if (!userId) return false;
      // Check if I have liked this user
      const iLikedThem =
        likesData?.some((like) => like.likedId === userId) || false;
      // Check if this user has liked me
      const theyLikedMe =
        receivedLikesData?.some(
          (like) => (like.user?.id || like.likedId) === userId,
        ) || false;
      return iLikedThem && theyLikedMe;
    },
    [likesData, receivedLikesData],
  );

  // Navigate to conversation if mutual like, otherwise open profile view
  const handleOpenConversation = useCallback(
    (item: LikeItem) => {
      if (!item.userId) return;

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
    [navigation, isMutualLike],
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
    blurImages,
    handleOpenUpgradeSheet,
    handleRefresh,
    isRefreshing,
    isLoading,
    handleLikeFromViews,
    isLikeLoading,
    handleOpenConversation,
    handleGetSwiping,
  };
}
