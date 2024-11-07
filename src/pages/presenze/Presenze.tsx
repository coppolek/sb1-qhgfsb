import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { AttendanceList } from './components/AttendanceList';
import { ActivityList } from './components/ActivityList';
import { StatsOverview } from './components/StatsOverview';
import { TimeTracker } from './components/TimeTracker';

export const Presenze = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('presenze');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Presenze e Attività</h2>
          <p className="mt-1 text-sm text-gray-500">Monitoraggio presenze e attività lavorative</p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <Home className="h-5 w-5 mr-2" />
          Torna alla Home
        </button>
      </div>

      <StatsOverview />

      <div className="mt-8">
        <TimeTracker />
      </div>

      <div className="mt-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('presenze')}
              className={`${
                activeTab === 'presenze'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Registro Presenze
            </button>
            <button
              onClick={() => setActiveTab('attivita')}
              className={`${
                activeTab === 'attivita'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Registro Attività
            </button>
          </nav>
        </div>

        <div className="mt-6">
          {activeTab === 'presenze' ? <AttendanceList /> : <ActivityList />}
        </div>
      </div>
    </div>
  );
};