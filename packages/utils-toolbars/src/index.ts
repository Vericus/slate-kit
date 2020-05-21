import { Editor, Plugin } from "slate";

export default function toolbar(options): Plugin {
  const { when, render } = options;
  return {
    renderToolbar: (props, editor: Editor, next) => {
      const { node } = props;
      if (editor.props.isReadOnly) return undefined;
      if (!when(editor, node)) return next();
      return render(props);
    },
  };
}
