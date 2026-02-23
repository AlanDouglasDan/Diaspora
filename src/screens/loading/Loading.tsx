import React, { FC } from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";

import type { LoadingScreenProps } from "./Loading.types";
import { styles } from "./Loading.styles";
import { useLoadingLogic } from "./useLoadingLogic";

const Loading: FC<LoadingScreenProps> = (props) => {
  useLoadingLogic(props);

  return (
    <View style={styles.container}>
      <LottieView
        source={require("@/assets/animations/Splash.json")}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

export default Loading;
