// import { Platform } from "react-native";
import { requestNotifications, RESULTS } from "react-native-permissions";

/**
 * Request notification permissions for push notifications.
 * This is required for Android 13+ (POST_NOTIFICATION runtime permission).
 * On iOS, this requests the standard notification permission.
 */
export async function requestNotificationPermission(): Promise<boolean> {
  try {
    const { status } = await requestNotifications(["alert", "sound", "badge"]);

    if (status === RESULTS.GRANTED) {
      console.log("✅ Notification permission granted");
      return true;
    } else if (status === RESULTS.DENIED) {
      console.log("⚠️ Notification permission denied");
      return false;
    } else if (status === RESULTS.BLOCKED) {
      console.log("🚫 Notification permission blocked");
      return false;
    }

    return false;
  } catch (error) {
    console.error("❌ Error requesting notification permission:", error);
    return false;
  }
}
