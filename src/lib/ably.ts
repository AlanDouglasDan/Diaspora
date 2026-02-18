import * as Ably from "ably";

export const createAblyClient = (clientId: string) => {
  return new Ably.Realtime({
    key: process.env.EXPO_PUBLIC_ABLY_API_KEY,
    clientId: clientId || "anonymous-user",
  });
};
