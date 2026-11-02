// Central Keyboard Shortcuts Registry for Marathi Design Studio

export interface ShortcutDefinition {
  id: string;
  name: string;
  category: 'general' | 'insertion' | 'movement' | 'formatting' | 'navigation' | 'video';
  winKey: string;
  macKey: string;
  description: string;
  action: () => void;
  allowInInput?: boolean;
}

export const isMac = typeof window !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);

export function formatShortcut(winKey: string, macKey: string): string {
  return isMac ? macKey : winKey;
}

export function isTypingInInput(target: EventTarget | null): boolean {
  if (!target || !(target instanceof HTMLElement)) return false;
  const tagName = target.tagName.toLowerCase();
  return (
    tagName === 'input' ||
    tagName === 'textarea' ||
    tagName === 'select' ||
    target.isContentEditable ||
    target.classList.contains('canvas-text-editor')
  );
}

class ShortcutManager {
  private registry: Map<string, ShortcutDefinition> = new Map();
  private isListening = false;

  public register(shortcut: ShortcutDefinition): void {
    this.registry.set(shortcut.id, shortcut);
  }

  public unregister(id: string): void {
    this.registry.delete(id);
  }

  public getAll(): ShortcutDefinition[] {
    return Array.from(this.registry.values());
  }

  public getByCategory(category: ShortcutDefinition['category']): ShortcutDefinition[] {
    return Array.from(this.registry.values()).filter((s) => s.category === category);
  }

  public init(): () => void {
    if (this.isListening) return () => {};
    this.isListening = true;

    const handleKeyDown = (e: KeyboardEvent) => {
      const isInput = isTypingInInput(e.target);
      const modifier = isMac ? e.metaKey : e.ctrlKey;

      for (const shortcut of this.registry.values()) {
        if (isInput && !shortcut.allowInInput) {
          continue;
        }

        // Match key combinations
        if (this.matchesEvent(e, shortcut, modifier)) {
          e.preventDefault();
          e.stopPropagation();
          shortcut.action();
          return;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);

    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      this.isListening = false;
    };
  }

  private matchesEvent(e: KeyboardEvent, shortcut: ShortcutDefinition, modifier: boolean): boolean {
    const key = e.key.toLowerCase();
    const id = shortcut.id;

    // Command palette
    if (id === 'command-palette' && ((modifier && key === 'e') || (!modifier && key === '/' && !e.shiftKey))) {
      return true;
    }

    // Help modal
    if (id === 'help-shortcuts' && key === '?' && !modifier) {
      return true;
    }

    // Undo
    if (id === 'undo' && modifier && key === 'z' && !e.shiftKey) return true;

    // Redo
    if (id === 'redo' && modifier && (key === 'y' || (key === 'z' && e.shiftKey))) return true;

    // Save
    if (id === 'save' && modifier && key === 's') return true;

    // Select All
    if (id === 'select-all' && modifier && key === 'a') return true;

    // Copy
    if (id === 'copy' && modifier && key === 'c') return true;

    // Cut
    if (id === 'cut' && modifier && key === 'x') return true;

    // Paste
    if (id === 'paste' && modifier && key === 'v') return true;

    // Duplicate
    if (id === 'duplicate' && modifier && key === 'd') return true;

    // Delete
    if (id === 'delete' && (key === 'delete' || key === 'backspace') && !modifier) return true;

    // Group / Ungroup
    if (id === 'group' && modifier && key === 'g' && !e.shiftKey) return true;
    if (id === 'ungroup' && modifier && key === 'g' && e.shiftKey) return true;

    // Escape
    if (id === 'escape' && key === 'escape') return true;

    // Add elements (single letter hotkeys)
    if (!modifier && !e.altKey && !e.shiftKey) {
      if (id === 'add-text' && key === 't') return true;
      if (id === 'add-rect' && key === 'r') return true;
      if (id === 'add-circle' && key === 'c') return true;
      if (id === 'add-line' && key === 'l') return true;
      if (id === 'add-sticky' && key === 's') return true;
    }

    // Add page
    if (id === 'add-page' && modifier && key === 'enter') return true;

    // Layer ordering
    if (id === 'bring-forward' && modifier && key === ']' && !e.shiftKey) return true;
    if (id === 'send-backward' && modifier && key === '[' && !e.shiftKey) return true;
    if (id === 'bring-to-front' && modifier && key === ']' && e.shiftKey) return true;
    if (id === 'send-to-back' && modifier && key === '[' && e.shiftKey) return true;

    // Text formatting
    if (id === 'format-bold' && modifier && key === 'b') return true;
    if (id === 'format-italic' && modifier && key === 'i') return true;
    if (id === 'format-underline' && modifier && key === 'u') return true;

    // Zoom
    if (id === 'zoom-in' && modifier && (key === '=' || key === '+')) return true;
    if (id === 'zoom-out' && modifier && key === '-') return true;
    if (id === 'zoom-reset' && modifier && key === '0') return true;

    // Rulers
    if (id === 'toggle-rulers' && modifier && key === 'r') return true;

    return false;
  }
}

export const shortcutManager = new ShortcutManager();
