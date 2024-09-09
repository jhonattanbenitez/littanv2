import { ImageFormatType } from "./imageFormat";

export type ImageType = {
  id: number;
  attributes: {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      small?: ImageFormatType;
      medium?: ImageFormatType;
      large?: ImageFormatType;
      thumbnail?: ImageFormatType;
    };
    url: string;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    previewUrl: string | null;
    provider: string;
    provider_metadata: string | null;
  };
};