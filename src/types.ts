import type { CSSProperties } from 'react';

export interface Question {
  text: string;
  answer: boolean;
  explanation: string;
  bg: string;
  styles?: CSSProperties;
  icon?: string;
}

export interface GameData {
  questions: Question[];
  ads: string[];
  loading: string[];
}
