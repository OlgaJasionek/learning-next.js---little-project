import Image from "next/image";

import { SingleEvent } from "../../../types/events-types";
import AddressIcon from "../../icons/address";
import ArrowRightIcon from "../../icons/arrow-right";
import DateIcon from "../../icons/date";
import Button from "../../ui/button/button";

import styles from "./event-item.module.scss";

type Props = {
  item: SingleEvent;
};

const EventItem = ({ item }: Props) => {
  const humanReadableDate = new Date(item.date).toLocaleDateString("en-us", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedAddress = item.location.replace(",", "\n");
  const exploreLink = `/events/${item.id}`;

  return (
    <>
      <li className={styles.item}>
        <Image
          width={200}
          height={200}
          className={styles.img}
          src={"/" + item.image}
          alt={item.title}
        />
        <div className={styles.content}>
          <div className={styles.summery}>
            <h2>{item.title}</h2>
          </div>
          <div className={styles.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={styles.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
          <div className={styles.actions}>
            <Button link={exploreLink}>
              <span>Explore event</span>
              <span className={styles.icon}>
                <ArrowRightIcon />
              </span>
            </Button>
          </div>
        </div>
      </li>
    </>
  );
};

export default EventItem;
