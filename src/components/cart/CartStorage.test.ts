import CartStorage from "./CartStorage";
import type { ProductStoredType } from "./CartStorage";
import { describe, it, expect } from "vitest";

const dummyProducts: ProductStoredType[] = [
  {
    id: 1,
    title: "Product #1",
    description: "Product Description",
    category: "Product",
    price: 9999,
    quantity: 5,
  },
  {
    id: 1,
    title: "Product #1",
    description: "Product Description",
    category: "Product",
    price: 9999,
    quantity: 2,
  },
  {
    id: 2,
    title: "Product #1",
    description: "Product Description",
    category: "Product",
    price: 9999,
    quantity: 4,
  },
  {
    id: 4,
    title: "Product #1",
    description: "Product Description",
    category: "Product",
    price: 9999,
    quantity: 1,
  },
];

describe("Cart Storage", () => {
  it("initializes with empty list", () => {
    const cart = new CartStorage();
    expect(cart.getProductsInCart().length).toEqual(0);
  });

  it("adds products as expected", () => {
    const cart = new CartStorage();
    dummyProducts.forEach((product) => cart.addProduct(product));
    expect(cart.getProductsInCart().length).toEqual(3);
    const product1 = cart
      .getProductsInCart()
      .find((product) => product.id === 1);
    expect(product1).toBeDefined();
    expect(product1!.quantity).toEqual(2);
  });

  it("removes products as expected", () => {
    const cart = new CartStorage();
    dummyProducts.forEach((product) => cart.addProduct(product));
    cart.removeProduct(1);
    const product1 = cart
      .getProductsInCart()
      .find((product) => product.id === 1);
    expect(product1).not.toBeDefined();
    expect(cart.getProductsInCart().length).toEqual(2);
  });
});
