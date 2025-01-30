import React, { useState, useEffect, useRef } from 'react';
import database from "./firebase"; // Assuming the correct path to your configuration file
import { ref, get, set } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';

function EmailAndPassword({ formData, handleChange }) {
  return (
    <div>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="block mb-4 p-2 border border-gray-300 rounded-lg w-64"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="block mb-4 p-2 border border-gray-300 rounded-lg w-64"
      />
    </div>
  );
}

function AboutMe({ formData, handleChange }) {
  return (
    <div>
      <textarea
        name="aboutMe"
        placeholder="About Me"
        value={formData.aboutMe}
        onChange={handleChange}
        className="block mb-4 p-2 border border-gray-300 rounded-lg w-64 h-24"
      />
    </div>
  );
}

function Address({ formData, setFormData }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <input
        type="text"
        name="street"
        placeholder="Street Address"
        value={formData.address.street}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            address: { ...prev.address, street: e.target.value },
          }))
        }
        className="p-2 border border-gray-300 rounded-lg"
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.address.city}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            address: { ...prev.address, city: e.target.value },
          }))
        }
        className="p-2 border border-gray-300 rounded-lg"
      />
      <input
        type="text"
        name="state"
        placeholder="State"
        value={formData.address.state}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            address: { ...prev.address, state: e.target.value },
          }))
        }
        className="p-2 border border-gray-300 rounded-lg"
      />
      <input
        type="text"
        name="zip"
        placeholder="ZIP Code"
        value={formData.address.zip}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            address: { ...prev.address, zip: e.target.value },
          }))
        }
        className="p-2 border border-gray-300 rounded-lg"
      />
    </div>
  );
}


function Birthdate({ formData, handleChange }) {
  return (
    <div>
      <input
        type="date"
        name="birthdate"
        value={formData.birthdate}
        onChange={handleChange}
        className="block mb-4 p-2 border border-gray-300 rounded-lg"
      />
    </div>
  );
}

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [stepConfig, setStepConfig] = useState([]);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    aboutMe: '',
    address: { street: '', city: '', state: '', zip: '' },
    birthdate: '',
  });

  useEffect(() => {
    async function fetchStepConfig() {
      try {
        // // Reference to the specific collection in the database
        const pagesRef = ref(database, "Pages");
        const snapshot = await get(pagesRef);
        if (snapshot.exists()) {
          const configObject = snapshot.val();

          // Convert object to array of steps, sorted by step order
          const sortedSteps = Object.entries(configObject)
            .map(([field_name, stepNumber]) => ({ field_name, stepNumber }))
            .sort((a, b) => a.stepNumber - b.stepNumber);
          setStepConfig(sortedSteps);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Failed to fetch step configuration:", error);
      }
    }
    fetchStepConfig();
  }, []);

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  function revert(){
    setStep(1)
    setFormData({
      email: '',
      password: '',
      aboutMe: '',
      address: { street: '', city: '', state: '', zip: '' },
      birthdate: '',
    })
  } 

  const handleSubmit = async () => {
    try {      
      // console.log("FORM", formData)
      
      // Create a random UUID for the new record
      const uniqueKey = uuidv4();


      // // Reference the specific component in the database
      const componentRef = ref(database, `Onboarding/${uniqueKey}`);

      // // Update the step number in Firebase
      set(componentRef, formData);

      revert();

      alert('Onboarding complete!');      
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('There was an error. Please try again.');
    }
  };

  const renderStep = () => {
    if (stepConfig.length === 0) return <div>Loading...</div>;

    // Find all steps that match the current step number
    const currentSteps = stepConfig.filter(stepItem => stepItem.stepNumber === step);

    if (currentSteps.length === 0) return <div>Step not found</div>;

    return (
      <div>
        {currentSteps.map((stepItem, index) => {
          switch (stepItem.field_name) {
            case "emailPassword":
              return <EmailAndPassword key={index} formData={formData} handleChange={handleChange} />;
            case "AboutMe":
              return <AboutMe key={index} formData={formData} handleChange={handleChange} />;
            case "Address":
              return <Address key={index} formData={formData} setFormData={setFormData} />;
            case "Birthdate":
              return <Birthdate key={index} formData={formData} handleChange={handleChange} />;
            default:
              return <div key={index}>Unknown Step</div>;
          }
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <h2 className="Steps">Onboarding - Step {step} of 3</h2>
      {renderStep()}
      <div className="flex gap-4 mt-4">
      <div className="flex gap-4 mt-4">
        {step > 1 && (
          <button
            onClick={handlePrev}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Back
          </button>
        )}
        {step < 3 ? (
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Submit
          </button>
        )}
      </div>
      </div>
    </div>
  );
}