import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { ImageSourcePropType } from "react-native";

import {
  Welcome,
  EmailAuth,
  VerifyOtp,
  AddPhone,
  Onboarding,
  DisplayName,
  Birthday,
  Gender,
  DatingPreference,
  Interests,
  AddPhotos,
  SetupComplete,
  Settings,
  Privacy,
  GetHelp,
  ProfileInfo,
  EditInterests,
  CruiseCamera,
  CruiseCall,
  CruiseResult,
  Upgrade,
  UpgradeSuccess,
  MatchResult,
  FilterSettings,
  Images,
  Conversation,
  AudioCall,
  VideoCall,
  LoveLetterSent,
  Loading,
  SendLoveLetter,
  UserProfileView,
} from "screens";
import type { SendLoveLetterParams } from "screens/sendLoveLetter";
import type { UserProfileViewParams } from "screens/userProfileView";
import type { ConversationParams } from "screens/conversation";
import type { AudioCallParams } from "screens/audioCall";
import type { VideoCallParams } from "screens/videoCall";
import MainTabNavigator from "./MainTabNavigator";
import { typography, palette } from "core/styles";

export type RootStackParamList = {
  Welcome: undefined;
  EmailAuth: { mode: "sign-up" | "sign-in" };
  VerifyOtp: { value: string; context: string; mode?: "sign-up" | "sign-in" };
  AddPhone: undefined;
  Onboarding: undefined;
  DisplayName: undefined;
  Birthday: undefined;
  Gender: undefined;
  DatingPreference: undefined;
  Interests: undefined;
  AddPhotos: undefined;
  SetupComplete: undefined;

  MainTabs: undefined;
  Loading: undefined;

  Settings: undefined;
  Privacy: undefined;
  GetHelp: undefined;
  ProfileInfo: undefined;
  EditInterests: undefined;
  CruiseCamera: undefined;
  CruiseCall: undefined;
  CruiseResult: {
    partnerId: string;
    partnerName: string;
  };
  Upgrade: undefined;
  UpgradeSuccess: undefined;
  MatchResult: undefined;
  FilterSettings: undefined;
  Images: {
    images: ImageSourcePropType[];
  };
  Conversation: ConversationParams;
  AudioCall: AudioCallParams;
  VideoCall: VideoCallParams;
  LoveLetterSent: {
    recipientName: string;
    recipientImage: { uri: string };
  };
  SendLoveLetter: SendLoveLetterParams;
  UserProfileView: UserProfileViewParams;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      // initialRouteName="AddPhone"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />

      <Stack.Screen name="EmailAuth" component={EmailAuth} />

      <Stack.Screen name="VerifyOtp" component={VerifyOtp} />

      <Stack.Screen name="AddPhone" component={AddPhone} />

      <Stack.Screen name="Onboarding" component={Onboarding} />

      <Stack.Screen name="DisplayName" component={DisplayName} />

      <Stack.Screen name="Birthday" component={Birthday} />

      <Stack.Screen name="Gender" component={Gender} />

      <Stack.Screen name="DatingPreference" component={DatingPreference} />

      <Stack.Screen name="Interests" component={Interests} />

      <Stack.Screen name="AddPhotos" component={AddPhotos} />

      <Stack.Screen name="SetupComplete" component={SetupComplete} />

      <Stack.Screen name="MainTabs" component={MainTabNavigator} />

      <Stack.Screen
        name="Loading"
        component={Loading}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: true,
          headerTitle: "Settings",
          headerTitleAlign: "center",
          headerBackButtonDisplayMode: "minimal",
          headerTitleStyle: typography.header22,
        }}
      />

      <Stack.Screen
        name="Privacy"
        component={Privacy}
        options={{
          headerShown: true,
          headerTitle: "Privacy",
          headerTitleAlign: "center",
          headerBackButtonDisplayMode: "minimal",
          headerTitleStyle: typography.header22,
        }}
      />

      <Stack.Screen
        name="GetHelp"
        component={GetHelp}
        options={{
          headerShown: true,
          headerTitle: "Get help",
          headerTitleAlign: "center",
          headerBackButtonDisplayMode: "minimal",
          headerTitleStyle: typography.header22,
        }}
      />

      <Stack.Screen
        name="ProfileInfo"
        component={ProfileInfo}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="EditInterests"
        component={EditInterests}
        options={{
          headerShown: true,
          headerTitle: "Interests",
          headerTitleAlign: "center",
          headerBackButtonDisplayMode: "minimal",
          headerTitleStyle: typography.header22,
        }}
      />

      <Stack.Screen
        name="CruiseCamera"
        component={CruiseCamera}
        options={{
          headerShown: true,
          headerTitle: "",
          headerTransparent: true,
          headerBackButtonDisplayMode: "minimal",
          headerTintColor: palette.WHITE,
        }}
      />

      <Stack.Screen
        name="CruiseCall"
        component={CruiseCall}
        options={{
          headerShown: true,
          headerTitle: "",
          headerTransparent: true,
          headerBackButtonDisplayMode: "minimal",
          headerLeft: () => null,
        }}
      />

      <Stack.Screen name="CruiseResult" component={CruiseResult} />

      <Stack.Screen name="Upgrade" component={Upgrade} />

      <Stack.Screen name="UpgradeSuccess" component={UpgradeSuccess} />

      <Stack.Screen name="MatchResult" component={MatchResult} />

      <Stack.Screen
        name="FilterSettings"
        component={FilterSettings}
        options={{
          headerShown: true,
          headerTitle: "Filter Settings",
          headerTitleAlign: "center",
          headerBackButtonDisplayMode: "minimal",
          headerTitleStyle: typography.header22,
        }}
      />

      <Stack.Screen
        name="Images"
        component={Images}
        options={{
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="Conversation"
        component={Conversation}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AudioCall"
        component={AudioCall}
        options={{
          headerShown: true,
          headerTitle: "",
          headerTransparent: true,
          headerBackButtonDisplayMode: "minimal",
          headerLeft: () => null,
        }}
      />

      <Stack.Screen
        name="VideoCall"
        component={VideoCall}
        options={{
          headerShown: true,
          headerTitle: "",
          headerTransparent: true,
          headerBackButtonDisplayMode: "minimal",
          headerLeft: () => null,
        }}
      />

      <Stack.Screen
        name="LoveLetterSent"
        component={LoveLetterSent}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="SendLoveLetter"
        component={SendLoveLetter}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="UserProfileView"
        component={UserProfileView}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
