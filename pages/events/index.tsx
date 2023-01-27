import { useRouter } from "next/router";
import EventList from "../../common/components/events/event-list/event-list";
import EventsSearch from "../../common/components/events/events-search/events-search";
import { getAllEvents } from "../../dummy-date";

const AllEventsPage = () => {
  const events = getAllEvents();
  const router = useRouter();

  const findEventsHandler = (
    year: string | undefined,
    month: string | undefined
  ) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
};

export default AllEventsPage;
