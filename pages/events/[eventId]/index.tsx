import { GetStaticPropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import EventContent from "../../../common/components/events/event-detail/event-content/event-content";
import EventLogistics from "../../../common/components/events/event-detail/event-logistics.tsx/event-logistics";
import EventSummary from "../../../common/components/events/event-detail/event-summary/event-summary";
import Comments from "../../../common/components/input/comments/comments";
import {
  Event,
  getEventById,
  getFeaturedEvents,
} from "../../../helpers/api-util";

type Props = {
  selectedEvent: Event;
};

const EventDetailPage = ({ selectedEvent }: Props) => {
  const event = selectedEvent;

  if (!event) {
    return <p>Event not found</p>;
  }

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
        <Comments eventId={event.id} />
      </EventContent>
    </>
  );
};

export default EventDetailPage;

export const getStaticProps: (
  context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>
) => Promise<{ props: { selectedEvent: Event | null } }> = async context => {
  const eventId = context.params?.eventId;
  const event: Event | null = await getEventById(eventId as string);
  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
};

export const getStaticPaths = async () => {
  const events: Event[] = await getFeaturedEvents();

  const paths = events.map(event => ({ params: { eventId: event.id } }));

  return {
    paths,
    fallback: true,
  };
};
