export interface ShortcutDefinition {
  id: string;
  category: 'General' | 'Add Elements' | 'Arrange & Layers' | 'Text Formatting' | 'Canvas & View';
  label: string;
  description: string;
  windowsLinux: string;
  mac: string;
  keyTrigger: string;
  requiresCtrl?: boolean;
  requiresShift?: boolean;
  requiresAlt?: boolean;
  actionId: string;
}

export const SHORTCUT_REGISTRY: ShortcutDefinition[] = [
  // General
  { id: 'undo', category: 'General', label: 'Undo', description: 'Revert last canvas modification', windowsLinux: 'Ctrl+Z', mac: 'Cmd+Z', keyTrigger: 'z', requiresCtrl: true, actionId: 'undo' },
  { id: 'redo', category: 'General', label: 'Redo', description: 'Re-apply undone canvas modification', windowsLinux: 'Ctrl+Y / Ctrl+Shift+Z', mac: 'Cmd+Shift+Z', keyTrigger: 'y', requiresCtrl: true, actionId: 'redo' },
  { id: 'save', category: 'General', label: 'Save Design', description: 'Save design document to cloud', windowsLinux: 'Ctrl+S', mac: 'Cmd+S', keyTrigger: 's', requiresCtrl: true, actionId: 'save' },
  { id: 'duplicate', category: 'General', label: 'Duplicate Object', description: 'Clone active canvas element', windowsLinux: 'Ctrl+D', mac: 'Cmd+D', keyTrigger: 'd', requiresCtrl: true, actionId: 'duplicate' },
  { id: 'delete', category: 'General', label: 'Delete', description: 'Remove selected object from canvas', windowsLinux: 'Delete / Backspace', mac: 'Delete / Backspace', keyTrigger: 'Delete', actionId: 'delete' },
  { id: 'copy', category: 'General', label: 'Copy', description: 'Copy selected object to clipboard', windowsLinux: 'Ctrl+C', mac: 'Cmd+C', keyTrigger: 'c', requiresCtrl: true, actionId: 'copy' },
  { id: 'cut', category: 'General', label: 'Cut', description: 'Cut selected object to clipboard', windowsLinux: 'Ctrl+X', mac: 'Cmd+X', keyTrigger: 'x', requiresCtrl: true, actionId: 'cut' },
  { id: 'paste', category: 'General', label: 'Paste', description: 'Paste object from clipboard', windowsLinux: 'Ctrl+V', mac: 'Cmd+V', keyTrigger: 'v', requiresCtrl: true, actionId: 'paste' },
  { id: 'select_all', category: 'General', label: 'Select All', description: 'Select all canvas objects', windowsLinux: 'Ctrl+A', mac: 'Cmd+A', keyTrigger: 'a', requiresCtrl: true, actionId: 'selectAll' },
  { id: 'command_palette', category: 'General', label: 'Command Palette', description: 'Search commands, templates, tools', windowsLinux: '/ or Ctrl+E', mac: '/ or Cmd+E', keyTrigger: '/', actionId: 'openCommandPalette' },
  { id: 'shortcuts_help', category: 'General', label: 'Shortcuts Reference', description: 'Open searchable shortcuts cheat sheet', windowsLinux: '?', mac: '?', keyTrigger: '?', actionId: 'openShortcutsHelp' },

  // Add Elements
  { id: 'add_text', category: 'Add Elements', label: 'Add Text Box', description: 'Insert Marathi/English text box', windowsLinux: 'T', mac: 'T', keyTrigger: 't', actionId: 'addText' },
  { id: 'add_rect', category: 'Add Elements', label: 'Add Rectangle', description: 'Insert customizable rectangle shape', windowsLinux: 'R', mac: 'R', keyTrigger: 'r', actionId: 'addRect' },
  { id: 'add_circle', category: 'Add Elements', label: 'Add Circle', description: 'Insert customizable circle shape', windowsLinux: 'C', mac: 'C', keyTrigger: 'c', actionId: 'addCircle' },
  { id: 'add_line', category: 'Add Elements', label: 'Add Line', description: 'Insert straight rule line', windowsLinux: 'L', mac: 'L', keyTrigger: 'l', actionId: 'addLine' },

  // Arrange & Layers
  { id: 'group', category: 'Arrange & Layers', label: 'Group Elements', description: 'Group selected objects together', windowsLinux: 'Ctrl+G', mac: 'Cmd+G', keyTrigger: 'g', requiresCtrl: true, actionId: 'group' },
  { id: 'ungroup', category: 'Arrange & Layers', label: 'Ungroup Elements', description: 'Separate grouped objects', windowsLinux: 'Ctrl+Shift+G', mac: 'Cmd+Shift+G', keyTrigger: 'G', requiresCtrl: true, requiresShift: true, actionId: 'ungroup' },
  { id: 'bring_forward', category: 'Arrange & Layers', label: 'Bring Forward', description: 'Move object up one layer', windowsLinux: 'Ctrl+]', mac: 'Cmd+]', keyTrigger: ']', requiresCtrl: true, actionId: 'bringForward' },
  { id: 'send_backward', category: 'Arrange & Layers', label: 'Send Backward', description: 'Move object down one layer', windowsLinux: 'Ctrl+[', mac: 'Cmd+[', keyTrigger: '[', requiresCtrl: true, actionId: 'sendBackward' },

  // Canvas & View
  { id: 'toggle_rulers', category: 'Canvas & View', label: 'Toggle Rulers', description: 'Show or hide pixel rulers', windowsLinux: 'Ctrl+R', mac: 'Cmd+R', keyTrigger: 'r', requiresCtrl: true, actionId: 'toggleRulers' },
  { id: 'pan_canvas', category: 'Canvas & View', label: 'Pan Canvas', description: 'Hold Spacebar to pan workspace', windowsLinux: 'Space + Drag', mac: 'Space + Drag', keyTrigger: 'Space', actionId: 'panCanvas' },
  { id: 'nudge_1px', category: 'Canvas & View', label: 'Nudge Object 1px', description: 'Move selected object by 1 pixel', windowsLinux: 'Arrow Keys', mac: 'Arrow Keys', keyTrigger: 'ArrowUp', actionId: 'nudge1px' },
  { id: 'nudge_10px', category: 'Canvas & View', label: 'Nudge Object 10px', description: 'Move selected object by 10 pixels', windowsLinux: 'Shift + Arrow Keys', mac: 'Shift + Arrow Keys', keyTrigger: 'ArrowUp', requiresShift: true, actionId: 'nudge10px' }
];

export function isInputFocused(): boolean {
  const activeEl = document.activeElement;
  if (!activeEl) return false;
  const tagName = activeEl.tagName.toLowerCase();
  return tagName === 'input' || tagName === 'textarea' || (activeEl as HTMLElement).isContentEditable;
}
