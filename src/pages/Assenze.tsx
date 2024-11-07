import React, { useState } from 'react';
import { Calendar, Plus, Search, Edit2, Trash2, Home, FileText, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../components/Modal';
import { SaveExportButtons } from '../components/SaveExportButtons';

interface Absence {
  id: number;
  employeeId: number;
  employeeName: string;
  type: string;
  startDate: string;
  endDate: string;
  status: string;
  notes: string;
  documents: string[];
}

interface Employee {
  id: number;
  name: string;
}

export const Assenze = () => {
  const navigate = useNavigate();
  const [absences, setAbsences] = useState<Absence[]>([
    {
      id: 1,
      employeeId: 1,
      employeeName: 'Mario Rossi',
      type: 'Ferie',
      startDate: '2024-03-15',
      endDate: '2024-03-22',
      status: 'Approvato',
      notes: 'Vacanza estiva pianificata',
      documents: []
    },
    {
      id: 2,
      employeeId: 2,
      employeeName: 'Laura Bianchi',
      type: 'Malattia',
      startDate: '2024-03-10',
      endDate: '2024-03-12',
      status: 'Completato',
      notes: 'Certificato medico presentato',
      documents: ['certificato_medico.pdf']
    },
    {
      id: 3,
      employeeId: 3,
      employeeName: 'Giuseppe Verdi',
      type: 'Permesso',
      startDate: '2024-03-18',
      endDate: '2024-03-18',
      status: 'In attesa',
      notes: 'Visita medica specialistica',
      documents: []
    }
  ]);

  const [employees] = useState<Employee[]>([
    { id: 1, name: 'Mario Rossi' },
    { id: 2, name: 'Laura Bianchi' },
    { id: 3, name: 'Giuseppe Verdi' },
    { id: 4, name: 'Anna Neri' }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAbsence, setEditingAbsence] = useState<Absence | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '',
    type: '',
    startDate: '',
    endDate: '',
    notes: '',
    documents: [] as string[]
  });

  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSave = () => {
    setHasUnsavedChanges(false);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(absences, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'assenze.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleOpenModal = (absence?: Absence) => {
    if (absence) {
      setEditingAbsence(absence);
      setFormData({
        employeeId: absence.employeeId.toString(),
        type: absence.type,
        startDate: absence.startDate,
        endDate: absence.endDate,
        notes: absence.notes,
        documents: absence.documents
      });
    } else {
      setEditingAbsence(null);
      setFormData({
        employeeId: '',
        type: '',
        startDate: '',
        endDate: '',
        notes: '',
        documents: []
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAbsence(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAbsence) {
      setAbsences(absences.map(absence =>
        absence.id === editingAbsence.id
          ? {
              ...absence,
              ...formData,
              employeeId: parseInt(formData.employeeId),
              employeeName: employees.find(emp => emp.id === parseInt(formData.employeeId))?.name || '',
              status: absence.status
            }
          : absence
      ));
    } else {
      const employee = employees.find(emp => emp.id === parseInt(formData.employeeId));
      const newAbsence: Absence = {
        id: Math.max(0, ...absences.map(a => a.id)) + 1,
        employeeId: parseInt(formData.employeeId),
        employeeName: employee?.name || '',
        type: formData.type,
        startDate: formData.startDate,
        endDate: formData.endDate,
        status: 'In attesa',
        notes: formData.notes,
        documents: formData.documents
      };
      setAbsences([...absences, newAbsence]);
    }
    setHasUnsavedChanges(true);
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Sei sicuro di voler eliminare questa assenza?')) {
      setAbsences(absences.filter(absence => absence.id !== id));
      setHasUnsavedChanges(true);
    }
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setAbsences(absences.map(absence =>
      absence.id === id
        ? { ...absence, status: newStatus }
        : absence
    ));
    setHasUnsavedChanges(true);
  };

  const filteredAbsences = absences
    .filter(absence => filterStatus === 'all' || absence.status === filterStatus)
    .filter(absence =>
      absence.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      absence.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approvato':
        return 'bg-green-100 text-green-800';
      case 'In attesa':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rifiutato':
        return 'bg-red-100 text-red-800';
      case 'Completato':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestione Assenze</h2>
          <p className="mt-1 text-sm text-gray-500">Gestione ferie, permessi e malattie</p>
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

      {/* Rest of your component remains the same... */}
    </div>
  );
};