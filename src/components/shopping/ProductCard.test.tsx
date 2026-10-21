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
  it.skip("matches the snapshot", () => {
    const { container } = render(<ProductCardWrapper />);
    expect(container).toMatchSnapshot();
  });
});

describe("Product Quantity Input", () => {
  it("increments item quantity on click", async () => {
    const user = userEvent.setup();
    render(<ProductCardWrapper />);
    const productQuantity = screen.getByRole("textbox", {
      name: "product-quantity",
    });
    expect(Number(productQuantity.ariaValueNow)).toEqual(0);
    const button = screen.getByRole("button", { name: "cart-increment" });
    await user.click(button);
    expect(Number(productQuantity.ariaValueNow)).toEqual(1);
  });

  it("does not decrement below 0", async () => {
    const user = userEvent.setup();
    render(<ProductCardWrapper />);
    const productQuantity = screen.getByRole("textbox", {
      name: "product-label",
    });
    expect(Number(productQuantity.ariaValueNow)).toEqual(0);
    const button = screen.getByRole("button", { name: "cart-decrement" });
    await user.click(button);
    expect(Number(productQuantity.ariaValueNow)).toEqual(0);
  });
});
