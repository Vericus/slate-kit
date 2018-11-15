import { Editor } from "slate";

export default function toolbar(options) {
  const { when, render } = options;
  return {
    renderToolbar: (props, editor: Editor, next) => {
      const { node } = props;
      if (editor.props.isReadOnly) return;
      if (!when(editor, node)) return next();
      return render(props);
    }
  };
}
