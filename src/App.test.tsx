import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders heading and featured by default", () => {
    window.history.replaceState({}, "", "/");
    render(<App />);
    expect(screen.getByRole("heading", { name: "Bitcoin Apps Directory" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Featured" })).toBeInTheDocument();
    expect(screen.getByText("Categories")).toBeInTheDocument();
  });

  it("hides featured and filters while searching", async () => {
    window.history.replaceState({}, "", "/");
    render(<App />);
    const input = screen.getByLabelText("Search apps");
    await userEvent.type(input, "wallet");
    expect(screen.queryByRole("heading", { name: "Featured" })).not.toBeInTheDocument();
    expect(screen.queryByText("Categories")).not.toBeInTheDocument();
  });

  it("hydrates from URL query state", () => {
    window.history.replaceState({}, "", "/?categories=ai&q=ai");
    render(<App />);
    expect(screen.getByDisplayValue("ai")).toBeInTheDocument();
  });
});
