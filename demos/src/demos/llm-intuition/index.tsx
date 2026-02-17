import { useState } from 'react';
import DemoLayout from '../../app/DemoLayout.tsx';
import Card from '../../components/ui/Card.tsx';
import { DEMO_REGISTRY } from '../../app/DemoRegistry.ts';
import SimulatedMode from './components/SimulatedMode.tsx';

type Tab = 'simulated' | 'live';

const entry = DEMO_REGISTRY.find((d) => d.id === 'llm-intuition');

export default function LLMIntuitionDemo() {
  const [activeTab, setActiveTab] = useState<Tab>('simulated');

  return (
    <DemoLayout
      title="LLM Intuition"
      subtitle="How language models predict the next token"
      instructions={entry?.instructions}
    >
      {/* Tab bar */}
      <div className="border-b border-border mb-6">
        <nav className="flex gap-6" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('simulated')}
            className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'simulated'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Simulated (N-gram)
          </button>
          <button
            onClick={() => setActiveTab('live')}
            className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'live'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Live (GPT-4o-mini)
          </button>
        </nav>
      </div>

      {/* Tab content */}
      {activeTab === 'simulated' ? (
        <SimulatedMode />
      ) : (
        <div className="max-w-2xl mx-auto mt-12">
          <Card className="text-center py-12">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Live Mode Coming Soon
            </h3>
            <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
              This tab will use a real LLM to show the same token prediction
              concept with actual probabilities from GPT-4o-mini. You'll see how
              the patterns you explored in the simulated mode translate to a
              real language model.
            </p>
          </Card>
        </div>
      )}
    </DemoLayout>
  );
}
