import React, { FC, Fragment } from "react";
import { View, Text, Switch } from "react-native";

import { palette } from "core/styles";
import { LayoutContainer } from "components/layoutContainer";

import type { PrivacyScreenProps } from "./Privacy.types";
import { styles } from "./Privacy.styles";
import { usePrivacyLogic } from "./usePrivacyLogic";

const Privacy: FC<PrivacyScreenProps> = () => {
  const { settings, handleToggle } = usePrivacyLogic();

  return (
    <LayoutContainer style={styles.container} edges={["bottom"]}>
      <View style={styles.section}>
        {settings.map((setting, index) => (
          <Fragment key={setting.id}>
            <View
              style={[
                styles.row,
                index === settings.length - 1 && { borderBottomWidth: 0 },
              ]}
            >
              <Text style={styles.rowLabel}>{setting.label}</Text>

              <Switch
                value={setting.value}
                onValueChange={() => handleToggle(setting.id)}
                trackColor={{ false: palette.GREY, true: palette.RED }}
                thumbColor={palette.WHITE}
              />
            </View>

            {setting.note && index === settings.length - 1 && (
              <Text style={styles.noteText}>{setting.note}</Text>
            )}
          </Fragment>
        ))}
      </View>
    </LayoutContainer>
  );
};

export default Privacy;
