import EventList from "../common/components/events/event-list/event-list";
import { getFeaturedEvents } from "../dummy-date";

const HomePage = () => {
  const featuredEvents = getFeaturedEvents();

  return (
    <>
      <EventList items={featuredEvents} />
    </>
  );
};

export default HomePage;
