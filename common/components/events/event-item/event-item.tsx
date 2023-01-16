import Image from "next/image";
import Link from "next/link";

import { SingleEvent } from "../../../types/events-types";

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
      <li>
        <Image
          width={200}
          height={200}
          className={styles.img}
          src={"/" + item.image}
          alt={item.title}
        />
        <div>
          <div className={styles.section}>
            <h2>{item.title}</h2>
          </div>
          <div>
            <time>{humanReadableDate}</time>
          </div>
          <div>
            <address>{formattedAddress}</address>
          </div>
        </div>
        <Link href={exploreLink}>Explore Event</Link>
      </li>
    </>
  );
};

export default EventItem;
