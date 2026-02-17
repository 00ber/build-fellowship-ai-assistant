import { motion } from 'framer-motion';
import Card from '../../../components/ui/Card.tsx';
import { useLLMStore } from '../store/useLLMStore.ts';

export default function Vocabulary() {
  const { vocabulary } = useLLMStore();

  // Sort vocabulary alphabetically
  const sortedVocab = Array.from(vocabulary).sort();

  return (
    <Card className="h-[400px] flex flex-col">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-text-primary mb-2">Vocabulary</h2>
        <p className="text-sm text-text-secondary">
          {vocabulary.size} unique words from training data
        </p>
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-2">
          {sortedVocab.map((word, index) => (
            <motion.div
              key={word}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.01,
                type: "spring",
                stiffness: 500,
                damping: 30
              }}
              className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-text-primary text-center hover:bg-gray-100 transition-colors"
            >
              {word}
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
}
