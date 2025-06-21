import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const HomePage = () => {
  return (
    <div className="text-center">
      <header className="bg-white dark:bg-dark-bg-secondary shadow rounded-lg p-10">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">Find Your Dream Internship</h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
          Connect with top companies and kickstart your career.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/find-internships">
            <Button>Browse Internships</Button>
          </Link>
          <Link to="/signup">
            <Button variant="ghost">Get Started</Button>
          </Link>
        </div>
      </header>

      <section className="mt-12">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="p-6 bg-white dark:bg-dark-bg-secondary rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">1. Create Profile</h3>
            <p className="text-gray-600 dark:text-gray-400">Sign up and build your profile in minutes.</p>
          </div>
          <div className="p-6 bg-white dark:bg-dark-bg-secondary rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">2. Discover Opportunities</h3>
            <p className="text-gray-600 dark:text-gray-400">Search and apply for internships that match your skills.</p>
          </div>
          <div className="p-6 bg-white dark:bg-dark-bg-secondary rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">3. Get Hired</h3>
            <p className="text-gray-600 dark:text-gray-400">Track applications and connect with hiring managers.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;