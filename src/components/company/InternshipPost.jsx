import React from 'react';
import { BriefcaseIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import Button from '../common/Button';

/**
 * A component to display a single internship posting.
 *
 * @param {object} props
 * @param {object} props.job - The job object containing internship details.
 * @param {string} props.job.title - The title of the internship.
 * @param {string} props.job.type - The type of internship (e.g., 'Full-time', 'Part-time').
 * @param {string} props.job.location - The location of the internship.
 * @param {string} props.job.description - A brief description of the internship.
 * @param {function} props.onViewApplicants - A function to be called when the "View Applicants" button is clicked.
 * @param {function} props.onEdit - A function to be called when the "Edit" button is clicked.
 */
const InternshipPost = ({ job, onViewApplicants, onEdit }) => {
  return (
    <div className="bg-white dark:bg-dark-bg-secondary rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-primary dark:text-blue-400">{job.title}</h3>
        <span className="bg-secondary/10 text-secondary text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-secondary/20">
          {job.type || 'Not specified'}
        </span>
      </div>
      <div className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center">
          <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
          <span>{job.location || 'Remote'}</span>
        </div>
        <div className="flex items-center">
          <BriefcaseIcon className="h-4 w-4 mr-2 text-gray-400" />
          <span>Posted by: You</span>
        </div>
      </div>
      <p className="mt-4 text-gray-700 dark:text-gray-300 line-clamp-3">
        {job.description}
      </p>
      <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-end space-x-3">
        <Button variant="ghost" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="primary" onClick={onViewApplicants}>
          View Applicants
        </Button>
      </div>
    </div>
  );
};

export default InternshipPost;