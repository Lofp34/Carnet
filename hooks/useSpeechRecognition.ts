
import { useState, useEffect, useCallback } from 'react';

interface SpeechRecognitionHook {
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  startListening: () => void;
  stopListening: () => void;
  error: string | null;
  isSupported: boolean;
  resetTranscript: () => void;
}

// FIX: Renamed constant to avoid shadowing the global SpeechRecognition interface.
// This allows SpeechRecognition (the interface) to be used for typing instances.
const SpeechRecognitionAPI =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

export const useSpeechRecognition = (): SpeechRecognitionHook => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  // FIX: SpeechRecognition here now refers to the global interface, not the (renamed) constant.
  // FIX: Changed SpeechRecognition type to 'any' to resolve "Cannot find name 'SpeechRecognition'" error.
  const [recognition, setRecognition] = useState<any | null>(null);

  const isSupported = !!SpeechRecognitionAPI;

  useEffect(() => {
    if (!isSupported) {
      setError("La reconnaissance vocale n'est pas supportée par ce navigateur.");
      return;
    }

    const recogInstance = new SpeechRecognitionAPI();
    recogInstance.continuous = true;
    recogInstance.interimResults = true;
    recogInstance.lang = 'fr-FR';

    // FIX: Changed SpeechRecognitionEvent to 'any' as the type was reported as not found.
    recogInstance.onresult = (event: any) => {
      let finalTranscript = '';
      let currentInterim = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          currentInterim += event.results[i][0].transcript;
        }
      }
      setTranscript(prev => prev + finalTranscript);
      setInterimTranscript(currentInterim);
    };

    // FIX: Changed SpeechRecognitionErrorEvent to 'any' as the type was reported as not found.
    recogInstance.onerror = (event: any) => {
      setError(`Erreur de reconnaissance vocale: ${event.error}`);
      setIsListening(false);
    };

    recogInstance.onend = () => {
      setIsListening(false);
      setInterimTranscript('');
    };
    
    setRecognition(recogInstance);

    return () => {
      if (recogInstance) {
        recogInstance.stop();
      }
    };
  }, [isSupported]);

  const startListening = useCallback(() => {
    if (recognition && !isListening) {
      setTranscript(''); // Reset transcript for new session
      setInterimTranscript('');
      setError(null);
      try {
        recognition.start();
        setIsListening(true);
      } catch (e) {
        setError(`Erreur au démarrage: ${(e as Error).message}`);
        setIsListening(false);
      }
    }
  }, [recognition, isListening]);

  const stopListening = useCallback(() => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition, isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
  }, []);

  return {
    isListening,
    transcript,
    interimTranscript,
    startListening,
    stopListening,
    error,
    isSupported,
    resetTranscript,
  };
};
