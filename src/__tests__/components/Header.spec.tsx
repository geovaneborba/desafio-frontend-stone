import { render, screen } from "@testing-library/react";
import { Header } from "../../components/Header";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../../styles/theme/default";
import { vi, expect, it, describe } from "vitest";

const mockedFormat = vi.fn();

vi.mock("dayjs", () => ({
  default: vi.fn(() => ({
    format: mockedFormat,
  })),
}));

describe("Header component", () => {
  it("should be able to render header", async () => {
    mockedFormat.mockImplementation(() => "03 de janeiro de 2024 | 12:34 UTC");

    render(
      <ThemeProvider theme={defaultTheme}>
        <Header />
      </ThemeProvider>
    );

    expect(screen.getByAltText("Logo da Stone")).toBeInTheDocument();
    expect(
      screen.getByText("Dados de câmbio disponibilizados pela Morningstar.")
    ).toBeInTheDocument();

    expect(
      screen.getByText("03 de janeiro de 2024 | 12:34 UTC")
    ).toBeInTheDocument();
  });
});
