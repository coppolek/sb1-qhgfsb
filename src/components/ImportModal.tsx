import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { Modal } from './Modal';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (data: any[]) => void;
  title: string;
}

export const ImportModal = ({ isOpen, onClose, onImport, title }: ImportModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          onImport(Array.isArray(data) ? data : [data]);
          onClose();
        } catch (error) {
          alert('Errore nel formato del file. Assicurati che sia un JSON valido.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-4">
        <p className="text-sm text-gray-500">
          Carica un file JSON contenente i dati da importare. Il file deve contenere un array di oggetti con i campi richiesti.
        </p>
        
        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
          <Upload className="h-12 w-12 text-gray-400 mb-4" />
          <p className="text-sm text-gray-600 mb-2">Trascina qui il tuo file o</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".json"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Seleziona File
          </button>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          <p className="font-medium mb-2">Formato richiesto:</p>
          <pre className="bg-gray-50 p-2 rounded-md overflow-x-auto">
            {JSON.stringify([
              {
                "name": "Nome Esempio",
                "role": "Ruolo Esempio",
                "location": "Sede Esempio",
                "status": "Attivo"
              }
            ], null, 2)}
          </pre>
        </div>
      </div>
    </Modal>
  );
}