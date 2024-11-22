import React, { useState, useEffect } from 'react';
import AddDesignation from './components/AddDesignation';
import AddEmployee from './components/AddEmployee';
import OrganizationTree from './components/OrganizationTree';

const API_BASE_URL = 'http://localhost:5000/api';

export default function App() {
  const [organizationData, setOrganizationData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrganizationData();
  }, []);

  const fetchOrganizationData = async () => {
    try {
      console.log('Fetching organization data...');
      const response = await fetch(`${API_BASE_URL}/organization-hierarchy`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched data:', data);
      setOrganizationData(data);
    } catch (error) {
      console.error('Error fetching organization data:', error);
      setError(error.message);
    }
  };

  const handleAddDesignation = async (newDesignation) => {
    try {
      const response = await fetch(`${API_BASE_URL}/add-designation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDesignation),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchOrganizationData();
    } catch (error) {
      console.error('Error adding designation:', error);
      setError(error.message);
    }
  };

  const handleAddEmployee = async (newEmployee) => {
    try {
      const response = await fetch(`${API_BASE_URL}/add-employee`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmployee),
      });
      
      const data = await response.json();
      
      if (!response.ok || data.error) {
        throw new Error(data.message || data.error || `HTTP error! status: ${response.status}`);
      }
      
      setError(null);
      await fetchOrganizationData();
    } catch (error) {
      console.error('Error adding employee:', error);
      setError(error.message || 'Failed to add employee. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold text-center mb-6">Organization Hierarchy Management</h1>
            <div className="divide-y divide-gray-200">
              <AddDesignation onAdd={handleAddDesignation} />
              <AddEmployee onAdd={handleAddEmployee} />
              <div className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Organization Hierarchy</h2>
                {error && <p className="text-red-500">{error}</p>}
                {organizationData ? (
                  <OrganizationTree data={organizationData} />
                ) : (
                  <p className="text-gray-500">Loading organization data...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

