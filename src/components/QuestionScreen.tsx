import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { useQuizStore } from '../store/quizStore';
import { ParticleEffect } from './ParticleEffect';
import { CheckCircle, XCircle } from 'lucide-react';

export const QuestionScreen = () => {
  const {
    getCurrentQuestion,
    getProgress,
    selectedAnswer,
    showExplanation,
    selectAnswer,
    submitAnswer,
    nextQuestion
  } = useQuizStore();

  const currentQuestion = getCurrentQuestion();
  const progress = getProgress();

  if (!currentQuestion) return null;

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
  const hasSubmitted = showExplanation;

  return (
    <div className="h-full min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center p-4">
      <ParticleEffect 
        isActive={showExplanation && isCorrect} 
        count={isCorrect ? 25 : 10} 
      />
      
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="w-full max-w-2xl"
      >
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="mb-4">
              <Progress value={progress} className="h-3" />
              <p className="text-sm text-gray-500 mt-2">
                Question {currentQuestion.id} of 6
              </p>
            </div>
            
            <CardTitle className="text-xl md:text-3xl font-bold text-gray-800 leading-relaxed">
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Image section - only renders if image exists */}
            {currentQuestion.image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex justify-center mb-6"
              >
                <div className="relative max-w-full max-h-64 overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={currentQuestion.image}
                    alt="Question illustration"
                    className="w-full h-auto max-h-48 object-contain"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            )}
            
            <div className="grid gap-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrectAnswer = index === currentQuestion.correctAnswer;
                const showResult = showExplanation && (isSelected || isCorrectAnswer);
                
                let buttonVariant = "outline";
                let buttonClass = "hover:bg-gray-50";
                
                if (showResult) {
                  if (isCorrectAnswer) {
                    buttonVariant = "default";
                    buttonClass = "bg-green-500 hover:bg-green-600 text-white border-green-500";
                  } else if (isSelected && !isCorrectAnswer) {
                    buttonVariant = "default";
                    buttonClass = "bg-red-500 hover:bg-red-600 text-white border-red-500";
                  }
                } else if (isSelected) {
                  buttonClass = "bg-purple-100 border-purple-300 text-purple-700";
                }

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Button
                      variant={buttonVariant as any}
                      onClick={() => !hasSubmitted && selectAnswer(index)}
                      disabled={hasSubmitted}
                      className={`w-full justify-start text-left p-3 md:p-4 h-auto min-h-[60px] text-sm md:text-base transition-all duration-300 ${buttonClass}`}
                    >
                      <div className="flex items-center w-full min-w-0">
                        <span className="mr-2 md:mr-3 text-xs font-bold bg-gray-200 text-gray-700 rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center flex-shrink-0">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="flex-1 min-w-0 break-words leading-tight whitespace-normal">{option}</span>
                        <AnimatePresence>
                          {showResult && isCorrectAnswer && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className="flex-shrink-0 ml-1 md:ml-2"
                            >
                              <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                            </motion.div>
                          )}
                          {showResult && isSelected && !isCorrectAnswer && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className="flex-shrink-0 ml-1 md:ml-2"
                            >
                              <XCircle className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </Button>
                  </motion.div>
                );
              })}
            </div>

            <AnimatePresence>
              {showExplanation && currentQuestion.explanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`p-4 rounded-lg border-l-4 ${
                    isCorrect 
                      ? 'bg-green-50 border-green-400 text-green-800' 
                      : 'bg-red-50 border-red-400 text-red-800'
                  }`}
                >
                  <p className="text-xs font-medium">
                    {currentQuestion.explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {!hasSubmitted && selectedAnswer !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-4"
              >
                <Button
                  onClick={submitAnswer}
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-lg py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Skicka svar
                </Button>
              </motion.div>
            )}

            {hasSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-4"
              >
                <Button
                  onClick={nextQuestion}
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold text-lg py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Nästa
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}; 