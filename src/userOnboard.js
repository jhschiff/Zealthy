import React, { useState, useEffect } from 'react';
// import axios from 'axios';

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
    // Fetch step configuration from backend
    async function fetchStepConfig() {
      try {
        const response = await fetch('/api/steps'); // Replace with your API endpoint
        const data = await response.json();
        setStepConfig(data);
      } catch (error) {
        console.error('Failed to fetch step configuration:', error);
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

  const handleSubmit = async () => {
    try {
    //   await axios.post('/api/users', formData);
      alert('Onboarding complete!');
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('There was an error. Please try again.');
    }
  };

  const renderStep = () => {
    const currentStep = stepConfig[step - 1];
    switch (currentStep?.field_name) {
      case 'emailPassword':
        return <EmailAndPassword formData={formData} handleChange={handleChange} />;
      case 'aboutMe':
        return <AboutMe formData={formData} handleChange={handleChange} />;
      case 'address':
        return <Address formData={formData} setFormData={setFormData} />;
      case 'birthdate':
        return <Birthdate formData={formData} handleChange={handleChange} />;
      default:
        return <div>Loading...</div>;
    }
  };

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