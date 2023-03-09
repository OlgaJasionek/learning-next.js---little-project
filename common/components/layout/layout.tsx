import { ReactNode, useContext } from "react";

import NotificationContext from "../../../store/notifications-context";
import Notification from "../ui/notifications/notifications";
import MainHeader from "./main-header";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;
  return (
    <>
      <MainHeader />
      <main>{children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </>
  );
};

export default Layout;
