export default function isRedo(prevValue, currValue) {
  return prevValue.history.redos.size > currValue.history.redos.size;
}
