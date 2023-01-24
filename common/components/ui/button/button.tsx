import Link from "next/link";
import { ReactNode } from "react";

import styles from "./button.module.scss";

type Props = {
  link: string;
  children: ReactNode;
};

const Button = ({ link, children }: Props) => {
  return (
    <>
      <Link href={link} className={styles.btn}>
        {children}
      </Link>
    </>
  );
};

export default Button;
