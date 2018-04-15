export default function isUndo(prevValue, currValue) {
  return prevValue.history.redos.size < currValue.history.redos.size;
}
