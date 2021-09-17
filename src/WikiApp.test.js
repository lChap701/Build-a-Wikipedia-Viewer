import { render, screen } from "@testing-library/react";
import WikiApp from "./WikiApp";

test("'Jump To Random Article' link", () => {
  render(<WikiApp />);
  const linkElement = screen.getByText(/Jump To Random Article/i);
  expect(linkElement).toBeInTheDocument();
});

test("'Settings' link", () => {
  render(<WikiApp />);
  const linkElement = screen.getByText(/Settings/i);
  expect(linkElement).toBeInTheDocument();
});
