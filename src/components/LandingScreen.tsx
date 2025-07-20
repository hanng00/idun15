import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { quizConfig } from '../quizConfig';
import { ParticleEffect } from './ParticleEffect';

const LANDING_SCREEN_TEXT = {
  stats: {
    questionsCount: "{count} frågor • Mycket fint pris väntar!"
  },
  actions: {
    beginQuiz: "Börja quizet"
  }
} as const;

interface LandingScreenProps {
  onStart: () => void;
}

export const LandingScreen = ({ onStart }: LandingScreenProps) => {
  return (
    <div className="h-full min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center p-4">
      <ParticleEffect isActive={true} count={15} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                {quizConfig.title}
              </CardTitle>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-gray-600 mt-4 text-lg"
            >
              {quizConfig.description}
            </motion.p>
          </CardHeader>
          
          <CardContent className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="mb-6">
                <div className="flex justify-center space-x-2 mb-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.2 + i * 0.1 }}
                      className="w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  {LANDING_SCREEN_TEXT.stats.questionsCount.replace('{count}', quizConfig.questions.length.toString())}
                </p>
              </div>
              
              <Button
                onClick={onStart}
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="mr-2"
                >
                  🎉
                </motion.span>
                {LANDING_SCREEN_TEXT.actions.beginQuiz}
                <motion.span
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="ml-2"
                >
                  🎂
                </motion.span>
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}; 