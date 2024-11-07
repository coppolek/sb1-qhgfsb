import React, { useState } from 'react';
import { Play, Pause, StopCircle } from 'lucide-react';

export const TimeTracker = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState('');

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Time Tracker</h3>
      <div className="flex items-center space-x-4">
        <select
          value={selectedActivity}
          onChange={(e) => setSelectedActivity(e.target.value)}
          className="block w-64 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          <option value="">Seleziona un'attività...</option>
          <option value="1">Pulizia Uffici Piano 1</option>
          <option value="2">Manutenzione Area Verde</option>
          <option value="3">Sanificazione Locali</option>
        </select>

        <button
          onClick={() => setIsTracking(!isTracking)}
          disabled={!selectedActivity}
          className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isTracking
              ? 'bg-yellow-600 hover:bg-yellow-700'
              : 'bg-green-600 hover:bg-green-700'
          } disabled:bg-gray-300 disabled:cursor-not-allowed`}
        >
          {isTracking ? (
            <>
              <Pause className="h-4 w-4 mr-2" />
              Pausa
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Inizia
            </>
          )}
        </button>

        {isTracking && (
          <button
            onClick={() => setIsTracking(false)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
          >
            <StopCircle className="h-4 w-4 mr-2" />
            Termina
          </button>
        )}

        <div className="text-2xl font-mono">
          {isTracking ? "00:32:15" : "00:00:00"}
        </div>
      </div>
    </div>
  );
};