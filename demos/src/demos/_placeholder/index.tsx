import DemoLayout from '../../app/DemoLayout.tsx';
import Card from '../../components/ui/Card.tsx';
import Badge from '../../components/ui/Badge.tsx';
import StreamingText from '../../components/demo/StreamingText.tsx';
import DemoControls from '../../components/demo/DemoControls.tsx';
import { useStreamingText } from '../../hooks/useStreamingText.ts';
import { useApiMode } from '../../hooks/useApiMode.ts';
import { DEMO_REGISTRY } from '../../app/DemoRegistry.ts';
import { SAMPLE_STREAMING_RESPONSE } from '../../data/simulated-responses/sample.ts';

const entry = DEMO_REGISTRY.find((d) => d.id === 'placeholder');

export default function PlaceholderDemo() {
  const { isRealMode } = useApiMode();
  const { text, isStreaming, isDone, start, cancel, reset } = useStreamingText({
    simulatedResponse: SAMPLE_STREAMING_RESPONSE,
    apiPrompt: 'Explain how Large Language Models work, including how they predict the next token and why temperature matters. Use markdown formatting with headers, bold, code blocks, and a blockquote.',
    apiSystemPrompt: 'You are a helpful AI teacher. Explain concepts clearly with markdown formatting.',
  });

  return (
    <DemoLayout
      title="Welcome"
      subtitle="Streaming infrastructure demo"
      instructions={entry?.instructions}
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Info card */}
        <Card
          header={
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-text-primary">LLM Streaming Demo</h3>
              <div className="flex gap-2">
                <Badge variant="success">Active</Badge>
                <Badge variant="info">Phase 1</Badge>
              </div>
            </div>
          }
        >
          <p className="text-text-secondary text-sm leading-relaxed">
            This demo showcases the streaming infrastructure. Click "Start Streaming" to
            watch text appear token-by-token with live markdown rendering — just like a
            real LLM generating a response.
          </p>
          <p className="text-text-secondary text-sm leading-relaxed mt-3">
            <strong className="text-text-primary">Aha moment:</strong>{' '}
            {entry?.ahaStatement}
          </p>
        </Card>

        {/* Streaming output */}
        <Card
          header={
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-text-primary">Response</h3>
              {isStreaming && (
                <span className="text-xs text-primary animate-pulse">Streaming...</span>
              )}
              {isDone && (
                <span className="text-xs text-success">Complete</span>
              )}
            </div>
          }
        >
          {text ? (
            <StreamingText text={text} isStreaming={isStreaming} />
          ) : (
            <p className="text-text-secondary text-sm italic">
              Click "Start Streaming" below to begin.
            </p>
          )}
        </Card>

        {/* Controls */}
        <DemoControls
          onPlay={isStreaming ? cancel : start}
          onPause={cancel}
          onReset={reset}
          isPlaying={isStreaming}
          isComplete={isDone}
        />

        {/* Mode indicator (subtle, for development/instructor use) */}
        <div className="flex items-center justify-end gap-2 text-xs text-text-secondary opacity-50">
          <div
            className={`w-1.5 h-1.5 rounded-full ${
              isRealMode ? 'bg-emerald-500' : 'bg-indigo-400'
            }`}
          />
          <span>{isRealMode ? 'Live Mode' : 'Simulated Mode'}</span>
        </div>
      </div>
    </DemoLayout>
  );
}
