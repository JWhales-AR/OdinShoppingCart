import type { ProductType } from "./ProductCard";
import { useState, useEffect } from "react";

type FakeStoreProductObjectType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

function toProductType(
  fsProductObject: FakeStoreProductObjectType,
): ProductType {
  const { image, ...rest } = fsProductObject;
  return { ...rest, imgSrc: image };
}

export default function useFakeStoreProducts(): {
  loading: boolean;
  products: ProductType[] | null;
} {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<ProductType[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error(`Failed to fetch ${response.status}`);
        const productsRaw: FakeStoreProductObjectType[] = await response.json();
        if (!cancelled)
          setProducts(
            productsRaw.map((productRaw) => toProductType(productRaw)),
          );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  return { loading, products };
}
