import React, { useState } from 'react';
import { Emotion } from '../types';
import { POSITIVE_EMOTIONS, NEGATIVE_EMOTIONS } from '../constants';
import { EmotionCheckbox } from './EmotionCheckbox';

interface EmotionSelectorProps {
  selectedEmotions: string[];
  onEmotionToggle: (emotionId: string) => void;
}

export const EmotionSelector: React.FC<EmotionSelectorProps> = ({ selectedEmotions, onEmotionToggle }) => {
  const [activeTab, setActiveTab] = useState<'positive' | 'negative'>('positive');

  const currentEmotions = activeTab === 'positive' ? POSITIVE_EMOTIONS : NEGATIVE_EMOTIONS;
  const positiveCount = selectedEmotions.filter(id => POSITIVE_EMOTIONS.some(e => e.id === id)).length;
  const negativeCount = selectedEmotions.filter(id => NEGATIVE_EMOTIONS.some(e => e.id === id)).length;

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-slate-700 mb-3">Quelles sont les émotions associées ?</label>
      
      {/* Onglets */}
      <div className="flex bg-slate-100 rounded-lg p-1 mb-4">
        <button
          type="button"
          onClick={() => setActiveTab('positive')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === 'positive'
              ? 'bg-emerald-500 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-800'
          }`}
        >
          <span className="mr-2">😊</span>
          Positives
          {positiveCount > 0 && (
            <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-white text-emerald-500 rounded-full">
              {positiveCount}
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('negative')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === 'negative'
              ? 'bg-red-500 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-800'
          }`}
        >
          <span className="mr-2">😔</span>
          Négatives
          {negativeCount > 0 && (
            <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-white text-red-500 rounded-full">
              {negativeCount}
            </span>
          )}
        </button>
      </div>

      {/* Grille d'émotions */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {currentEmotions.map((emotion: Emotion) => (
          <EmotionCheckbox
            key={emotion.id}
            emotion={emotion}
            isSelected={selectedEmotions.includes(emotion.id)}
            onToggle={onEmotionToggle}
          />
        ))}
      </div>

      {/* Résumé des sélections */}
      {(positiveCount > 0 || negativeCount > 0) && (
        <div className="mt-4 p-3 bg-slate-50 rounded-lg">
          <div className="text-sm text-slate-600">
            <span className="font-medium">Sélectionnées :</span>
            {positiveCount > 0 && (
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                {positiveCount} positive{positiveCount > 1 ? 's' : ''}
              </span>
            )}
            {negativeCount > 0 && (
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                {negativeCount} négative{negativeCount > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}; 