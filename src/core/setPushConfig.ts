// import {
//   StreamVideoClient,
//   StreamVideoRN,
//   User,
// } from "@stream-io/video-react-native-sdk";
// import { Platform } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const STREAM_API_KEY = process.env.EXPO_PUBLIC_GET_STREAM_API_KEY!;
// const BACKEND_API = process.env.EXPO_PUBLIC_BACKEND_API!;

// // AndroidImportance.HIGH = 4 (using numeric value to avoid importing notifee on iOS)
// const ANDROID_IMPORTANCE_HIGH = 4;

// export function setPushConfig() {
//   StreamVideoRN.setPushConfig({
//     ios: {
//       // add your push_provider_name for iOS that you have setup in Stream dashboard
//       pushProviderName: __DEV__ ? "apn-video-staging" : "apn-video-production",
//     },

//     android: {
//       // the name of android notification icon (Optional, defaults to 'ic_launcher')
//       smallIcon: "ic_notification",
//       // add your push_provider_name for Android that you have setup in Stream dashboard
//       pushProviderName: __DEV__
//         ? "firebase-video-staging"
//         : "firebase-video-production",
//       // configure the notification channel to be used for incoming calls for Android.
//       incomingCallChannel: {
//         id: "stream_incoming_call",
//         name: "Incoming call notifications",
//         // This is the advised importance of receiving incoming call notifications.
//         // This will ensure that the notification will appear on-top-of applications.
//         importance: ANDROID_IMPORTANCE_HIGH,
//         // optional: if you dont pass a sound, default ringtone will be used
//         // sound: "<url to the ringtone>",
//       },
//       // configure the functions to create the texts shown in the notification
//       // for incoming calls in Android.
//       incomingCallNotificationTextGetters: {
//         getTitle: (userName: string) => `Incoming call from ${userName}`,
//         getBody: (_userName: string) => "Tap to answer the call",
//         getAcceptButtonTitle: () => "Accept",
//         getDeclineButtonTitle: () => "Decline",
//       },
//     },

//     // add the async callback to create a video client
//     // for incoming calls in the background on a push notification
//     createStreamVideoClient: async () => {
//       const userId = await AsyncStorage.getItem("@userId");
//       const userName = await AsyncStorage.getItem("@userName");
//       if (!userId) return undefined;

//       // Token provider that fetches token from your server
//       const tokenProvider = async (): Promise<string> => {
//         try {
//           const response = await fetch(`${BACKEND_API}/stream/token`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ userId }),
//           });

//           if (!response.ok) {
//             throw new Error("Failed to get stream token");
//           }

//           const data = await response.json();
//           return data.token;
//         } catch (error) {
//           console.error("Error fetching stream token:", error);
//           throw error;
//         }
//       };

//       const user: User = { id: userId, name: userName ?? undefined };
//       return StreamVideoClient.getOrCreateInstance({
//         apiKey: STREAM_API_KEY,
//         user,
//         tokenProvider,
//       });
//     },
//   });
// }
