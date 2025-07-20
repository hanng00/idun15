import { create } from 'zustand';
import { quizConfig } from '../quizConfig';
import type { QuizQuestion } from '../quizConfig';

export interface QuizState {
  // Game state
  isStarted: boolean;
  currentQuestionIndex: number;
  answers: (number | null)[];
  isCompleted: boolean;
  
  // UI state
  selectedAnswer: number | null;
  showExplanation: boolean;
  isAnswering: boolean;
  
  // Actions
  startQuiz: () => void;
  selectAnswer: (answerIndex: number) => void;
  submitAnswer: () => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
  
  // Computed values
  getCurrentQuestion: () => QuizQuestion | null;
  getProgress: () => number;
  getScore: () => number;
  getTotalQuestions: () => number;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  // Initial state
  isStarted: false,
  currentQuestionIndex: 0,
  answers: new Array(quizConfig.questions.length).fill(null),
  isCompleted: false,
  selectedAnswer: null,
  showExplanation: false,
  isAnswering: false,

  // Actions
  startQuiz: () => set({ 
    isStarted: true, 
    currentQuestionIndex: 0,
    answers: new Array(quizConfig.questions.length).fill(null),
    isCompleted: false,
    selectedAnswer: null,
    showExplanation: false,
    isAnswering: false
  }),

  selectAnswer: (answerIndex: number) => set({ 
    selectedAnswer: answerIndex,
    showExplanation: false
  }),

  submitAnswer: () => {
    const { selectedAnswer, currentQuestionIndex, answers } = get();
    if (selectedAnswer === null) return;

    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedAnswer;

    set({ 
      answers: newAnswers,
      showExplanation: true,
      isAnswering: true
    });
  },

  nextQuestion: () => {
    const { currentQuestionIndex } = get();
    const nextIndex = currentQuestionIndex + 1;
    
    if (nextIndex >= quizConfig.questions.length) {
      set({ 
        isCompleted: true,
        isAnswering: false,
        showExplanation: false
      });
    } else {
      set({ 
        currentQuestionIndex: nextIndex,
        selectedAnswer: null,
        showExplanation: false,
        isAnswering: false
      });
    }
  },

  resetQuiz: () => set({
    isStarted: false,
    currentQuestionIndex: 0,
    answers: new Array(quizConfig.questions.length).fill(null),
    isCompleted: false,
    selectedAnswer: null,
    showExplanation: false,
    isAnswering: false
  }),

  // Computed values
  getCurrentQuestion: () => {
    const { currentQuestionIndex } = get();
    return quizConfig.questions[currentQuestionIndex] ?? null;
  },

  getProgress: () => {
    const { currentQuestionIndex } = get();
    return ((currentQuestionIndex + 1) / quizConfig.questions.length) * 100;
  },

  getScore: () => {
    const { answers } = get();
    return answers.reduce((score, answer, index) => {
      if (answer !== null && answer === quizConfig.questions[index].correctAnswer) {
        return (score || 0) + 1;
      }
      return score || 0;
    }, 0) || 0;
  },

  getTotalQuestions: () => quizConfig.questions.length,
})); 