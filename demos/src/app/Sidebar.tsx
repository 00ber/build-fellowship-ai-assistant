import { DEMO_REGISTRY } from './DemoRegistry.ts';

interface SidebarProps {
  activeId: string;
  onSelect: (id: string) => void;
}

export default function Sidebar({ activeId, onSelect }: SidebarProps) {
  return (
    <aside className="w-72 h-full bg-surface border-r border-border flex flex-col shrink-0">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-primary">AI Demos</h1>
        <p className="text-sm text-text-secondary mt-0.5">Build Fellowship</p>
      </div>

      {/* Demo list */}
      <nav className="flex-1 overflow-y-auto py-2">
        {DEMO_REGISTRY.map((entry) => {
          const Icon = entry.icon;
          const isActive = entry.id === activeId;

          return (
            <button
              key={entry.id}
              onClick={() => onSelect(entry.id)}
              className={`
                w-full flex items-start gap-3 px-4 py-3 text-left transition-colors
                ${isActive
                  ? 'bg-primary/10 text-primary border-r-2 border-primary'
                  : 'text-text-primary hover:bg-gray-50'
                }
              `}
            >
              <Icon
                size={20}
                className={`mt-0.5 shrink-0 ${isActive ? 'text-primary' : 'text-text-secondary'}`}
              />
              <div className="min-w-0">
                <div className={`text-sm font-medium truncate ${isActive ? 'text-primary' : ''}`}>
                  {entry.title}
                </div>
                <div className="text-xs text-text-secondary truncate mt-0.5">
                  {entry.subtitle}
                </div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <p className="text-xs text-text-secondary text-center">
          {DEMO_REGISTRY.length} demo{DEMO_REGISTRY.length !== 1 ? 's' : ''} available
        </p>
      </div>
    </aside>
  );
}
