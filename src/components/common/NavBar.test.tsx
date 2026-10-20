import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NavBar from "./NavBar";
import { createMemoryRouter, RouterProvider } from "react-router";
import ThemeProvider from "../../context/ThemeProvider";

function NavBarWrapper() {
  return (
    <ThemeProvider>
      <NavBar />
    </ThemeProvider>
  );
}

describe("NavBar component", () => {
  it("has the rosegrid logo", () => {
    const router = createMemoryRouter([
      { path: "/", element: <NavBarWrapper /> },
    ]);
    render(<RouterProvider router={router} />);
    expect(screen.getByRole("button").textContent).toEqual("ROSEGRIDALEX");
  });
  it("matches snapshot", () => {
    const router = createMemoryRouter([
      { path: "/", element: <NavBarWrapper /> },
    ]);
    const { container } = render(<RouterProvider router={router} />);
    expect(container).toMatchSnapshot();
  });
});
