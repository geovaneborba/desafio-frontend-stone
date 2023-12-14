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
  amount: z.number(),
  stateTax: z.number().min(1).max(100),
  paymentMethod: z.union([z.literal("money"), z.literal("credit")]),
});

type CurrencyForm = z.infer<typeof currencySchema>;

export function Form() {
  const { register, handleSubmit } = useForm<CurrencyForm>({
    resolver: zodResolver(currencySchema),
  });
  const navigate = useNavigate();

  const handleCurrencySubmit = (data: CurrencyForm) => {
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
          <label htmlFor="">Dólar</label>
          <InputContainer>
            <CurrencyDollar size={16} />
            <input
              type="number"
              placeholder="1,00"
              min={0}
              required
              {...register("amount", { valueAsNumber: true })}
            />
          </InputContainer>
        </CurrencyGroup>
        <CurrencyGroup>
          <label htmlFor="">Taxa do estado</label>
          <InputStateTax>
            <input
              type="number"
              min={0}
              max={100}
              step={0.01}
              placeholder="0"
              required
              {...register("stateTax", { valueAsNumber: true })}
            />
            <Percent size={16} />
          </InputStateTax>
        </CurrencyGroup>
      </CurrencyWrapper>

      <PaymentMethodSelection>
        <label htmlFor="">Tipo de compra</label>

        <PaymentMethodWrapper>
          <InputContainerPaymentMethod>
            <input
              type="radio"
              id="money"
              value={"money"}
              required
              {...register("paymentMethod")}
            />
            <label htmlFor="money">Dinheiro</label>
          </InputContainerPaymentMethod>

          <InputContainerPaymentMethod>
            <input
              type="radio"
              id="credit"
              value={"credit"}
              required
              {...register("paymentMethod")}
            />
            <label htmlFor="credit">Cartão</label>
          </InputContainerPaymentMethod>
        </PaymentMethodWrapper>
      </PaymentMethodSelection>

      <ButtonConvert type="submit">
        <ArrowsLeftRight size={16} />
        Converter
      </ButtonConvert>
    </Container>
  );
}
