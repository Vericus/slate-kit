/**
 * modification from the original auto replace plugin
 * (https://github.com/ianstormtaylor/slate-plugins/tree/master/packages/slate-auto-replace)
 * but using command intercept instead of onKeyDown
 */
import Options, { TypeOptions, Matches } from "./options";

export interface Offset {
  start: number;
  end: number;
  total: number;
}

export default function AutoReplace(pluginOptions: Partial<TypeOptions> = {}) {
  const options = Options.create(pluginOptions);
  const { before, after, trigger, command } = options;

  function getMatches(value): Matches | null {
    const { selection, startText } = value;
    const { start } = selection;
    const { text } = startText;
    let after: any[] | null = null;
    let before: any[] | null = null;

    if (options.after) {
      const string = text.slice(start.offset);
      after = string.match(options.after);
    }

    if (options.before) {
      const string = text.slice(0, start.offset);
      before = string.match(options.before);
    }

    // If both sides, require that both are matched, otherwise null.
    if (options.before && options.after && !before) after = null;
    if (options.before && options.after && !after) before = null;

    // Return null unless we have a match.
    if (!before && !after) return null;

    if (after) after[0] = after[0].replace(/\s+$/, "");
    if (before) before[0] = before[0].replace(/^\s+/, "");

    return { before, after };
  }

  function getOffsets(matches, start) {
    const { before, after } = matches;
    const offsets: Offset[] = [];
    let totalRemoved = 0;

    if (before) {
      const match = before[0];
      let startOffset = 0;
      let matchIndex = 0;

      before.slice(1, before.length).forEach(current => {
        if (current === undefined) return;

        matchIndex = match.indexOf(current, matchIndex);
        startOffset = start - totalRemoved + matchIndex - match.length;

        offsets.push({
          start: startOffset,
          end: startOffset + current.length,
          total: current.length
        });

        totalRemoved += current.length;
        matchIndex += current.length;
      });
    }

    if (after) {
      const match = after[0];
      let startOffset = 0;
      let matchIndex = 0;

      after.slice(1, after.length).forEach(current => {
        if (current === undefined) return;

        matchIndex = match.indexOf(current, matchIndex);
        startOffset = start - totalRemoved + matchIndex;

        offsets.push({
          start: startOffset,
          end: startOffset + current.length,
          total: 0
        });

        totalRemoved += current.length;
        matchIndex += current.length;
      });
    }

    return offsets;
  }

  function replace(editor, next) {
    const { value } = editor;
    const { startBlock, selection } = value;
    if (!startBlock) return next();

    const matches = getMatches(value);
    if (!matches) return next();

    const { start } = selection;
    let startOffset = start.offset;
    let totalRemoved = 0;
    const offsets = getOffsets(matches, startOffset);
    offsets.forEach(offset => {
      editor
        .moveAnchorTo(offset.start)
        .moveFocusTo(offset.end)
        .delete();
      totalRemoved += offset.total;
    });

    startOffset -= totalRemoved;
    editor.moveTo(startOffset);

    return command(editor, matches, next);
  }

  return {
    onCommand: (command, editor, next) => {
      const { type, args } = command;
      if (type === "insertText" && args[0] && args[0] === trigger) {
        return replace(editor, next);
      }
      return next();
    }
  };
}
