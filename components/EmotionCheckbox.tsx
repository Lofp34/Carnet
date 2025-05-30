
import React from 'react';
import { Emotion } from '../types';

interface EmotionCheckboxProps {
  emotion: Emotion;
  isSelected: boolean;
  onToggle: (emotionId: string) => void;
}

export const EmotionCheckbox: React.FC<EmotionCheckboxProps> = ({ emotion, isSelected, onToggle }) => {
  return (
    <label
      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-105
                  ${isSelected ? 'bg-sky-500 text-white border-sky-600 shadow-md' : 'bg-white hover:bg-slate-50 border-slate-300'}`}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggle(emotion.id)}
        className="sr-only" // Tailwind class for visually hidden but accessible
      />
      <span className="text-xl mr-2">{emotion.emoji}</span>
      <span className="text-sm font-medium">{emotion.name}</span>
    </label>
  );
};
