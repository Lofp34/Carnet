
import React, { useEffect, useState } from 'react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

interface VoiceInputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export const VoiceInputField: React.FC<VoiceInputFieldProps> = ({ id, label, value, onChange, placeholder, rows = 3 }) => {
  const {
    isListening,
    transcript,
    interimTranscript,
    startListening,
    stopListening,
    error,
    isSupported,
    resetTranscript,
  } = useSpeechRecognition();
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    if (transcript) {
      const newValue = (internalValue ? internalValue + ' ' : '') + transcript;
      setInternalValue(newValue);
      onChange(newValue);
      resetTranscript(); 
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript, resetTranscript, onChange]); // Removed internalValue from deps to avoid loop


  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInternalValue(e.target.value);
    onChange(e.target.value);
  };

  const toggleListening = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="mb-6">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <div className="relative">
        <textarea
          id={id}
          value={internalValue}
          onChange={handleTextChange}
          placeholder={placeholder}
          rows={rows}
          className="w-full p-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-150"
        />
        {isSupported && (
          <button
            type="button"
            onClick={toggleListening}
            className={`absolute top-2 right-2 p-2 rounded-full transition-colors duration-200 ${
              isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-sky-500 hover:bg-sky-600'
            } text-white`}
            title={isListening ? "Arrêter l'enregistrement" : "Commencer l'enregistrement vocal"}
          >
            <i className={`fas ${isListening ? 'fa-microphone-slash' : 'fa-microphone'}`}></i>
          </button>
        )}
      </div>
      {(interimTranscript || error) && (
        <div className="mt-1 text-xs">
          {interimTranscript && <p className="text-slate-500"><i>{interimTranscript}</i></p>}
          {error && <p className="text-red-500">{error}</p>}
        </div>
      )}
       {!isSupported && <p className="text-xs text-orange-600 mt-1">La reconnaissance vocale n'est pas supportée sur ce navigateur.</p>}
    </div>
  );
};
