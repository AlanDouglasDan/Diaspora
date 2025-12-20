import React, { FC, useCallback } from "react";
import { View, FlatList, ListRenderItem } from "react-native";
import { Image } from "expo-image";

import { styles } from "./Images.styles";
import { useImagesLogic } from "./useImagesLogic";
import type { CarouselImage, ImagesScreenProps } from "./Images.types";

const Images: FC<ImagesScreenProps> = (props) => {
  const { images, handleMomentumScrollEnd } = useImagesLogic(props);

  const renderItem: ListRenderItem<CarouselImage> = useCallback(({ item }) => {
    return (
      <View style={styles.item}>
        <Image source={item} style={styles.image} contentFit="contain" />
      </View>
    );
  }, []);

  const keyExtractor = useCallback((_, index: number) => String(index), []);

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        style={styles.list}
      />
    </View>
  );
};

export default Images;
