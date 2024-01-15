import { screen, render } from "@testing-library/react";
import { HomePage } from "../../pages/HomePage";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../../styles/theme/default";
import { vi, describe, it, expect } from "vitest";

vi.mock("react-router-dom", () => {
  return {
    useNavigate: () => vi.fn(),
  };
});

describe("Home page", () => {
  it("should renders homepage", async () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <HomePage />
      </ThemeProvider>
    );

    expect(screen.getByText("Dólar")).toBeVisible();
    expect(screen.getByText("Taxa do estado")).toBeVisible();
  });
});
