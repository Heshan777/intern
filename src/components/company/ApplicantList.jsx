import React, { useState, useEffect } from 'react';
import { Spinner } from '../common/Spinner';
import { DocumentArrowDownIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

// You will need to implement this function in your firestoreService.js
import { getApplicantsForJob } from '../../services/firestoreService';

/**
 * Displays a list of applicants for a specific job.
 *
 * @param {object} props
 * @param {string} props.jobId - The ID of the job to fetch applicants for.
 */
const ApplicantList = ({ jobId }) => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!jobId) {
      setLoading(false);
      return;
    }

    const fetchApplicants = async () => {
      try {
        setLoading(true);
        setError(null);
        // This function needs to be created in your firestoreService.js
        const applicantData = await getApplicantsForJob(jobId);
        setApplicants(applicantData);
      } catch (err) {
        console.error("Error fetching applicants:", err);
        setError('Failed to load applicants. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId]);

  if (loading) {
    return <div className="flex justify-center p-10"><Spinner size="lg" /></div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  if (applicants.length === 0) {
    return <div className="text-center p-10 text-gray-500 dark:text-gray-400">No applicants yet for this position.</div>;
  }

  return (
    <div className="bg-white dark:bg-dark-bg-secondary rounded-lg shadow overflow-hidden">
      <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
        {applicants.map((applicant) => (
          <li key={applicant.id} className="p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">{applicant.studentName?.charAt(0).toUpperCase() || 'A'}</span>
                </div>
                <div className="ml-4">
                  <p className="text-md font-medium text-gray-900 dark:text-dark-text">{applicant.studentName || 'N/A'}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <EnvelopeIcon className="h-4 w-4 mr-1.5" />
                    {applicant.studentEmail}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                 {applicant.resumeURL && (
                   <a
                    href={applicant.resumeURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-primary bg-primary/10 hover:bg-primary/20 dark:text-blue-400 dark:bg-blue-400/10 dark:hover:bg-blue-400/20"
                  >
                     <DocumentArrowDownIcon className="h-4 w-4 mr-1.5" />
                    View Resume
                   </a>
                 )}
                 <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    applicant.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                    applicant.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                  {applicant.status || 'Pending'}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicantList;

/*
// --- REQUIRED FUNCTION for /src/services/firestoreService.js ---
// Add the following function to your firestoreService.js file

import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export const getApplicantsForJob = async (jobId) => {
  const applicationsRef = collection(db, 'applications');
  const q = query(applicationsRef, where('jobId', '==', jobId));
  
  const querySnapshot = await getDocs(q);
  const applicants = [];
  querySnapshot.forEach((doc) => {
    applicants.push({ id: doc.id, ...doc.data() });
  });
  
  // You might want to fetch more student details here by using studentId
  // For now, we assume studentName and studentEmail are stored on the application doc
  
  return applicants;
};
*/