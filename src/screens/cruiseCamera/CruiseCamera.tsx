import React, { FC, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { CameraView } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";

import { Button } from "components/button";
import { palette } from "core/styles";

import type { CruiseCameraScreenProps } from "./CruiseCamera.types";
import { styles } from "./CruiseCamera.styles";
import { useCruiseCameraLogic } from "./useCruiseCameraLogic";

const CruiseCamera: FC<CruiseCameraScreenProps> = (props) => {
  const { facing, permission, toggleCameraFacing, handleStart } =
    useCruiseCameraLogic(props);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.flipButton}
          onPress={toggleCameraFacing}
        >
          <MaterialIcons
            name="flip-camera-ios"
            size={24}
            color={palette.WHITE}
          />
        </TouchableOpacity>
      ),
    });
  }, [props.navigation, toggleCameraFacing]);

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text
          style={{
            color: palette.WHITE,
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          We need your permission to show the camera
        </Text>
        <Button title="Grant Permission" onPress={() => {}} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.overlay}>
          <View style={styles.buttonContainer}>
            <Button title="Start" onPress={handleStart} />
          </View>
        </View>
      </CameraView>
    </View>
  );
};

export default CruiseCamera;
