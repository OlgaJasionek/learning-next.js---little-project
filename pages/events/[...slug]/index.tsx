import { GetServerSidePropsContext, PreviewData } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";

import EventList from "../../../common/components/events/event-list/event-list";
import ResultsTitle from "../../../common/components/events/results-title/results-title";
import Button from "../../../common/components/ui/button/button";
import ErrorAlert from "../../../common/components/ui/error-alert/error-alert";
import { Event, getFilteredEvents } from "../../../helpers/api-util";

type Props = {
  events?: Event[];
  hasError?: boolean;
  date: {
    year: number;
    month: number;
  };
};

const FilteredEventsPage = ({ events, hasError, date }: Props) => {
  // const router = useRouter();

  // const filterData = router.query.slug;

  // if (!filterData) {
  //   return <p className='center'>Loading...</p>;
  // }

  // const filteredYear = +filterData[0];
  // const filteredMonth = +filterData[1];

  const pageHeadData = (
    <Head>
      <title>Filtered events</title>
      <meta
        name='description'
        content={`All events for ${date.year} ${date.month}`}
      />
    </Head>
  );

  if (hasError) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p className='center'>Invalid filter. Please adjust your values</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show all events</Button>
        </div>
      </>
    );
  }

  // const filteredEvents = getFilteredEvents({
  //   year: filteredYear,
  //   month: filteredMonth,
  // });

  if (!events || events.length === 0) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p className='center'>No events found for the chosen filters</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show all events</Button>
        </div>
      </>
    );
  }

  const numDate = new Date(date.year, date.month - 1);

  return (
    <>
      {pageHeadData}
      <ResultsTitle date={numDate} />
      <EventList items={events} />
    </>
  );
};

export default FilteredEventsPage;

export const getServerSideProps: (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => Promise<{
  props?: {} | { hasError: boolean };
}> = async context => {
  const { params } = context;
  const filterData = params?.slug as string;

  const filteredYear = +filterData[0];
  const filteredMonth = +filterData[1];

  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear > 2030 ||
    filteredYear < 2021 ||
    filteredMonth < 1 ||
    filteredMonth > 12
  ) {
    return {
      props: {
        hasError: true,
      },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: filteredYear,
    month: filteredMonth,
  });
  return {
    props: {
      events: filteredEvents,
      date: {
        year: filteredYear,
        month: filteredMonth,
      },
    },
  };
};
