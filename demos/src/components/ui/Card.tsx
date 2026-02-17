import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export default function Card({ children, header, footer, className = '' }: CardProps) {
  return (
    <div
      className={`
        bg-surface rounded-xl shadow-card p-6
        ${className}
      `}
    >
      {header && (
        <div className="mb-4 pb-4 border-b border-border">
          {header}
        </div>
      )}

      {children}

      {footer && (
        <div className="mt-4 pt-4 border-t border-border">
          {footer}
        </div>
      )}
    </div>
  );
}
