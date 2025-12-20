import { createNavigationContainerRef } from "@react-navigation/native";

// Define the root navigation param list
export type RootNavigationParamList = {
  [key: string]: undefined | Record<string, unknown>;
};

export const navigationRef =
  createNavigationContainerRef<RootNavigationParamList>();

export const navigate = (
  name: string,
  params?: Record<string, unknown>
): void => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};
