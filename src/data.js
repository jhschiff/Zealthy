import React, { useEffect, useState } from 'react';

export default function DataTable() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/users'); // Replace with your API endpoint
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">User Data Table</h1>
      <table className="table-auto border-collapse border border-gray-300 w-full max-w-4xl">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">About Me</th>
            <th className="border border-gray-300 px-4 py-2">Address</th>
            <th className="border border-gray-300 px-4 py-2">Birthdate</th>
          </tr>
        </thead>
        <tbody>
          {userData.length > 0 ? (
            userData.map((user, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">{user.aboutMe || 'N/A'}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.address
                    ? `${user.address.street}, ${user.address.city}, ${user.address.state}, ${user.address.zip}`
                    : 'N/A'}
                </td>
                <td className="border border-gray-300 px-4 py-2">{user.birthdate || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center border border-gray-300 px-4 py-2">No user data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
