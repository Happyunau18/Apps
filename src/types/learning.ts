export interface DrillCommand {
  id: string;
  type: 'stand' | 'sit' | 'answer' | 'posture';
  instruction: string;
  targetAction: string;
  options?: string[];
  correctOptionIndex?: number;
  timeLimitSeconds: number;
  teacherNote: string;
}

export interface TextExcerpt {
  id: string;
  chapter: string;
  title: string;
  context: string;
  germanText: string;
  annotations: {
    phrase: string;
    analysis: string;
    pedagogicalCategory: 'Manipulation' | 'Körperhaltung' | 'Gruppenzwang' | 'Sprachregelung';
  }[];
  keyTakeaway: string;
}

export interface CharacterProfile {
  id: string;
  name: string;
  role: string;
  quote: string;
  reactionToDiscipline: string;
  psychologicalMotives: string[];
  vulnerabilityFactor: string;
  turningPoint: string;
  roleplayPrompt: string; // Schreibaufgabe: In die Rolle schlüpfen
}

export interface DilemmaCase {
  id: string;
  title: string;
  setting: string;
  description: string;
  options: {
    id: string;
    label: string;
    consequence: string;
    criticalAnalysis: string;
    totalitarianRiskLevel: 'Niedrig' | 'Mittel' | 'Kritisch';
  }[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  sourceContext: string;
}

export interface StudentJournal {
  reflection1: string;
  reflection2: string;
  reflection3: string;
  drillReactionExperience: string;
  personalObservation: string;
  textNotes: Record<string, string>;
  characterRoleplayNotes: Record<string, string>;
  dilemmaOwnSolutions: Record<string, string>;
  everydayExampleNote: string;
  clozeAnswers: Record<string, string>;
  lastUpdated: string;
}
