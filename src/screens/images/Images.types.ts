import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { ImageSourcePropType } from "react-native";

import type { RootStackParamList } from "../../navigation";

export type ImagesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Images"
>;

export type CarouselImage = ImageSourcePropType;
