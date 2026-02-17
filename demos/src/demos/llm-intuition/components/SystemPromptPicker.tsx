/**
 * System prompt preset selector for Live Mode.
 *
 * Provides dropdown for predefined system prompts (None, Helpful Assistant,
 * Pirate, Data Scientist, JSON Only, Custom) with a preview area and custom
 * textarea for freeform input.
 */
import { useState } from 'react';
import Card from '../../../components/ui/Card.tsx';
import Badge from '../../../components/ui/Badge.tsx';
import {
  useLiveModeStore,
  SYSTEM_PRESETS,
  PRESET_NAMES,
} from '../store/useLiveModeStore.ts';

export default function SystemPromptPicker() {
  const systemPreset = useLiveModeStore((s) => s.systemPreset);
  const systemPrompt = useLiveModeStore((s) => s.systemPrompt);
  const tokens = useLiveModeStore((s) => s.tokens);
  const setSystemPrompt = useLiveModeStore((s) => s.setSystemPrompt);

  const [showPreview, setShowPreview] = useState(false);
  const [customText, setCustomText] = useState('');
  const [promptChanged, setPromptChanged] = useState(false);

  const handlePresetChange = (presetName: string) => {
    const presetValue =
      presetName === 'Custom' ? customText : SYSTEM_PRESETS[presetName];
    setSystemPrompt(presetValue, presetName);

    // Show "prompt changed" message if tokens exist
    if (tokens.length > 0) {
      setPromptChanged(true);
    }
  };

  const handleCustomTextChange = (text: string) => {
    setCustomText(text);
    if (systemPreset === 'Custom') {
      setSystemPrompt(text, 'Custom');
      if (tokens.length > 0) {
        setPromptChanged(true);
      }
    }
  };

  return (
    <Card className="!p-4">
      <div className="flex items-center gap-3 flex-wrap">
        <label
          htmlFor="system-preset"
          className="text-sm font-medium text-text-primary whitespace-nowrap"
        >
          System Prompt:
        </label>

        <select
          id="system-preset"
          value={systemPreset}
          onChange={(e) => handlePresetChange(e.target.value)}
          className="
            rounded-lg border border-border bg-surface px-3 py-1.5 text-sm
            text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30
          "
        >
          {PRESET_NAMES.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        <Badge variant={systemPreset === 'None' ? 'default' : 'info'}>
          {systemPreset}
        </Badge>

        {systemPrompt && (
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="text-xs text-text-secondary hover:text-primary transition-colors ml-auto"
          >
            {showPreview ? 'Hide prompt' : 'Show prompt'}
          </button>
        )}
      </div>

      {/* Custom textarea */}
      {systemPreset === 'Custom' && (
        <textarea
          value={customText}
          onChange={(e) => handleCustomTextChange(e.target.value)}
          placeholder="Enter a custom system prompt..."
          rows={3}
          className="
            mt-3 w-full rounded-lg border border-border bg-surface px-3 py-2
            text-sm text-text-primary placeholder:text-text-secondary/50
            focus:outline-none focus:ring-2 focus:ring-primary/30 resize-y
          "
        />
      )}

      {/* Preview area */}
      {showPreview && systemPrompt && (
        <div className="mt-3 px-3 py-2 rounded-lg bg-gray-50 border border-border/50">
          <p className="text-xs text-text-secondary font-mono leading-relaxed">
            {systemPrompt}
          </p>
        </div>
      )}

      {/* Prompt changed indicator */}
      {promptChanged && tokens.length > 0 && (
        <div className="mt-3 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200">
          <p className="text-xs text-amber-700">
            Prompt changed — generate again to see the difference
          </p>
        </div>
      )}
    </Card>
  );
}
