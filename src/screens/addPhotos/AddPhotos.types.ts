import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation";

export type AddPhotosScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "AddPhotos"
>;

export interface PhotoSlot {
  id: number;
  uri: string | null;
}
