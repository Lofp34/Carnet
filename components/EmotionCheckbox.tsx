
import React, { memo, useCallback } from 'react';
import { Emotion } from '../types';

interface EmotionCheckboxProps {
  emotion: Emotion;
  isSelected: boolean;
  onToggle: (emotionId: string) => void;
}

export const EmotionCheckbox: React.FC<EmotionCheckboxProps> = memo(({ emotion, isSelected, onToggle }) => {
  const handleToggle = useCallback(() => {
    onToggle(emotion.id);
  }, [onToggle, emotion.id]);
  return (
    <label
      className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ease-in-out transform active:scale-95 hover:scale-105 touch-manipulation
                  ${isSelected ? 'bg-sky-500 text-white border-sky-600 shadow-lg' : 'bg-white hover:bg-slate-50 border-slate-300 shadow-sm'}`}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleToggle}
        className="sr-only" // Tailwind class for visually hidden but accessible
      />
      <span className="text-2xl mr-3">{emotion.emoji}</span>
      <span className="text-sm font-medium leading-tight">{emotion.name}</span>
    </label>
  );
});
