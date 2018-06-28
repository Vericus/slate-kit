// @flow
import type { Change } from "slate";

// Doesn't do anything
export default function createChanges() {
  return {
    deleteImage: (change: Change) => {
      // change.insertText("Hello World");
      console.log("Deleting images.");
      return change;
    }
  };
}
