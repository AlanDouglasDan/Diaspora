import React, { FC } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { palette } from "core/styles";
import { LayoutContainer } from "components/layoutContainer";

import type { SettingsScreenProps } from "./Settings.types";
import { styles } from "./Settings.styles";
import { useSettingsLogic } from "./useSettingsLogic";

const Settings: FC<SettingsScreenProps> = (props) => {
  const { handleSignOut, handleDeleteAccount, sections, isSigningOut } =
    useSettingsLogic(props);

  return (
    <LayoutContainer style={styles.container} edges={["bottom"]}>
      {/* Sections */}
      {sections.map((section) => (
        <View key={section.id} style={styles.section}>
          {section.items.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.row,
                index === section.items.length - 1 && { borderBottomWidth: 0 },
              ]}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <Text style={styles.rowLabel}>{item.label}</Text>

              <View style={styles.rowRight}>
                {item.value && (
                  <Text style={styles.rowValue}>{item.value}</Text>
                )}

                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={palette.TEXT_COLOR}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.signOutButton}
          onPress={handleSignOut}
          disabled={isSigningOut}
        >
          {isSigningOut ? (
            <ActivityIndicator size="small" color={palette.RED} />
          ) : (
            <Text style={styles.signOutText}>Sign out</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteAccount}
        >
          <Text style={styles.deleteText}>Delete account</Text>
        </TouchableOpacity>
      </View>
    </LayoutContainer>
  );
};

export default Settings;
