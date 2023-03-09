import { useRouter } from "next/router";
import EventList from "../../common/components/events/event-list/event-list";
import EventsSearch from "../../common/components/events/events-search/events-search";
import { Event, getAllEvents } from "../../helpers/api-util";

type Props = {
  events: Event[];
};

const AllEventsPage = ({ events }: Props) => {
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

export const getStaticProps = async () => {
  const allEvents = await getAllEvents();
  return {
    props: {
      events: allEvents,
    },
    revalidate: 1800,
  };
};
