import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { db } from '../../services/firebase'; // Ensure this path is correct
import { collection, query, where, getDocs, limit } from 'firebase/firestore';

// A simple component to display a summary of the student's profile
const StudentProfileSummary = ({ user }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800">Your Profile</h3>
      <p className="mt-2 text-gray-600">
        <strong>Name:</strong> {user.displayName || 'Not set'}
      </p>
      <p className="mt-1 text-gray-600">
        <strong>Email:</strong> {user.email}
      </p>
      <Link to="/profile/edit" className="text-blue-500 hover:underline mt-4 inline-block">
        Edit Profile
      </Link>
    </div>
  );
};

const StudentDashboard = () => {
  const { currentUser } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetches the 3 most recent applications for the current student
    const fetchRecentApplications = async () => {
      if (!currentUser) return; // Don't fetch if user is not logged in

      try {
        setLoading(true);
        setError(null);

        // Create a query to get documents from the 'applications' collection
        const applicationsRef = collection(db, 'applications');
        const q = query(
          applicationsRef,
          where('studentId', '==', currentUser.uid), // Filter by the logged-in student's ID
          limit(3) // Get only the 3 most recent
        );

        const querySnapshot = await getDocs(q);
        const recentApps = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setApplications(recentApps);
      } catch (err) {
        console.error("Error fetching applications: ", err);
        setError("Failed to load your recent applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentApplications();
  }, [currentUser]); // Re-run this effect if the currentUser changes

  if (!currentUser) {
    // This can be a loading spinner or null while auth state is being determined
    return <div>Loading user data...</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, {currentUser.displayName || currentUser.email}!
        </h1>
        <p className="text-md text-gray-600">Here's a summary of your internship activity.</p>
      </header>

      {/* Quick Actions Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link to="/find-internships" className="bg-blue-600 text-white text-center font-bold py-4 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
            Find New Internships
          </Link>
          <Link to="/my-applications" className="bg-gray-700 text-white text-center font-bold py-4 px-6 rounded-lg hover:bg-gray-800 transition duration-300">
            View All My Applications
          </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Applications Section */}
        <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Applications</h3>
          {loading && <p>Loading applications...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && (
            <div>
              {applications.length > 0 ? (
                <ul className="space-y-4">
                  {applications.map(app => (
                    <li key={app.id} className="p-4 border rounded-md hover:bg-gray-50">
                      <p className="font-semibold text-lg">{app.internshipTitle}</p>
                      <p className="text-gray-600">{app.companyName}</p>
                      <p className={`mt-2 text-sm font-medium ${app.status === 'Pending' ? 'text-yellow-600' : 'text-green-600'}`}>
                        Status: {app.status}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">You haven't applied to any internships yet.</p>
              )}
            </div>
          )}
        </div>

        {/* Profile Summary Section */}
        <div className="lg:col-span-1">
          <StudentProfileSummary user={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;