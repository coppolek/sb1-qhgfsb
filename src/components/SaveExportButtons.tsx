import React from 'react';
import { Save, Download } from 'lucide-react';

interface SaveExportButtonsProps {
  onSave: () => void;
  onExport: () => void;
  hasUnsavedChanges: boolean;
}

export const SaveExportButtons = ({ onSave, onExport, hasUnsavedChanges }: SaveExportButtonsProps) => {
  return (
    <div className="flex space-x-2">
      {hasUnsavedChanges && (
        <button
          onClick={onSave}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Save className="h-4 w-4 mr-2" />
          Salva
        </button>
      )}
      <button
        onClick={onExport}
        className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Download className="h-4 w-4 mr-2" />
        Esporta
      </button>
    </div>
  );
};