import { useEffect } from 'react';
import TrainingExamples from './TrainingExamples.tsx';
import ProbabilityDisplay from './ProbabilityDisplay.tsx';
import GenerationDisplay from './GenerationDisplay.tsx';
import TemperatureControl from './TemperatureControl.tsx';
import Vocabulary from './Vocabulary.tsx';
import { useLLMStore } from '../store/useLLMStore.ts';

export default function SimulatedMode() {
  const calculateProbabilities = useLLMStore((s) => s.calculateProbabilities);

  // Calculate initial probabilities on mount
  useEffect(() => {
    calculateProbabilities();
  }, [calculateProbabilities]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4">
      {/* Left column: Training Examples + Vocabulary */}
      <div className="md:col-span-3 lg:col-span-3 space-y-4">
        <TrainingExamples />
        <Vocabulary />
      </div>

      {/* Center column: Probability Display + Temperature Control */}
      <div className="md:col-span-3 lg:col-span-5 space-y-4">
        <ProbabilityDisplay />
        <TemperatureControl />
      </div>

      {/* Right column: Generation Display */}
      <div className="md:col-span-6 lg:col-span-4">
        <GenerationDisplay />
      </div>
    </div>
  );
}
