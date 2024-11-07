import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

interface Attendance {
  id: number;
  employeeName: string;
  date: string;
  timeIn: string;
  timeOut: string;
  status: string;
  location: string;
}

export const AttendanceList = () => {
  const [attendances] = useState<Attendance[]>([
    {
      id: 1,
      employeeName: 'Mario Rossi',
      date: '2024-03-18',
      timeIn: '08:00',
      timeOut: '17:00',
      status: 'Completato',
      location: 'Uffici Milano'
    },
    {
      id: 2,
      employeeName: 'Laura Bianchi',
      date: '2024-03-18',
      timeIn: '08:15',
      timeOut: '17:15',
      status: 'Ritardo',
      location: 'Centro Commerciale'
    },
    {
      id: 3,
      employeeName: 'Giuseppe Verdi',
      date: '2024-03-18',
      timeIn: '08:00',
      timeOut: '',
      status: 'In Corso',
      location: 'Scuola Torino'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completato':
        return 'bg-green-100 text-green-800';
      case 'In Corso':
        return 'bg-blue-100 text-blue-800';
      case 'Ritardo':
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
                    placeholder="Cerca presenze..."
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
                    Data
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Entrata
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Uscita
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stato
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sede
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendances.map((attendance) => (
                  <tr key={attendance.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {attendance.employeeName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(attendance.date).toLocaleDateString('it-IT')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {attendance.timeIn}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {attendance.timeOut || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(attendance.status)}`}>
                        {attendance.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {attendance.location}
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