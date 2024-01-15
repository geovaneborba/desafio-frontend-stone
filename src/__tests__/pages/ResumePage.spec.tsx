import { render, screen, waitFor } from "@testing-library/react";
import { ResumePage } from "../../pages/ResumePage";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../../styles/theme/default";
import { vi } from "vitest";
import { HomePage } from "../../pages/HomePage";
import { api } from "../../lib/axios";

const mockedNavigate = vi.fn();

const { mockedUseDollarQuery } = vi.hoisted(() => ({
  mockedUseDollarQuery: vi.fn(),
}));

vi.mock("react-router-dom", async (importOriginal) => ({
  ...(await importOriginal()),
  useNavigate: () => mockedNavigate,
}));

vi.mock("../../hooks/useDollarQuery", () => ({
  useDollarQuery: mockedUseDollarQuery,
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe("ResumePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders Resume page with correct data", async () => {
    mockedUseDollarQuery.mockImplementation(() => ({
      status: "success",
      data: 4.2,
    }));

    const mockedRoute = ["/resume"];

    const mockedLocationState = {
      data: {
        amount: 10,
        stateTax: 5.5,
        paymentMethod: "money",
      },
    };

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={defaultTheme}>
          <MemoryRouter initialEntries={mockedRoute}>
            <Routes
              location={{
                pathname: "/resume",
                state: mockedLocationState,
              }}
            >
              <Route path="/" element={<HomePage />} />
              <Route path="/resume" element={<ResumePage />} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Voltar")).toBeInTheDocument();
      expect(screen.getByText("O resultado do cálculo é")).toBeInTheDocument();
      expect(screen.getByText("$1,00 = R$ 4,20")).toBeInTheDocument();
    });
  });

  it("should redirect to the Home page if data is not provided", async () => {
    const mockedRoute = ["/resume"];

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={defaultTheme}>
          <MemoryRouter initialEntries={mockedRoute}>
            <Routes
              location={{
                pathname: "/resume",
              }}
            >
              <Route path="/" element={<HomePage />} />
              <Route path="/resume" element={<ResumePage />} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </QueryClientProvider>
    );

    expect(mockedNavigate).toHaveBeenCalledWith("/", { replace: true });
  });

  it("should throw error if fetch fails", async () => {
    const mockError = new Error("Erro ao buscar cotação do dólar");
    const spy = vi.spyOn(api, "get").mockRejectedValue(mockError);

    const mockedRoute = ["/resume"];

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={defaultTheme}>
          <MemoryRouter initialEntries={mockedRoute}>
            <Routes
              location={{
                pathname: "/resume",
              }}
            >
              <Route path="/" element={<HomePage />} />
              <Route path="/resume" element={<ResumePage />} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(spy).rejects.toThrow(mockError);
    });
  });

  it("should renders error message if fetch fails", async () => {
    const mockedRoute = ["/resume"];

    const mockedLocationState = {
      data: {
        amount: 10,
        stateTax: 5.5,
        paymentMethod: "money",
      },
    };

    mockedUseDollarQuery.mockImplementation(() => ({
      error: true,
    }));

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={defaultTheme}>
          <MemoryRouter initialEntries={mockedRoute}>
            <Routes
              location={{
                pathname: "/resume",
                state: mockedLocationState,
              }}
            >
              <Route path="/" element={<HomePage />} />
              <Route path="/resume" element={<ResumePage />} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          /Aconteceu um erro ao buscar cotação do dólar. Tente novamente mais tarde!/i
        )
      ).toBeInTheDocument();
    });
  });

  it("should renders loading message when fetching", async () => {
    const mockedRoute = ["/resume"];

    const mockedLocationState = {
      data: {
        amount: 10,
        stateTax: 5.5,
        paymentMethod: "money",
      },
    };

    mockedUseDollarQuery.mockImplementation(() => ({
      status: "pending",
    }));

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={defaultTheme}>
          <MemoryRouter initialEntries={mockedRoute}>
            <Routes
              location={{
                pathname: "/resume",
                state: mockedLocationState,
              }}
            >
              <Route path="/" element={<HomePage />} />
              <Route path="/resume" element={<ResumePage />} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Carregando.../i)).toBeInTheDocument();
    });
  });
});
