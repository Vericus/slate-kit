import { Record } from "immutable";

export type MediaTypes = "media" | "image" | "mediacaption";

export type BlockTypes = { [key in MediaTypes]?: string | null };

export interface CommonOption {
  onInsert: (...args: any[]) => any;
  onRemove: (...args: any[]) => any;
  type: string;
  externalRenderer: boolean;
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
  externalRenderer: boolean;
  mediaTypes: MediaOption;
}

export const defaultImageOptions: ImageOption = {
  widthOptions: ["full", "original", "fitToText"],
  defaultWidth: "fitToText",
  srcField: "src",
  widthField: "width",
  maxSize: 1024000,
  allowedExtensions: ["png", "tif", "gif", "bmp", "jpg"],
  type: "image",
  onInsert: () => {},
  onRemove: () => {},
  externalRenderer: false
};

export const defaultMediaTypesOption: MediaOption = {
  image: defaultImageOptions
};

export const defaultOptions: TypeOption = {
  type: "media",
  captionType: "mediaCaption",
  externalRenderer: false,
  mediaTypes: defaultMediaTypesOption,
  blockTypes: {}
};

export default class Options extends Record(defaultOptions) {
  type: string;
  captionType: string;
  externalRenderer: boolean;
  mediaTypes: MediaOption;
  blockTypes: BlockTypes;
  static create(option: Partial<TypeOption>): TypeOption {
    let options = defaultOptions;
    let mediaTypesOption = defaultOptions.mediaTypes;
    options = {
      ...options,
      blockTypes: {
        ...(option.blockTypes ? option.blockTypes : {}),
        media: option.type ? option.type : defaultOptions.type,
        mediacaption: option.captionType
          ? option.captionType
          : defaultOptions.captionType
      }
    };
    if (option.mediaTypes) {
      mediaTypesOption = {
        ...mediaTypesOption,
        ...option.mediaTypes
      };
    }

    options = {
      ...options,
      blockTypes: {
        ...options.blockTypes,
        ...Object.entries(mediaTypesOption).reduce(
          (mediaTypes, [mediaType, mediaOption]: [string, CommonOption]) => ({
            ...mediaTypes,
            [mediaType]: mediaOption.type
          }),
          {}
        )
      }
    };
    return new Options(options);
  }
}
