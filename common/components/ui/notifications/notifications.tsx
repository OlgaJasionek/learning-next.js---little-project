import { useContext } from "react";
import NotificationContext from "../../../../store/notifications-context";

import styles from "./notifications.module.scss";

type Props = {
  title: string;
  message: string;
  status: string;
};

function Notification({ title, message, status }: Props) {
  const notificationCtx = useContext(NotificationContext);

  let statusClasses = "";

  if (status === "success") {
    statusClasses = styles.success;
  }

  if (status === "error") {
    statusClasses = styles.error;
  }

  if (status === "pending") {
    statusClasses = styles.pending;
  }

  const activeClasses = `${styles.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={notificationCtx.hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
