import React, { useState } from 'react';
import { CalendarRange, Users, ClipboardList, UserX } from 'lucide-react';
import { ModuleCard } from '../components/ModuleCard';
import { StatsCard } from '../components/StatsCard';

export const Dashboard = () => {
  const [unsavedChanges, setUnsavedChanges] = useState({
    planning: false,
    registry: false,
    attendance: false,
    absence: false
  });

  const handleSave = (module: keyof typeof unsavedChanges) => {
    // Here you would typically save the changes to your backend
    setUnsavedChanges(prev => ({
      ...prev,
      [module]: false
    }));
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Bacheca</h2>
        <p className="mt-1 text-sm text-gray-500">Gestione Risorse Umane - Servizi di Pulizia</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ModuleCard
          title="Pianificazione"
          description="Gestione turni e programmazione attività"
          icon={CalendarRange}
          color="bg-blue-50 text-blue-600"
          to="/pianificazione"
          hasUnsavedChanges={unsavedChanges.planning}
          onSave={() => handleSave('planning')}
        />
        <ModuleCard
          title="Anagrafiche"
          description="Gestione dipendenti e informazioni personali"
          icon={Users}
          color="bg-green-50 text-green-600"
          to="/anagrafiche"
          hasUnsavedChanges={unsavedChanges.registry}
          onSave={() => handleSave('registry')}
        />
        <ModuleCard
          title="Presenze e Attività"
          description="Monitoraggio presenze e attività lavorative"
          icon={ClipboardList}
          color="bg-purple-50 text-purple-600"
          to="/presenze"
          hasUnsavedChanges={unsavedChanges.attendance}
          onSave={() => handleSave('attendance')}
        />
        <ModuleCard
          title="Assenze"
          description="Gestione ferie, permessi e malattie"
          icon={UserX}
          color="bg-orange-50 text-orange-600"
          to="/assenze"
          hasUnsavedChanges={unsavedChanges.absence}
          onSave={() => handleSave('absence')}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Dipendenti Attivi"
          value={127}
          subtitle="↑ 4% rispetto al mese scorso"
        />
        <StatsCard
          title="Turni Questa Settimana"
          value={284}
          subtitle="98% copertura"
          subtitleColor="text-blue-600"
        />
        <StatsCard
          title="Assenze Oggi"
          value={5}
          subtitle="3 programmate, 2 malattia"
          subtitleColor="text-orange-600"
        />
      </div>
    </main>
  );
}