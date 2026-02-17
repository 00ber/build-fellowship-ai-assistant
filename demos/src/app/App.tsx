import { Suspense, useState, useEffect, useCallback } from 'react';
import Sidebar from './Sidebar.tsx';
import { DEMO_REGISTRY } from './DemoRegistry.ts';

function getActiveIdFromHash(): string {
  const hash = window.location.hash.replace('#/', '').replace('#', '');
  const found = DEMO_REGISTRY.find((d) => d.id === hash);
  return found ? found.id : DEMO_REGISTRY[0]?.id ?? '';
}

function LoadingSkeleton() {
  return (
    <div className="flex-1 flex items-center justify-center animate-pulse-soft">
      <div className="text-center">
        <div className="w-12 h-12 rounded-xl bg-gray-200 mx-auto mb-4" />
        <div className="h-4 w-32 bg-gray-200 rounded mx-auto" />
      </div>
    </div>
  );
}

export default function App() {
  const [activeId, setActiveId] = useState(getActiveIdFromHash);

  const handleSelect = useCallback((id: string) => {
    setActiveId(id);
    window.location.hash = `#/${id}`;
  }, []);

  useEffect(() => {
    function onHashChange() {
      setActiveId(getActiveIdFromHash());
    }
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Set initial hash if none
  useEffect(() => {
    if (!window.location.hash && DEMO_REGISTRY.length > 0) {
      window.location.hash = `#/${DEMO_REGISTRY[0].id}`;
    }
  }, []);

  const activeDemo = DEMO_REGISTRY.find((d) => d.id === activeId);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeId={activeId} onSelect={handleSelect} />

      <main className="flex-1 flex flex-col min-w-0">
        <Suspense fallback={<LoadingSkeleton />}>
          {activeDemo ? (
            <activeDemo.component />
          ) : (
            <div className="flex-1 flex items-center justify-center text-text-secondary">
              No demo selected
            </div>
          )}
        </Suspense>
      </main>
    </div>
  );
}
