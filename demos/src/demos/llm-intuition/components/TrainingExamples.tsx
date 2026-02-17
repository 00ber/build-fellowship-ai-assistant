import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../../../components/ui/Card.tsx';
import Button from '../../../components/ui/Button.tsx';
import { useLLMStore } from '../store/useLLMStore.ts';

export default function TrainingExamples() {
  const [newExample, setNewExample] = useState('');
  const {
    trainingExamples,
    currentContext,
    addExample,
    removeExample,
    clearExamples,
    setDefaultExamples
  } = useLLMStore();

  const handleAddExample = (e: React.FormEvent) => {
    e.preventDefault();
    if (newExample.trim()) {
      addExample(newExample);
      setNewExample('');
    }
  };

  const contextStr = currentContext.join(' ').toLowerCase();

  return (
    <Card className="h-[600px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Training Examples</h2>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={setDefaultExamples}>
            Load Defaults
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearExamples}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            Clear All
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-2">
        <AnimatePresence mode="popLayout">
          {trainingExamples.map((example, index) => {
            const hasMatch = contextStr && example.toLowerCase().includes(contextStr);

            return (
              <motion.div
                key={`${example}-${index}`}
                layout
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30
                }}
                className={`group relative p-3 rounded-lg transition-all duration-200 ${
                  hasMatch
                    ? 'bg-emerald-50 border-2 border-emerald-200 shadow-sm'
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                }`}
              >
                <p className="text-sm text-text-primary pr-8">
                  {hasMatch ? (
                    <>
                      {example.split(new RegExp(`(${contextStr})`, 'gi')).map((part, i) => (
                        <span key={i}>
                          {part.toLowerCase() === contextStr ? (
                            <motion.span
                              initial={{ backgroundColor: 'transparent' }}
                              animate={{ backgroundColor: 'rgb(16 185 129 / 0.3)' }}
                              transition={{ duration: 0.3 }}
                              className="bg-green-100 text-green-800 rounded px-1"
                            >
                              {part}
                            </motion.span>
                          ) : (
                            part
                          )}
                        </span>
                      ))}
                    </>
                  ) : (
                    example
                  )}
                </p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeExample(index)}
                  className="absolute top-3 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <svg
                    className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {trainingExamples.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-text-secondary"
          >
            <p className="text-sm">No training examples yet</p>
            <p className="text-xs mt-1 opacity-70">Add examples to see how the model learns patterns</p>
          </motion.div>
        )}
      </div>

      <form onSubmit={handleAddExample} className="mt-4 flex gap-2">
        <input
          type="text"
          value={newExample}
          onChange={(e) => setNewExample(e.target.value)}
          placeholder="Type a new training example..."
          className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 text-sm"
          maxLength={100}
        />
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={!newExample.trim()}
        >
          Add
        </Button>
      </form>
    </Card>
  );
}
