
import React, { useState, useEffect, useCallback } from 'react';
import { JournalEntry } from './types';
import { JournalEntryForm } from './components/JournalEntryForm';
import { JournalEntryCard } from './components/JournalEntryCard';

const App: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const storedEntries = localStorage.getItem('journalEntries');
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries));
    }
  }, []);

  const saveEntriesToLocalStorage = useCallback((updatedEntries: JournalEntry[]) => {
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
  }, []);

  const handleSaveEntry = (newEntry: JournalEntry) => {
    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    saveEntriesToLocalStorage(updatedEntries);
    setIsFormVisible(false);
  };

  const downloadData = () => {
    const dataStr = JSON.stringify(entries, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `carnet_emotions_${new Date().toISOString().slice(0,10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-indigo-50 to-purple-100 py-8 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-800">
          <i className="fas fa-book-heart mr-3 text-sky-500"></i>Mon Carnet d'Émotions
        </h1>
        <p className="mt-2 text-slate-600 text-lg">Votre espace personnel pour comprendre et suivre vos émotions.</p>
      </header>

      <div className="max-w-3xl mx-auto">
        {!isFormVisible && (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
            <button
              onClick={() => setIsFormVisible(true)}
              className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 text-lg"
            >
              <i className="fas fa-plus-circle mr-2"></i>Nouvelle Entrée
            </button>
            {entries.length > 0 && (
              <button
                onClick={downloadData}
                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 text-lg"
              >
                <i className="fas fa-download mr-2"></i>Télécharger les Données
              </button>
            )}
          </div>
        )}

        {isFormVisible && (
          <div className="mb-10">
            <JournalEntryForm onSave={handleSaveEntry} />
            <button
              onClick={() => setIsFormVisible(false)}
              className="mt-6 w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-lg transition duration-150"
            >
              Annuler
            </button>
          </div>
        )}

        {entries.length > 0 && !isFormVisible && (
          <div>
            <h2 className="text-2xl font-semibold text-slate-700 mb-6 text-center">Mes Entrées Récentes</h2>
            <div className="space-y-6">
              {entries.map(entry => (
                <JournalEntryCard key={entry.id} entry={entry} />
              ))}
            </div>
          </div>
        )}
        
        {entries.length === 0 && !isFormVisible && (
           <div className="text-center py-10 px-6 bg-white rounded-lg shadow-md">
             <i className="fas fa-feather-alt text-5xl text-slate-400 mb-4"></i>
             <p className="text-slate-500 text-lg">Votre carnet est vide pour le moment.</p>
             <p className="text-slate-400">Cliquez sur "Nouvelle Entrée" pour commencer à écrire.</p>
           </div>
        )}
      </div>
      <footer className="text-center mt-12 text-sm text-slate-500">
        <p>Construit avec <i className="fas fa-heart text-red-500"></i> pour vous aider à mieux vous comprendre.</p>
      </footer>
    </div>
  );
};

export default App;
