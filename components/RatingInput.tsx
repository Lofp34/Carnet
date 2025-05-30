
import React from 'react';

interface RatingInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  maxRating?: number;
}

export const RatingInput: React.FC<RatingInputProps> = ({ id, label, value, onChange, maxRating = 10 }) => {
  return (
    <div className="mb-6">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: maxRating }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => onChange(num)}
            className={`w-10 h-10 rounded-full border transition-colors duration-150 font-medium
                        focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-sky-500
                        ${value === num ? 'bg-sky-500 text-white border-sky-600' : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'}`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};
