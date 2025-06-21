import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100 dark:bg-dark-bg">
      <h1 className="text-6xl font-extrabold text-primary">404</h1>
      <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-dark-text">Page Not Found</h2>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <div className="mt-8">
        <Link to="/">
          <Button>Go Back Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
