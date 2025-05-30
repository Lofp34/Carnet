
import React from 'react';
import { JournalEntry, Emotion } from '../types';
import { EMOTIONS_LIST } from '../constants';

interface JournalEntryCardProps {
  entry: JournalEntry;
}

const getEmotionDetails = (emotionId: string): Emotion | undefined => {
    return EMOTIONS_LIST.find(e => e.id === emotionId);
};

export const JournalEntryCard: React.FC<JournalEntryCardProps> = ({ entry }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      <p className="text-xs text-slate-500 mb-2">
        {new Date(entry.timestamp).toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' })}
      </p>
      
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-slate-600">Situation :</h3>
        <p className="text-slate-800">{entry.situation}</p>
      </div>

      <div className="mb-3">
        <h3 className="text-sm font-semibold text-slate-600">Émotions ressenties :</h3>
        <div className="flex flex-wrap gap-2 mt-1">
          {entry.emotions.map(emotionId => {
            const emotion = getEmotionDetails(emotionId);
            return emotion ? (
              <span key={emotionId} className="px-2 py-1 bg-sky-100 text-sky-700 text-xs rounded-full flex items-center">
                {emotion.emoji} <span className="ml-1">{emotion.name}</span>
              </span>
            ) : null;
          })}
        </div>
      </div>

      {entry.details && (
        <div className="mb-3">
          <h3 className="text-sm font-semibold text-slate-600">Pensées et réflexions :</h3>
          <p className="text-slate-700 text-sm whitespace-pre-wrap">{entry.details}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 text-sm">
        <div>
            <h3 className="font-semibold text-slate-600">Intensité des émotions :</h3>
            <p className="text-sky-600 font-bold">{entry.intensity}/10</p>
        </div>
        <div>
            <h3 className="font-semibold text-slate-600">Validité perçue :</h3>
            <p className="text-sky-600 font-bold">{entry.reasonableness}/10</p>
        </div>
      </div>
      
      {entry.behavior && (
        <div>
          <h3 className="text-sm font-semibold text-slate-600">Comportement adopté :</h3>
          <p className="text-slate-700 text-sm whitespace-pre-wrap">{entry.behavior}</p>
        </div>
      )}
    </div>
  );
};
