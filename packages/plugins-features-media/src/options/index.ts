import { Record } from "immutable";

export interface CommonOption {
  onInsert: (...args: any[]) => any;
  onRemove: (...args: any[]) => any;
  renderer: (props: any) => any;
  type: string;
  externalRenderer: boolean;
}

export interface ImageOption extends CommonOption{
  widthOptions: string[];
  defaultWidth: string;
  srcField: string;
  widthField: string;
  maxSize: number;
  allowedExtensions: string[];
}

export interface MediaTypes {
  image?: ImageOption;
}

export interface TypeOption {
  type: string;
  captionType: string;
  renderer: (props: any) => any | void;
  captionRenderer: (props: any) => any | void;
  externalRenderer: boolean;
  mediaTypes: MediaTypes;
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
  renderer: () => {},
  externalRenderer: false
};

export const defaultMediaTypesOption: MediaTypes = {
  image: defaultImageOptions
};

export const defaultOptions: TypeOption = {
  type: "media",
  captionType: "mediaCaption",
  renderer: () => {},
  captionRenderer: () => {},
  externalRenderer: false,
  mediaTypes: defaultMediaTypesOption
};

export default class Options extends Record(defaultOptions, "media option") {
  type: string;
  captionType: string;
  renderer: (...args: any[]) => any;
  captionRenderer: (...args: any[]) => any;
  externalRenderer: boolean;
  mediaTypes: MediaTypes;
}
