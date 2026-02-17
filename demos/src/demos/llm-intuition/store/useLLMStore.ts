import { create } from 'zustand';

export interface GenerationStep {
  id: string;
  context: string[];
  predictions: Map<string, number>;
  selected: string;
  method: 'manual' | 'sampled';
  timestamp: number;
}

interface LLMStore {
  // State
  trainingExamples: string[];
  currentContext: string[];
  probabilities: Map<string, number>;
  vocabulary: Set<string>;
  temperature: number;
  generationHistory: GenerationStep[];
  isGenerating: boolean;
  isContinuousGenerating: boolean;
  selectedWordAnimation: {
    word: string;
    from: { x: number; y: number } | null;
    to: { x: number; y: number } | null;
  } | null;

  // Actions
  addExample: (text: string) => void;
  removeExample: (index: number) => void;
  clearExamples: () => void;
  setDefaultExamples: () => void;

  calculateProbabilities: () => void;
  selectWord: (word: string, method: 'manual' | 'sampled', animationData?: any) => void;
  generateUntilStop: () => void;
  stepBack: () => void;
  reset: () => void;

  setTemperature: (value: number) => void;
  setIsGenerating: (value: boolean) => void;
  updateContext: (context: string[]) => void;
  setSelectedWordAnimation: (animation: any) => void;
}

const DEFAULT_EXAMPLES = [
  "The cat sat on the mat.",
  "The dog ran in the park.",
  "The cat ate the food.",
  "The cat played with the toy.",
  "The cat played with the ball.",
  "The bird flew over the tree.",
  "The dog sat by the door.",
  "The cat played in the garden.",
  "The dog ate the bone.",
  "The bird sat on the branch.",
  "The fish swam in the water.",
  "The dog jumped over the fence."
];

