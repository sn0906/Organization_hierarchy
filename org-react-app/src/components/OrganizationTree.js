import React from 'react';
import PropTypes from 'prop-types';

const TreeNode = ({ node }) => (
  <div className="ml-4">
    <div className="flex items-center">
      <span className="mr-2 text-gray-400">▶</span>
      <span className="font-medium">{node.name}</span>
    </div>
    {node.employees && node.employees.length > 0 && (
      <div className="ml-6 mt-2">
        <h4 className="text-sm font-medium text-gray-500">Employees:</h4>
        <ul className="list-disc list-inside">
          {node.employees.map((employee, index) => (
            <li key={index} className="text-sm text-gray-600">{employee.name}</li>
          ))}
        </ul>
      </div>
    )}
    {node.children && node.children.map((child, index) => (
      <TreeNode key={index} node={child} />
    ))}
  </div>
);

TreeNode.propTypes = {
  node: PropTypes.shape({
    name: PropTypes.string.isRequired,
    employees: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
    })),
    children: PropTypes.array,
  }).isRequired,
};

export default function OrganizationTree({ data }) {
  return (
    <div className="mt-4">
      <TreeNode node={data} />
    </div>
  );
}

OrganizationTree.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    employees: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
    })),
    children: PropTypes.array,
  }).isRequired,
};

