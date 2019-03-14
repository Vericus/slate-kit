import { Record } from "immutable";

export type MediaTypes = "media" | "image" | "mediacaption";

export type BlockTypes = { [key in MediaTypes]?: string | null };

export interface CommonOption {
  onInsert: (...args: any[]) => any;
  type: string;
}

export interface ImageOption extends CommonOption {
  widthOptions: string[];
  defaultWidth: string;
  srcField: string;
  widthField: string;
  maxSize: number;
  allowedExtensions: string[];
}

export interface MediaOption {
  image?: ImageOption;
}

export interface TypeOption {
  blockTypes: BlockTypes;
  type: string;
  captionType: string;
  captionHideField: string | null;
  renderer?: (...args: any[]) => any;
  mediaTypes: MediaOption;
  withHandlers: boolean;
  toolbarRenderer?: (props: any) => JSX.Element;
  label: string;
}

export const defaultImageOptions: ImageOption = {
  widthOptions: ["full", "original", "fitToText"],
  defaultWidth: "fitToText",
  srcField: "src",
  widthField: "width",
  maxSize: 1024000,
  allowedExtensions: ["png", "tif", "gif", "bmp", "jpg", "jpeg"],
  type: "image",
  onInsert: () => {}
};

export const defaultMediaTypesOption: MediaOption = {
  image: defaultImageOptions
};

export const defaultOptions: TypeOption = {
  type: "media",
  captionHideField: null,
  captionType: "mediaCaption",
  renderer: undefined,
  mediaTypes: defaultMediaTypesOption,
  blockTypes: {},
  withHandlers: true,
  toolbarRenderer: undefined,
  label: "media"
};

export default class Options extends Record(defaultOptions) {
  public type: string;

  public captionType: string;

  public captionHideField: string | null;

  public renderer: (...args: any[]) => any;

  public mediaTypes: MediaOption;

  public blockTypes: BlockTypes;

  public withHandlers: boolean;

  public label: string;

  public static create(option: Partial<TypeOption>): TypeOption {
    let options = {
      ...defaultOptions,
      ...option
    };
    let mediaTypesOption = defaultOptions.mediaTypes;
    if (option.mediaTypes) {
      mediaTypesOption = {
        ...mediaTypesOption,
        ...Object.entries(option.mediaTypes).reduce(
          (acc, [mediaType, mediaTypeOption]) => {
            return {
              ...acc,
              [mediaType]: {
                ...(mediaTypesOption[mediaType]
                  ? mediaTypesOption[mediaType]
                  : {}),
                ...mediaTypeOption
              }
            };
          },
          {}
        )
      };
    }
    options = {
      ...options,
      mediaTypes: mediaTypesOption,
      blockTypes: {
        ...options.blockTypes,
        ...Object.entries(mediaTypesOption).reduce(
          (mediaTypes, [mediaType, mediaOption]: [string, CommonOption]) => ({
            ...mediaTypes,
            [mediaType]: mediaOption.type
          }),
          {}
        ),
        media: option.type ? option.type : defaultOptions.type,
        mediacaption: option.captionType
          ? option.captionType
          : defaultOptions.captionType
      }
    };
    return new Options(options);
  }
}
