import { lazy } from 'react';
import type { ComponentType } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Brain, Sparkles } from 'lucide-react';
import type { DemoInstruction } from '../types/index.ts';

export interface DemoEntry {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  component: React.LazyExoticComponent<ComponentType>;
  ahaStatement: string;
  instructions?: DemoInstruction;
}

// Start with one placeholder demo; phases 2-6 add entries here
export const DEMO_REGISTRY: DemoEntry[] = [
  {
    id: 'llm-intuition',
    title: 'LLM Intuition',
    subtitle: 'How language models predict the next token',
    icon: Brain,
    component: lazy(() => import('../demos/llm-intuition/index.tsx')),
    ahaStatement: "Language models don't understand — they predict the most likely next token based on patterns in training data",
    instructions: {
      steps: [
        {
          title: 'View Training Data',
          description: 'Look at the training examples on the left. These sentences are all the model knows. Try adding or removing sentences to see how the vocabulary changes.',
        },
        {
          title: 'Observe Probability Bars',
          description: 'The center panel shows which words are most likely next. Click any probability bar to manually select that word, or click "Predict Next Word" to sample randomly.',
        },
        {
          title: 'Adjust Temperature',
          description: 'Move the temperature slider to see how it changes the probability distribution. Low temperature makes the model more predictable; high temperature makes it more creative.',
        },
        {
          title: 'Generate Text',
          description: 'Watch the autoregressive loop in action: each predicted word becomes part of the context for the next prediction. Notice how the model can only produce patterns it has seen in training.',
        },
      ],
    },
  },
  {
    id: 'placeholder',
    title: 'Welcome',
    subtitle: 'Demo shell is working',
    icon: Sparkles,
    component: lazy(() => import('../demos/_placeholder/index.tsx')),
    ahaStatement: 'The demo infrastructure is ready for content',
    instructions: {
      steps: [
        {
          title: 'Start Streaming',
          description: 'Click the "Start Streaming" button to watch text appear token by token, just like a real LLM generating a response.',
        },
        {
          title: 'Watch Markdown Render',
          description: 'Notice how bold text, headers, and code blocks render in real-time as the stream progresses.',
        },
        {
          title: 'Reset and Replay',
          description: 'Click "Reset" to clear the output, then replay the streaming to see it again.',
        },
      ],
    },
  },
];
