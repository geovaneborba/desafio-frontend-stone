import { ArrowLeft } from "@phosphor-icons/react";
import {
  AdditionalInfo,
  BackButton,
  Container,
  ErrorContainer,
  ResultAmount,
  ResultContainer,
} from "./styles";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { priceFormatter } from "../../utils/price-formatter";
import { calculateCreditTotal } from "../../utils/calculate-credit-total";
import { calculateMoneyTotal } from "../../utils/calculate-money-total";
import { useDollarQuery } from "../../hooks/useDollarQuery";

type StateData = {
  amount: number;
  stateTax: number;
  paymentMethod: "money" | "credit";
};

export function ResumePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: dollarPrice, error, status } = useDollarQuery();

  const { amount, stateTax, paymentMethod } = (location.state
    ?.data as StateData) || {
    amount: 0,
    stateTax: 0,
    paymentMethod: "",
  };

  if (!location.state) {
    navigate("/", { replace: true });
  }

  const totalPrice = useMemo(() => {
    if (!dollarPrice) {
      return;
    }

    return paymentMethod === "money"
      ? priceFormatter(calculateMoneyTotal(amount, stateTax, dollarPrice))
      : priceFormatter(calculateCreditTotal(amount, stateTax, dollarPrice));
  }, [paymentMethod, amount, stateTax, dollarPrice]);

  if (error) {
    return (
      <ErrorContainer>
        <span>
          Aconteceu um erro ao buscar cotação do dólar. <br />
          Tente novamente mais tarde!
        </span>
        <BackButton to={"/"}>
          <ArrowLeft size={16} />
          Voltar
        </BackButton>
      </ErrorContainer>
    );
  }

  if (status === "pending") {
    return <div>Carregando...</div>;
  }

  return (
    <Container>
      <ResultContainer>
        <BackButton to={"/"}>
          <ArrowLeft size={16} />
          Voltar
        </BackButton>

        <p>O resultado do cálculo é</p>

        <ResultAmount>{totalPrice}</ResultAmount>
        <AdditionalInfo>
          Compra no {paymentMethod === "money" ? "dinheiro" : "cartão"} e taxa
          de <span>{stateTax}%</span>
        </AdditionalInfo>
        <AdditionalInfo>
          Cotação do dólar:{" "}
          <span>$1,00 = {priceFormatter(dollarPrice ?? 0)}</span>
        </AdditionalInfo>
      </ResultContainer>
    </Container>
  );
}
