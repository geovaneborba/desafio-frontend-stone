import {
  CurrencyDollar,
  Percent,
  ArrowsLeftRight,
} from "@phosphor-icons/react";
import {
  ButtonConvert,
  Container,
  CurrencyGroup,
  CurrencyWrapper,
  InputContainer,
  InputContainerPaymentMethod,
  InputStateTax,
  PaymentMethodSelection,
  PaymentMethodWrapper,
} from "./styles";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const currencySchema = z.object({
  amount: z
    .number({
      required_error: "O campo dólar é obrigatório.",
    })
    .min(1, "A quantidade deve ser maior que 0"),
  stateTax: z
    .number({
      required_error: "O campo taxa do estado é obrigatório.",
    })
    .min(0)
    .max(100, "A taxa do estado deve ser no máximo 100%."),
  paymentMethod: z.union([
    z.literal("money", {
      errorMap: () => ({
        message: "Você precisa selecionar uma forma de pagamento.",
      }),
    }),
    z.literal("credit", {
      errorMap: () => ({
        message: "Você precisa selecionar uma forma de pagamento.",
      }),
    }),
  ]),
});

type CurrencyForm = z.infer<typeof currencySchema>;

type FormProps = {
  onSubmit?: (data: CurrencyForm) => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Form({ onSubmit }: FormProps) {
  const {
    register,
    handleSubmit,

    formState: { errors, isValid },
  } = useForm<CurrencyForm>({
    mode: "onSubmit",
    resolver: zodResolver(currencySchema),
  });
  const navigate = useNavigate();

  const handleCurrencySubmit = (data: CurrencyForm) => {
    if (onSubmit) {
      onSubmit(data);
    }

    navigate("/resume", {
      state: {
        data,
      },
    });
  };

  return (
    <Container onSubmit={handleSubmit(handleCurrencySubmit)}>
      <CurrencyWrapper>
        <CurrencyGroup>
          <label htmlFor="dollar">Dólar</label>
          <InputContainer>
            <CurrencyDollar size={16} />
            <input
              type="number"
              placeholder="1,00"
              min={0}
              id="dollar"
              {...register("amount", {
                setValueAs: (value) =>
                  value === "" ? undefined : Number(value),
              })}
            />
          </InputContainer>
          {errors.amount && errors.amount.message && (
            <span>{errors.amount.message}</span>
          )}
        </CurrencyGroup>

        <CurrencyGroup>
          <label htmlFor="stateTax">Taxa do estado</label>
          <InputStateTax>
            <input
              type="number"
              min={0}
              step={0.01}
              placeholder="0"
              id="stateTax"
              {...register("stateTax", {
                setValueAs: (value) =>
                  value === "" ? undefined : Number(value),
              })}
            />
            <Percent size={16} />
          </InputStateTax>
          {errors.stateTax && errors.stateTax.message && (
            <span>{errors.stateTax.message}</span>
          )}
        </CurrencyGroup>
      </CurrencyWrapper>

      <PaymentMethodSelection>
        <label htmlFor="money">Tipo de compra</label>

        <PaymentMethodWrapper>
          <InputContainerPaymentMethod>
            <input
              type="radio"
              id="money"
              value={"money"}
              {...register("paymentMethod")}
            />
            <label htmlFor="money">Dinheiro</label>
          </InputContainerPaymentMethod>

          <InputContainerPaymentMethod>
            <input
              type="radio"
              id="credit"
              value={"credit"}
              {...register("paymentMethod")}
            />
            <label htmlFor="credit">Cartão</label>
          </InputContainerPaymentMethod>
        </PaymentMethodWrapper>

        {errors.paymentMethod && errors.paymentMethod.message && (
          <span>{errors.paymentMethod.message}</span>
        )}
      </PaymentMethodSelection>

      <ButtonConvert type="submit" isValid={isValid}>
        <ArrowsLeftRight size={16} />
        Converter
      </ButtonConvert>
    </Container>
  );
}
