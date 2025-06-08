
import { Emotion } from './types';

export const POSITIVE_EMOTIONS: Emotion[] = [
  { id: 'joie', name: 'Joie', emoji: '😊' },
  { id: 'amour', name: 'Amour', emoji: '❤️' },
  { id: 'espoir', name: 'Espoir', emoji: '✨' },
  { id: 'gratitude', name: 'Gratitude', emoji: '🙏' },
  { id: 'calme', name: 'Calme', emoji: '😌' },
  { id: 'engagement', name: 'Engagement', emoji: '💪' },
  { id: 'fierte', name: 'Fierté', emoji: '🏆' },
  { id: 'excitation', name: 'Excitation', emoji: '🤩' },
  { id: 'determination', name: 'Détermination', emoji: '🎯' },
  { id: 'serenite', name: 'Sérénité', emoji: '🧘' },
  { id: 'surprise', name: 'Surprise', emoji: '😮' }, // Peut être positive ou négative
];

export const NEGATIVE_EMOTIONS: Emotion[] = [
  { id: 'tristesse', name: 'Tristesse', emoji: '😢' },
  { id: 'colere', name: 'Colère', emoji: '😠' },
  { id: 'peur', name: 'Peur', emoji: '😨' },
  { id: 'degout', name: 'Dégoût', emoji: '🤢' },
  { id: 'honte', name: 'Honte', emoji: '😳' },
  { id: 'culpabilite', name: 'Culpabilité', emoji: '😥' },
  { id: 'anxiete', name: 'Anxiété', emoji: '😟' },
  { id: 'frustration', name: 'Frustration', emoji: '😤' },
  { id: 'confusion', name: 'Confusion', emoji: '😕' },
];

// Pour la compatibilité avec le code existant
export const EMOTIONS_LIST: Emotion[] = [...POSITIVE_EMOTIONS, ...NEGATIVE_EMOTIONS];
