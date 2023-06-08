import MainNavigation from '../components/MainNavigation';
import { useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();
  console.log(error);
  let message = 'Something went wrong!';
  let status = 500;

  if (error) {
    message = error.data;
    status = error.status;
  }

  return (
    <>
      <MainNavigation />
      <div style={{ textAlign: 'center' }}>
        <h1>Some Error Happened : {status}</h1>
        <h3>{message}</h3>
      </div>
    </>
  );
}

export default ErrorPage;
