import { lazy } from 'react';
import type { ComponentType } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Sparkles } from 'lucide-react';
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
