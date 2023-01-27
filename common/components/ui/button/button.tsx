import Link from "next/link";
import { ReactNode } from "react";

import styles from "./button.module.scss";

type Props = {
  link?: string;
  children: ReactNode;
  onClick?: () => void;
};

const Button = ({ link, children, onClick }: Props) => {
  if (link) {
    return (
      <Link href={link} className={styles.btn}>
        {children}
      </Link>
    );
  } else {
    return (
      <button onClick={onClick} className={styles.btn}>
        {children}
      </button>
    );
  }
};

export default Button;
