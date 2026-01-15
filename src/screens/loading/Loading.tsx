import React, { FC } from "react";
import { View } from "react-native";
import { Image } from "expo-image";

import { images } from "core/images";

import type { LoadingScreenProps } from "./Loading.types";
import { styles } from "./Loading.styles";
import { useLoadingLogic } from "./useLoadingLogic";

const Loading: FC<LoadingScreenProps> = (props) => {
  useLoadingLogic(props);

  return (
    <View style={styles.container}>
      <Image
        source={images.splashIcon}
        style={styles.icon}
        contentFit="contain"
      />
    </View>
  );
};

export default Loading;
