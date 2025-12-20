import { useState, useCallback, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SheetManager } from "react-native-actions-sheet";
import type { TabItem } from "components/tabNav/TabNav.types";
import { images } from "core/images";
import type { LikesTab, LikeItem } from "./Likes.types";
import type { RootStackParamList } from "../../navigation";

const TABS: TabItem[] = [
  { label: "Priority Aisles", value: "priority" },
  { label: "Your Likes", value: "likes" },
  { label: "Views", value: "views" },
];

// Mock data for demonstration
const MOCK_LIKES: LikeItem[] = [
  {
    id: "1",
    image: images.avatar2,
    isRecentlyActive: true,
  },
  {
    id: "2",
    image: images.avatar2,
    isRecentlyActive: true,
  },
  {
    id: "3",
    image: images.avatar2,
    isRecentlyActive: true,
  },
  {
    id: "4",
    image: images.avatar2,
    isRecentlyActive: true,
  },
  {
    id: "5",
    image: images.avatar2,
    isRecentlyActive: true,
  },
  {
    id: "6",
    image: images.avatar2,
    isRecentlyActive: true,
  },
];

// const MOCK_LIKES = [];

export function useLikesLogic() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [activeTab, setActiveTab] = useState<LikesTab>("priority");
  const [likes] = useState<LikeItem[]>(MOCK_LIKES);

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value as LikesTab);
  }, []);

  const getHeaderContent = useCallback(() => {
    switch (activeTab) {
      case "priority":
        return {
          title: "Some thinks you are special",
          subtitle: "See everyone who has liked your profile",
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

  const showHeartIcon = useMemo(
    () => activeTab === "likes" || activeTab === "views",
    [activeTab]
  );

  const blurImages = useMemo(() => activeTab === "views", [activeTab]);

  const handleUpgrade = useCallback(() => {
    navigation.navigate("Upgrade");
  }, [navigation]);

  const handleOpenUpgradeSheet = useCallback(
    (image: LikeItem["image"]) => {
      SheetManager.show("likes-upgrade-sheet", {
        payload: {
          image,
          onUpgrade: handleUpgrade,
        },
      });
    },
    [handleUpgrade]
  );

  return {
    tabs: TABS,
    activeTab,
    handleTabChange,
    likes,
    getHeaderContent,
    showHeartIcon,
    blurImages,
    handleOpenUpgradeSheet,
  };
}
