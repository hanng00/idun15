import { AnimatePresence } from 'framer-motion';
import { useQuizStore } from '../store/quizStore';
import { LandingScreen } from './LandingScreen';
import { QuestionScreen } from './QuestionScreen';
import { RewardScreen } from './RewardScreen';

export const Quiz = () => {
  const { isStarted, isCompleted, startQuiz } = useQuizStore();

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {!isStarted ? (
          <LandingScreen key="landing" onStart={startQuiz} />
        ) : isCompleted ? (
          <RewardScreen key="reward" />
        ) : (
          <QuestionScreen key="question" />
        )}
      </AnimatePresence>
    </div>
  );
}; 