/**
 * modification from the original auto replace plugin
 * (https://github.com/ianstormtaylor/slate-plugins/tree/master/packages/slate-auto-replace)
 * but using command intercept instead of onKeyDown
 */
import { Plugin } from "slate";
import Options, { TypeOptions, Matches } from "./options";

export interface Offset {
  start: number;
  end: number;
  total: number;
}

export default function AutoReplace(
  pluginOptions: Partial<TypeOptions> = {}
): Plugin {
  const options = Options.create(pluginOptions);
  const { before, after, trigger, command } = options;

  function getMatches(value): Matches | null {
    const { selection, startText } = value;
    const { start } = selection;
    const { text } = startText;
    let afterMatches: any[] | null = null;
    let beforeMatches: any[] | null = null;

    if (after) {
      const textString = text.slice(start.offset);
      afterMatches = textString.match(after);
    }

    if (before) {
      const textString = text.slice(0, start.offset);
      beforeMatches = textString.match(before);
    }

    // If both sides, require that both are matched, otherwise null.
    if (before && after && !beforeMatches) afterMatches = null;
    if (before && after && !afterMatches) beforeMatches = null;

    // Return null unless we have a match.
    if (!beforeMatches && !afterMatches) return null;

    if (afterMatches) afterMatches[0] = afterMatches[0].replace(/\s+$/, "");
    if (beforeMatches) beforeMatches[0] = beforeMatches[0].replace(/^\s+/, "");

    return { beforeMatches, afterMatches };
  }

  function getOffsets(matches, start) {
    const { beforeMatches, afterMatches } = matches;
    const offsets: Offset[] = [];
    let totalRemoved = 0;

    if (beforeMatches) {
      const match = beforeMatches[0];
      let startOffset = 0;
      let matchIndex = 0;

      beforeMatches.slice(1, beforeMatches.length).forEach(current => {
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

    if (afterMatches) {
      const match = afterMatches[0];
      let startOffset = 0;
      let matchIndex = 0;

      afterMatches.slice(1, afterMatches.length).forEach(current => {
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
    onCommand: (editorCommand, editor, next) => {
      const { type, args } = editorCommand;
      if (type === "insertText" && args && args[0] && args[0] === trigger) {
        return replace(editor, next);
      }
      return next();
    }
  };
}
