# Keyboard Shortcut Reference: Marathi Design Studio

This document defines the central keyboard shortcut registry for Marathi Design Studio across Windows, Linux, and macOS platforms.

## Shortcut Engine Rules & Conflict Handling
1. **Target Inspection**: Editing shortcuts (e.g. `T`, `R`, `C`, `L`, `S`, `Delete`, `Arrows`) are disabled while the user has keyboard focus in an `<input>`, `<textarea>`, or contentEditable element, preventing unintended canvas mutations.
2. **Text Formatting Mode**: Rich text shortcuts (`Ctrl+B`, `Ctrl+I`, `Ctrl+U`) apply only when a text object is actively selected or undergoing inline text editing.
3. **OS Modifier Key Normalization**:
   - `Ctrl` on Windows and Linux.
   - `Cmd` (`⌘`) on macOS.
   - `Alt` on Windows/Linux is equivalent to `Option` (`⌥`) on macOS.
4. **Browser Conflict Prevention**:
   - Default browser events (`Ctrl+S`, `Ctrl+D`, `Ctrl+F`, `Ctrl+G`) are captured with `e.preventDefault()` when the canvas application is active.

---

## 1. General & Document Shortcuts

| Action Name | Windows / Linux | macOS | Operating Context | Conflict Handling | Implementation Status |
|---|---|---|---|---|---|
| Undo | `Ctrl+Z` | `Cmd+Z` | Editor canvas | Prevents browser undo; rolls back editor history stack | Working and verified |
| Redo | `Ctrl+Y` or `Ctrl+Shift+Z` | `Cmd+Shift+Z` | Editor canvas | Prevents browser redo; advances editor history stack | Working and verified |
| Save Design | `Ctrl+S` | `Cmd+S` | Global Editor | Overrides browser "Save Webpage"; saves canvas JSON to cloud | Working and verified |
| Select All Objects | `Ctrl+A` | `Cmd+A` | Canvas workspace | Overrides text select all unless user is typing in input | Working and verified |
| Copy Object | `Ctrl+C` | `Cmd+C` | Selected canvas object | Clones Fabric object to internal clipboard | Working and verified |
| Cut Object | `Ctrl+X` | `Cmd+X` | Selected canvas object | Clones to clipboard and removes from canvas | Working and verified |
| Paste Object | `Ctrl+V` | `Cmd+V` | Canvas workspace | Deserializes clipboard object with 20px offset | Working and verified |
| Duplicate Object | `Ctrl+D` | `Cmd+D` | Selected canvas object | Overrides browser bookmark; clones active selection | Working and verified |
| Delete Object | `Delete` or `Backspace` | `Delete` | Selected canvas object | Ignored if typing in text input/area | Working and verified |
| Group Objects | `Ctrl+G` | `Cmd+G` | Multiple selection | Overrides browser find-again; creates Fabric Group | Working and verified |
| Ungroup Objects | `Ctrl+Shift+G` | `Cmd+Shift+G` | Grouped object | Dissolves group into individual objects | Working and verified |
| Add Hyperlink | `Ctrl+K` | `Cmd+K` | Selected object | Opens hyperlink configuration prompt | Working and verified |
| Escape Current Mode | `Esc` | `Esc` | Global app | Closes active modal, dropdown, or clears canvas selection | Working and verified |
| Open Command Palette | `/` or `Ctrl+E` | `/` or `Cmd+E` | Global app | Ignored if inside text field; opens quick launcher | Working and verified |
| Open Shortcut Help | `?` | `?` | Global app | Ignored if typing text; opens shortcuts modal | Working and verified |

---

## 2. Quick Element Insertion Shortcuts

*(Active only when canvas has focus and user is not typing in a text field)*

| Action Name | Windows / Linux | macOS | Operating Context | Conflict Handling | Implementation Status |
|---|---|---|---|---|---|
| Add Text Box | `T` | `T` | Canvas active | Ignored inside form inputs; inserts heading text box | Working and verified |
| Add Rectangle | `R` | `R` | Canvas active | Ignored inside form inputs; inserts rectangle shape | Working and verified |
| Add Circle | `C` | `C` | Canvas active | Ignored inside form inputs; inserts circle shape | Working and verified |
| Add Line | `L` | `L` | Canvas active | Ignored inside form inputs; inserts straight line | Working and verified |
| Add Sticky Note | `S` | `S` | Canvas / Whiteboard | Ignored inside form inputs; inserts sticky note | Working and verified |
| Add Blank Page | `Ctrl+Enter` | `Cmd+Enter` | Multi-page editor | Adds new blank canvas page | Working and verified |
| Quick Action Launcher | `Ctrl+E` | `Cmd+E` | Global app | Focuses command search bar | Working and verified |

---

## 3. Object Movement & Layer Arrangement

