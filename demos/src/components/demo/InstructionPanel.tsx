import type { DemoInstruction } from '../../types/index.ts';

interface InstructionPanelProps {
  instructions: DemoInstruction;
  currentStep?: number;
}

export default function InstructionPanel({ instructions, currentStep = 0 }: InstructionPanelProps) {
  return (
    <aside className="w-80 h-full bg-surface border-l border-border shrink-0 overflow-y-auto">
      <div className="p-5">
        <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
          Self-Guided Instructions
        </h3>

        <div className="space-y-4">
          {instructions.steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <div
                key={index}
                className={`
                  flex gap-3 p-3 rounded-lg transition-colors
                  ${isActive ? 'bg-primary/5 border border-primary/20' : ''}
                  ${isCompleted ? 'opacity-60' : ''}
                `}
              >
                {/* Step number */}
                <div
                  className={`
                    w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5
                    ${isActive
                      ? 'bg-primary text-white'
                      : isCompleted
                        ? 'bg-success text-white'
                        : 'bg-gray-200 text-text-secondary'
                    }
                  `}
                >
                  {isCompleted ? '\u2713' : index + 1}
                </div>

                {/* Step content */}
                <div>
                  <h4 className={`text-sm font-medium ${isActive ? 'text-primary' : 'text-text-primary'}`}>
                    {step.title}
                  </h4>
                  <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
