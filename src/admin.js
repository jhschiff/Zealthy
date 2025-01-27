import React, { useState } from 'react';

const curComponents = [
  { id: 'aboutMe', name: 'About Me', page: 2 },
  { id: 'address', name: 'Address', page: 2 },
  { id: 'birthdate', name: 'Birthdate', page: 3 },
];

export default function Admin() {
  const [components, setComponents] = useState(curComponents);

  const handlePageChange = (componentId, newPage) => {
    if (newPage < 2 || newPage > 3) return;

    const pageCount = components.filter((c) => c.page === newPage).length;
    if (pageCount >= 2) {
      alert('Each page can have a maximum of 2 components.');
      return;
    }

    setComponents((prevComponents) =>
      prevComponents.map((component) =>
        component.id === componentId ? { ...component, page: newPage } : component
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">Admin - Manage Onboarding Flow</h1>
      <table className="table-auto w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Component</th>
            <th className="px-4 py-2">Current Page</th>
            <th className="px-4 py-2">Change Page</th>
          </tr>
        </thead>
        <tbody>
          {components.map((component) => (
            <tr key={component.id} className="border-b">
              <td className="px-4 py-2 text-center">{component.name}</td>
              <td className="px-4 py-2 text-center">{component.page}</td>
              <td className="px-4 py-2 text-center">
                <select
                  value={component.page}
                  onChange={(e) => handlePageChange(component.id, parseInt(e.target.value, 10))}
                  className="p-2 border rounded-lg"
                >
                  <option value={2}>Page 2</option>
                  <option value={3}>Page 3</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
