import userEvent from "@testing-library/user-event";
import { Form } from "../../components/Form";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../../styles/theme/default";
import { describe, vi, it, expect, beforeEach } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";

const user = userEvent.setup();

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

const handleSubmitMock = vi.fn();

describe("Form Component", () => {
  beforeEach(() => {
    handleSubmitMock.mockClear();

    render(
      <ThemeProvider theme={defaultTheme}>
        <Form onSubmit={handleSubmitMock} />
      </ThemeProvider>
    );
  });

  it("should be able to render form fields", () => {
    expect(
      screen.getByRole("spinbutton", {
        name: /dólar/i,
      })
    ).toBeVisible();

    expect(
      screen.getByRole("spinbutton", {
        name: /taxa do estado/i,
      })
    ).toBeVisible();

    expect(
      screen.getByRole("radio", {
        name: /dinheiro/i,
      })
    ).toBeVisible();

    expect(
      screen.getByRole("radio", {
        name: /cartão/i,
      })
    ).toBeVisible();

    expect(
      screen.getByRole("button", {
        name: /converter/i,
      })
    ).toBeVisible();
  });

  it("should display error messages for required fields and prevent form submission", async () => {
    await act(async () => {
      await user.click(
        screen.getByRole("button", {
          name: /converter/i,
        })
      );
    });

    await waitFor(() => {
      expect(screen.getByText("O campo dólar é obrigatório.")).toBeVisible();

      expect(
        screen.getByText("O campo taxa do estado é obrigatório.")
      ).toBeVisible();

      expect(
        screen.getByText("Você precisa selecionar uma forma de pagamento.")
      ).toBeVisible();

      expect(handleSubmitMock).not.toHaveBeenCalled();
    });
  });

  it("should display an error for invalid amount dollar", async () => {
    await act(async () => {
      await user.type(
        screen.getByRole("spinbutton", {
          name: /dólar/i,
        }),
        "0"
      );

      await user.click(
        screen.getByRole("button", {
          name: /converter/i,
        })
      );
    });

    await waitFor(() => {
      expect(
        screen.getByText("A quantidade deve ser maior que 0")
      ).toBeVisible();

      expect(handleSubmitMock).not.toHaveBeenCalled();
    });
  });

  it("should display an error for invalid state tax", async () => {
    await act(async () => {
      await user.type(
        screen.getByRole("spinbutton", {
          name: /taxa do estado/i,
        }),
        "101"
      );

      await user.click(
        screen.getByRole("button", {
          name: /converter/i,
        })
      );
    });

    await waitFor(() => {
      expect(
        screen.getByText("A taxa do estado deve ser no máximo 100%.")
      ).toBeVisible();

      expect(handleSubmitMock).not.toHaveBeenCalled();
    });
  });

  it("should display an error for missing payment method", async () => {
    await act(async () => {
      await user.click(
        screen.getByRole("button", {
          name: /converter/i,
        })
      );
    });

    await waitFor(() => {
      expect(
        screen.getByText("Você precisa selecionar uma forma de pagamento.")
      ).toBeVisible();

      expect(handleSubmitMock).not.toHaveBeenCalled();
    });
  });

  it("should be able to submit the form with valid data", async () => {
    await act(async () => {
      await user.type(
        screen.getByRole("spinbutton", {
          name: /dólar/i,
        }),
        "10"
      );

      await user.type(
        screen.getByRole("spinbutton", {
          name: /taxa do estado/i,
        }),
        "5.5"
      );

      await user.click(
        screen.getByRole("radio", {
          name: /dinheiro/i,
        })
      );

      await user.click(
        screen.getByRole("button", {
          name: /converter/i,
        })
      );
    });

    await waitFor(() => {
      expect(handleSubmitMock).toHaveBeenCalledWith({
        amount: 10,
        stateTax: 5.5,
        paymentMethod: "money",
      });
    });
  });
});
