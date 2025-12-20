import { useCallback, useEffect, useMemo, useState } from "react";
import {
  TouchableOpacity,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { palette, typography } from "core/styles";

import type { ImagesScreenProps } from "./Images.types";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const useImagesLogic = (props: ImagesScreenProps) => {
  const { navigation, route } = props;

  const images = useMemo(() => route.params.images, [route.params.images]);
  const total = images.length;

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: `${activeIndex + 1} of ${total}`,
      headerTitleAlign: "center",
      headerStyle: { backgroundColor: palette.BLACK },
      headerShadowVisible: false,
      headerTitleStyle: { ...typography.semiheader18, color: palette.WHITE },
      headerLeft: () => (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleClose}
          style={{ paddingLeft: 4 }}
        >
          <Ionicons name="close" size={28} color={palette.WHITE} />
        </TouchableOpacity>
      ),
    });
  }, [activeIndex, handleClose, navigation, total]);

  const handleMomentumScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const x = e?.nativeEvent?.contentOffset?.x ?? 0;
      const nextIndex = Math.round(x / SCREEN_WIDTH);
      setActiveIndex(nextIndex);
    },
    []
  );

  return {
    images,
    handleMomentumScrollEnd,
  };
};
