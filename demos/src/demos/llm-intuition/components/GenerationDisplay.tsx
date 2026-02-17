import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../../../components/ui/Card.tsx';
import Button from '../../../components/ui/Button.tsx';
import { useLLMStore } from '../store/useLLMStore.ts';
import { formatProbability } from '../utils/probabilityUtils.ts';

export default function GenerationDisplay() {
  const {
    currentContext,
    generationHistory,
    stepBack,
    reset,
    updateContext,
    isGenerating,
    selectedWordAnimation
  } = useLLMStore();

  const historyEndRef = useRef<HTMLDivElement>(null);
  const wordPillsRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState('');

  // Auto-scroll to bottom when new steps are added
  useEffect(() => {
    if (historyEndRef.current) {
      historyEndRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest'
      });
    }
  }, [generationHistory]);

  return (
    <Card className="h-[600px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Generation Process</h2>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={stepBack}
            disabled={generationHistory.length === 0}
          >
            Step Back
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={reset}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Current Generation */}
      <div className="mb-4 p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20">
        <p className="text-xs text-text-secondary mb-2">Building:</p>

        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={() => {
              const words = editText.trim().split(' ').filter(Boolean);
              updateContext(words);
              setIsEditing(false);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const words = editText.trim().split(' ').filter(Boolean);
                updateContext(words);
                setIsEditing(false);
              }
              if (e.key === 'Escape') {
                setEditText(currentContext.join(' '));
                setIsEditing(false);
              }
            }}
            placeholder="Type text here..."
            className="w-full px-3 py-2 border border-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm bg-white"
            autoFocus
          />
        ) : (
          <div
            ref={wordPillsRef}
            onClick={() => {
              setIsEditing(true);
              setEditText(currentContext.join(' '));
            }}
            className="flex flex-wrap gap-2 items-center min-h-[40px] cursor-text hover:bg-white/50 rounded-lg transition-colors p-2 -m-2"
          >
            <AnimatePresence mode="popLayout">
              {currentContext.map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  layout
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 25
                  }}
                  className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary"
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                key="cursor"
                animate={{
                  opacity: [1, 0.3, 1],
                  scale: [1, 0.95, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-2 h-6 bg-primary rounded-full"
              />
            </AnimatePresence>
          </div>
        )}

        {/* Traveling word animation */}
        <AnimatePresence>
            {selectedWordAnimation && (
              <motion.span
                initial={{
                  position: "fixed",
                  x: selectedWordAnimation.from?.x || 0,
                  y: selectedWordAnimation.from?.y || 0,
                  scale: 1,
                  opacity: 1
                }}
                animate={{
                  x: wordPillsRef.current ? wordPillsRef.current.getBoundingClientRect().right - 100 : 0,
                  y: wordPillsRef.current ? wordPillsRef.current.getBoundingClientRect().top + 20 : 0,
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.8, 0]
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut"
                }}
                className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary fixed z-50 pointer-events-none"
                style={{ zIndex: 9999 }}
              >
                {selectedWordAnimation.word}
              </motion.span>
            )}
        </AnimatePresence>
        {!isEditing && currentContext.length === 0 && (
          <p className="text-sm text-text-secondary italic">Start generating text...</p>
        )}
      </div>

      {/* Generation History */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-2">
        <p className="text-xs text-text-secondary mb-2">History:</p>
        <AnimatePresence mode="popLayout">
          {generationHistory.map((step, index) => (
            <motion.div
              key={step.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30
              }}
              className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-medium text-text-secondary">
                  Step {index + 1}
                </span>
                <span className="text-xs text-text-secondary flex items-center gap-1">
                  {step.method === 'manual' ? (
                    <>Manual</>
                  ) : (
                    <>Sampled</>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-text-secondary">
                  {step.context.length > 0 ? (
                    <span className="font-mono">"{step.context.join(' ')}"</span>
                  ) : (
                    "start"
                  )}
                </span>
                <span className="text-primary">-&gt;</span>
                <span className="font-medium text-primary">
                  "{step.selected}"
                </span>
                <span className="text-text-secondary">
                  ({formatProbability(step.predictions.get(step.selected) || 0)})
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={historyEndRef} />
      </div>

      {/* Autoregressive Loop Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 p-3 bg-gradient-to-r from-indigo-50 to-primary/10 rounded-xl border border-primary/20"
      >
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-medium text-primary">Autoregressive Loop</p>
          <motion.div
            animate={{
              rotate: isGenerating ? 360 : 0
            }}
            transition={{
              duration: 2,
              repeat: isGenerating ? Infinity : 0,
              ease: "linear"
            }}
            className="w-4 h-4"
          >
            <svg
              className="w-full h-full text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </motion.div>
        </div>
        <p className="text-xs text-text-secondary">
          Each generated word feeds back as input for the next prediction
        </p>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1 h-1 bg-primary/20 rounded-full overflow-hidden">
            <motion.div
              animate={{
                x: isGenerating ? "100%" : "0%"
              }}
              transition={{
                duration: 1,
                repeat: isGenerating ? Infinity : 0,
                ease: "linear"
              }}
              className="h-full w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent"
              style={{ x: "-100%" }}
            />
          </div>
        </div>
      </motion.div>
    </Card>
  );
}
