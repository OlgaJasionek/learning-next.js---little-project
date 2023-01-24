import { SingleEvent } from "../../../types/events-types";
import EventItem from "../event-item/event-item";

import styles from "./event-list.module.scss";

type Props = {
  items: SingleEvent[];
};

const EventList = ({ items }: Props) => {
  return (
    <ul className={styles.list}>
      {items.map(event => (
        <EventItem key={event.id} item={event} />
      ))}
    </ul>
  );
};

export default EventList;
