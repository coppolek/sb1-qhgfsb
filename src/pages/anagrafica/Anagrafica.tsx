import React from 'react';
import { Users, Building2, Home } from 'lucide-react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

export const Anagrafica = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Anagrafiche</h2>
          <p className="mt-1 text-sm text-gray-500">Gestione operatori e cantieri</p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <Home className="h-5 w-5 mr-2" />
          Torna alla Home
        </button>
      </div>

      <div className="flex space-x-4 mb-8">
        <Link
          to="/anagrafiche/operatori"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Users className="h-5 w-5 mr-2" />
          Operatori
        </Link>
        <Link
          to="/anagrafiche/cantieri"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
        >
          <Building2 className="h-5 w-5 mr-2" />
          Cantieri
        </Link>
      </div>

      <Outlet />
    </div>
  );
}