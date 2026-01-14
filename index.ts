import { registerRootComponent } from "expo";
// import { Platform } from "react-native";

import App from "./App";
// import { setPushConfig } from "./src/core/setPushConfig";
// import { setFirebaseListeners } from "./src/core/setFirebaseListeners";

// Set push config for Stream Video (must be called outside app lifecycle)
// setPushConfig();

// // Set Firebase listeners for Android push notifications
// if (Platform.OS === "android") {
//   setFirebaseListeners();
// }

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
