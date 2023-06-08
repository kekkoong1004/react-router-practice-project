import EventForm from '../components/EventForm';
import { useRouteLoaderData } from 'react-router-dom';

function EditEventPage() {
  const data = useRouteLoaderData('eventDetail');
  const event = data.event;

  return <EventForm event={event} method="PATCH" />;
}

export default EditEventPage;
