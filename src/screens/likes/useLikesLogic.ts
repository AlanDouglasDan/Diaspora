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
  id: view.id,
  image: "", // Profile views may not have images - will need to fetch user data
  isRecentlyActive: isRecentLike(view.createdAt),
  userId: view.viewerId,
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
        await getReceivedLikes(user.id);
      } catch (error) {
        console.log("Error fetching received likes:", error);
      }

      try {
        await getProfileViews(user.id);
      } catch (error) {
        console.log("Error fetching profile views:", error);
      }
    };

    fetchData();
  }, [user?.id, getReceivedLikes, getProfileViews]);

  // Pull to refresh handler
  const handleRefresh = useCallback(async () => {
    if (!user?.id) return;

    setIsRefreshing(true);
    try {
      await Promise.all([getReceivedLikes(user.id), getProfileViews(user.id)]);
    } catch (error) {
      console.log("Error refreshing data:", error);
    } finally {
      setIsRefreshing(false);
    }
  }, [user?.id, getReceivedLikes, getProfileViews]);

  // Priority Aisles: only super likes
  const priorityLikes = useMemo((): LikeItem[] => {
    if (!receivedLikesData?.length) return [];
    return receivedLikesData
      .filter((like) => like.superLike)
      .map(mapLikeToItem);
  }, [receivedLikesData]);

  // Your Likes: non-super likes
  const regularLikes = useMemo((): LikeItem[] => {
    if (!receivedLikesData?.length) return [];
    return receivedLikesData
      .filter((like) => !like.superLike)
      .map(mapLikeToItem);
  }, [receivedLikesData]);

  // Profile Views
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
        return regularLikes;
      case "views":
        return profileViews;
      default:
        return [];
    }
  }, [activeTab, priorityLikes, regularLikes, profileViews]);

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
    () => receivedLikesLoading || profileViewsLoading,
    [receivedLikesLoading, profileViewsLoading]
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
    [handleUpgrade]
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
    [user?.id, likeUser]
  );

  // Navigate to conversation with the user who liked you
  const handleOpenConversation = useCallback(
    (item: LikeItem) => {
      if (!item.userId) return;

      // Format the match date
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
    },
    [navigation]
  );

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
  };
}
