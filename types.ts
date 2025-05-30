
export interface JournalEntry {
  id: string;
  timestamp: string;
  situation: string;
  emotions: string[];
  details: string;
  intensity: number;
  reasonableness: number;
  behavior: string;
}

export interface Emotion {
  id: string;
  name: string;
  emoji: string;
}
