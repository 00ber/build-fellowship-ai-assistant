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
          title: 'Explore the sidebar',
          description: 'Click on different demos in the left sidebar to navigate between them.',
        },
        {
          title: 'Try the controls',
          description: 'Use the play, pause, and reset buttons to control demo playback.',
        },
        {
          title: 'View code examples',
          description: 'Code blocks show syntax-highlighted snippets relevant to each demo.',
        },
      ],
    },
  },
];
