import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import ProductCard, { type ProductType } from "./ProductCard";

function ProductCardWrapper() {
  const dummyProduct: ProductType = {
    title: "Product Dummy",
    category: "Category Dummy",
    description:
      "Justo, laoreet sit amet cursus sit amet, dictum sit amet justo donec" +
      "enim diam, vulputate ut. Blandit volutpat maecenas volutpat",
    price: 69999,
  };

  return (
    <div>
      <ProductCard product={dummyProduct} />
    </div>
  );
}

describe("Product Card", () => {
  it("matches the snapshot", () => {
    const { container } = render(<ProductCardWrapper />);
    expect(container).toMatchSnapshot();
  });
});

describe("Product Quantity Input", () => {
  it("has default value of 1", () => {
    render(<ProductCardWrapper />);
    const productQuantity: HTMLInputElement = screen.getByRole("textbox", {
      name: "product-quantity",
    });
    expect(Number(productQuantity.value)).toEqual(1);
  });

  it("increments item quantity on click", async () => {
    const user = userEvent.setup();
    render(<ProductCardWrapper />);
    const productQuantity: HTMLInputElement = screen.getByRole("textbox", {
      name: "product-quantity",
    });
    expect(Number(productQuantity.value)).toEqual(1);
    const button = screen.getByRole("button", { name: "cart-increment" });
    await user.click(button);
    expect(Number(productQuantity.value)).toEqual(2);
  });

  it("does not decrement below 1", async () => {
    const user = userEvent.setup();
    render(<ProductCardWrapper />);
    const productQuantity: HTMLInputElement = screen.getByRole("textbox", {
      name: "product-quantity",
    });
    expect(Number(productQuantity.value)).toEqual(1);
    const button = screen.getByRole("button", { name: "cart-decrement" });
    await user.click(button);
    await user.click(button);
    await user.click(button);
    expect(Number(productQuantity.value)).toEqual(1);
  });
});
