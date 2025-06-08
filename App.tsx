import React, { useState, useCallback, useMemo } from 'react';
import { JournalEntry } from './types';
import { JournalEntryForm } from './components/JournalEntryForm';
import { JournalEntryCard } from './components/JournalEntryCard';
import { NotificationContainer } from './components/NotificationContainer';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useNotification } from './hooks/useNotification';

const App: React.FC = () => {
  // Utilisation du hook optimisé pour localStorage
  const [entries, setEntries] = useLocalStorage<JournalEntry[]>('journalEntries', []);
  const [lastExportDate, setLastExportDate] = useLocalStorage<string | null>('lastExportDate', null);
  
  const [isFormVisible, setIsFormVisible] = useState(true);
  const { notifications, removeNotification, notifySuccess, notifyError, notifyWarning } = useNotification();

  const handleSaveEntry = useCallback((newEntry: JournalEntry) => {
    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    setIsFormVisible(false);
    notifySuccess('Entrée sauvegardée', 'Votre entrée a été enregistrée avec succès.');
  }, [entries, setEntries, notifySuccess]);

  const downloadData = useCallback((onlyNewEntries: boolean = false) => {
    let dataToExport = entries;
    
    if (onlyNewEntries && lastExportDate) {
      dataToExport = entries.filter(entry => 
        new Date(entry.timestamp) > new Date(lastExportDate)
      );
    }

    if (dataToExport.length === 0) {
      notifyWarning("Aucune donnée à exporter", "Il n'y a aucune nouvelle donnée à télécharger.");
      return;
    }

    try {
      const dataStr = JSON.stringify(dataToExport, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `carnet_emotions_${new Date().toISOString().slice(0,10)}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();

      // Mettre à jour la date du dernier export
      const currentDate = new Date().toISOString();
      setLastExportDate(currentDate);
      
      notifySuccess('Export réussi', `${dataToExport.length} entrée(s) téléchargée(s) avec succès.`);
    } catch (error) {
      notifyError('Erreur d\'export', 'Une erreur est survenue lors de l\'export des données.');
    }
  }, [entries, lastExportDate, setLastExportDate, notifySuccess, notifyError, notifyWarning]);

  const importData = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedEntries = JSON.parse(e.target?.result as string);
        if (Array.isArray(importedEntries)) {
          // Validation basique des entrées importées
          const validEntries = importedEntries.filter(entry => 
            entry && 
            typeof entry === 'object' && 
            entry.id && 
            entry.timestamp &&
            entry.situation &&
            Array.isArray(entry.emotions)
          );

          if (validEntries.length === 0) {
            notifyError("Import échoué", "Aucune entrée valide trouvée dans le fichier.");
            return;
          }

          // Fusionner les entrées importées avec les entrées existantes
          const mergedEntries = [...validEntries, ...entries];
          // Supprimer les doublons basés sur l'ID
          const uniqueEntries = Array.from(new Map(mergedEntries.map(entry => [entry.id, entry])).values());
          // Trier par date (plus récent en premier)
          const sortedEntries = uniqueEntries.sort((a, b) => 
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
          
          setEntries(sortedEntries);
          const importedCount = sortedEntries.length - entries.length;
          notifySuccess("Import réussi", `${importedCount} nouvelle(s) entrée(s) importée(s).`);
        } else {
          notifyError("Format invalide", "Le fichier importé n'a pas le bon format.");
        }
      } catch (error) {
        notifyError("Erreur d'import", "Erreur lors de l'importation. Vérifiez que c'est un fichier JSON valide.");
      }
    };
    reader.readAsText(file);
    // Réinitialiser l'input pour permettre l'importation du même fichier
    event.target.value = '';
  }, [entries, setEntries, notifySuccess, notifyError]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-indigo-50 to-purple-100 py-8 px-4 sm:px-6 lg:px-8">
      <NotificationContainer 
        notifications={notifications}
        onRemove={removeNotification}
      />
      
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
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => downloadData(false)}
                  className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 text-lg"
                >
                  <i className="fas fa-download mr-2"></i>Télécharger Toutes les Données
                </button>
                <button
                  onClick={() => downloadData(true)}
                  className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 text-lg"
                >
                  <i className="fas fa-download mr-2"></i>Télécharger les Nouvelles Données
                </button>
              </div>
            )}
            <label className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 text-lg cursor-pointer">
              <i className="fas fa-upload mr-2"></i>Importer les Données
              <input
                type="file"
                accept=".json"
                onChange={importData}
                className="hidden"
              />
            </label>
          </div>
        )}

        {isFormVisible && (
          <div className="mb-10">
            <JournalEntryForm onSave={handleSaveEntry} />
            <button
              onClick={() => setIsFormVisible(false)}
              className="mt-6 w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-lg transition duration-150"
            >
              <i className="fas fa-list mr-2"></i>Voir mes entrées
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
