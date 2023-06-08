import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EventsPage, { loader as eventsLoader } from './pages/EventsPage';
import EventDetailPage, {
  loader as eventDetailLoader,
  action as eventDeleteAction,
} from './pages/EventDetailPage';
import NewEventPage from './pages/NewEventPage';
import EditEventPage from './pages/EditEventPage';
import RootLayout from './pages/root/RootLayout';
import ErrorPage from './pages/ErrorPage';
import NewsletterPage, {
  action as newsletterAction,
} from './pages/NewsletterPage';
import EventsRoot from './pages/root/EventsRoot';
import { action as formAction } from './components/EventForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'events',
        element: <EventsRoot />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ':eventId',
            id: 'eventDetail',
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: eventDeleteAction,
              },
              {
                path: 'edit',
                element: <EditEventPage />,
                action: formAction,
              },
            ],
          },
          {
            path: 'new',
            element: <NewEventPage />,
            action: formAction,
          },
        ],
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
