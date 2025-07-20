import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { useQuizStore } from '../store/quizStore';
import { ParticleEffect } from './ParticleEffect';
import { Trophy, Star, Gift, ExternalLink } from 'lucide-react';

const REWARD_SCREEN_TEXT = {
  header: {
    title: "🎉 Grattis Idun! 🎉",
    subtitle: "Du klarade av det legendariska 15 års quizet!"
  },
  score: {
    result: "Du fick {score} av {total} rätt!"
  },
  reward: {
    claimButton: "Få din födelsedagspresent",
    claimDescription: "Klicka för att besöka Biltema och få din födelsedagspresent!",
    almostThere: {
      title: "Nästan där!",
      description: "Du behöver minst 5 rätta svar för att få din födelsedagspresent! Försök igen för att låsa upp din speciella födelsedagspresent! 🎁"
    }
  },
  actions: {
    playAgain: "Spela igen",
    printCertificate: "Skriv ut certifikat"
  },
  links: {
    claimableLink: "https://gc.biltema.com/card/UNdRrkapeWQ"
  }
} as const;

export const RewardScreen = () => {
  const { getScore, getTotalQuestions, resetQuiz } = useQuizStore();
  
  const score = getScore();
  const totalQuestions = getTotalQuestions();
  const percentage = Math.round((score / totalQuestions) * 100);

  const handleRewardClick = () => {
    window.open(REWARD_SCREEN_TEXT.links.claimableLink, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center p-4">
      <ParticleEffect isActive={true} count={30} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="w-full max-w-3xl"
      >
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader className="text-center">
            {/* Biltema Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex justify-center mb-6"
            >
              <img 
                src="/idun15/biltema-logo.jpg" 
                alt="Biltema Logo" 
                className="h-40 md:h-20 object-contain"
              />
            </motion.div>
            
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h1 className="text-2xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                {REWARD_SCREEN_TEXT.header.title}
              </h1>
              <p className="text-lg md:text-2xl text-gray-700 font-medium mt-2">
                {REWARD_SCREEN_TEXT.header.subtitle}
              </p>
            </motion.div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Score Display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-center"
            >
              <p className="text-lg text-gray-700">
                {REWARD_SCREEN_TEXT.score.result.replace('{score}', score.toString()).replace('{total}', totalQuestions.toString())}
              </p>
            </motion.div>

            {/* Stars Display */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex justify-center space-x-2 max-h-10"
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1.4 + i * 0.1, type: "spring", stiffness: 200 }}
                >
                  <Star 
                    className={`w-8 h-8 ${
                      i < Math.ceil(percentage / 20) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`} 
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Description Section */}

            {/* Clickable Reward Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
              className="text-center"
            >
              {score >= 5 ? (
                <>
                  <Button
                    onClick={handleRewardClick}
                    size="lg"
                    className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold text-xl py-6 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Gift className="w-6 h-6 mr-3" />
                    {REWARD_SCREEN_TEXT.reward.claimButton}
                    <ExternalLink className="w-5 h-5 ml-3" />
                  </Button>
                  <p className="text-sm text-gray-500 mt-3">
                    {REWARD_SCREEN_TEXT.reward.claimDescription}
                  </p>
                </>
              ) : (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg ring-[1px] ring-yellow-200">
                  <div className="flex items-center justify-center space-x-3 mb-3">
                    <Trophy className="w-8 h-8 text-yellow-600" />
                    <h3 className="text-xl font-bold text-yellow-800">{REWARD_SCREEN_TEXT.reward.almostThere.title}</h3>
                  </div>
                  <p className="text-yellow-700 text-center">
                    {REWARD_SCREEN_TEXT.reward.almostThere.description}
                  </p>
                </div>
              )}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button
                onClick={resetQuiz}
                variant="outline"
                size="lg"
                className="bg-white hover:bg-gray-50 text-purple-600 border-purple-300 hover:border-purple-400 font-semibold"
              >
                {REWARD_SCREEN_TEXT.actions.playAgain}
              </Button>
              <Button
                onClick={() => window.print()}
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold"
              >
                {REWARD_SCREEN_TEXT.actions.printCertificate}
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}; 