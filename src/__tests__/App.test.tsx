import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../containers/App";

test("renders Loading when page loads", () => {
  render(<App />);
  const linkElement = screen.getByText(/Loading/i);
  expect(linkElement).toBeInTheDocument();
});
