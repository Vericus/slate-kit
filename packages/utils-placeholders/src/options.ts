import { Record } from "immutable";
import { Editor, Node } from "slate";

export interface TypeOptions {
  type: string;
  when: (editor: Editor, node: Node) => boolean;
  placeholder: string | undefined;
  render: ((props) => JSX.Element) | undefined;
}

const defaultOption: TypeOptions = {
  type: "",
  when: (_editor: Editor, _node: Node) => false,
  placeholder: undefined,
  render: undefined
};

export default class Options extends Record(defaultOption) {
  public type: string;

  public when: (editor: Editor, node: Node) => boolean;

  public placeholder: string | undefined;

  public render: ((props) => JSX.Element) | undefined;

  public static create(option: Partial<TypeOptions>): TypeOptions {
    const options = {
      ...defaultOption,
      ...option
    };
    return new Options(options);
  }
}
