"use client";

import { getMessaging, onMessage } from "firebase/messaging";
import React, { useEffect } from "react";
import { app } from "~/lib/api/firebase";
import useFcmToken from "~/lib/utils/hooks/useFcmToken";
import { useToast } from "../ui/use-toast";

export default function FCMComp() {
  const { fcmToken, notificationPermissionStatus } = useFcmToken();
  // Use the token as needed
  fcmToken && console.log("FCM token:", fcmToken);
  const { toast } = useToast();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const messaging = getMessaging(app);
      const unsubscribe = onMessage(messaging, (payload) => {
        toast({
          variant: "default",
          title: payload.notification?.title,
          description: payload.notification?.title,
        });
        // Handle the received push notification while the app is in the foreground
        // You can display a notification or update the UI based on the payload
      });
      return () => {
        unsubscribe(); // Unsubscribe from the onMessage event
      };
    }
  }, []);

  return <div />;
}
