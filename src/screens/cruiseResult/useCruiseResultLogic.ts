import { useCallback, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";

import { useLikeUser, useDislikeUser } from "@/src/api/likes";
import type { CruiseResultScreenProps } from "./CruiseResult.types";

export const useCruiseResultLogic = (props: CruiseResultScreenProps) => {
  const { navigation, route } = props;
  const { partnerId, partnerName } = route.params;
  const { user } = useUser();

  const { likeUser } = useLikeUser();
  const { dislikeUser } = useDislikeUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = useCallback(() => {
    navigation.navigate("MainTabs");
  }, [navigation]);

  const handleLike = useCallback(async () => {
    if (!user?.id || !partnerId || isLoading) return;

    setIsLoading(true);
    try {
      await likeUser({
        likedId: partnerId,
        likerId: user.id,
        superLike: false,
      });

      Toast.show({
        type: "success",
        text1: "Like Sent! ❤️",
        text2: `You liked ${partnerName}`,
      });

      navigation.navigate("MainTabs");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to send like",
        text2: "Please try again",
      });
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, partnerId, partnerName, isLoading, likeUser, navigation]);

  const handleDislike = useCallback(async () => {
    if (!user?.id || !partnerId || isLoading) return;

    setIsLoading(true);
    try {
      await dislikeUser({
        dislikedId: partnerId,
        dislikerId: user.id,
      });

      Toast.show({
        type: "success",
        text1: "Passed 👋",
        text2: `You passed on ${partnerName}`,
      });

      navigation.navigate("MainTabs");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to pass",
        text2: "Please try again",
      });
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, partnerId, partnerName, isLoading, dislikeUser, navigation]);

  const handleReport = useCallback(() => {
    // TODO: Handle report action
    Toast.show({
      type: "info",
      text1: "Report submitted",
      text2: "We will review this user",
    });
  }, []);

  return {
    handleCancel,
    handleLike,
    handleDislike,
    handleReport,
    partnerName,
    isLoading,
  };
};
