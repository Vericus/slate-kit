import { Editor, SlateError, Block, Text } from "slate";
import { TypeOption, CommonOption } from "../options";

export default function createSchema(opts: TypeOption) {
  const { type, mediaTypes, captionType } = opts;
  return {
    blocks: {
      [type]: {
        nodes: [
          {
            match: Object.values(mediaTypes).reduce(
              (allowedTypes, mediaType: CommonOption) => [
                ...allowedTypes,
                {
                  type: mediaType.type
                }
              ],
              []
            ),
            min: 1,
            max: 1
          },
          {
            match: [{ type: captionType }],
            min: 0,
            max: 1
          }
        ],
        last: {
          type: nodeType => {
            return [
              ...Object.values(mediaTypes).reduce(
                (acc, mediaType) => [...acc, mediaType.type],
                []
              ),
              captionType
            ].includes(nodeType);
          }
        },
        normalize: (editor: Editor, error: SlateError) => {
          switch (error.code) {
            case "child_unknown":
              editor.removeNodeByKey(error.child.key);
              break;
            case "last_child_type_invalid":
              if (Block.isBlock(error.child)) {
                editor.setNodeByKey(error.child.key, captionType);
              } else {
                editor.unwrapBlockByKey(error.node.key);
              }
              break;
            default:
              break;
          }
        }
      },
      [captionType]: {
        parent: { type },
        nodes: [{ match: [{ object: "text" }], min: 1 }],
        normalize: (editor: Editor, error: SlateError) => {
          switch (error.code) {
            case "parent_type_invalid":
              editor.unwrapNodeByKey(error.parent.key);
              break;
            case "child_object_invalid":
              editor.removeNodeByKey(error.child.key);
              break;
            case "child_required":
              editor.insertNodeByKey(error.node.key, 0, Text.create(""));
              break;
            default:
              break;
          }
        }
      },
      ...Object.values(mediaTypes).reduce(
        (acc: object, mediaType: CommonOption) => ({
          ...acc,
          [mediaType.type]: {
            parent: { type },
            isVoid: true,
            data: Object.keys(mediaType).reduce((data, mediaField) => {
              const match = mediaField.match(/(.*)Field/);
              if (match) {
                const dataField = match.length >= 1 ? match[1] : undefined;
                if (
                  dataField &&
                  mediaType[mediaField] &&
                  mediaType[`${dataField}Options`] &&
                  Array.isArray(mediaType[`${dataField}Options`])
                ) {
                  return {
                    ...data,
                    [mediaType[mediaField]]: value =>
                      mediaType[`${dataField}Options`].includes(value)
                  };
                }
              }
              return data;
            }, {}),
            normalize: (editor: Editor, error: SlateError) => {
              const { key, node, code } = error;
              const defaultKey = key
                ? `default${key.replace(/\w/, c => c.toUpperCase())}`
                : "";
              switch (code) {
                case "parent_type_invalid":
                  editor.wrapBlockByKey(error.node.key, type);
                  break;
                case "node_data_invalid":
                  if (
                    mediaType[`${key}Options`] &&
                    mediaType[defaultKey] &&
                    Block.isBlock(node)
                  ) {
                    editor.setNodeByKey(node.key, {
                      data: node.data.set(key, mediaType[defaultKey])
                    });
                  }
                  break;
                default:
                  break;
              }
            }
          }
        }),
        {}
      )
    }
  };
}
