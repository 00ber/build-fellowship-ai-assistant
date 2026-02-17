import { useState, type ReactNode } from 'react';
import { BookOpen, X } from 'lucide-react';
import InstructionPanel from '../components/demo/InstructionPanel.tsx';
import type { DemoInstruction } from '../types/index.ts';

interface DemoLayoutProps {
  title: string;
  subtitle?: string;
  instructions?: DemoInstruction;
  children: ReactNode;
}

export default function DemoLayout({ title, subtitle, instructions, children }: DemoLayoutProps) {
  const [showGuide, setShowGuide] = useState(false);

  return (
    <div className="flex h-full">
      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="px-6 py-4 border-b border-border bg-surface flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
            {subtitle && (
              <p className="text-sm text-text-secondary mt-0.5">{subtitle}</p>
            )}
          </div>

          {instructions && (
            <button
              onClick={() => setShowGuide(!showGuide)}
              className={`
                flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                ${showGuide
                  ? 'bg-primary/10 text-primary'
                  : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                }
              `}
            >
              {showGuide ? (
                <>
                  <X size={16} />
                  Hide Guide
                </>
              ) : (
                <>
                  <BookOpen size={16} />
                  Show Guide
                </>
              )}
            </button>
          )}
        </header>

        {/* Demo content */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>

      {/* Instruction panel (conditionally rendered) */}
      {showGuide && instructions && (
        <InstructionPanel instructions={instructions} />
      )}
    </div>
  );
}
