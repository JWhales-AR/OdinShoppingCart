import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "./Hero";
import { createMemoryRouter, RouterProvider } from "react-router";

describe("App component", () => {
  it("renders shop now button", () => {
    const router = createMemoryRouter([{ path: "/", element: <Hero /> }]);
    render(<RouterProvider router={router} />);
    expect(screen.getByRole("link").textContent).toMatch(/shop now/i);
  });
});
