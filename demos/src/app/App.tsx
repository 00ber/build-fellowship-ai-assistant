import { Suspense, useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './Sidebar.tsx';
import { DEMO_REGISTRY } from './DemoRegistry.ts';
import { useKeySequence } from '../hooks/useKeySequence.ts';
import { useApiMode } from '../hooks/useApiMode.ts';

const LIVE_SEQUENCE = ['l', 'i', 'v', 'e'];

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

/** Brief toast notification for mode switch confirmation. */
function ModeToast({ isRealMode }: { isRealMode: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-4 right-4 z-50 px-3 py-1.5 rounded-full text-xs font-medium shadow-lg backdrop-blur-sm"
      style={{
        backgroundColor: isRealMode
          ? 'rgba(16, 185, 129, 0.9)'
          : 'rgba(99, 102, 241, 0.9)',
        color: 'white',
      }}
    >
      {isRealMode ? 'Live mode' : 'Simulated mode'}
    </motion.div>
  );
}

export default function App() {
  const [activeId, setActiveId] = useState(getActiveIdFromHash);
  const { isRealMode, toggleMode } = useApiMode();
  const [showToast, setShowToast] = useState(false);

  // Hidden keyboard toggle: typing "live" switches between simulated and real
  const handleModeToggle = useCallback(() => {
    toggleMode();
    setShowToast(true);
  }, [toggleMode]);

  useKeySequence(LIVE_SEQUENCE, handleModeToggle);

  // Auto-dismiss the toast after 1.5 seconds
  useEffect(() => {
    if (!showToast) return;
    const timer = setTimeout(() => setShowToast(false), 1500);
    return () => clearTimeout(timer);
  }, [showToast, isRealMode]);

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

      {/* Mode toggle toast */}
      <AnimatePresence>
        {showToast && <ModeToast isRealMode={isRealMode} />}
      </AnimatePresence>
    </div>
  );
}
