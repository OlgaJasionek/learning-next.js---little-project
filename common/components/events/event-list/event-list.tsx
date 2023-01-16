import { SingleEvent } from "../../../types/events-types";
import EventItem from "../event-item/event-item";

type Props = {
  items: SingleEvent[];
};

const EventList = ({ items }: Props) => {
  return (
    <ul>
      {items.map(event => (
        <EventItem key={event.id} item={event} />
      ))}
    </ul>
  );
};

export default EventList;
