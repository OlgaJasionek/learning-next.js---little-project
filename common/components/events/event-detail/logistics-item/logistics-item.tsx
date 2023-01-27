import { ReactNode } from "react";
import classes from "./logistics-item.module.scss";

type Props = {
  icon: () => JSX.Element;
  children: ReactNode;
};

function LogisticsItem({ icon: Icon, children }: Props) {
  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <span className={classes.content}>{children}</span>
    </li>
  );
}

export default LogisticsItem;