| Action Name | Windows / Linux | macOS | Operating Context | Conflict Handling | Implementation Status |
|---|---|---|---|---|---|
| Move Left (1px) | `Left Arrow` | `Left Arrow` | Selected canvas object | Nudges object position by 1 pixel | Working and verified |
| Move Right (1px) | `Right Arrow` | `Right Arrow` | Selected canvas object | Nudges object position by 1 pixel | Working and verified |
| Move Up (1px) | `Up Arrow` | `Up Arrow` | Selected canvas object | Nudges object position by 1 pixel | Working and verified |
| Move Down (1px) | `Down Arrow` | `Down Arrow` | Selected canvas object | Nudges object position by 1 pixel | Working and verified |
| Move Fast (10px) | `Shift+Arrow Keys` | `Shift+Arrow Keys` | Selected canvas object | Nudges object position by 10 pixels | Working and verified |
| Select Next Object | `Tab` | `Tab` | Canvas active | Cycles selection to next canvas object | Working and verified |
| Select Previous Object | `Shift+Tab` | `Shift+Tab` | Canvas active | Cycles selection in reverse order | Working and verified |
| Bring Forward | `Ctrl+]` | `Cmd+]` | Selected canvas object | Raises z-index layer by 1 position | Working and verified |
| Send Backward | `Ctrl+[` | `Cmd+[` | Selected canvas object | Lowers z-index layer by 1 position | Working and verified |
| Bring to Front | `Ctrl+Shift+]` | `Cmd+Shift+]` | Selected canvas object | Moves object to topmost layer | Working and verified |
| Send to Back | `Ctrl+Shift+[` | `Cmd+Shift+[` | Selected canvas object | Moves object to bottommost layer | Working and verified |

---

## 4. Text Formatting Shortcuts

*(Operates when text object is selected or active in inline editing mode)*

| Action Name | Windows / Linux | macOS | Operating Context | Conflict Handling | Implementation Status |
|---|---|---|---|---|---|
| Bold Text | `Ctrl+B` | `Cmd+B` | Active text object | Toggles bold weight (`bold` / `normal`) | Working and verified |
| Italic Text | `Ctrl+I` | `Cmd+I` | Active text object | Toggles italic style (`italic` / `normal`) | Working and verified |
| Underline Text | `Ctrl+U` | `Cmd+U` | Active text object | Toggles text underline decoration | Working and verified |
| Increase Font Size | `Ctrl+Shift+.` | `Cmd+Shift+.` | Active text object | Increments font size by 2px | Working and verified |
| Decrease Font Size | `Ctrl+Shift+,` | `Cmd+Shift+,` | Active text object | Decrements font size by 2px | Working and verified |
| Align Left | `Ctrl+Shift+L` | `Cmd+Shift+L` | Active text object | Sets `textAlign: 'left'` | Working and verified |
| Align Center | `Ctrl+Shift+C` | `Cmd+Shift+C` | Active text object | Sets `textAlign: 'center'` | Working and verified |
| Align Right | `Ctrl+Shift+R` | `Cmd+Shift+R` | Active text object | Sets `textAlign: 'right'` | Working and verified |

---

## 5. Navigation, Zoom & View

| Action Name | Windows / Linux | macOS | Operating Context | Conflict Handling | Implementation Status |
|---|---|---|---|---|---|
| Zoom In | `Ctrl++` or `Ctrl+=` | `Cmd++` | Canvas viewport | Overrides browser page zoom; scales canvas | Working and verified |
| Zoom Out | `Ctrl+-` | `Cmd+-` | Canvas viewport | Overrides browser zoom; scales canvas down | Working and verified |
| Actual Size (100%) | `Ctrl+0` | `Cmd+0` | Canvas viewport | Resets canvas scale to 1.0 (100%) | Working and verified |
| Toggle Rulers & Guides | `Ctrl+R` | `Cmd+R` | Canvas viewport | Overrides browser refresh; toggles pixel rulers | Working and verified |
| Next Page | `Page Down` | `Page Down` | Multi-page editor | Switches to next canvas page | Working and verified |
| Previous Page | `Page Up` | `Page Up` | Multi-page editor | Switches to previous canvas page | Working and verified |

---

## 6. Video Editor & Playback Shortcuts

| Action Name | Windows / Linux | macOS | Operating Context | Conflict Handling | Implementation Status |
|---|---|---|---|---|---|
| Play / Pause | `Space` | `Space` | Video timeline active | Prevents page scroll; toggles video preview | Working and verified |
| Mute / Unmute | `M` | `M` | Video editor | Toggles audio track mute | Working and verified |
| Step Forward 1 Frame | `Right Arrow` | `Right Arrow` | Timeline focused | Steps playhead forward | Working and verified |
| Step Backward 1 Frame | `Left Arrow` | `Left Arrow` | Timeline focused | Steps playhead backward | Working and verified |
