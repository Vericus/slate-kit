// ported from https://github.com/DefinitelyTyped/DefinitelyTyped
// definitions for slate-plain-serializer 0.5
// TypeScript Version: 2.6
import { BlockProperties, MarkProperties, Value } from "slate";

export interface DeserializeOptions {
  toJson?: boolean;
  defaultBlock?: BlockProperties;
  defaultMarks?: MarkProperties[] | Set<MarkProperties>;
}

export function deserialize(
  string: string,
  options?: DeserializeOptions
): Value;
export function serialize(value: Value): string;
