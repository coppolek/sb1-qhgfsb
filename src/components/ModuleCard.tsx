import React from 'react';
import { LucideIcon, Save } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ModuleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  to: string;
  hasUnsavedChanges?: boolean;
  onSave?: () => void;
}

export const ModuleCard = ({ 
  title, 
  description, 
  icon: Icon, 
  color, 
  to,
  hasUnsavedChanges = false,
  onSave 
}: ModuleCardProps) => {
  return (
    <div className="relative group">
      <Link to={to}>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 ${color} rounded-lg`}>
              <Icon className="h-6 w-6" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="mt-2 text-sm text-gray-500">{description}</p>
        </div>
      </Link>
      {hasUnsavedChanges && onSave && (
        <button
          onClick={(e) => {
            e.preventDefault();
            onSave();
          }}
          className="absolute top-2 right-2 p-2 bg-blue-100 text-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          title="Salva modifiche"
        >
          <Save className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}