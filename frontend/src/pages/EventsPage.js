import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';
import EventsList from '../components/EventsList';

function EventsPage() {
  const data = useLoaderData();
  const events = data.events;
  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading....</p>}>
      <Await resolve={events} errorElement={<div>Could not load events</div>}>
        {loadedEvents => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');
  if (!response.ok) {
    // throw new Response(
    //   JSON.stringify({ message: 'Fetching events data failed.' }),
    //   { status: 500 }
    // );
    throw json({ message: 'Fetching events data failed.' }, { status: 500 });
  }

  const data = await response.json();

  return data.events;
}

export function loader() {
  return defer({ events: loadEvents() });
}

export default EventsPage;
