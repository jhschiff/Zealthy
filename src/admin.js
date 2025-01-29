import React, { useState, useEffect } from 'react';
import database from "./firebase"; // Assuming the correct path to your configuration file
import { ref, get, set } from "firebase/database";


export default function Admin() {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    async function fetchStepConfig() {
      try {
        // // Reference to the specific collection in the database
        const pagesRef = ref(database, "Pages");
        const snapshot = await get(pagesRef);
        if (snapshot.exists()) {
          console.log("Data: ", snapshot.val());
          const configObject = snapshot.val();

          // Convert object to array of steps, sorted by step order
          const sortedSteps = Object.entries(configObject)
            .map(([field_name, stepNumber]) => ({ field_name, stepNumber }))
            .sort((a, b) => a.field_name - b.field_name);

            const filteredSteps = sortedSteps.filter(step => step.field_name !== "emailPassword");
          setComponents(filteredSteps);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Failed to fetch step configuration:", error);
      }
    }
    fetchStepConfig();
  }, []);

  const handlePageChange = async (field_name, newPage) => {
    if (newPage < 2 || newPage > 3) return;

    const pageCount = components.filter((c) => c.stepNumber === newPage).length;

    if (pageCount >= 2) {
      alert('Each page must have a component.');
      return;
    }

    try {
      // Update the state immediately for a better user experience
      setComponents((prevComponents) =>
        prevComponents.map((component) =>
          component.field_name === field_name ? { ...component, stepNumber: newPage } : component
        )
      );
  
      // // Reference the specific component in the database
      const componentRef = ref(database, `Pages/${field_name}`);

      // // Update the step number in Firebase
      set(componentRef, newPage);
      
      console.log(`Component ${field_name} updated to page ${newPage} in Firebase.`);
    } catch (error) {
      console.error("Error updating component in Firebase:", error);
      alert("Failed to update the page. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">Admin - Manage Onboarding Flow</h1>
      <table className="table-auto w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Component</th>
            <th className="px-4 py-2"> Page</th>
          </tr>
        </thead>
        <tbody>
          {components.map((component) => (
            <tr className="border-b">
              <td className="px-4 py-2 text-center">{component.field_name}</td>
              <td className="px-4 py-2 text-center">
                <select
                  value={component.stepNumber}
                  onChange={(e) => handlePageChange(component.field_name, parseInt(e.target.value, 10))}
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
