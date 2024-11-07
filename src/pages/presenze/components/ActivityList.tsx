import React, { useState } from 'react';
import { Search, Filter, Clock } from 'lucide-react';

interface Activity {
  id: number;
  employeeName: string;
  activityName: string;
  location: string;
  startTime: string;
  duration: string;
  status: string;
  notes: string;
}

export const ActivityList = () => {
  const [activities] = useState<Activity[]>([
    {
      id: 1,
      employeeName: 'Mario Rossi',
      activityName: 'Pulizia Uffici Piano 1',
      location: 'Uffici Milano',
      startTime: '08:30',
      duration: '2h 15m',
      status: 'Completata',
      notes: 'Pulizia standard completata'
    },
    {
      id: 2,
      employeeName: 'Laura Bianchi',
      activityName: 'Manutenzione Area Verde',
      location: 'Centro Commerciale',
      startTime: '09:00',
      duration: '1h 45m',
      status: 'In Corso',
      notes: 'Potatura siepi'
    },
    {
      id: 3,
      employeeName: 'Giuseppe Verdi',
      activityName: 'Sanificazione Locali',
      location: 'Scuola Torino',
      startTime: '10:30',
      duration: '3h 00m',
      status: 'Pianificata',
      notes: 'Sanificazione completa aule'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completata':
        return 'bg-green-100 text-green-800';
      case 'In Corso':
        return 'bg-blue-100 text-blue-800';
      case 'Pianificata':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex space-x-4">
              <div className="flex-1 min-w-0">
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    className="block w-full pr-10 sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Cerca attività..."
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Filter className="h-4 w-4 mr-2" />
                Filtri
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dipendente
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attività
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sede
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Inizio
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durata
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stato
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Note
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {activities.map((activity) => (
                  <tr key={activity.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {activity.employeeName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activity.activityName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activity.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activity.startTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-gray-400" />
                        {activity.duration}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(activity.status)}`}>
                        {activity.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activity.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};