export const useLLMStore = create<LLMStore>((set, get) => ({
  // Initial state
  trainingExamples: DEFAULT_EXAMPLES,
  currentContext: [],
  probabilities: new Map(),
  vocabulary: new Set(),
  temperature: 1.0,
  generationHistory: [],
  isGenerating: false,
  isContinuousGenerating: false,
  selectedWordAnimation: null,

  // Actions
  addExample: (text: string) => {
    if (text.trim()) {
      set((state) => ({
        trainingExamples: [...state.trainingExamples, text.trim()]
      }));
      setTimeout(() => get().calculateProbabilities(), 100);
    }
  },

  removeExample: (index: number) => {
    set((state) => ({
      trainingExamples: state.trainingExamples.filter((_, i) => i !== index)
    }));
    setTimeout(() => get().calculateProbabilities(), 100);
  },

  clearExamples: () => {
    set({ trainingExamples: [], probabilities: new Map() });
  },

  setDefaultExamples: () => {
    set({ trainingExamples: DEFAULT_EXAMPLES });
    setTimeout(() => get().calculateProbabilities(), 100);
  },

  calculateProbabilities: () => {
    const { trainingExamples, currentContext } = get();
    const contextStr = currentContext.join(' ').toLowerCase();
    const nextWordCounts = new Map<string, number>();
    const vocabulary = new Set<string>();

    // Build vocabulary from all training examples
    trainingExamples.forEach(example => {
      const words = example.toLowerCase().split(' ').filter(w => w);
      words.forEach(word => vocabulary.add(word));
    });

    // Initialize all vocabulary words with 0 probability
    const probabilities = new Map<string, number>();
    vocabulary.forEach(word => probabilities.set(word, 0));

    // Count occurrences
    trainingExamples.forEach(example => {
      // Keep periods attached to words, just filter empty strings
      const words = example.toLowerCase().split(' ').filter(w => w);

      if (currentContext.length === 0) {
        // Get first words from all sentences
        const firstWord = words[0];
        if (firstWord) {
          nextWordCounts.set(firstWord, (nextWordCounts.get(firstWord) || 0) + 1);
        }
      } else {
        // Find context matches
        for (let i = 0; i <= words.length - currentContext.length - 1; i++) {
          const window = words.slice(i, i + currentContext.length).join(' ');
          if (window === contextStr && i + currentContext.length < words.length) {
            const nextWord = words[i + currentContext.length];
            nextWordCounts.set(nextWord, (nextWordCounts.get(nextWord) || 0) + 1);
          }
        }
      }
    });

    // Convert to probabilities
    const total = Array.from(nextWordCounts.values()).reduce((sum, count) => sum + count, 0);

    if (total > 0) {
      nextWordCounts.forEach((count, word) => {
        probabilities.set(word, count / total);
      });
    }

    set({ probabilities, vocabulary });
  },

  selectWord: (word: string, method: 'manual' | 'sampled', animationData?: any) => {
    const { currentContext, probabilities } = get();

    // Set animation data if provided
    if (animationData) {
      set({ selectedWordAnimation: { word, ...animationData } });
    }

    // Create generation step
    const newStep: GenerationStep = {
      id: `${Date.now()}-${Math.random()}`,
      context: [...currentContext],
      predictions: new Map(probabilities),
      selected: word,
      method,
      timestamp: Date.now()
    };

    // Update state
    set((state) => ({
      currentContext: [...state.currentContext, word],
      generationHistory: [...state.generationHistory, newStep],
      isGenerating: true
    }));

    // Calculate new probabilities after animation
    setTimeout(() => {
      // Stop if we've reached a natural ending (period at end of word or max length)
      const shouldStop = word.endsWith('.') || currentContext.length >= 15;
      if (!shouldStop) {
        get().calculateProbabilities();
      }
      set({ isGenerating: false, selectedWordAnimation: null });
    }, 800);
  },

  generateUntilStop: () => {
    const { probabilities, isContinuousGenerating } = get();

    // Stop if already generating or no probabilities
    if (isContinuousGenerating || probabilities.size === 0) return;

    set({ isContinuousGenerating: true });

    // Get adjusted probabilities with temperature
    const temperature = get().temperature;
    const adjustedProbs = new Map<string, number>();
    let sum = 0;

    probabilities.forEach((prob, word) => {
      const adjusted = Math.pow(prob, 1 / temperature);
      adjustedProbs.set(word, adjusted);
      sum += adjusted;
    });

    // Normalize
    adjustedProbs.forEach((prob, word) => {
      adjustedProbs.set(word, prob / sum);
    });

    // Sample from distribution
    const random = Math.random();
    let cumulative = 0;
    let selectedWord = '';

    for (const [word, prob] of adjustedProbs) {
      cumulative += prob;
      if (random <= cumulative) {
        selectedWord = word;
        break;
      }
    }

    if (selectedWord) {
      get().selectWord(selectedWord, 'sampled');
    }
  },

  stepBack: () => {
    const { generationHistory } = get();
    if (generationHistory.length > 0) {
      const previousStep = generationHistory[generationHistory.length - 1];
      const newContext = previousStep.context;
      set((state) => ({
        currentContext: newContext,
        generationHistory: state.generationHistory.slice(0, -1)
      }));
      setTimeout(() => get().calculateProbabilities(), 100);
    }
  },

  reset: () => {
    set({
      currentContext: [],
      generationHistory: [],
      isGenerating: false,
      isContinuousGenerating: false,
      selectedWordAnimation: null
    });
    setTimeout(() => get().calculateProbabilities(), 100);
  },

  setTemperature: (value: number) => {
    set({ temperature: value });
  },

  setIsGenerating: (value: boolean) => {
    set({ isGenerating: value });
  },

  updateContext: (context: string[]) => {
    // Clear history and rebuild it step by step for the new context
    const newHistory: GenerationStep[] = [];

    // Build history for each word in the new context
    for (let i = 0; i < context.length; i++) {
      const contextSoFar = context.slice(0, i);
      const word = context[i];

      // Create a history step for this word
      const step: GenerationStep = {
        id: `manual-${Date.now()}-${i}`,
        context: contextSoFar,
        predictions: new Map(), // We don't have predictions for manual entry
        selected: word,
        method: 'manual',
        timestamp: Date.now() + i // Slightly offset timestamps
      };

      newHistory.push(step);
    }

    set({
      currentContext: context,
      generationHistory: newHistory
    });
    setTimeout(() => get().calculateProbabilities(), 100);
  },

  setSelectedWordAnimation: (animation: any) => {
    set({ selectedWordAnimation: animation });
  }
}));
