import { useRouter } from "next/router";
import { getEventById } from "../../../dummy-date";

const EventDetailPage = () => {
  const router = useRouter();
  const eventId = router.query.eventId;
  const event = getEventById(eventId);

  return (
    <>
      <h1> Event Details</h1>
    </>
  );
};

export default EventDetailPage;
