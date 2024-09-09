import { useEffect, useState } from "react";

// Define the expected structure for the product image formats
interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

// Define the expected structure for product images
interface Image {
  id: number;
  attributes: {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      small?: ImageFormat;
      medium?: ImageFormat;
      large?: ImageFormat;
      thumbnail?: ImageFormat;
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
}

// Define the structure for category
interface Category {
  id: number;
  attributes: {
    categoryName: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

// Define the expected structure for the product data
interface Product {
  id: number;
  attributes: {
    productName: string;
    active: boolean;
    price: number;
    description: string;
    type: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    isFeatured: boolean;
    images: {
      data: Image[];
    };
    category: {
      data: Category;
    };
  };
}

// Define the expected structure for the API response
interface ApiResponse {
  data: Product[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export function useGetFeaturedProducts() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[isFeatured][$eq]=true&populate=*`;
  const [result, setResult] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url);
        const json: ApiResponse = await res.json();
        setResult(json.data);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    })();
  }, [url]);

  return { loading, result, error };
}
