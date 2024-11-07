import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { Anagrafica } from './pages/anagrafica/Anagrafica';
import { Operatori } from './pages/anagrafica/Operatori';
import { Cantieri } from './pages/anagrafica/Cantieri';
import { Pianificazione } from './pages/Pianificazione';
import { Assenze } from './pages/Assenze';
import { Presenze } from './pages/presenze/Presenze';

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/anagrafiche" element={<Anagrafica />}>
            <Route path="operatori" element={<Operatori />} />
            <Route path="cantieri" element={<Cantieri />} />
          </Route>
          <Route path="/pianificazione" element={<Pianificazione />} />
          <Route path="/assenze" element={<Assenze />} />
          <Route path="/presenze" element={<Presenze />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;