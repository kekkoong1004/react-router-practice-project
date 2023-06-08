import { Suspense } from 'react';
import {
  json,
  redirect,
  useRouteLoaderData,
  useNavigation,
  defer,
  Await,
} from 'react-router-dom';
import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';

function EventDetailPage() {
  const { event, events } = useRouteLoaderData('eventDetail');

  const navigation = useNavigation();

  if (navigation.state === 'loading') {
    return <p>Loading....</p>;
  }

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await
          resolve={event}
          errorElement={
            <p style={{ textAlign: 'center' }}>Something went wrong...</p>
          }
        >
          {resolvedEvent => <EventItem event={resolvedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={events}>
          {resolvedEvents => <EventsList events={resolvedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetailPage;

async function loadEventById(id) {
  const response = await fetch(`http://localhost:8080/events/${id}`);

  if (!response.ok) {
    throw json(
      { message: `fetching event id ${id} failed...` },
      { status: 500 }
    );
  }
  const data = await response.json();
  return data.event;
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

export async function loader({ params }) {
  const id = params.eventId;
  return defer({
    event: loadEventById(id),
    events: loadEvents(),
  });
}

export async function action({ params, request }) {
  const id = params.eventId;

  const response = await fetch(`http://localhost:8080/events/${id}`, {
    method: request.method,
  });

  if (!response.ok) {
    throw json(
      { message: `deleting event id ${id} failed...` },
      { status: 500 }
    );
  }

  return redirect('/events');
}
