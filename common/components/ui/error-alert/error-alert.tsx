import { ReactNode } from "react";
import styles from "./error-alert.module.scss";

type Props = {
  children: ReactNode;
};

function ErrorAlert({ children }: Props) {
  return <div className={styles.alert}>{children}</div>;
}

export default ErrorAlert;
