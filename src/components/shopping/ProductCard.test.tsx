import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import ProductCard, { type ProductType } from "./ProductCard";
import type { CartItemContextType } from "../../App";
import { createMemoryRouter, RouterProvider, Outlet } from "react-router";

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

function CartItemContextRouterProvider({
  cartItemContext,
}: {
  cartItemContext?: CartItemContextType;
}) {
  if (!cartItemContext) {
    cartItemContext = {
      cartItemCount: 0,
      incrCartItemCount: () => undefined,
    };
  }
  const router = createMemoryRouter([
    {
      path: "/",
      element: (
        <div>
          <Outlet context={cartItemContext} />
        </div>
      ),
      children: [{ index: true, element: <ProductCardWrapper /> }],
    },
  ]);
  return <RouterProvider router={router} />;
}

describe("Product Quantity Input", () => {
  it("has default value of 1", () => {
    render(<CartItemContextRouterProvider />);
    const productQuantity: HTMLInputElement = screen.getByRole("textbox", {
      name: "product-quantity",
    });
    expect(Number(productQuantity.value)).toEqual(1);
  });

  it("increments item quantity on click", async () => {
    const user = userEvent.setup();
    render(<CartItemContextRouterProvider />);
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
    render(<CartItemContextRouterProvider />);
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

describe("Product Card", () => {
  it("matches the snapshot", () => {
    const { container } = render(<CartItemContextRouterProvider />);
    expect(container).toMatchSnapshot();
  });

  it("increments the cart item count", async () => {
    let cartItemCount = 0;
    const incrCartItemCount = (incr: number) => {
      cartItemCount += incr;
    };
    const user = userEvent.setup();
    render(
      <CartItemContextRouterProvider
        cartItemContext={{ cartItemCount, incrCartItemCount }}
      />,
    );
    const cartIncrButton = screen.getByRole("button", {
      name: "cart-increment",
    });
    const addToCartButton = screen.getByRole("button", {
      name: "Add to Cart",
    });

    expect(cartItemCount).toEqual(0);
    // Default value for product quantity is 1, first increment brings it to 2
    await user.click(cartIncrButton);
    // Default value of cart is 0, adding product brings it to 2
    await user.click(addToCartButton);
    expect(cartItemCount).toEqual(2);
    // Adding to cart resets product quantity to 1, two increments brings it to 3
    await user.click(cartIncrButton);
    await user.click(cartIncrButton);
    // 2 items in cart, adding 3 more
    await user.click(addToCartButton);
    expect(cartItemCount).toEqual(5);
  });
});
