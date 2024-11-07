import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus, Users, Building2, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../components/Modal';
import { SaveExportButtons } from '../components/SaveExportButtons';

interface Shift {
  id: number;
  siteId: number;
  date: string;
  timeStart: string;
  timeEnd: string;
  operatorIds: number[];
  notes: string;
}

interface Site {
  id: number;
  name: string;
  address: string;
  supervisor: string;
  operators: number;
  status: string;
}

interface Operator {
  id: number;
  name: string;
  role: string;
  location: string;
  status: string;
}

export const Pianificazione = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [sites, setSites] = useState<Site[]>([]);
  const [operators, setOperators] = useState<Operator[]>([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    timeStart: '09:00',
    timeEnd: '17:00',
    operatorIds: [] as number[],
    notes: ''
  });

  useEffect(() => {
    setSites([
      { id: 1, name: 'Centro Commerciale Milano', address: 'Via Milano 123', supervisor: 'Marco Rossi', operators: 12, status: 'Attivo' },
      { id: 2, name: 'Uffici Roma Nord', address: 'Via Roma 456', supervisor: 'Laura Bianchi', operators: 8, status: 'Attivo' }
    ]);
    setOperators([
      { id: 1, name: 'Mario Rossi', role: 'Operatore Pulizie', location: 'Milano', status: 'Attivo' },
      { id: 2, name: 'Laura Bianchi', role: 'Team Leader', location: 'Milano', status: 'Attivo' }
    ]);
  }, []);

  const handleSave = () => {
    setHasUnsavedChanges(false);
  };

  const handleExport = () => {
    const exportData = {
      shifts,
      sites,
      operators
    };
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'pianificazione.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePreviousWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
  };

  const handleNextWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));
  };

  const getWeekDates = () => {
    const dates = [];
    const startDate = new Date(currentDate);
    startDate.setDate(startDate.getDate() - startDate.getDay() + 1);

    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newShift: Shift = {
      id: Math.max(0, ...shifts.map(s => s.id)) + 1,
      siteId: selectedSite?.id || 0,
      ...formData
    };
    setShifts([...shifts, newShift]);
    setIsModalOpen(false);
    setHasUnsavedChanges(true);
  };

  const getShiftsForDateAndSite = (date: Date, siteId: number) => {
    return shifts.filter(shift => 
      shift.date === date.toISOString().split('T')[0] && 
      shift.siteId === siteId
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Pianificazione</h2>
          <p className="mt-1 text-sm text-gray-500">Gestione turni e assegnazione operatori</p>
        </div>
        <div className="flex space-x-4">
          <SaveExportButtons
            onSave={handleSave}
            onExport={handleExport}
            hasUnsavedChanges={hasUnsavedChanges}
          />
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Home className="h-5 w-5 mr-2" />
            Torna alla Home
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <select
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                onChange={(e) => setSelectedSite(sites.find(s => s.id === Number(e.target.value)) || null)}
                value={selectedSite?.id || ''}
              >
                <option value="">Seleziona un cantiere</option>
                {sites.map(site => (
                  <option key={site.id} value={site.id}>{site.name}</option>
                ))}
              </select>
              <button
                onClick={() => setIsModalOpen(true)}
                disabled={!selectedSite}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nuovo Turno
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handlePreviousWeek}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-sm font-medium">
                {currentDate.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })}
              </span>
              <button
                onClick={handleNextWeek}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {getWeekDates().map((date, index) => (
            <div key={index} className="bg-white">
              <div className="p-2 border-b text-center">
                <div className="text-sm font-medium text-gray-900">
                  {date.toLocaleDateString('it-IT', { weekday: 'short' })}
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  {date.getDate()}
                </div>
              </div>
              <div className="p-2 min-h-[150px]">
                {selectedSite && getShiftsForDateAndSite(date, selectedSite.id).map(shift => (
                  <div key={shift.id} className="mb-2 p-2 bg-blue-50 rounded-md text-sm">
                    <div className="font-medium text-blue-900">{shift.timeStart} - {shift.timeEnd}</div>
                    <div className="text-blue-700">
                      {shift.operatorIds.map(id => 
                        operators.find(op => op.id === id)?.name
                      ).join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nuovo Turno"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Cantiere</label>
            <div className="mt-1 text-gray-900">{selectedSite?.name}</div>
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Data</label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="timeStart" className="block text-sm font-medium text-gray-700">Ora Inizio</label>
              <input
                type="time"
                id="timeStart"
                value={formData.timeStart}
                onChange={(e) => setFormData({ ...formData, timeStart: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="timeEnd" className="block text-sm font-medium text-gray-700">Ora Fine</label>
              <input
                type="time"
                id="timeEnd"
                value={formData.timeEnd}
                onChange={(e) => setFormData({ ...formData, timeEnd: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="operators" className="block text-sm font-medium text-gray-700">Operatori</label>
            <select
              multiple
              id="operators"
              value={formData.operatorIds}
              onChange={(e) => setFormData({
                ...formData,
                operatorIds: Array.from(e.target.selectedOptions, option => Number(option.value))
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            >
              {operators
                .filter(op => op.status === 'Attivo')
                .map(operator => (
                  <option key={operator.id} value={operator.id}>
                    {operator.name} - {operator.role}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Note</label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <button
              type="submit"
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
            >
              Crea Turno
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
            >
              Annulla
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};