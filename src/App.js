import './App.css';
import Onboarding from './userOnboard';
import Admin from './admin';
import Data from './data'
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
       <>
         <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/data" element={<Data />} />

             {/* default redirect to home page */}
            <Route path="*" element={<Navigate to="/" />} />
         </Routes>
      </>
    </div>
  );
}

export default App;
