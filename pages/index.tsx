import Head from "next/head";
import EventList from "../common/components/events/event-list/event-list";
import NewsletterRegistration from "../common/components/input/newsletter/newsletter";
import { Event, getFeaturedEvents } from "../helpers/api-util";

type Props = {
  events: Event[];
};

const HomePage = ({ events }: Props) => {
  return (
    <>
      <Head>
        <meta
          name='description'
          content='Find a lot of great events, that allow you to evolve'
        />
        <title>Next.js-app</title>
      </Head>
      <NewsletterRegistration />
      <EventList items={events} />
    </>
  );
};

export default HomePage;

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
};
