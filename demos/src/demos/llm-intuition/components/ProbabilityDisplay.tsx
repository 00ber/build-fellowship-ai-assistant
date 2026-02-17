import { useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../../../components/ui/Card.tsx';
import Button from '../../../components/ui/Button.tsx';
import { useLLMStore } from '../store/useLLMStore.ts';
import {
  applyTemperature,
  getTopK,
  formatProbability,
  sampleFromDistribution
} from '../utils/probabilityUtils.ts';

export default function ProbabilityDisplay() {
  const barRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const {
    probabilities,
    temperature,
    selectWord,
    currentContext,
    trainingExamples,
    isGenerating
  } = useLLMStore();

  // Apply temperature and get top words
  const adjustedProbabilities = useMemo(() => {
    return applyTemperature(probabilities, temperature);
  }, [probabilities, temperature]);

  const topWords = useMemo(() => {
    return getTopK(adjustedProbabilities, 10);
  }, [adjustedProbabilities]);

  // Get all words sorted by probability
  const allWords = useMemo(() => {
    return Array.from(adjustedProbabilities.entries())
      .sort(([, a], [, b]) => b - a)
      .map(([word, prob]) => ({ word, probability: prob }));
  }, [adjustedProbabilities]);

  // Calculate total count for display
  const totalCount = useMemo(() => {
    let count = 0;
    probabilities.forEach((prob) => {
      count += Math.round(prob * trainingExamples.length);
    });
    return Math.max(count, 1);
  }, [probabilities, trainingExamples]);

  const handleRandomSample = (event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (adjustedProbabilities.size > 0 && !isGenerating) {
      const sampled = sampleFromDistribution(adjustedProbabilities);
      const barElement = barRefs.current.get(sampled);

      if (barElement) {
        const rect = barElement.getBoundingClientRect();
        selectWord(sampled, 'sampled', {
          from: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
        });
      } else {
        selectWord(sampled, 'sampled');
      }
    }
  };

  const handleManualSelect = (word: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (isGenerating || hasReachedEnd) return;

    const barElement = barRefs.current.get(word);
    if (barElement) {
      const rect = barElement.getBoundingClientRect();
      selectWord(word, 'manual', {
        from: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
      });
    }
  };

  const contextString = currentContext.length > 0
    ? `"${currentContext.join(' ')}"`
    : "beginning of sentence";

  // Check if we've reached a natural ending
  const hasReachedEnd = currentContext.length > 0 &&
    (currentContext[currentContext.length - 1].endsWith('.') ||
     currentContext.length >= 15);

  return (
    <Card className="h-[500px] flex flex-col">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-text-primary mb-2">Next Word Probabilities</h2>
        <p className="text-sm text-text-secondary">
          After: <span className="font-mono text-primary font-medium">{contextString}</span>
        </p>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-2">
        {/* Prominent message when all probabilities are zero */}
        {allWords.length > 0 && allWords.every(({ probability }) => probability === 0) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-300 rounded-lg shadow-sm"
          >
            <div className="flex items-start gap-2">
              <span className="text-lg">!</span>
              <div>
                <p className="text-sm font-semibold text-orange-800">
                  No exact matches found in training data!
                </p>
                <p className="text-xs text-orange-700 mt-1">
                  <span className="font-medium">This is a limitation of this simplified demo</span> -- it only does exact phrase matching.
                </p>
                <p className="text-xs text-orange-600 mt-1">
                  Real LLMs can generate novel sequences because they learn relationships between words, not just memorize exact phrases.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="popLayout">
          {allWords.length > 0 ? (
            allWords.map(({ word, probability }, index) => {
                const originalProb = probabilities.get(word) || 0;
                const count = Math.round(originalProb * totalCount);

                return (
                  <motion.div
                    key={word}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      delay: index * 0.02,
                      type: "spring",
                      stiffness: 600,
                      damping: 25
                    }}
                    className="space-y-1"
                  >
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium text-text-primary">{word}</span>
                      <div className="flex items-center gap-3">
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.02 + 0.1 }}
                          className="text-text-secondary text-xs font-mono"
                        >
                          {count}/{totalCount}
                        </motion.span>
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.02 + 0.15 }}
                          className="font-mono text-text-primary font-medium"
                        >
                          {formatProbability(probability)}
                        </motion.span>
                      </div>
                    </div>
                    <div className="relative h-8 rounded-md bg-gray-100 overflow-hidden">
                      <motion.div
                        ref={(el) => {
                          if (el) barRefs.current.set(word, el);
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${probability * 100}%` }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.02,
                          ease: "easeOut"
                        }}
                        onClick={(e) => handleManualSelect(word, e)}
                        className="bg-primary rounded-md transition-all duration-300 h-full flex items-center justify-end pr-2 cursor-pointer hover:brightness-110"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {probability > 0.15 && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.02 + 0.2 }}
                            className="text-white text-xs font-medium"
                          >
                          </motion.span>
                        )}
                      </motion.div>
                      {temperature !== 1 && Math.abs(originalProb - probability) > 0.01 && (
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${originalProb * 100}%` }}
                          transition={{ duration: 0.3, delay: index * 0.02 }}
                          className="absolute inset-y-0 left-0 bg-primary/20 pointer-events-none rounded-md"
                        />
                      )}
                    </div>
                  </motion.div>
                );
              })
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex items-center justify-center"
            >
              <div className="text-center text-text-secondary">
                <p className="text-sm">No predictions available</p>
                <p className="text-xs mt-1 opacity-70">
                  {trainingExamples.length === 0
                    ? "Add training examples first"
                    : "Start generating text to see probabilities"}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {topWords.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex gap-2 items-center"
        >
          <Button
            variant="primary"
            className="flex-1"
            onClick={handleRandomSample}
            disabled={isGenerating || hasReachedEnd}
          >
            {hasReachedEnd ? (
              <>Generation Complete</>
            ) : (
              <>Predict Next Word</>
            )}
          </Button>
          <span className="text-xs text-text-secondary">
            or click any bar
          </span>
        </motion.div>
      )}
    </Card>
  );
}
