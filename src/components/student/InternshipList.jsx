// src/components/student/InternshipList.jsx

import React, { useState, useEffect } from 'react';
// 1. Import the tools we need
import { collection, getDocs, query, orderBy } from "firebase/firestore";
// 2. Import our database instance
import { db } from '../../firebase/config';

const InternshipList = () => {
  const [internships, setInternships] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        // 3. Create a query to get documents from the "internships" collection
        // We can also order them, for example by the date they were posted.
        const internshipsRef = collection(db, "internships");
        const q = query(internshipsRef, orderBy("postedAt", "desc"));

        // 4. Execute the query
        const querySnapshot = await getDocs(q);

        // 5. Loop through the results and format them for our React state
        const internshipData = querySnapshot.docs.map(doc => ({
          id: doc.id,         // The unique document ID
          ...doc.data()     // The rest of the data (title, companyName, etc.)
        }));

        setInternships(internshipData);

      } catch (err) {
        console.error(err);
        setError("Failed to load internships.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInternships();
  }, []); // The empty array [] means this effect runs once when the component mounts

  if (isLoading) return <p>Loading internships...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Available Internships</h2>
      {internships.map(internship => (
        <div key={internship.id} style={{border: '1px solid #ccc', margin: '10px', padding: '10px'}}>
          <h3>{internship.title}</h3>
          <p><strong>Company:</strong> {internship.companyName}</p>
          <p>{internship.description}</p>
        </div>
      ))}
    </div>
  );
};

export default InternshipList;