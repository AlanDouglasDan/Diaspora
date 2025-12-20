import { useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../../navigation";
import type { CruiseScreenProps } from "./Cruise.types";

export const useCruiseLogic = (_props: CruiseScreenProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleReadyToGo = useCallback(() => {
    navigation.navigate("CruiseCamera");
  }, [navigation]);

  const handleOpenModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleUpgrade = useCallback(() => {
    setIsModalVisible(false);
    navigation.navigate("Upgrade");
  }, [navigation]);

  return {
    isModalVisible,
    handleReadyToGo,
    handleOpenModal,
    handleCloseModal,
    handleUpgrade,
  };
};
