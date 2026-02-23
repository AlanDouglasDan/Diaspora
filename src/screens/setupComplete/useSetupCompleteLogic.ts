import { useUser } from "@clerk/clerk-expo";

import { useGetUser } from "@/src/api";
import type { SetupCompleteScreenProps } from "./SetupComplete.types";

export function useSetupCompleteLogic({
  navigation,
}: SetupCompleteScreenProps) {
  const { user: clerkUser } = useUser();
  const { getUser } = useGetUser();

  const handleContinue = async () => {
    try {
      // Fetch user so Stream providers detect the user exists and connect
      if (clerkUser?.id) {
        await getUser(clerkUser.id);
      }
    } catch (error) {
      console.log("Error fetching user on setup complete:", error);
    }

    navigation.navigate("Loading");
  };

  return {
    handleContinue,
  };
}
