/**
 * StreamingText component.
 *
 * Renders streaming LLM output as live markdown. Handles incomplete markdown
 * fragments (unclosed bold, italic, code blocks) so they render cleanly
 * during streaming rather than showing raw syntax characters.
 *
 * Uses react-markdown with remark-gfm for GFM support and
 * react-syntax-highlighter (Prism + oneDark) for code blocks.
 */
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface StreamingTextProps {
  /** The accumulated text so far */
  text: string;
  /** Whether the stream is currently active */
  isStreaming: boolean;
}

/**
 * Close any unclosed markdown syntax so the renderer does not flash
 * raw asterisks or backticks while streaming.
 */
export function completeMarkdown(text: string): string {
  let result = text;

  // Count unclosed bold markers (**)
  const boldCount = (result.match(/\*\*/g) ?? []).length;
  if (boldCount % 2 !== 0) result += '**';

  // Count unclosed italic markers (single * not part of **)
  const italicCount = (result.match(/(?<!\*)\*(?!\*)/g) ?? []).length;
  if (italicCount % 2 !== 0) result += '*';

  // Count unclosed fenced code blocks (```)
  const codeBlockCount = (result.match(/```/g) ?? []).length;
  if (codeBlockCount % 2 !== 0) result += '\n```';

  // Count unclosed inline code (single ` not part of ```)
  const inlineCodeCount = (result.match(/(?<!`)`(?!`)/g) ?? []).length;
  if (inlineCodeCount % 2 !== 0) result += '`';

  return result;
}

export default function StreamingText({ text, isStreaming }: StreamingTextProps) {
  const displayText = isStreaming ? completeMarkdown(text) : text;

  if (!displayText) {
    return null;
  }

  return (
    <div className="prose prose-sm max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // react-markdown passes extra props (node, inline, etc.) that are
          // not standard HTML attributes. We extract only what we need.
          code(props) {
            const { className, children } = props;
            const match = /language-(\w+)/.exec(className ?? '');
            if (match) {
              return (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              );
            }
            return (
              <code className={className}>
                {children}
              </code>
            );
          },
        }}
      >
        {displayText}
      </ReactMarkdown>
      {isStreaming && (
        <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-0.5 align-middle" />
      )}
    </div>
  );
}
