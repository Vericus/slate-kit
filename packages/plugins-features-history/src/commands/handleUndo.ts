// import { Value, Change } from "slate";
// import hasUndo from "./hasUndo";

// export default function handleUndo(
//   value: Value,
//   editorChange: Change | undefined,
//   onUndo: (change: Change) => void
// ) {
//   const change = editorChange || value.change();
//   const newChange = editorChange || change.value.change();
//   if (!hasUndo(value)) return change;
//   let newValue;
//   if (onUndo && typeof onUndo === "function") {
//     newValue = newChange.value;
//   } else {
//     newValue = change.value;
//   }
//   newValue.history.undos.some(undo => {
//     if (
//       undo.size === 1 &&
//       (undo.get(0).type === "set_selection" || undo.get(0).type === "set_value")
//     ) {
//       return false;
//     }
//     if (onUndo && typeof onUndo === "function") {
//       newChange.undo();
//     } else {
//       change.undo();
//     }
//     return true;
//   });
//   if (onUndo && typeof onUndo === "function") {
//     onUndo(newChange);
//   }
//   return onUndo ? change : newChange;
// }
