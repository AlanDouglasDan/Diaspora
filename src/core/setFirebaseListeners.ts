// import messaging from "@react-native-firebase/messaging";
// import notifee, { EventType } from "@notifee/react-native";
// import {
//   isFirebaseStreamVideoMessage,
//   firebaseDataHandler,
//   isNotifeeStreamVideoEvent,
//   onAndroidNotifeeEvent,
// } from "@stream-io/video-react-native-sdk";

// export const setFirebaseListeners = () => {
//   // Handle background messages from Firebase
//   messaging().setBackgroundMessageHandler(async (msg) => {
//     if (isFirebaseStreamVideoMessage(msg)) {
//       await firebaseDataHandler(msg.data);
//     }
//   });

//   // Handle foreground messages from Firebase
//   messaging().onMessage((msg) => {
//     if (isFirebaseStreamVideoMessage(msg)) {
//       firebaseDataHandler(msg.data);
//     }
//   });

//   // Handle background events from Notifee
//   notifee.onBackgroundEvent(async (event) => {
//     if (isNotifeeStreamVideoEvent(event)) {
//       await onAndroidNotifeeEvent({ event, isBackground: true });
//     }
//   });

//   // Handle foreground events from Notifee
//   notifee.onForegroundEvent((event) => {
//     if (isNotifeeStreamVideoEvent(event)) {
//       onAndroidNotifeeEvent({ event, isBackground: false });
//     }
//   });
// };
