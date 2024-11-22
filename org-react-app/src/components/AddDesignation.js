import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function AddDesignation({ onAdd }) {
  const [designationName, setDesignationName] = useState('');
  const [parentDesignation, setParentDesignation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ name: designationName, parentDesignation });
    setDesignationName('');
    setParentDesignation('');
  };

  return (
    <div className="py-6">
      <h2 className="text-lg font-medium mb-4">Add Designation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="designationName" className="block text-sm font-medium text-gray-700">
            Designation Name
          </label>
          <input
            type="text"
            id="designationName"
            value={designationName}
            onChange={(e) => setDesignationName(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="parentDesignation" className="block text-sm font-medium text-gray-700">
            Parent Designation (optional)
          </label>
          <input
            type="text"
            id="parentDesignation"
            value={parentDesignation}
            onChange={(e) => setParentDesignation(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Designation
        </button>
      </form>
    </div>
  );
}

AddDesignation.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

