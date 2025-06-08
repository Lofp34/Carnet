
import React, { useState, useEffect } from 'react';
import { JournalEntry } from '../types';
import { VoiceInputField } from './VoiceInputField';
import { EmotionSelector } from './EmotionSelector';
import { RatingInput } from './RatingInput';

interface JournalEntryFormProps {
  onSave: (entry: JournalEntry) => void;
  initialEntry?: Partial<JournalEntry>; 
}

export const JournalEntryForm: React.FC<JournalEntryFormProps> = ({ onSave, initialEntry }) => {
  const [situation, setSituation] = useState(initialEntry?.situation || '');
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>(initialEntry?.emotions || []);
  const [details, setDetails] = useState(initialEntry?.details || '');
  const [intensity, setIntensity] = useState(initialEntry?.intensity || 5);
  const [reasonableness, setReasonableness] = useState(initialEntry?.reasonableness || 5);
  const [behavior, setBehavior] = useState(initialEntry?.behavior || '');

  useEffect(() => {
    if (initialEntry) {
        setSituation(initialEntry.situation || '');
        setSelectedEmotions(initialEntry.emotions || []);
        setDetails(initialEntry.details || '');
        setIntensity(initialEntry.intensity || 5);
        setReasonableness(initialEntry.reasonableness || 5);
        setBehavior(initialEntry.behavior || '');
    }
  }, [initialEntry]);


  const handleEmotionToggle = (emotionId: string) => {
    setSelectedEmotions(prev =>
      prev.includes(emotionId) ? prev.filter(id => id !== emotionId) : [...prev, emotionId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!situation.trim()) {
      alert("Veuillez décrire la situation.");
      return;
    }
    if (selectedEmotions.length === 0) {
      alert("Veuillez sélectionner au moins une émotion.");
      return;
    }
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      situation,
      emotions: selectedEmotions,
      details,
      intensity,
      reasonableness,
      behavior,
    };
    onSave(newEntry);
    // Reset form
    setSituation('');
    setSelectedEmotions([]);
    setDetails('');
    setIntensity(5);
    setReasonableness(5);
    setBehavior('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-xl shadow-lg space-y-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">Nouvelle Entrée Émotionnelle</h2>
      
      <VoiceInputField
        id="situation"
        label="Quelle est la situation ?"
        value={situation}
        onChange={setSituation}
        placeholder="Décrivez le contexte, les faits..."
      />

      <EmotionSelector
        selectedEmotions={selectedEmotions}
        onEmotionToggle={handleEmotionToggle}
      />
      
      <VoiceInputField
        id="details"
        label="Pensées et réflexions (plus de détails)"
        value={details}
        onChange={setDetails}
        placeholder="Qu'avez-vous pensé ? Quels ressentis plus précis ?"
        rows={4}
      />

      <RatingInput
        id="intensity"
        label="Intensité des émotions (1 = faible, 10 = très forte)"
        value={intensity}
        onChange={setIntensity}
      />

      <RatingInput
        id="reasonableness"
        label="À quel point estimez-vous avoir raison de penser/ressentir cela ? (1 = pas du tout, 10 = totalement)"
        value={reasonableness}
        onChange={setReasonableness}
      />

      <VoiceInputField
        id="behavior"
        label="Quel comportement avez-vous adopté ?"
        value={behavior}
        onChange={setBehavior}
        placeholder="Comment avez-vous réagi ou agi ?"
      />

      <button
        type="submit"
        className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
      >
        <i className="fas fa-save mr-2"></i>Enregistrer l'Entrée
      </button>
    </form>
  );
};
