import { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/clerk-expo";

import { createAblyClient } from "@src/lib/ably";
const useAbly = () => {
  const { isSignedIn, user } = useUser();
  const [onlineStatus, setOnlineStatus] = useState(false);
  const ablyClientRef = useRef<any>(null);
  const channelRef = useRef<any>(null);

  // Initialize Ably with proper clientId when user signs in
  useEffect(() => {
    // Clean up previous connection if exists
    if (ablyClientRef.current) {
      ablyClientRef.current.close();
      ablyClientRef.current = null;
      channelRef.current = null;
    }

    // Only create new connection if user is signed in
    if (isSignedIn && user?.id) {
      const ablyClient = createAblyClient(user.id);
      ablyClientRef.current = ablyClient;

      const presenceChannel = ablyClient.channels.get("user-presence");
      channelRef.current = presenceChannel;

      // Wait for connection to be established before entering presence
      ablyClient.connection.once("connected", () => {
        // Enter presence after connection is established
        presenceChannel.presence
          .enter({
            status: "online",
            timestamp: Date.now(),
          })
          .then(() => {
            setOnlineStatus(true);
            console.log("✅ Successfully entered presence");
          })
          .catch((error) => {
            console.error("❌ Failed to enter presence", error);
          });
      });

      // Handle connection failures
      ablyClient.connection.on("failed", (stateChange) => {
        console.error("❌ Ably connection failed:", stateChange.reason);
      });

      // Subscribe to presence events
      presenceChannel.presence.subscribe("enter", (member) => {
        console.log("👋 Member entered:", member.clientId);
      });

      presenceChannel.presence.subscribe("leave", (member) => {
        console.log("👋 Member left:", member.clientId);
      });
    } else if (!isSignedIn && channelRef.current) {
      // If user is logged out, leave presence and close connection
      channelRef.current.presence
        .leave()
        .then(() => {
          console.log("Successfully left presence on logout");
          setOnlineStatus(false);
        })
        .catch((error: Error) => {
          console.error("Error leaving presence on logout", error);
        })
        .finally(() => {
          if (ablyClientRef.current) {
            ablyClientRef.current.close();
            ablyClientRef.current = null;
            channelRef.current = null;
          }
        });
    }

    // Clean up on component unmount
    return () => {
      if (channelRef.current) {
        channelRef.current.presence.unsubscribe();
      }

      if (ablyClientRef.current) {
        ablyClientRef.current.close();
      }
    };
  }, [isSignedIn, user?.id]);

  return {
    onlineStatus,
  };
};

export default useAbly;
