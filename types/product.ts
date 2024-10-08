import { CategoryType } from "./category";
import { ImageType } from "./image";

export type ProductType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  id: number;
  attributes: {
    productName: string;
    active: boolean;
    price: number;
    description: string;
    typeOfSleeve: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    isFeatured: boolean;
    images: {
      data: ImageType[];
    };
    category: {
      data: CategoryType;
    };
  };
};
