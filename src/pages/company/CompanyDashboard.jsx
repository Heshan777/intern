import React from 'react';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';

const CompanyDashboard = () => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Company Dashboard</h1>
                <Link to="/post-internship">
                    <Button variant="secondary">Post New Internship</Button>
                </Link>
            </div>
            <p className="mt-2 text-lg text-gray-500">Manage your postings and applicants.</p>
        </div>
    );
};

export default CompanyDashboard;
