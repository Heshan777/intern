// src/components/company/CreateInternshipForm.jsx

import React, { useState } from 'react';
// 1. Import the tools we need from Firestore
import { collection, addDoc } from "firebase/firestore";
// 2. Import the 'db' instance you created in your config file
import { db } from '../../firebase/config';

const CreateInternshipForm = () => {
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 3. This is the magic command!
      // It adds a new document to the "internships" collection.
      const docRef = await addDoc(collection(db, "internships"), {
        title: title,
        companyName: companyName,
        description: description,
        postedAt: new Date() // Add a timestamp
      });

      console.log("Document written with ID: ", docRef.id);
      // Clear the form
      setTitle('');
      setCompanyName('');
      setDescription('');

    } catch (e) {
      console.error("Error adding document: ", e);
      setError("Failed to post internship. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form inputs for title, companyName, description */}
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Internship Title" required />
      <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company Name" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Job Description" required />

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Posting...' : 'Post Internship'}
      </button>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </form>
  );
};

export default CreateInternshipForm;