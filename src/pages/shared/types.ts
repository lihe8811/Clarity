export interface Article {
  id: string;
  title: string;
  category: string;
  source: string;
  timeAgo: string;
  imageUrl: string;
  content: string[];
  progress: number;
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
}

export interface UserStats {
  quizzesDone: number;
  accuracy: number;
  articlesRead: number;
  lexileScore: number;
}

export interface ActivityItem {
  id: string;
  title: string;
  date: string;
  score: string;
}

export interface LexilePoint {
  label: string;
  score: number;
}

export interface ProgressPoint {
  label: string;
  value: number;
}

export enum Screen {
  LANDING = 'LANDING',
  FEED = 'FEED',
  ARTICLE = 'ARTICLE',
  QUIZ = 'QUIZ',
  MC_FEEDBACK = 'MC_FEEDBACK',
  VOICE_QUIZ = 'VOICE_QUIZ',
  VOICE_FEEDBACK = 'VOICE_FEEDBACK',
  QUIZ_RESULT = 'QUIZ_RESULT',
  PROFILE = 'PROFILE',
}
