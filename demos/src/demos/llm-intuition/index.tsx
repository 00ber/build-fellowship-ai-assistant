import { useEffect, useRef, useState } from 'react';
import DemoLayout from '../../app/DemoLayout.tsx';
import { DEMO_REGISTRY } from '../../app/DemoRegistry.ts';
import SimulatedMode from './components/SimulatedMode.tsx';
import LiveMode from './components/LiveMode.tsx';
import { useLiveModeStore } from './store/useLiveModeStore.ts';

type Tab = 'simulated' | 'live';

const entry = DEMO_REGISTRY.find((d) => d.id === 'llm-intuition');

export default function LLMIntuitionDemo() {
  const [activeTab, setActiveTab] = useState<Tab>('simulated');
  const prevTabRef = useRef<Tab>(activeTab);

  // Cancel live stream when switching away from Live tab
  useEffect(() => {
    if (prevTabRef.current === 'live' && activeTab !== 'live') {
      useLiveModeStore.getState().cancelGeneration();
    }
    prevTabRef.current = activeTab;
  }, [activeTab]);

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
        <LiveMode />
      )}
    </DemoLayout>
  );
}
