import { MongoClient, Document } from "mongodb";

export type Event = {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
};

export type FilterEventsProps = {
  year: number;
  month: number;
};

export const getAllEvents: () => Promise<Event[]> = async () => {
  const response = await fetch(
    "https://next-js-course-d27a4-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();

  const events = [];
  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
};

export const getFeaturedEvents: () => Promise<Event[]> = async () => {
  const allEvents = await getAllEvents();
  return allEvents.filter(event => event.isFeatured);
};

export const getEventById: (id: string) => Promise<Event | null> = async id => {
  const allEvents: Event[] = await getAllEvents();
  const selectedEvent = allEvents.find(event => event.id === id);
  if (selectedEvent) {
    return selectedEvent;
  } else {
    return null;
  }
};

export const getFilteredEvents = async (dateFilter: FilterEventsProps) => {
  const { year, month } = dateFilter;
  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter(event => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
};
