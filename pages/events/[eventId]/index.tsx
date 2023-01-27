import { useRouter } from "next/router";
import EventContent from "../../../common/components/events/event-detail/event-content/event-content";
import EventLogistics from "../../../common/components/events/event-detail/event-logistics.tsx/event-logistics";
import EventSummary from "../../../common/components/events/event-detail/event-summary/event-summary";
import { getEventById } from "../../../dummy-date";

const EventDetailPage = () => {
  const router = useRouter();
  const eventId = router.query.eventId;
  const event = getEventById(eventId);

  if (!event) {
    return <p>No event found</p>;
  }
  console.log(event);

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export default EventDetailPage;
