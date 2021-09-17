import { render, screen } from "@testing-library/react";
import WikiApp from "./WikiApp";

test("renders learn react link", () => {
  render(<WikiApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
