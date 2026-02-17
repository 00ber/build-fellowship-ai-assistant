import { motion, AnimatePresence } from 'framer-motion';
import type { DemoStep } from '../../types/index.ts';
import { Check } from 'lucide-react';

interface StepDisplayProps {
  steps: DemoStep[];
  currentStep: number;
}

export default function StepDisplay({ steps, currentStep }: StepDisplayProps) {
  return (
    <div className="space-y-3">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <AnimatePresence key={index} mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                flex items-start gap-3 p-4 rounded-lg transition-all duration-200
                ${isActive ? 'bg-primary/5 border border-primary/20 shadow-sm' : ''}
                ${isCompleted ? 'opacity-60' : ''}
                ${!isActive && !isCompleted ? 'bg-gray-50' : ''}
              `}
            >
              {/* Step indicator */}
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  backgroundColor: isActive
                    ? '#6366F1'
                    : isCompleted
                      ? '#10B981'
                      : '#E5E7EB',
                }}
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
              >
                {isCompleted ? (
                  <Check size={14} className="text-white" />
                ) : (
                  <span className={isActive ? 'text-white' : 'text-text-secondary'}>
                    {index + 1}
                  </span>
                )}
              </motion.div>

              {/* Step content */}
              <div>
                <h4 className={`text-sm font-medium ${isActive ? 'text-primary' : 'text-text-primary'}`}>
                  {step.title}
                </h4>
                <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        );
      })}
    </div>
  );
}
