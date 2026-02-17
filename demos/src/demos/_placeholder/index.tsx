import { useState, useCallback } from 'react';
import DemoLayout from '../../app/DemoLayout.tsx';
import Card from '../../components/ui/Card.tsx';
import Badge from '../../components/ui/Badge.tsx';
import CodeBlock from '../../components/demo/CodeBlock.tsx';
import StepDisplay from '../../components/demo/StepDisplay.tsx';
import DemoControls from '../../components/demo/DemoControls.tsx';
import { DEMO_REGISTRY } from '../../app/DemoRegistry.ts';

const SAMPLE_CODE = `// Adding a new demo is simple:
// 1. Create a component in demos/src/demos/my-demo/index.tsx
// 2. Add an entry to DEMO_REGISTRY in DemoRegistry.ts

import { lazy } from 'react';
import { Brain } from 'lucide-react';

export const DEMO_REGISTRY: DemoEntry[] = [
  {
    id: 'my-demo',
    title: 'My Demo',
    subtitle: 'Exploring a concept',
    icon: Brain,
    component: lazy(() => import('../demos/my-demo')),
    ahaStatement: 'The key insight this demo reveals',
  },
];`;

const STEPS = [
  {
    title: 'Welcome to the Demo Shell',
    description: 'This placeholder proves the full demo pipeline works: registry, sidebar, routing, layout, and shared components.',
  },
  {
    title: 'Shared Components',
    description: 'Cards, Badges, CodeBlocks, StepDisplays, and DemoControls are all available for building real demos.',
  },
  {
    title: 'Ready for Content',
    description: 'Future phases will add real AI demos. Each demo only needs a component file and a registry entry.',
  },
];

const entry = DEMO_REGISTRY.find((d) => d.id === 'placeholder');

export default function PlaceholderDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const isComplete = currentStep >= STEPS.length;

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    // Auto-pause after advancing
    setTimeout(() => setIsPlaying(false), 500);
  }, []);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleReset = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  return (
    <DemoLayout
      title="Welcome"
      subtitle="Demo shell is working"
      instructions={entry?.instructions}
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Welcome card */}
        <Card
          header={
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-text-primary">Demo Infrastructure</h3>
              <div className="flex gap-2">
                <Badge variant="success">Active</Badge>
                <Badge variant="info">Phase 1</Badge>
              </div>
            </div>
          }
        >
          <p className="text-text-secondary text-sm leading-relaxed">
            This placeholder demo exercises every shared component in the demo shell.
            It proves the full pipeline works: sidebar navigation, hash-based routing,
            lazy loading, the DemoLayout with instruction panel, and all reusable components.
          </p>
          <p className="text-text-secondary text-sm leading-relaxed mt-3">
            <strong className="text-text-primary">Aha moment:</strong>{' '}
            {entry?.ahaStatement}
          </p>
        </Card>

        {/* Step display */}
        <Card header={<h3 className="font-semibold text-text-primary">Progress</h3>}>
          <StepDisplay steps={STEPS} currentStep={currentStep} />
        </Card>

        {/* Controls */}
        <DemoControls
          onPlay={handlePlay}
          onPause={handlePause}
          onReset={handleReset}
          isPlaying={isPlaying}
          isComplete={isComplete}
        />

        {/* Code example */}
        <Card header={<h3 className="font-semibold text-text-primary">How to Add a Demo</h3>}>
          <CodeBlock
            code={SAMPLE_CODE}
            language="typescript"
            title="DemoRegistry.ts"
          />
        </Card>
      </div>
    </DemoLayout>
  );
}
