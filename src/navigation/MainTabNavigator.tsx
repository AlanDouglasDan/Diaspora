import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";

import { images } from "core/images";
import { palette, typography } from "core/styles";
import { Cruise } from "screens/cruise";
import { Likes } from "screens/likes";
import { Match } from "screens/match";
import { Messages } from "screens/messages";
import { Profile } from "screens/profile";

export interface MatchFilterParams {
  gender?: "man" | "woman" | "nonbinary";
  activity?: "justJoined";
  country?: string;
  radius?: [number, number];
  age?: [number, number];
  hasBio?: boolean;
  ethnicity?: string;
  zodiac?: string;
  height?: string;
  drinking?: boolean;
  smoking?: boolean;
  educationLevel?: string;
  familyPlans?: string;
  lookingFor?: string;
}

export type MainTabParamList = {
  Cruise: undefined;
  Likes: undefined;
  Match: { filters?: MatchFilterParams } | undefined;
  Messages: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const tabConfig = [
  {
    name: "Cruise" as const,
    icon: images.cruise,
    activeIcon: images.cruiseActive,
  },
  {
    name: "Likes" as const,
    icon: images.likes,
    activeIcon: images.likesActive,
  },
  {
    name: "Match" as const,
    icon: images.match,
    activeIcon: images.matchActive,
  },
  {
    name: "Messages" as const,
    icon: images.messages,
    activeIcon: images.messagesActive,
  },
  {
    name: "Profile" as const,
    icon: images.profile,
    activeIcon: images.profileActive,
  },
];

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const config = tabConfig.find((t) => t.name === route.name);

        if (!config) return null;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}
            activeOpacity={0.7}
          >
            <Image
              source={isFocused ? config.activeIcon : config.icon}
              style={styles.tabIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Match"
    >
      <Tab.Screen
        name="Cruise"
        component={Cruise}
        options={{
          headerShown: true,
          headerTitle: "Diaspora",
          headerTitleAlign: "center",
          headerTitleStyle: typography.header22,
          headerTransparent: true,
        }}
      />

      <Tab.Screen name="Likes" component={Likes} />

      <Tab.Screen
        name="Match"
        component={Match}
        options={{
          headerShown: true,
          headerBackgroundContainerStyle: {
            backgroundColor: palette.WHITE,
          },
        }}
      />

      <Tab.Screen name="Messages" component={Messages} />

      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: palette.WHITE,
    paddingBottom: 30,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  tabIcon: {
    height: 30,
    width: 50,
  },
});
