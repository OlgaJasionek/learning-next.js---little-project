import React, { useEffect, useState } from "react";
import { createContext, ReactNode } from "react";

type Notifications = {
  title: string;
  message: string;
  status: string;
};
type NotificationsContextType = {
  notification: Notifications | null;
  showNotification: (data: Notifications) => void;
  hideNotification: () => void;
};

type ProviderProps = {
  children: ReactNode;
};

const NotificationContext = createContext<NotificationsContextType>({
  notification: null,
  showNotification: () => {},
  hideNotification: () => {},
});

export const NotificationContextProvider = ({ children }: ProviderProps) => {
  const [activeNotification, setActiveNotification] =
    useState<Notifications | null>(null);

  useEffect(() => {
    if (
      (activeNotification && activeNotification.status === "success") ||
      activeNotification?.status === "error"
    ) {
      const timer = setTimeout(() => {
        hideNotificationHandler();
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  const showNotificationHandler = (notificationData: Notifications) => {
    setActiveNotification(notificationData);
  };

  const hideNotificationHandler = () => {
    setActiveNotification(null);
  };

  const context: NotificationsContextType = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
